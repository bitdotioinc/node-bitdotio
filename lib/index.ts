import { pruneBody, splitDbName, validateToken } from "./utils";
import { ApiClient } from "./apiClient";
import FormData from "form-data";
import { ReadStream, statSync } from "fs";
import { Database, ImportJob, QueryResults } from "./apiTypes";

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

type BaseExportJobOpts = {
  fileName?: string;
  exportFormat?: "csv" | "json" | "xls" | "parquet";
};
type TableExportJobOpts = BaseExportJobOpts & {
  type: "table";
  tableName: string;
  schemaName?: string;
};
type QueryExportJobOpts = BaseExportJobOpts & {
  type: "query";
  query: string;
};
type ExportJobOpts = TableExportJobOpts | QueryExportJobOpts;

class SDK {
  private _apiClient: ApiClient;
  constructor(apiKey: string) {
    this._apiClient = new ApiClient(apiKey);
  }

  async query<F extends "rows" | "objects">(
    fullDbName: string,
    query: string,
    dataFormat: F = "rows" as F,
  ): Promise<QueryResults<F>> {
    let path = "/query";
    if (dataFormat === "objects") {
      path += "?data_format=objects";
    }
    return this._apiClient.post<QueryResults<F>>(path, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        database_name: fullDbName,
        query_string: query,
      }),
    });
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

  async getImportJob(jobId: string): Promise<ImportJob> {
    return this._apiClient.get<ImportJob>(`/import/${jobId}`);
  }

  async createExportJob(
    fullDbName: string,
    options: ExportJobOpts,
  ): Promise<ImportJob> {
    const { username, dbName } = splitDbName(fullDbName);
    const body: Record<string, any> = {
      file_name: options.fileName,
      // Default to csv if export format is not specified
      export_format: options.exportFormat || "csv",
    };
    if (options.type === "table") {
      body.table_name = options.tableName;
      // Explicit schema name is required by the API, but we can default to
      // public here if tableName is given.
      body.schema_name = options.schemaName ?? "public";
    } else {
      body.query_string = options.query;
    }

    return this._apiClient.post<ImportJob>(
      `/db/${username}/${dbName}/export/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pruneBody(body)),
      },
    );
  }

  async getExportJob(jobId: string): Promise<ImportJob> {
    return this._apiClient.get<ImportJob>(`/export/${jobId}`);
  }
}

function bitdotio(apiKey: string): SDK {
  validateToken(apiKey);
  return new SDK(apiKey);
}

export default bitdotio;
