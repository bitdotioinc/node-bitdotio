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
