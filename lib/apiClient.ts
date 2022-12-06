import fetch, { HeadersInit, RequestInit } from "node-fetch";
import { ApiError } from "./errors";
import { bodyToCamelCase } from "./utils";

export class ApiClient {
  private _apiKey: string;
  private _apiVersion: string;

  constructor(apiKey: string, apiVersion: string = "v2beta") {
    this._apiKey = apiKey;
    this._apiVersion = apiVersion;
  }

  private _url(path: string): string {
    return `https://api.bit.io/${this._apiVersion}${path}`;
  }

  private get _headers(): HeadersInit {
    return {
      "Accept": "application/json",
      "Authorization": `Bearer ${this._apiKey}`,
      // TODO: single-source version
      "User-Agent": "node-bitdotio-sdk/0.0.1",
    };
  }

  async request<T>(
    method: string,
    path: string,
    init?: RequestInit,
  ): Promise<T> {
    const response = await fetch(this._url(path), {
      ...init,
      headers: {
        ...init?.headers,
        ...this._headers,
      },
      method,
    });

    const data = bodyToCamelCase(await response.json()) as T;

    if (response.ok) {
      return data;
    }

    throw new ApiError("API call returned an error", response.status, data);
  }

  async get<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>("GET", path, init);
  }

  async post<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>("POST", path, init);
  }

  async patch<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>("PATCH", path, init);
  }

  async delete<T>(path: string, init?: RequestInit): Promise<T> {
    return this.request<T>("DELETE", path, init);
  }
}
