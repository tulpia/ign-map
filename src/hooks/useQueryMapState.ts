// Utils
import { useQueryState, parseAsFloat } from "nuqs";

// Hook pour synchroniser le filtrage de la carte avec l'URL
export function useQueryMapState() {
  const [latMin, setLatMin] = useQueryState("lat_min", parseAsFloat);
  const [latMax, setLatMax] = useQueryState("lat_max", parseAsFloat);
  const [lngMin, setLngMin] = useQueryState("lng_min", parseAsFloat);
  const [lngMax, setLngMax] = useQueryState("lng_max", parseAsFloat);

  return {
    latMin,
    latMax,
    lngMin,
    lngMax,
    setLatMin,
    setLatMax,
    setLngMin,
    setLngMax,
  };
}
