export interface AvisUser {
  id: number;
  name: string;
}

export interface Avis {
  id: number;
  note: number;
  description: string;
  user?: AvisUser;
  created_at?: string;
}
