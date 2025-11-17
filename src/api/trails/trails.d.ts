// Interfaces
import { Avis } from "../avis/avis";

export enum TrailDifficulty {
  Expert = "expert",
  Hard = "hard",
  Moderate = "moderate",
  Easy = "easy",
}

export interface TrailStats {
  denivele: number;
  latitude: number;
  longitude: number;
  difficulty: TrailDifficulty;
  distance: number;
  time_to_complete: number;
}

export interface Trail {
  id: number;
  user_id: number;
  title: string;
  description: string;
  trace: string;
  images: Array<string>;
  stats: TrailStats;
  avis: Avis;
  avis_note: number | null;
  created_at: number;
  updated_at: number;
}
