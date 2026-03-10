// Utils (external libraries, hooks, constants)
import { MapContainer, TileLayer } from "react-leaflet";
import { ReactNode } from "react";
import { LatLngExpression } from "leaflet";

// Assets
import "./styles.scss";

interface MapProps {
  children?: ReactNode;
  style?: React.CSSProperties;
  center?: LatLngExpression;
  zoom?: number;
}

function Map({ children, style, center, zoom }: MapProps) {
  return (
    <div style={{ height: "100%", width: "100%", ...style }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://data.geopf.fr/private/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&apikey=ign_scan_ws&FORMAT=image/jpeg&style=normal"
        />
        {children}
      </MapContainer>
    </div>
  );
}

Map.defaultProps = {
  children: null,
  style: {},
  center: [45.96911585510426, 6.430025782362676],
  zoom: 13,
};

export default Map;
