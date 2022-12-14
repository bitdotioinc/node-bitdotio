export interface QueryResults<Format extends "rows" | "objects"> {
  queryString: string,
  metadata: Record<string, any>,
  data: Format extends "rows" ? any[][] : Record<string, any>[],
}

interface DatabaseUsage {
  rowsQueried: number;
  periodStart: string;
  periodEnd: string;
}

export interface Database {
  id: string;
  name: string;
  dateCreated: string;
  isPrivate: boolean;
  role: "OWNER" | "ADMIN" | "READER" | "WRITER";
  storageLimitBytes: number;
  storageUsageBytes: number;
  usageCurrent: DatabaseUsage;
  usagePrevious: DatabaseUsage;
}

export interface ImportJob {
  id: string;
  dateCreated: string;
  dateFinished: string;
  state: "RECEIVED" | "PROCESSING" | "DONE" | "FAILED";
  retries: number;
  errorType: string | null;
  errorId: string | null;
  errorDetails: Record<string, any> | null;
  statusUrl: string;
}

export interface ServiceAccount {
  id: string;
  name: string;
  dateCreated: string;
  role: "OWNER" | "ADMIN" | "READER" | "WRITER";
  databases: {
    id: string;
    name: string;
  }[];
  tokenCount: number;
  activeTokenCount: number;
}

export interface ApiKey {
  apiKey: string;
  username: string;
}
