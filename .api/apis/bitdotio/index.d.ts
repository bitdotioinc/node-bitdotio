import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
  spec: Oas;
  core: APICore;
  constructor();
  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions): void;
  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]): this;
  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables?: {}): void;
  /**
   * Lists metadata for all databases that you own or are a collaborator on.
   *
   * @summary List databases
   */
  get_db_list_v2beta_db__get(
    metadata?: types.GetDbListV2BetaDbGetMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetDbListV2BetaDbGetResponse200>
    | FetchResponse<401, types.GetDbListV2BetaDbGetResponse401>
    | FetchResponse<422, types.GetDbListV2BetaDbGetResponse422>
  >;
  /**
   * Create a new database. `name` is the only required parameter, and should be specified
   * without including the owner's username. Databases will be set to private by default.
   * `storage_limit_bytes` sets the maximum storage that will be provisioned for the database
   * in bytes. If unset, it will default to 3GiB for free users, and 10GiB for Pro users. If
   * set, the maximum value for the user's plan will be enforced regardless of the value that
   * is provided, however any values less than the maximum are allowed.
   *
   * @summary Create a new database
   */
  create_db_v2beta_db__post(
    body: types.CreateDbV2BetaDbPostBodyParam,
    metadata?: types.CreateDbV2BetaDbPostMetadataParam
  ): Promise<
    | FetchResponse<201, types.CreateDbV2BetaDbPostResponse201>
    | FetchResponse<400, types.CreateDbV2BetaDbPostResponse400>
    | FetchResponse<401, types.CreateDbV2BetaDbPostResponse401>
    | FetchResponse<403, types.CreateDbV2BetaDbPostResponse403>
    | FetchResponse<409, types.CreateDbV2BetaDbPostResponse409>
    | FetchResponse<422, types.CreateDbV2BetaDbPostResponse422>
  >;
  /**
   * Fetch metadata about a single database. The requested database can be a database that
   * you own, a database that you are a collaborator on, or a public database.
   *
   * @summary Get metadata about a single database
   */
  get_db_v2beta_db__username___db_name__get(
    metadata: types.GetDbV2BetaDbUsernameDbNameGetMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetDbV2BetaDbUsernameDbNameGetResponse200>
    | FetchResponse<401, types.GetDbV2BetaDbUsernameDbNameGetResponse401>
    | FetchResponse<404, types.GetDbV2BetaDbUsernameDbNameGetResponse404>
    | FetchResponse<422, types.GetDbV2BetaDbUsernameDbNameGetResponse422>
  >;
  /**
   * Delete a database that you are the owner of.
   *
   * @summary Delete a single database
   */
  delete_db_v2beta_db__username___db_name__delete(
    metadata: types.DeleteDbV2BetaDbUsernameDbNameDeleteMetadataParam
  ): Promise<
    | FetchResponse<200, types.DeleteDbV2BetaDbUsernameDbNameDeleteResponse200>
    | FetchResponse<401, types.DeleteDbV2BetaDbUsernameDbNameDeleteResponse401>
    | FetchResponse<403, types.DeleteDbV2BetaDbUsernameDbNameDeleteResponse403>
    | FetchResponse<404, types.DeleteDbV2BetaDbUsernameDbNameDeleteResponse404>
    | FetchResponse<422, types.DeleteDbV2BetaDbUsernameDbNameDeleteResponse422>
  >;
  /**
   * Update metadata of a database that you are owner or admin of. One or multiple of `name`,
   * `is_private`, and `storage_limit_bytes` may be updated in a single request. If updating
   * `storage_limit_bytes`, the maximum for your usage plan will be enforced. If updating
   * `name`, the name should be specified without including the owner's username. After
   * updating a database name, it is recommended to update your API calls to use the new name
   * as soon as possible. The old name will only be usable for up to 30 days after being
   * changed.
   *
   * @summary Update metadata of a single database
   */
  update_db_v2beta_db__username___db_name__patch(
    body: types.UpdateDbV2BetaDbUsernameDbNamePatchBodyParam,
    metadata: types.UpdateDbV2BetaDbUsernameDbNamePatchMetadataParam
  ): Promise<
    | FetchResponse<200, types.UpdateDbV2BetaDbUsernameDbNamePatchResponse200>
    | FetchResponse<400, types.UpdateDbV2BetaDbUsernameDbNamePatchResponse400>
    | FetchResponse<401, types.UpdateDbV2BetaDbUsernameDbNamePatchResponse401>
    | FetchResponse<403, types.UpdateDbV2BetaDbUsernameDbNamePatchResponse403>
    | FetchResponse<404, types.UpdateDbV2BetaDbUsernameDbNamePatchResponse404>
    | FetchResponse<409, types.UpdateDbV2BetaDbUsernameDbNamePatchResponse409>
    | FetchResponse<422, types.UpdateDbV2BetaDbUsernameDbNamePatchResponse422>
  >;
  /**
   * Starts a new data export job, exporting either an entire table, or the results of a
   * given query. If exporting a table, both `schema_name` and `table_name` must be given (if
   * you never specified a schema name when creating your table, its schema name is
   * `public`). If exporting query results, the full query must be given in the
   * `query_string` field. You must also specify the format to export to. Supported formats
   * are CSV, JSON, XLS, and Parquet. You may optionally specify the exported file's name
   * using the `file_name` field. Exported files are not returned from this endpoint. Rather,
   * this endpoint returns an object describing the status of the export job, including
   * `status_url`, `state` and `download_url` fields. You can request the `status_url` to
   * retrieve the updated status of your export job. The possible states of an export job are
   * `RECEIVED`, `PROCESSING`, `DONE`, and `FAILED`. When the job reaches the `DONE` state,
   * it should have a `download_url`, which you can request to download the exported file.
   *
   * @summary Start a data export job.
   */
  create_export_v2beta_db__username___db_name__export__post(
    body: types.CreateExportV2BetaDbUsernameDbNameExportPostBodyParam,
    metadata: types.CreateExportV2BetaDbUsernameDbNameExportPostMetadataParam
  ): Promise<
    | FetchResponse<201, types.CreateExportV2BetaDbUsernameDbNameExportPostResponse201>
    | FetchResponse<400, types.CreateExportV2BetaDbUsernameDbNameExportPostResponse400>
    | FetchResponse<401, types.CreateExportV2BetaDbUsernameDbNameExportPostResponse401>
    | FetchResponse<403, types.CreateExportV2BetaDbUsernameDbNameExportPostResponse403>
    | FetchResponse<404, types.CreateExportV2BetaDbUsernameDbNameExportPostResponse404>
    | FetchResponse<422, types.CreateExportV2BetaDbUsernameDbNameExportPostResponse422>
  >;
  /**
   * Starts a new data import job given a file or URL, and a target table. This endpoint
   * accepts form data instead of JSON in order support direct file uploads. Supported
   * filetypes are CSV, JSON, XLS/XLSX, and SQLite. A file XOR a URL is required. If relevant
   * to your filetype, you may specify how you want the file's header to be interpreted via
   * the `infer_header` field. Options are `auto` (we detect whether there is a header row in
   * your file), `first_row` (specify that the header is the first row of the file), or
   * `no_header` (there is no header in your file). The response to this request will contain
   * a field `status_url`, which you can request to retrieve the updated status of your
   * upload. The `STATE` field of the response indicates the current status of the upload.
   * The possible states are `RECEIVED`, `PROCESSING`, `DONE`, and `FAILED`.
   *
   * @summary Start a data import job from a file or a URL
   */
  create_import_v2beta_db__username___db_name__import__post(
    body: types.CreateImportV2BetaDbUsernameDbNameImportPostBodyParam,
    metadata: types.CreateImportV2BetaDbUsernameDbNameImportPostMetadataParam
  ): Promise<
    | FetchResponse<201, types.CreateImportV2BetaDbUsernameDbNameImportPostResponse201>
    | FetchResponse<400, types.CreateImportV2BetaDbUsernameDbNameImportPostResponse400>
    | FetchResponse<401, types.CreateImportV2BetaDbUsernameDbNameImportPostResponse401>
    | FetchResponse<403, types.CreateImportV2BetaDbUsernameDbNameImportPostResponse403>
    | FetchResponse<404, types.CreateImportV2BetaDbUsernameDbNameImportPostResponse404>
    | FetchResponse<422, types.CreateImportV2BetaDbUsernameDbNameImportPostResponse422>
  >;
  /**
   * Retrieves the status and other metadata about a given export job. See the description of
   * the export creation endpoint for a sumary of export job statuses and metadata fields.
   *
   * @summary Get the status of a data export job
   */
  get_export_v2beta_export__export_id__get(
    metadata: types.GetExportV2BetaExportExportIdGetMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetExportV2BetaExportExportIdGetResponse200>
    | FetchResponse<401, types.GetExportV2BetaExportExportIdGetResponse401>
    | FetchResponse<404, types.GetExportV2BetaExportExportIdGetResponse404>
    | FetchResponse<422, types.GetExportV2BetaExportExportIdGetResponse422>
  >;
  /**
   * Retrieves the status and other metadata about a given import job. See the description of
   * the import creation endpoint for a summary of import job statuses.
   *
   * @summary Get the status of a data import job
   */
  get_import_v2beta_import__import_id__get(
    metadata: types.GetImportV2BetaImportImportIdGetMetadataParam
  ): Promise<
    | FetchResponse<200, types.GetImportV2BetaImportImportIdGetResponse200>
    | FetchResponse<401, types.GetImportV2BetaImportImportIdGetResponse401>
    | FetchResponse<404, types.GetImportV2BetaImportImportIdGetResponse404>
    | FetchResponse<422, types.GetImportV2BetaImportImportIdGetResponse422>
  >;
  /**
   * The query endpoint can be used to execute a query against a database that you have
   * access to. Both parameters in the body must be specified. `query_string` should contain
   * the SQL query you want to execute, and `database_name` should be the database to exectue
   * the query against, formatted as `{username}/{database-name}`. For space-efficiency, by
   * default the response will be a JSON object containing a `metadata` object describing the
   * columns, and a `data` array containing the raw rows returned by the query. If you would
   * instead like an array of JSON objects representing each row, use the query parameter
   * `?data_format=objects`. Note that it is only possible to run a single query or SQL
   * command per API call.
   *
   * @summary Execute a query
   */
  query_v2beta_query_post(
    body: types.QueryV2BetaQueryPostBodyParam,
    metadata?: types.QueryV2BetaQueryPostMetadataParam
  ): Promise<
    | FetchResponse<200, types.QueryV2BetaQueryPostResponse200>
    | FetchResponse<422, types.QueryV2BetaQueryPostResponse422>
  >;
}
declare const createSDK: SDK;
export default createSDK;
export type {
  CreateDbV2BetaDbPostBodyParam,
  CreateDbV2BetaDbPostMetadataParam,
  CreateDbV2BetaDbPostResponse201,
  CreateDbV2BetaDbPostResponse400,
  CreateDbV2BetaDbPostResponse401,
  CreateDbV2BetaDbPostResponse403,
  CreateDbV2BetaDbPostResponse409,
  CreateDbV2BetaDbPostResponse422,
  CreateExportV2BetaDbUsernameDbNameExportPostBodyParam,
  CreateExportV2BetaDbUsernameDbNameExportPostMetadataParam,
  CreateExportV2BetaDbUsernameDbNameExportPostResponse201,
  CreateExportV2BetaDbUsernameDbNameExportPostResponse400,
  CreateExportV2BetaDbUsernameDbNameExportPostResponse401,
  CreateExportV2BetaDbUsernameDbNameExportPostResponse403,
  CreateExportV2BetaDbUsernameDbNameExportPostResponse404,
  CreateExportV2BetaDbUsernameDbNameExportPostResponse422,
  CreateImportV2BetaDbUsernameDbNameImportPostBodyParam,
  CreateImportV2BetaDbUsernameDbNameImportPostMetadataParam,
  CreateImportV2BetaDbUsernameDbNameImportPostResponse201,
  CreateImportV2BetaDbUsernameDbNameImportPostResponse400,
  CreateImportV2BetaDbUsernameDbNameImportPostResponse401,
  CreateImportV2BetaDbUsernameDbNameImportPostResponse403,
  CreateImportV2BetaDbUsernameDbNameImportPostResponse404,
  CreateImportV2BetaDbUsernameDbNameImportPostResponse422,
  DeleteDbV2BetaDbUsernameDbNameDeleteMetadataParam,
  DeleteDbV2BetaDbUsernameDbNameDeleteResponse200,
  DeleteDbV2BetaDbUsernameDbNameDeleteResponse401,
  DeleteDbV2BetaDbUsernameDbNameDeleteResponse403,
  DeleteDbV2BetaDbUsernameDbNameDeleteResponse404,
  DeleteDbV2BetaDbUsernameDbNameDeleteResponse422,
  GetDbListV2BetaDbGetMetadataParam,
  GetDbListV2BetaDbGetResponse200,
  GetDbListV2BetaDbGetResponse401,
  GetDbListV2BetaDbGetResponse422,
  GetDbV2BetaDbUsernameDbNameGetMetadataParam,
  GetDbV2BetaDbUsernameDbNameGetResponse200,
  GetDbV2BetaDbUsernameDbNameGetResponse401,
  GetDbV2BetaDbUsernameDbNameGetResponse404,
  GetDbV2BetaDbUsernameDbNameGetResponse422,
  GetExportV2BetaExportExportIdGetMetadataParam,
  GetExportV2BetaExportExportIdGetResponse200,
  GetExportV2BetaExportExportIdGetResponse401,
  GetExportV2BetaExportExportIdGetResponse404,
  GetExportV2BetaExportExportIdGetResponse422,
  GetImportV2BetaImportImportIdGetMetadataParam,
  GetImportV2BetaImportImportIdGetResponse200,
  GetImportV2BetaImportImportIdGetResponse401,
  GetImportV2BetaImportImportIdGetResponse404,
  GetImportV2BetaImportImportIdGetResponse422,
  QueryV2BetaQueryPostBodyParam,
  QueryV2BetaQueryPostMetadataParam,
  QueryV2BetaQueryPostResponse200,
  QueryV2BetaQueryPostResponse422,
  UpdateDbV2BetaDbUsernameDbNamePatchBodyParam,
  UpdateDbV2BetaDbUsernameDbNamePatchMetadataParam,
  UpdateDbV2BetaDbUsernameDbNamePatchResponse200,
  UpdateDbV2BetaDbUsernameDbNamePatchResponse400,
  UpdateDbV2BetaDbUsernameDbNamePatchResponse401,
  UpdateDbV2BetaDbUsernameDbNamePatchResponse403,
  UpdateDbV2BetaDbUsernameDbNamePatchResponse404,
  UpdateDbV2BetaDbUsernameDbNamePatchResponse409,
  UpdateDbV2BetaDbUsernameDbNamePatchResponse422,
} from './types';
