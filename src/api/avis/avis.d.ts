export interface AvisUser {
  id: number;
  name: string;
}

export interface Avis {
  id: number;
  note: number;
  description: number;
  user?: AvisUser;
  created_at?: number;
}
