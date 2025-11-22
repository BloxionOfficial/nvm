// src/lib/http.ts
import { NovumError } from "./errors";

export class HttpClient {
  private cookie?: string;
  private xcsrf?: string;

  constructor(cookie?: string) {
    this.cookie = cookie;
  }

  setCookie(cookie: string) {
    this.cookie = cookie;
  }

  private async request(method: string, url: string, body?: any): Promise<any> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };

    if (this.cookie) headers["Cookie"] = `.ROBLOSECURITY=${this.cookie}`;
    if (this.xcsrf) headers["X-CSRF-TOKEN"] = this.xcsrf;

    let response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      redirect: "manual"
    });

    // Handle Roblox CSRF refresh
    if (response.status === 403 && response.headers.get("x-csrf-token")) {
      this.xcsrf = response.headers.get("x-csrf-token")!;
      headers["X-CSRF-TOKEN"] = this.xcsrf;

      // retry once
      response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        redirect: "manual"
      });
    }

    if (!response.ok) {
      const text = await response.text();
      throw new NovumError(`Roblox API Error: ${response.status} ${text}`);
    }

    return response.json();
  }

  get(url: string) {
    return this.request("GET", url);
  }

  post(url: string, body?: any) {
    return this.request("POST", url, body);
  }
}