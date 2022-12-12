import { jest } from "@jest/globals";
import { Client } from "pg";
import bitdotio from "../lib";

describe("getClient", () => {
  test("getClient invalid db name", async () => {
    const b = bitdotio("v2_testtoken");
    await expect(b.getClient("not a db name")).rejects.toThrow(
      "Invalid database name",
    );
  });
  test("getClient can't override required opts", async () => {
    const apiKey = "v2_testtoken";
    const b = bitdotio(apiKey, {
      ssl: false,
      host: "deebee.bit.io",
      port: 2345,
      database: "foo/bar",
      user: "not node_sdk",
      password: "hunter2",
    });
    jest
      .spyOn(Client.prototype, "connect")
      .mockImplementationOnce(() => Promise.resolve());
    const client = await b.getClient("my/db");
    expect(client.ssl).toBe(true);
    expect(client.host).toBe("db.bit.io");
    expect(client.port).toBe(5432);
    expect(client.database).toBe("my/db");
    expect(client.user).toBe("node_sdk");
    expect(client.password).toBe(apiKey);
  });
});

describe("getPool", () => {
  test("getPool invalid db name", () => {
    const b = bitdotio("v2_testtoken");
    expect(() => b.getPool("not a db name")).toThrow("Invalid database name");
  });
  test("getPool can't override required opts", () => {
    const apiKey = "v2_testtoken";
    const b = bitdotio(
      apiKey,
      {},
      {
        ssl: false,
        host: "deebee.bit.io",
        port: 2345,
        database: "foo/bar",
        user: "not node_sdk",
        password: "hunter2",
      },
    );
    const pool = b.getPool("my/db");
    const options = (pool as any)["options"];
    expect(options.ssl).toBe(true);
    expect(options.host).toBe("db.bit.io");
    expect(options.port).toBe(5432);
    expect(options.database).toBe("my/db");
    expect(options.user).toBe("node_sdk");
    expect(options.password).toBe(apiKey);
  });
});
