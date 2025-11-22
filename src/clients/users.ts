// src/clients/users.ts
import { HttpClient } from "../lib/http";

export class UsersClient {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /** Get basic user info by ID */
  async get(id: number) {
    return this.http.get(`https://users.roblox.com/v1/users/${id}`);
  }

  /** Get user by username */
  async getByUsername(username: string) {
    const body = {
      usernames: [username],
      excludeBannedUsers: false
    };

    const res = await this.http.post(
      "https://users.roblox.com/v1/usernames/users",
      body
    );

    if (!res.data || res.data.length === 0) {
      throw new Error(`User "${username}" not found`);
    }

    return res.data[0];
  }

  /** Get a list of a user's friends */
  async getFriends(userId: number) {
    return this.http.get(
      `https://friends.roblox.com/v1/users/${userId}/friends`
    );
  }
}