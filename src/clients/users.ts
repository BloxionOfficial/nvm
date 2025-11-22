// src/clients/users.ts
import { HttpClient } from "../lib/http";

export class UsersClient {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /** Get basic user info (username, display name, description…) */
  async get(id: number) {
    return this.http.get(`https://users.roblox.com/v1/users/${id}`);
  }

  /** Get how many friends the user has */
  async getFriendCount(id: number) {
    return this.http.get(`https://friends.roblox.com/v1/users/${id}/friends/count`);
  }
}