// Interfaces
import { Avis } from "../avis/avis";
import { TrailDifficulty } from "./trails.enums";

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
  avisSummary: Avis;
  avis_note: number | null;
  created_at: string;
  updated_at: string;
}

export interface TrailCreate {
  title: string;
  description: string;
  time_to_complete: number;
  difficulty: TrailDifficulty;
  trace: File;
  images: File[];
}

export interface TrailMapBoundingBox {
  lat_min: number;
  lng_min: number;
  lat_max: number;
  lng_max: number;
}
