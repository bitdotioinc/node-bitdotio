export function splitDbName(fullName: string): { username: string; db_name: string } {
  const [username, ...rest] = fullName.split("/");
  return { username, db_name: encodeURIComponent(rest.join("/")) };
}
