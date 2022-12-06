const RE_TOKEN = /^v2_\w+$/;
const RE_DB_NAME = /^\w.{0,37}?\/.{1,23}$/;

export function splitDbName(fullName: string): {
  username: string;
  dbName: string;
} {
  if (!RE_DB_NAME.test(fullName)) {
    throw new Error("Invalid database name");
  }
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
