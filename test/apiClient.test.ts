import * as nf from "node-fetch";
import { jest } from "@jest/globals";
import { ApiClient } from "../lib/apiClient";
import { getUserAgent } from "../lib/utils";

function mockResponse(status: number = 200): nf.Response {
  return new nf.Response("{}", {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

describe("ApiClient", () => {
  let client: ApiClient;
  const apiKey = "v2_testtoken";
  const defaultHeaders = {
    "Accept": "application/json",
    "Authorization": `Bearer ${apiKey}`,
    "User-Agent": getUserAgent(),
  };

  beforeEach(() => {
    client = new ApiClient(apiKey);
  });

  test("constructor", () => {
    expect(client["_apiKey"]).toBe(apiKey);
    expect(client["_apiVersion"]).toBe("v2beta");
  });
  test("request", () => {
    jest.spyOn(nf, "default").mockImplementation(async () => mockResponse());

    const testCases: Array<[string, string, nf.RequestInit]> = [
      ["GET", "/foo", {}],
      ["POST", "/bar", {
        headers: {
          "Content-Type": "multipart/form-encoded",
        },
        body: "foo=bar",
      }],
    ];

    for (const params of testCases) {
      client.request(...params);
      const [method, path, init] = params;
      expect(nf.default).toHaveBeenLastCalledWith(
        `https://api.bit.io/v2beta${path}`,
        {
          ...init,
          headers: {
            ...defaultHeaders,
            ...(init.headers ?? {}),
          },
          method,
        },
      );
    }
  });
  test("get", () => {
    jest.spyOn(nf, "default").mockImplementation(async () => mockResponse());
    client.get("/foo");
    expect(nf.default).toHaveBeenLastCalledWith("https://api.bit.io/v2beta/foo", {
      headers: defaultHeaders,
      method: "GET",
    });
  });
  test("post", () => {
    jest.spyOn(nf, "default").mockImplementation(async () => mockResponse());
    client.post("/foo", { body: `{"foo": "bar"}` });
    expect(nf.default).toHaveBeenLastCalledWith("https://api.bit.io/v2beta/foo", {
      body: `{"foo": "bar"}`,
      headers: defaultHeaders,
      method: "POST",
    });
  });
  test("patch", () => {
    jest.spyOn(nf, "default").mockImplementation(async () => mockResponse());
    client.patch("/foo", { body: `{"foo": "bar"}` });
    expect(nf.default).toHaveBeenLastCalledWith("https://api.bit.io/v2beta/foo", {
      body: `{"foo": "bar"}`,
      headers: defaultHeaders,
      method: "PATCH",
    });
  });
  test("delete", () => {
    jest.spyOn(nf, "default").mockImplementation(async () => mockResponse());
    client.delete("/foo");
    expect(nf.default).toHaveBeenLastCalledWith("https://api.bit.io/v2beta/foo", {
      headers: defaultHeaders,
      method: "DELETE",
    });
  });
});
