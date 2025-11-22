import { HttpClient } from "./lib/http";
import { UsersClient } from "./clients/users";
import { ThumbnailsClient } from "./clients/thumbnails";
import { GroupsClient } from "./clients/groups";

export class Novum {
  private http: HttpClient;

  public users: UsersClient;
  public thumbnails: ThumbnailsClient;
  public groups: GroupsClient;

  constructor(options?: { cookie?: string }) {
    this.http = new HttpClient(options?.cookie);

    this.users = new UsersClient(this.http);
    this.thumbnails = new ThumbnailsClient(this.http);
    this.groups = new GroupsClient(this.http);
  }

  setCookie(cookie: string) {
    this.http.setCookie(cookie);
  }
}

export default Novum;