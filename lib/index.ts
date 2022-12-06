import { FetchResponse } from "api/dist/core";
import { pruneBody, splitDbName, validateToken } from "./utils";
import { ApiError } from "./errors";
import { ApiClient } from "./apiClient";
import FormData from "form-data";
import { ReadStream, statSync } from "fs";
import { Database, ImportJob } from "./apiTypes";

type ApiMethodType<Args extends any[], Return> = (
  ...args: Args
) => Promise<Return>;

function apiMethodWrapper<
  Args extends any[],
  Status extends number,
  Data extends Record<string, any>,
>(
  method: ApiMethodType<Args, FetchResponse<Status, Data>>,
  returning?: string,
): ApiMethodType<Args, Data> {
  return async function (...args: Args) {
    const response = await method(...args);
    if (response.status < 300) {
      return returning ? response.data[returning] : response.data;
    }
    throw new ApiError(
      "API call returned an error",
      response.status,
      response.data,
    );
  };
}

function _bitdotio(apiKey: string) {
  validateToken(apiKey);
  // Need to require here rather than importing globally because the exported module
  // member is a just-in-time instantiated SDK object.
  const apiClient = require("@api/bitdotio");
  apiClient.auth(apiKey);

  return {
    _apiClient: apiClient,
    listDatabases: apiMethodWrapper(async () => {
      return apiClient.get_db_list_v2beta_db__get();
    }, "databases"),
    createDatabase: apiMethodWrapper(
      async ({
        name,
        isPrivate = true,
        storageLimitBytes = undefined,
      }: {
        name: string;
        isPrivate?: boolean;
        storageLimitBytes?: number;
      }) => {
        return apiClient.create_db_v2beta_db__post(
          pruneBody({
            name,
            is_private: isPrivate,
            storage_limit_bytes: storageLimitBytes,
          }),
        );
      },
    ),
    getDatabase: apiMethodWrapper(async (dbName: string) => {
      return apiClient.get_db_v2beta_db__username___db_name__get(
        splitDbName(dbName),
      );
    }),
    updateDatabase: apiMethodWrapper(
      async (
        dbName: string,
        options: {
          name?: string;
          isPrivate?: boolean;
          storageLimitBytes?: number;
        },
      ) => {
        return apiClient.update_db_v2beta_db__username___db_name__patch(
          pruneBody(options),
          splitDbName(dbName),
        );
      },
    ),
    deleteDatabase: apiMethodWrapper(async (dbName: string) => {
      return apiClient.delete_db_v2beta_db__username___db_name__delete(
        splitDbName(dbName),
      );
    }),
  };
}

type BaseImportJobOpts = {
  tableName: string;
  schemaName?: string;
  inferHeader?: "auto" | "first_row" | "no_header";
};
type FileImportJobOpts = BaseImportJobOpts & {
  type: "file";
  file: ReadStream;
};
type UrlImportJobOpts = BaseImportJobOpts & {
  type: "url";
  url: string;
};
type ImportJobOpts = FileImportJobOpts | UrlImportJobOpts;

class SDK {
  private _apiClient: ApiClient;
  constructor(apiKey: string) {
    this._apiClient = new ApiClient(apiKey);
  }

  async listDatabases(): Promise<Database[]> {
    return this._apiClient
      .get<{ databases: Database[] }>("/db")
      .then((response: any) => response.databases);
  }

  async createDatabase({
    name,
    isPrivate = true,
    storageLimitBytes = undefined,
  }: {
    name: string;
    isPrivate?: boolean;
    storageLimitBytes?: number;
  }): Promise<Database> {
    return this._apiClient.post<Database>("/db/", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        pruneBody({
          name,
          is_private: isPrivate,
          storage_limit_bytes: storageLimitBytes,
        }),
      ),
    });
  }

  async getDatabase(fullDbName: string): Promise<Database> {
    const { username, dbName } = splitDbName(fullDbName);
    return this._apiClient.get<Database>(`/db/${username}/${dbName}`);
  }

  async updateDatabase(
    fullDbName: string,
    options: {
      name?: string;
      isPrivate?: boolean;
      storageLimitBytes?: number;
    },
  ): Promise<Database> {
    const { username, dbName } = splitDbName(fullDbName);
    return this._apiClient.patch<Database>(`/db/${username}/${dbName}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        pruneBody({
          name: options.name,
          is_private: options.isPrivate,
          storage_limit_bytes: options.storageLimitBytes,
        }),
      ),
    });
  }

  async deleteDatabase(fullDbName: string): Promise<void> {
    const { username, dbName } = splitDbName(fullDbName);
    await this._apiClient.delete(`/db/${username}/${dbName}`);
  }

  async createImportJob(
    fullDbName: string,
    options: ImportJobOpts,
  ): Promise<ImportJob> {
    const { username, dbName } = splitDbName(fullDbName);

    const body = new FormData();
    body.append("table_name", options.tableName);
    if (options.schemaName) {
      body.append("schema_name", options.schemaName);
    }
    if (options.inferHeader) {
      body.append("infer_header", options.inferHeader);
    }

    if (options.type === "file") {
      body.append("file", options.file, {
        knownLength: statSync(options.file.path).size,
      });
    } else {
      body.append("file_url", options.url);
    }

    return this._apiClient.post<ImportJob>(
      `/db/${username}/${dbName}/import/`,
      { body },
    );
  }
}

function bitdotio(apiKey: string): SDK {
  return new SDK(apiKey);
}

export default bitdotio;
