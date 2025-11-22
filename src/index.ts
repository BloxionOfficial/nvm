// src/index.ts
import { HttpClient } from "./lib/http";
import { UsersClient } from "./clients/users";

export class Novum {
  public users: UsersClient;

  constructor(options?: { cookie?: string }) {
    const http = new HttpClient(options?.cookie);

    this.users = new UsersClient(http);
  }
}

export default Novum;