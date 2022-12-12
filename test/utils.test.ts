import {
  VERSION,
  bodyToCamelCase,
  getUserAgent,
  pruneBody,
  snakeToCamel,
  splitDbName,
  validateDbName,
  validateToken
} from "../lib/utils";

describe("validateDbName", () => {
  test("valid", () => {
    expect(() => validateDbName("foo/bar")).not.toThrow();
    expect(() => validateDbName("foo/bar/baz")).not.toThrow();
  });
  test("invalid", () => {
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
      expect(() => validateDbName(testCase)).toThrow("Invalid database name");
    });
  });
});

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

describe("snakeToCamel", () => {
  test("snakeToCamel", () => {
    expect(snakeToCamel("foo_bar")).toBe("fooBar");
    expect(snakeToCamel("foo-bar")).toBe("fooBar");
    expect(snakeToCamel("FOO-BAR")).toBe("FOOBAR");
    expect(snakeToCamel("FOO-BAR")).toBe("FOOBAR");
    expect(snakeToCamel("foo__bar")).toBe("foo_Bar");
    expect(snakeToCamel("foo-_bar")).toBe("foo-Bar");
    expect(snakeToCamel("foo--bar")).toBe("foo-Bar");
    expect(snakeToCamel("foo_-bar")).toBe("foo_Bar");
  });
})

describe("bodyToCamelCase", () => {
  test("bodyToCamelCase object", () => {
    const data = { aa_bb: 1, ccDD: 2, "ee-ff": 3 };
    const expected = { aaBb: 1, ccDD: 2, eeFf: 3 };
    expect(bodyToCamelCase(data)).toEqual(expected);
  });
  test("bodyToCamelCase array of objects", () => {
    const data = [{ aa_bb: 1 }, { ccDD: 2 }, { "ee-ff": 3 }];
    const expected = [{ aaBb: 1 }, { ccDD: 2 }, { eeFf: 3 }];
    expect(bodyToCamelCase(data)).toEqual(expected);
  });
  test("bodyToCamelCase nested objects", () => {
    const data = { aa_bb: 1, ccDD: { aa_bb: 2, ccDD: 3 }, "ee-ff": 4 };
    const expected = { aaBb: 1, ccDD: { aaBb: 2, ccDD: 3 }, eeFf: 4 };
    expect(bodyToCamelCase(data)).toEqual(expected);
  });
  test("bodyToCamelCase nested arrays", () => {
    const data = [[{ aa_bb: 1}, { ccDD: 2 }], [{ "ee-ff": 3 }]];
    const expected = [[{ aaBb: 1}, { ccDD: 2 }], [{ eeFf: 3 }]];
    expect(bodyToCamelCase(data)).toEqual(expected);
  });
  test("bodyToCamelCase nested objects and arrays", () => {
    const data = { aa_bb: 1, ccDD: [{ aa_bb: 2, ccDD: 3 }], "ee-ff": 4 };
    const expected = { aaBb: 1, ccDD: [{ aaBb: 2, ccDD: 3 }], eeFf: 4 };
    expect(bodyToCamelCase(data)).toEqual(expected);
  });
  test("bodyToCamelCase array of primitives", () => {
    const data = [1, 2, 3];
    expect(bodyToCamelCase(data)).toEqual(data);
  });
  test("bodyToCamelCase primitives", () => {
    expect(bodyToCamelCase(1)).toBe(1);
    expect(bodyToCamelCase("foo")).toBe("foo");
    expect(bodyToCamelCase(null)).toBe(null);
  });
});

describe("getUserAgent", () => {
  test("getUserAgent", () => {
    expect(getUserAgent()).toBe(`node-bitdotio/${VERSION}`);
  });
});
