const RE_TOKEN = /^v2_\w+$/;
const RE_DB_NAME = /^\w.{0,37}?\/.{1,23}$/;

const packageJson = require("../package.json");

export const VERSION = packageJson.version;

export function validateDbName(dbName: string): void {
  if (!RE_DB_NAME.test(dbName)) {
    throw new Error("Invalid database name");
  }
}

export function splitDbName(fullName: string): {
  username: string;
  dbName: string;
} {
  validateDbName(fullName);
  const [username, ...rest] = fullName.split("/");
  return { username, dbName: encodeURIComponent(rest.join("/")) };
}

export function validateToken(token: string) {
  if (!RE_TOKEN.test(token)) {
    throw new Error("Invalid token");
  }
}

export function pruneBody(body: Record<string, any>) {
  Object.keys(body).forEach((key) => {
    if (body[key] === undefined) {
      delete body[key];
    }
  });
  return body;
}

export function snakeToCamel(s: string) {
  return s.replace(/([-_][a-z])/gi, (group) => {
    return group.toUpperCase().replace("-", "").replace("_", "");
  });
}

function isArray(value: any): boolean {
  return Array.isArray(value);
}

function isObject(value: any): boolean {
  return value != null && !isArray(value) && typeof value === "object";
}

export function bodyToCamelCase(
  body: Record<string, any> | any[] | any,
): Record<string, any> {
  if (isArray(body)) {
    return body.map((item: any) => bodyToCamelCase(item));
  } else if (isObject(body)) {
    return Object.keys(body).reduce((acc: Record<string, any>, key) => {
      acc[snakeToCamel(key)] = bodyToCamelCase(body[key]);
      return acc;
    }, {});
  } else {
    return body;
  }
}

export function getUserAgent(): string {
  return `node-bitdotio/${VERSION}`;
}
