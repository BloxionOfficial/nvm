// src/index.ts
import { HttpClient } from "./lib/http";
import { UsersClient } from "./clients/users";
import { GroupsClient } from "./clients/groups";

export class Novum {
  private http: HttpClient;

  public users: UsersClient;
  public groups: GroupsClient;

  constructor(options?: { cookie?: string }) {
    this.http = new HttpClient(options?.cookie);

    this.users = new UsersClient(this.http);
    this.groups = new GroupsClient(this.http);
  }

  /** Change the .ROBLOSECURITY cookie at runtime */
  setCookie(cookie: string) {
    this.http.setCookie(cookie);
  }
}

export default Novum;