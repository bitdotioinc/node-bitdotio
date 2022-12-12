import * as nf from "node-fetch";
import { createReadStream } from "fs";
import path from "path";
import { jest } from "@jest/globals";
import bitdotio from "../lib";
import { ApiError } from "../lib/errors";
import { getUserAgent } from "../lib/utils";

const apiErrMsg = "API call returned an error";
const invalidDbNameErrMsg = "Invalid database name";

function mockResponse(status: number, data: Record<string, any>): nf.Response {
  return new nf.Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

describe("query", () => {
  const apiKey = "v2_testtoken";
  const b = bitdotio(apiKey);
  const defaultHeaders = {
    "Accept": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "User-Agent": getUserAgent(),
  };

  test("query ok rows", async () => {
    const dbName = "my/db";
    const query = "SELECT * FROM my_table";
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(200, expected));

    const result = await b.query(dbName, query);

    expect(result).toEqual(expected);
    expect(nf.default).toHaveBeenLastCalledWith(
      "https://api.bit.io/v2beta/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...defaultHeaders,
        },
        body: JSON.stringify({
          database_name: dbName,
          query_string: query,
        }),
      },
    );
  });
  test("query ok objects", async () => {
    const dbName = "my/db";
    const query = "SELECT * FROM my_table";
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(200, expected));

    const result = await b.query(dbName, query, "objects");

    expect(result).toEqual(expected);
    expect(nf.default).toHaveBeenLastCalledWith(
      "https://api.bit.io/v2beta/query?data_format=objects",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...defaultHeaders,
        },
        body: JSON.stringify({
          database_name: dbName,
          query_string: query,
        }),
      },
    );
  });
  test("query invalid db name", async () => {
    await expect(
      b.query("not a db name", "SELECT * FROM my_table"),
    ).rejects.toThrow(new Error("Invalid database name"));
  });
  test("query error", async () => {
    const dbName = "my/db";
    const query = "SELECT * FROM my_table";
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));

    await expect(b.query(dbName, query)).rejects.toThrow(
      new ApiError(apiErrMsg, status, data),
    );
  });
});

describe("listDatabases", () => {
  const b = bitdotio("v2_testtoken");

  test("listDatabases ok", async () => {
    const expected = ["foo", "bar"];
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(200, { databases: expected }));
    const result = await b.listDatabases();
    expect(result).toEqual(expected);
  });
  test("listDatabases error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    await expect(b.listDatabases()).rejects.toThrow(
      new ApiError(apiErrMsg, status, data),
    );
  });
});

describe("getDatabase", () => {
  const b = bitdotio("v2_testtoken");

  test("getDatabase ok", async () => {
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(200, expected));
    const result = await b.getDatabase("my/db");
    expect(result).toEqual(expected);
  });
  test("getDatabase invalid db name", async () => {
    await expect(b.getDatabase("not a db name")).rejects.toThrow(
      new Error(invalidDbNameErrMsg),
    );
  });
  test("getDatabase error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    await expect(b.getDatabase("my/db")).rejects.toThrow(
      new ApiError(apiErrMsg, status, data),
    );
  });
});

describe("createDatabase", () => {
  const b = bitdotio("v2_testtoken");

  test("createDatabase ok", async () => {
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(201, expected));
    const result = await b.createDatabase({ name: "my-db" });
    expect(result).toEqual(expected);
  });
  test("createDatabase error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    await expect(
      b.createDatabase({ name: "my-db", isPrivate: false }),
    ).rejects.toThrow(new ApiError(apiErrMsg, status, data));
  });
});

describe("updateDatabase", () => {
  const b = bitdotio("v2_testtoken");

  test("updateDatabase ok", async () => {
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(200, expected));
    const result = await b.updateDatabase("my/db", { isPrivate: false });
    expect(result).toEqual(expected);
  });
  test("updateDatabase invalid db name", async () => {
    await expect(b.updateDatabase("not a db name", {})).rejects.toThrow(
      new Error(invalidDbNameErrMsg),
    );
  });
  test("updateDatabase error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    await expect(
      b.updateDatabase("my/db", { storageLimitBytes: 12345 }),
    ).rejects.toThrow(new ApiError(apiErrMsg, status, data));
  });
});

describe("deleteDatabase", () => {
  const b = bitdotio("v2_testtoken");

  test("deleteDatabase ok", async () => {
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(200, {}));
    const result = await b.deleteDatabase("my/db");
    expect(result).toBeUndefined();
  });
  test("deleteDatabase invalid db name", async () => {
    await expect(b.deleteDatabase("not a db name")).rejects.toThrow(
      new Error(invalidDbNameErrMsg),
    );
  });
  test("deleteDatabase error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    await expect(b.deleteDatabase("my/db")).rejects.toThrow(
      new ApiError(apiErrMsg, status, data),
    );
  });
});

describe("createImportJob", () => {
  const b = bitdotio("v2_testtoken");

  test("createImportJob file ok", async () => {
    const stream = createReadStream(path.join(__dirname, "test-csv.csv"));
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(200, expected));
    const result = await b.createImportJob("my/db", {
      type: "file",
      tableName: "my-table",
      file: stream,
    });
    expect(result).toEqual(expected);
  });
  test("createImportJob url ok", async () => {
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(200, expected));
    const result = await b.createImportJob("my/db", {
      type: "url",
      tableName: "my-table",
      schemaName: "my-schema",
      url: "https://example.com/my.csv",
    });
    expect(result).toEqual(expected);
  });
  test("createImportJob invalid db name", async () => {
    await expect(
      b.createImportJob("not a db name", {
        type: "url",
        tableName: "my-table",
        url: "https://example.com/my.csv",
      }),
    ).rejects.toThrow(new Error(invalidDbNameErrMsg));
  });
  test("createImportJob error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    await expect(
      b.createImportJob("my/db", {
        type: "url",
        tableName: "my-table",
        url: "https://example.com/my.csv",
      }),
    ).rejects.toThrow(new ApiError(apiErrMsg, status, data));
  });
});

describe("getImportJob", () => {
  const b = bitdotio("v2_testtoken");

  test("getImportJob ok", async () => {
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(201, expected));
    const result = await b.getImportJob("fdfacebb-0757-4758-a061-16ba02a2be8d");
    expect(result).toEqual(expected);
  });
  test("getImportJob error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    await expect(
      b.getImportJob("fdfacebb-0757-4758-a061-16ba02a2be8d"),
    ).rejects.toThrow(new ApiError(apiErrMsg, status, data));
  });
});

describe("createExportJob", () => {
  const b = bitdotio("v2_testtoken");

  test("createExportJob query ok", async () => {
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(200, expected));
    const result = await b.createExportJob("my/db", {
      type: "query",
      query: "SELECT * FROM my-table",
      fileName: "my-file.csv",
      exportFormat: "csv",
    });
    expect(result).toEqual(expected);
  });
  test("createExportJob table ok", async () => {
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(200, expected));
    const result = await b.createExportJob("my/db", {
      type: "table",
      tableName: "my-table",
      schemaName: "my-schema",
      exportFormat: "parquet",
    });
    expect(result).toEqual(expected);
  });
  test("createExportJob invalid db name", async () => {
    await expect(
      b.createExportJob("not a db name", {
        type: "table",
        tableName: "my-table",
        exportFormat: "parquet",
      }),
    ).rejects.toThrow(new Error(invalidDbNameErrMsg));
  });
  test("createExportJob error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    await expect(
      b.createExportJob("my/db", {
        type: "table",
        tableName: "my-table",
        exportFormat: "parquet",
      }),
    ).rejects.toThrow(new ApiError(apiErrMsg, status, data));
  });
});

describe("getExportJob", () => {
  const b = bitdotio("v2_testtoken");

  test("getExportJob ok", async () => {
    const expected = { foo: "bar" };
    jest
      .spyOn(nf, "default")
      .mockResolvedValueOnce(mockResponse(201, expected));
    const result = await b.getExportJob("fdfacebb-0757-4758-a061-16ba02a2be8d");
    expect(result).toEqual(expected);
  });
  test("getExportJob error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    await expect(
      b.getExportJob("fdfacebb-0757-4758-a061-16ba02a2be8d"),
    ).rejects.toThrow(new ApiError(apiErrMsg, status, data));
  });
});
