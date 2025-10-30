export interface UserCredentials {
  email: string;
  password: string;
  password_confirmation?: string;
  name?: string;
}

export interface UserData {
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  updated_at: string;
}
