// tiny in-memory user list for tests
export interface UserRecord {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// used so tests can share the same user list between modules
const globalForUsers = globalThis as unknown as { users?: UserRecord[] };

export const users: UserRecord[] = globalForUsers.users || (globalForUsers.users = []);
