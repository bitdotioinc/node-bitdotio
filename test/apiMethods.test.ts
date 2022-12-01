import { FetchResponse } from "api/dist/core";
import { jest } from "@jest/globals";
import bitdotio from "../lib";
import { ApiError } from "../lib/errors";

function mockApiMethod(
  status: number,
  data: Record<string, any>,
): () => FetchResponse<typeof status, typeof data> {
  return () => ({
    data,
    status,
    headers: new Headers(),
    res: new Response(),
  });
}

describe("listDatabases", () => {
  const b = bitdotio("v2_testtoken");

  test("listDatabases ok", async () => {
    const expected = ["foo", "bar"];
    b._apiClient.get_db_list_v2beta_db__get = jest.fn(
      mockApiMethod(200, { databases: expected }),
    );
    const result = await b.listDatabases();
    expect(result).toBe(expected);
  });
  test("listDatabases error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    b._apiClient.get_db_list_v2beta_db__get = jest.fn(
      mockApiMethod(status, data),
    );
    try {
      await b.listDatabases();
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

describe("createDatabase", () => {
  const b = bitdotio("v2_testtoken");

  test("createDatabase ok", async () => {
    const expected = { foo: "bar" };
    b._apiClient.create_db_v2beta_db__post = jest.fn(
      mockApiMethod(200, expected),
    );
    const result = await b.createDatabase({ name: "my-db" });
    expect(result).toBe(expected);
  });
  test("createDatabase error", async () => {
    const status = 400;
    const data = { error: "whoops" };
    b._apiClient.create_db_v2beta_db__post = jest.fn(
      mockApiMethod(status, data),
    );
    try {
      await b.createDatabase({ name: "my-db", isPrivate: false });
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
