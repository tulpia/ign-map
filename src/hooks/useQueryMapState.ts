// Utils
import { useQueryState, parseAsFloat, parseAsStringEnum } from "nuqs";

// Enums
import { TrailDifficulty, TrailMapSort } from "../api/trails/trails.enums";

// Hook pour synchroniser le filtrage de la carte avec l'URL
export function useQueryMapState() {
  // @TODO : Remplacer les valeurs par defaut par celles du user en calculant une bbox par rapport a son point
  const options = { shallow: false };

  const [latMin, setLatMin] = useQueryState(
    "lat_min",
    parseAsFloat.withDefault(45.0517).withOptions(options)
  );
  const [latMax, setLatMax] = useQueryState(
    "lat_max",
    parseAsFloat.withDefault(45.9385).withOptions(options)
  );
  const [lngMin, setLngMin] = useQueryState(
    "lng_min",
    parseAsFloat.withDefault(5.6219).withOptions(options)
  );
  const [lngMax, setLngMax] = useQueryState(
    "lng_max",
    parseAsFloat.withDefault(7.1856).withOptions(options)
  );
  const [difficulty, setDifficulty] = useQueryState(
    "difficulty",
    parseAsStringEnum<TrailDifficulty>(Object.values(TrailDifficulty)).withOptions(options)
  );
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringEnum<TrailMapSort>(Object.values(TrailMapSort)).withOptions(options)
  );

  return {
    latMin,
    latMax,
    lngMin,
    lngMax,
    difficulty,
    sort,
    setLatMin,
    setLatMax,
    setLngMin,
    setLngMax,
    setDifficulty,
    setSort,
  };
}
