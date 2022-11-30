import { splitDbName } from "../lib/utils";

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
  test("splitDbName no slash", () => {
    const { username, db_name } = splitDbName("foo");
    expect(username).toBe("foo");
    expect(db_name).toBe("");
  });
});
