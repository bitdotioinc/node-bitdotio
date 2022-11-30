export class ApiError<Data> extends Error {
  data: Data;
  status: number;
  constructor(message: string, status: number, data: Data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
