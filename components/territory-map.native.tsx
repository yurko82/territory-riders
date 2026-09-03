import MapView, { Marker, Polygon, Polyline, UrlTile } from "react-native-maps";
import { StyleSheet } from "react-native";

import { DEMO_TERRITORIES, MAP_CENTER } from "@/shared/territory";

const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const demoRide = [
  { latitude: 50.4396, longitude: 30.4824 },
  { latitude: 50.4637, longitude: 30.4864 },
  { latitude: 50.4708, longitude: 30.5271 },
  { latitude: 50.4537, longitude: 30.5662 },
  { latitude: 50.4262, longitude: 30.5544 },
  { latitude: 50.4214, longitude: 30.5122 },
  { latitude: 50.4396, longitude: 30.4824 },
];

export function TerritoryMap({ showRide = false }: { showRide?: boolean }) {
  return (
    <MapView
      style={styles.nativeMap}
      initialRegion={{ ...MAP_CENTER, latitudeDelta: 0.12, longitudeDelta: 0.12 }}
      showsUserLocation
      showsMyLocationButton={false}
      rotateEnabled={false}
      pitchEnabled={false}
      toolbarEnabled={false}
    >
      <UrlTile urlTemplate={OSM_TILE_URL} maximumZ={19} flipY={false} />
      {DEMO_TERRITORIES.map((territory) => <Polygon key={territory.id} coordinates={territory.coordinates} fillColor={territory.color} strokeColor={territory.borderColor} strokeWidth={2} />)}
      {showRide && <Polyline coordinates={demoRide} strokeColor="#B8F36B" strokeWidth={4} />}
      <Marker coordinate={MAP_CENTER} title="Ти" description="Поточна позиція" />
    </MapView>
  );
}

const styles = StyleSheet.create({ nativeMap: { flex: 1 } });
