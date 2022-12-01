import { FetchResponse } from "api/dist/core";
import { pruneBody, splitDbName, validateToken } from "./utils";
import { ApiError } from "./errors";

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

function bitdotio(apiKey: string) {
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
  };
}

export default bitdotio;
