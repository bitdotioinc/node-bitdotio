# bit.io Node.js SDK

Node.js SDK for connecting to [bit.io](https://bit.io) databases and interacting with
the [bit.io](https://bit.io) developer API.

## Installation

```sh
npm install node-bitdotio
```

## Usage

The `node-bitdotio` package consists of a `bitdotio` SDK object which provides helpful
utilities for creating and managing pre-configured connections to bit.io databases
via [`node-postgres`](https://node-postgres.com/), as well as easy methods for accessing
the functionality exposed by the [bit.io developer API](https://docs.bit.io/reference).

Once you have `node-bitdotio` installed all you need is your API key to start working
with bit.io.

You can get your API key by logging into bit.io and opening [the "Connect" tab](https://docs.bit.io/docs/your-connection-credentials)
on a database page.

### Example usage

See API reference at the bottom of this document for a full list of methods provided by
the SDK.

```js
const { createReadStream } = require('fs');
const bitdotio = require('node-bitdotio');

const BITIO_KEY = process.env.BITIO_KEY;

// Instantiate the bitdotio SDK
const b = bitdotio(BITIO_KEY);

// Create a database
b.createDatabase({ name: "demo-db" }).then(async (dbMetadata) => {
  const dbName = dbMetadata.name;

  // Create a connection pool for our newly created database
  const pool = b.getPool(dbName);

  // Connect to the database using the pool and insert some data
  await pool.connect().then(async (client) => {
    await client.query("CREATE TABLE test (foo integer, bar text)");
    const data = [[1, "one"], [2, "two"], [3, "three"]];
    for (const row of data) {
      await client.query("INSERT INTO test (foo, bar) VALUES ($1, $2)", row);
    }
    // Make sure to return all clients acquired from a connection pool
    client.release();
  });

  // Run a query against our new table using the API
  await b.query(dbName, "SELECT * FROM test", "objects").then((results) => {
    console.table(results.data);
  });

  const sleep = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

  // Start a file upload job and wait for it to complete
  const file = createReadStream('./cities.csv');
  let jobStatus = await b.createImportJob(dbName, { tableName: "cities", type: "file", file });
  while (true) {
    jobStatus = await b.getImportJob(jobStatus.id);
    if (jobStatus.state === "DONE") {
      break;
    }
    if (jobStatus.state === "FAILED") {
      const { errorId, errorType, errorDetails } = jobStatus;
      throw new Error(
        `Import job failed. Error ID: ${errorId}, Error Type: ${errorType}, Error Details: ${errorDetails}`
      );
    }

    // Sleep a bit to not overload the API
    await sleep(200);
  }
});
```

### Making queries

#### Connecting directly

The `bitdotio` SDK object provides the methods `getPool` and `getClient`, which return
instances of [`pg.Pool`](https://node-postgres.com/apis/pool) and
[`pg.Client`](https://node-postgres.com/apis/client), respectively. Both of these are
used to establish direct connections to your bit.io database. The former makes use
of a connection pool, which manages multiple connections and ensures they are kept
alive, and is more suitable to long-running applications; the latter directly
establishes a single, unmanaged connection to you database, and is more suitable for
short scripts and the like. More information on connecting can be found in the
`node-postgres` documentation [here](https://node-postgres.com/features/connecting).

It is preferable to use direct connections in the majority of cases since they have
superior performance and enable more features compared to the `query` method. In
particular we strongly recommend using direct connections in programs that are
long-running, require transaction management, or transfer large quantities of data.

#### The `query` method

The `query` runs queries via the bit.io HTTP API, and therefore will have worse
performance and feature support than direct connections. Importantly, each query run
via the `query` method is run in a single transaction. The `query` method is recommended
in situations where installing a database driver is undesirable or impossible, when
queries are being run very infrequently, or in very short-lived contexts such as one-off
scripts or serverless backends.

### Connection pooling and management

The recommended way to obtain a direct connection to a bit.io database is via a
connection pool. In order to support scaling to zero, bit.io automatically closes idle
connections after a period of time, and puts databases into a dormant state when there
are no live connections. If you are designing a long-running application, you should
make sure that your database access pattern is resilient to connection closures and
database shutdowns. The best way to do this is via a connection pool. Acquiring
connections from a connection pool allows connection re-use, and handles reconnects in
the event that a connection is dropped. You can instantiate a connection pool for a
given database using the `bitdotio` SDK object's `getPool` method. See the
[`pg.Pool` documentation](https://node-postgres.com/apis/pool) for information on how
to connect from a pool. If using connectin pools, it is also recommended to gracefully
tear down the `bitdotio` SDK object when your application terminates using the `end`
method.

There may be situations in which a self-managed, unpooled connection is needed. For
example, if the client needs to persist state onto the connection's database session
using the `SET` command. For such situations, the SDK object provides the `getClient`
method.

### Data imports and exports

The `bitdotio` SDK object provides helper methods to facilitate importing and exporting
data from your bit.io database.

To import data into a table on your bit.io database from a file locally or on the web
you can use the `createImportJob` method. To export data from a query or a table in
your bit.io database you can use the `createExportJob` method.

These methods have somewhat symmetrical workflows in that they both kick off jobs on
the bit.io backend which execute asynchronously, and have companion methods
(`getImportJob`, and `getExportJob`) to check on the status of a running job.

At a high level, the procedure for doing a data import looks like:
1. Call `createImportJob` and get back the job status
2. Use the job status info to poll `getImportJob` until the job status is reported
   as `DONE` or `FAILED`
3. If `DONE`, the data has been successfully imported and your table is ready to query
4. If `FAILED`, the job status object will contain metadata describing what went wrong.

Similarly, a data export looks like:
1. Call `createExportJob` and get back the job status
2. Use the job status info to poll `getExportJob` until the job status is reported
   as `DONE` or `FAILED`
3. If `DONE`, the exported data will be available to download at the `downloadUrl`
   included in the job status info.
4. If `FAILED`, the job status object will contain metadata describing what went wrong.

## API Reference

#### `bitdotio(apiKey[, clientOpts[, poolOpts]])`

Returns an instance of the bit.io SDK object.

_Parameters_:
- `apiKey <string>`: Your bit.io API key
- `clientOpts <pg.ClientConfig | undefined>`: Additional options to use when instantiating a direct database client
- `poolOpts <pg.PoolConfig | undefined>`: Additional options to use when instantiating a connection pool

_Returns_: A bit.io SDK instance

<hr>

#### `bitdotio.getPool(db_name)`

Create and return a connection pool.

_Parameters_:
- `fullDbName <string>`: The full name (including username) of the database to connect to.

_Returns_: [`pg.Pool`](https://node-postgres.com/apis/pool)

<hr>

#### `bitdotio.getClient(db_name)`

Returns an unmanaged, unpooled connection to the given database.

_Parameters_:
- `fullDbName <string>`: The full name (including username) of the database to connect to.

_Returns_: [`pg.Client`](https://node-postgres.com/apis/client)

<hr>

#### `bitdotio.query(fullDbName, query[, dataFormat])`

Execute a query via the bit.io HTTP API

_Parameters_:
- `fullDbName <string>`: Full name of the database to execute a query against
- `query <string>`: Query to execute
- `dataFormat <"rows" | "objects">`: Format to return data in
  - `"rows"`: Returned rows are represented as arrays of values. This is the default.
  - `"objects"`: Returned rows are represented keyed objects with column names as keys

_Returns_: `QueryResults` object containing query results and metadata.

<hr>

#### `bitdotio.listDatabases()`

List metadata pertaining to databases the requester is an owner or collaborator of.

_Returns_: `Database[]` list of objects describing database metadata.

<hr>

#### `bitdotio.createDatabase(options)`

_Parameters_:
- `options`:
  - `name <string>`: Name of the database being created (excluding the owner's username)
  - `isPrivate <boolean>`: Whether or not the database is set to private. Default is `true`.
  - `storageLimitBytes <number | undefined>`: Maximum storage for the database in bytes.
    Limits and defaults are enforced based on billing plan regardless of what is set here.

_Returns_: `Database` object containing metadata about the newly created database.

<hr>

#### `bitdotio.getDatabase(fullDbName)`

Get metadata about a single database.

_Parameters_:
- `fullDbName <string>`: Full name of the database to fetch metadata for.

_Returns_: `Database` object containing metadata about the given database.

<hr>

#### `bitdotio.updateDatabase(fullDbName, options)`

Update metadata parameters for a given database.

_Parameters_:
- `fullDbName <string>`: Full name of the database to update.
- `options`:
  - `name <string | undefined>`: New name for the database (excluding the owner's username).
  - `isPrivate <boolean | undefined>`: Whether or not the database is set to private.
  - `storageLimitBytes <number | undefined>`: Maximum storage for the database in bytes.
    Limits and defaults are enforced based on billing plan regardless of what is set here.

_Returns_: `Database` object containing up-to-date metadata about the updated database.

<hr>

#### `bitdotio.deleteDatabase(fullDbName)`

Delete a database. After deletion the database's name will be unusable for up to 30
days. If you need to reuse it sooner, please contact bit.io support.

_Parameters_:
- `fullDbName <string>`: Full name of the database to delete

_Returns_: `undefined`

<hr>

#### `bitdotio.createImportJob(fullDbName, options)`

Start a data import job from a file or a URL. Supported filetypes CSV, JSON, XLS/XLSX,
and SQLite.

_Parameters_:
- `fullDbName <string>`: Full name of the database to import data into
- `options`:
  - `type <"file" | "url">`: If `"file"`, the `file` option is required; if `"url"`,
    the `url` option is required. These are mutually exclusive.
  - `tableName <string>`: Name of the table to import data into
  - `schemaName <string | undefined>`: Name schema in which the target table resides. Not
    required if the table is in the `public` schema.
  - `inferHeader <"auto" | "first_row" | "no_header">`: If relevant to the given filetype,
    indicates how the first row of the data should be interpreted. If `auto`, we will
    attempt to determine automatically if there is a header or not. If `first_row`, the
    first row of the data will be used as the header. If `no_header`, the first row of
    the data will be interpreted as data. The default is `auto`.
  - `file <fs.ReadStream>`: A stream from which on-disk file data can be read. The
    stream _must_ be created from a file on-disk. Mutually exclusive with `url`.
  - `url <string>`: A URL to import a file from. The URL should point to a
    supported filetype on the web. Mutually exclusive with `file`.

_Returns_: `ImportJob` object describing the status of the import job. The object
contains the fields `id`, and `statusUrl`. The value of `id` can be passed to
`getImportJob` to get the updated status of the import job. `statusUrl` can also be
requested directly to get the same. Also included is the `state` field, which indicates
the current status of the job. Possible values of `state` are `RECEIVED`, `PROCESSING`,
`DONE`, and `FAILED`.

<hr>

#### `bitdotio.getImportJob(jobId)`

Retrieves the status and other metadata about a given data import job. See the docs for
`createImportJob` for more details on import job statuses and metadata fields.

_Parameters_:
- `jobId <string>`: The ID of the import job to retrieve info for.

_Returns_: `ImportJob` object describing the status and metadata of an import job.

<hr>

#### `bitdotio.createExportJob(fullDbName, options)`

Start a data export job from a query or a full table. Supported export filetypes are
CSV, JSON, XLS, and Parquet.

_Parameters_:
- `fullDbName <string>`: Full name of the database to export data from
- `options`:
  - `type <"table" | "query">` If `"table"`, the `tableName` options is required; if
    `"query"`, the `query` option is required. These are mutually exclusive.
  - `query <string>`: A query to export results for. Providing this option will run the
    query on your database. Mutually exclusive with `tableName` and `schemaName`
  - `tableName <string>`: Name of the table to export data from. Mutually exclusive with
    `query`
  - `schemaName <string | undefined>`: Name schema in which the exported table resides.
    Not required if the table is in the `public` schema.
  - `fileName <string | undefined>`: Name of the exported file.
  - `exportFormat <string | undefined>`: File format to export data to. Accepted values
    are `csv`, `json`, `xls`, and `parquet`. Defaults to `csv`.

_Returns_: `ExportJob` object describing the status of the export job. The object
contains the fields `id`, and `statusUrl`. The value of `id` can be passed to
`getExportJob` to get the updated status of the export job. `statusUrl` can also be
requested directly to get the same. Also included is the `state` field, which indicates
the current status of the job. Possible values of `state` are `RECEIVED`, `PROCESSING`,
`DONE`, and `FAILED`. When the status of the job reaches `DONE`, the field `downloadUrl`
will have a non-null value, and the exported file can be downloaded from it.

<hr>

#### `bitdotio.getExportJob(jobId)`

Retrieves the status and other metadata about a given data export job. See the docs for
`createExportJob` for more details on export job statuses and metadata fields.

_Parameters_:
- `jobId <string>`: The ID of the export job to retrieve info for.

_Returns_: `ExportJob` object describing the status and metadata of an export job.

<hr>
