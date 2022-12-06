import * as nf from "node-fetch";
import { createReadStream } from "fs";
import path from "path";
import { jest } from "@jest/globals";
import bitdotio from "../lib";
import { ApiError } from "../lib/errors";

function mockResponse(status: number, data: Record<string, any>): nf.Response {
  return new nf.Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

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
    try {
      await b.listDatabases();
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      if (e instanceof ApiError) {
        expect(e.status).toBe(status);
        expect(e.data).toEqual(data);
      }
    }
  });
});

/*
describe("getDatabase", () => {
  const b = bitdotio("v2_testtoken");

  test("getDatabase ok", async () => {
    const expected = { foo: "bar" };
    b._apiClient.get_db_v2beta_db__username___db_name__get = jest.fn(
      mockApiMethod(200, expected),
    );
    const result = await b.getDatabase("my/db");
    expect(result).toBe(expected);
  });
  test("getDatabase invalid db name", async () => {
    try {
      await b.getDatabase("not a db name");
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      if (e instanceof Error) {
        expect(e.message).toBe("Invalid database name");
      }
    }
  });
  test("getDatabase error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    b._apiClient.get_db_v2beta_db__username___db_name__get = jest.fn(
      mockApiMethod(status, data),
    );
    try {
      await b.getDatabase("my/db");
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      if (e instanceof ApiError) {
        expect(e.status).toBe(status);
        expect(e.data).toBe(data);
      }
    }
  });
});
*/

describe("createDatabase", () => {
  const b = bitdotio("v2_testtoken");

  test("createDatabase ok", async () => {
    const expected = { foo: "bar" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(200, expected));
    const result = await b.createDatabase({ name: "my-db" });
    expect(result).toEqual(expected);
  });
  test("createDatabase error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    try {
      await b.createDatabase({ name: "my-db", isPrivate: false });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      if (e instanceof ApiError) {
        expect(e.status).toBe(status);
        expect(e.data).toEqual(data);
      }
    }
  });
});

/*
describe("updateDatabase", () => {
  const b = bitdotio("v2_testtoken");

  test("updateDatabase ok", async () => {
    const expected = { foo: "bar" };
    b._apiClient.update_db_v2beta_db__username___db_name__patch = jest.fn(
      mockApiMethod(200, expected),
    );
    const result = await b.updateDatabase("my/db", { isPrivate: false });
    expect(result).toBe(expected);
  });
  test("updateDatabase invalid db name", async () => {
    try {
      await b.updateDatabase("not a db name", { name: "boop" });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      if (e instanceof Error) {
        expect(e.message).toBe("Invalid database name");
      }
    }
  });
  test("updateDatabase error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    b._apiClient.update_db_v2beta_db__username___db_name__patch = jest.fn(
      mockApiMethod(status, data),
    );
    try {
      await b.updateDatabase("my/db", { storageLimitBytes: 12345 });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      if (e instanceof ApiError) {
        expect(e.status).toBe(status);
        expect(e.data).toBe(data);
      }
    }
  });
});

describe("deleteDatabase", () => {
  const b = bitdotio("v2_testtoken");

  test("deleteDatabase ok", async () => {
    b._apiClient.delete_db_v2beta_db__username___db_name__delete = jest.fn(
      mockApiMethod(200, {}),
    );
    const result = await b.deleteDatabase("my/db");
    expect(result).toEqual({});
  });
  test("deleteDatabase invalid db name", async () => {
    try {
      await b.deleteDatabase("not a db name");
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      if (e instanceof Error) {
        expect(e.message).toBe("Invalid database name");
      }
    }
  });
  test("deleteDatabase error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    b._apiClient.delete_db_v2beta_db__username___db_name__delete = jest.fn(
      mockApiMethod(status, data),
    );
    try {
      await b.deleteDatabase("my/db");
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      if (e instanceof ApiError) {
        expect(e.status).toBe(status);
        expect(e.data).toBe(data);
      }
    }
  });
});
*/


describe("createImportJob", () => {
  const b = bitdotio("v2_testtoken");

  test("createImportJob file ok", async () => {
    const stream = createReadStream(path.join(__dirname, "test-csv.csv"));
    const expected = { foo: "bar" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(200, expected));
    const result = await b.createImportJob("my/db", {
      type: "file",
      tableName: "my-table",
      file: stream,
    });
    expect(result).toEqual(expected);
  });
  test("createImportJob url ok", async () => {
    const expected = { foo: "bar" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(200, expected));
    const result = await b.createImportJob("my/db", {
      type: "url",
      tableName: "my-table",
      schemaName: "my-schema",
      url: "https://example.com/my.csv",
    });
    expect(result).toEqual(expected);
  });
  test("createImportJob invalid db name", async () => {
    try {
      await b.createImportJob("not a db name", {
        type: "url",
        tableName: "my-table",
        url: "https://example.com/my.csv",
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      if (e instanceof Error) {
        expect(e.message).toBe("Invalid database name");
      }
    }
  });
  test("createImportJob error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    jest.spyOn(nf, "default").mockResolvedValueOnce(mockResponse(status, data));
    try {
      await b.createImportJob("my/db", {
        type: "url",
        tableName: "my-table",
        url: "https://example.com/my.csv",
      });
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
      if (e instanceof ApiError) {
        expect(e.status).toBe(status);
        expect(e.data).toEqual(data);
      }
    }
  });
});
