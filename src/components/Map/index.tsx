// Utils
import { MapContainer, TileLayer } from "react-leaflet";

// Assets
import "./styles.scss";

function Map() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[45.96911585510426, 6.430025782362676]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://data.geopf.fr/private/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&apikey=ign_scan_ws&FORMAT=image/jpeg&style=normal"
        />
      </MapContainer>
    </div>
  );
}

export default Map;
