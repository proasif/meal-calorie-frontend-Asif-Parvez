/** Basic user profile information returned from the API */
export interface User {
  first_name: string;
  last_name: string;
  email: string;
}

/** Payload returned after successful authentication */
export interface AuthResponse {
  token: string;
  user: User;
}
