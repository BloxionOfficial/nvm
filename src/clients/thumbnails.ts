// src/clients/thumbnails.ts
import { HttpClient } from "../lib/http";

export class ThumbnailsClient {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /** Get a user's avatar thumbnail (default: 720x720 PNG) */
  async getAvatar(userId: number, size: string = "720x720") {
    return this.http.get(
      `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=${size}&format=Png&isCircular=false`
    );
  }
}