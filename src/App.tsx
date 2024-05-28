import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  return (
    <main>
      <MapContainer
        center={[45.96911585510426, 6.430025782362676]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://data.geopf.fr/private/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN25TOUR&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&apikey=ign_scan_ws&FORMAT=image/jpeg&style=normal"
        />
      </MapContainer>
    </main>
  );
}

export default App;
