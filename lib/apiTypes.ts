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
