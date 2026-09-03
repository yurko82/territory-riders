import { Image, StyleSheet, Text, View } from "react-native";

import { DEMO_TERRITORIES, type Territory } from "@/shared/territory";

const MAP_TILE = "https://tile.openstreetmap.org/13/4792/2728.png";

export function TerritoryMap({ showRide = false }: { showRide?: boolean }) {
  const territories = DEMO_TERRITORIES;
  return (
    <View style={styles.webMap}>
      <Image source={{ uri: MAP_TILE }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
      <View style={styles.webMapShade} />
      <View style={[styles.street, styles.streetOne]} />
      <View style={[styles.street, styles.streetTwo]} />
      <View style={[styles.street, styles.streetThree]} />
      {territories.map((territory, index) => <WebTerritory key={territory.id} territory={territory} index={index} />)}
      {showRide && <View style={styles.webRideLine} />}
      <View style={styles.webPosition}><View style={styles.webPositionCore} /></View>
      <Text style={styles.webAttribution}>© OpenStreetMap contributors</Text>
      <View style={styles.webMapLabel}><Text style={styles.webMapLabelTitle}>КИЇВ · ЦЕНТР</Text><Text style={styles.webMapLabelText}>4 активні території</Text></View>
    </View>
  );
}

function WebTerritory({ territory, index }: { territory: Territory; index: number }) {
  return <View style={[styles.webTerritory, { backgroundColor: territory.color, borderColor: territory.borderColor, left: `${10 + index * 18}%`, top: `${24 + (index % 2) * 22}%`, width: `${38 - index * 3}%`, height: `${30 - (index % 2) * 6}%`, transform: [{ rotate: `${index % 2 === 0 ? -7 : 10}deg` }] }]} />;
}

const styles = StyleSheet.create({
  webMap: { flex: 1, minHeight: 410, overflow: "hidden", position: "relative", backgroundColor: "#132D32" },
  webMapShade: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(6, 22, 27, 0.64)" },
  street: { position: "absolute", backgroundColor: "rgba(184,243,107,0.10)", height: 1, width: "140%" },
  streetOne: { top: "32%", left: "-10%", transform: [{ rotate: "20deg" }] },
  streetTwo: { top: "56%", left: "-10%", transform: [{ rotate: "-13deg" }] },
  streetThree: { top: "74%", left: "-14%", transform: [{ rotate: "38deg" }] },
  webTerritory: { position: "absolute", borderWidth: 1.5, borderRadius: 44 },
  webRideLine: { position: "absolute", top: "30%", left: "17%", width: "68%", height: "45%", borderWidth: 3, borderColor: "#B8F36B", borderRadius: 140, transform: [{ rotate: "-8deg" }], opacity: 0.9 },
  webPosition: { position: "absolute", top: "49%", left: "49%", width: 22, height: 22, borderRadius: 11, backgroundColor: "rgba(184,243,107,0.25)", alignItems: "center", justifyContent: "center" },
  webPositionCore: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#B8F36B", borderWidth: 2, borderColor: "#07131A" },
  webAttribution: { position: "absolute", right: 12, bottom: 10, color: "#E8F4EE", backgroundColor: "rgba(7,19,26,0.76)", paddingHorizontal: 7, paddingVertical: 4, borderRadius: 5, fontSize: 10 },
  webMapLabel: { position: "absolute", left: 16, top: 18, backgroundColor: "rgba(7,19,26,0.78)", paddingHorizontal: 12, paddingVertical: 9, borderRadius: 12, borderWidth: 1, borderColor: "rgba(184,243,107,0.25)" },
  webMapLabelTitle: { color: "#B8F36B", fontSize: 10, fontWeight: "800", letterSpacing: 1.2 },
  webMapLabelText: { color: "#F3FAF7", fontSize: 12, marginTop: 3 },
});
