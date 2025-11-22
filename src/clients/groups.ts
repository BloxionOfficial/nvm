// src/clients/groups.ts
import { HttpClient } from "../lib/http";

export class GroupsClient {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  /** Get basic group info */
  async getGroup(groupId: number) {
    return this.http.get(`https://groups.roblox.com/v1/groups/${groupId}`);
  }

  /** Get group roles + ranks */
  async getRoles(groupId: number) {
    return this.http.get(`https://groups.roblox.com/v1/groups/${groupId}/roles`);
  }

  /**
   * Set a member's rank in a group.
   * @param groupId - ID of the group
   * @param userId - ID of the user
   * @param rank - numeric rank (not roleId)
   */
  async setRank(groupId: number, userId: number, rank: number) {
    // Get all roles
    const { roles } = await this.getRoles(groupId);

    // Find role that matches the input rank
    const role = roles.find((r: any) => r.rank === rank);

    if (!role) {
      throw new Error(
        `Rank ${rank} not found in group ${groupId}.`
      );
    }

    // Send ranking request
    return this.http.post(
      `https://groups.roblox.com/v1/groups/${groupId}/users/${userId}`,
      { roleId: role.id }
    );
  }
}