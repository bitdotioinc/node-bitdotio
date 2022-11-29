'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var oas_1 = __importDefault(require('oas'));
var core_1 = __importDefault(require('api/dist/core'));
var openapi_json_1 = __importDefault(require('./openapi.json'));
var SDK = /** @class */ (function () {
  function SDK() {
    this.spec = oas_1.default.init(openapi_json_1.default);
    this.core = new core_1.default(this.spec, 'bitdotio/0.4.0 (api/5.0.3)');
  }
  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  SDK.prototype.config = function (config) {
    this.core.setConfig(config);
  };
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
  SDK.prototype.auth = function () {
    var _a;
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }
    (_a = this.core).setAuth.apply(_a, values);
    return this;
  };
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
  SDK.prototype.server = function (url, variables) {
    if (variables === void 0) {
      variables = {};
    }
    this.core.setServer(url, variables);
  };
  /**
   * Lists metadata for all databases that you own or are a collaborator on.
   *
   * @summary List databases
   */
  SDK.prototype.get_db_list_v2beta_db__get = function (metadata) {
    return this.core.fetch('/v2beta/db/', 'get', metadata);
  };
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
  SDK.prototype.create_db_v2beta_db__post = function (body, metadata) {
    return this.core.fetch('/v2beta/db/', 'post', body, metadata);
  };
  /**
   * Fetch metadata about a single database. The requested database can be a database that
   * you own, a database that you are a collaborator on, or a public database.
   *
   * @summary Get metadata about a single database
   */
  SDK.prototype.get_db_v2beta_db__username___db_name__get = function (metadata) {
    return this.core.fetch('/v2beta/db/{username}/{db_name}', 'get', metadata);
  };
  /**
   * Delete a database that you are the owner of.
   *
   * @summary Delete a single database
   */
  SDK.prototype.delete_db_v2beta_db__username___db_name__delete = function (metadata) {
    return this.core.fetch('/v2beta/db/{username}/{db_name}', 'delete', metadata);
  };
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
  SDK.prototype.update_db_v2beta_db__username___db_name__patch = function (body, metadata) {
    return this.core.fetch('/v2beta/db/{username}/{db_name}', 'patch', body, metadata);
  };
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
  SDK.prototype.create_export_v2beta_db__username___db_name__export__post = function (
    body,
    metadata
  ) {
    return this.core.fetch('/v2beta/db/{username}/{db_name}/export/', 'post', body, metadata);
  };
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
  SDK.prototype.create_import_v2beta_db__username___db_name__import__post = function (
    body,
    metadata
  ) {
    return this.core.fetch('/v2beta/db/{username}/{db_name}/import/', 'post', body, metadata);
  };
  /**
   * Retrieves the status and other metadata about a given export job. See the description of
   * the export creation endpoint for a sumary of export job statuses and metadata fields.
   *
   * @summary Get the status of a data export job
   */
  SDK.prototype.get_export_v2beta_export__export_id__get = function (metadata) {
    return this.core.fetch('/v2beta/export/{export_id}', 'get', metadata);
  };
  /**
   * Retrieves the status and other metadata about a given import job. See the description of
   * the import creation endpoint for a summary of import job statuses.
   *
   * @summary Get the status of a data import job
   */
  SDK.prototype.get_import_v2beta_import__import_id__get = function (metadata) {
    return this.core.fetch('/v2beta/import/{import_id}', 'get', metadata);
  };
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
  SDK.prototype.query_v2beta_query_post = function (body, metadata) {
    return this.core.fetch('/v2beta/query', 'post', body, metadata);
  };
  return SDK;
})();
var createSDK = (function () {
  return new SDK();
})();
module.exports = createSDK;
