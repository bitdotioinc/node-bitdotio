import { pruneBody, splitDbName, validateToken } from "../lib/utils";

describe("splitDbName", () => {
  test("splitDbName base case", () => {
    const { username, dbName } = splitDbName("a/b");
    expect(username).toBe("a");
    expect(dbName).toBe("b");
  });
  test("splitDbName multiplle slashes", () => {
    const { username, dbName } = splitDbName("a/b/c");
    expect(username).toBe("a");
    expect(dbName).toBe("b%2Fc");
  });
  test("splitDbName invalid db name", () => {
    const testCases = [
      "/mydb",
      "mydb",
      "myExtremelyLongUserNameWhichIsDefinitelyWayTooLong/db",
      "me/myExtremelyLongDatabaseNameWhichIsDefinitelyWayTooLong",
      "-/db",
      "./db",
      "me/",
    ];
    testCases.forEach((testCase) => {
      expect(() => splitDbName(testCase)).toThrow("Invalid database name");
    });
  });
});

describe("validateToken", () => {
  test("validateToken ok", () => {
    expect(validateToken("v2_testtoken")).toBeUndefined();
  });
  test("validateToken invalid token", () => {
    const testCases = [
      "v2_",
      "v1_testtoken",
      "v2__.--_--",
      "v2testtoken",
      "testtoken",
    ];
    testCases.forEach((testCase) => {
      expect(() => validateToken(testCase)).toThrow("Invalid token");
    });
  });
});

describe("pruneBody", () => {
  test("pruneBody", () => {
    const data = { foo: 1, bar: undefined, baz: 2 };
    const expected = { foo: 1, baz: 2};
    const result = pruneBody(data);
    expect(data).toEqual(expected);
    expect(result).toBe(data);
  });
});
