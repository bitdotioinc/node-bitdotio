import { splitDbName, validateToken } from "../lib/utils";

describe("Utils module", () => {
  test("splitDbName base case", () => {
    const { username, db_name } = splitDbName("a/b");
    expect(username).toBe("a");
    expect(db_name).toBe("b");
  });
  test("splitDbName multiplle slashes", () => {
    const { username, db_name } = splitDbName("a/b/c");
    expect(username).toBe("a");
    expect(db_name).toBe("b%2Fc");
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
