import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { notifyTerritoryChange, startRideTracking, stopRideTracking } from "@/lib/ride-session";

import { ScreenContainer } from "@/components/screen-container";
import { TerritoryMap } from "@/components/territory-map";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function RideScreen() {
  const [isTracking, setIsTracking] = useState(false);
  const [gpsStatus, setGpsStatus] = useState("готовий до старту");
  const [elapsed, setElapsed] = useState(0);
  const [permissionNote, setPermissionNote] = useState("");

  useEffect(() => {
    if (!isTracking) return;
    const timer = setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [isTracking]);

  const timeLabel = useMemo(() => {
    const minutes = Math.floor(elapsed / 60).toString().padStart(2, "0");
    const seconds = (elapsed % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [elapsed]);

  async function startRide() {
    if (!isTracking) {
      try {
        const tracking = await startRideTracking();
        setPermissionNote("");
        setGpsStatus(tracking.background ? "GPS стабільний · фоновий режим увімкнено" : "GPS стабільний · працює під час відкритого екрана");
        setIsTracking(true);
      } catch {
        setPermissionNote("Дозволь геолокацію, щоб малювати маршрут.");
      }
      return;
    }

    Alert.alert("Завершити поїздку?", "Ми перевіримо замкненість маршруту й покажемо результат.", [
      { text: "Продовжити", style: "cancel" },
      { text: "Завершити", style: "destructive", onPress: async () => { await stopRideTracking(); await notifyTerritoryChange(); router.push("/result"); } },
    ]);
  }

  return (
    <ScreenContainer edges={["top", "left", "right"]} containerClassName="bg-background">
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <IconSymbol name="chevron.left" size={22} color="#F3FAF7" />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>ПОЇЗДКА 019</Text>
          <Text style={styles.title}>{isTracking ? "Коло в роботі" : "Готовий замикати"}</Text>
        </View>
        <View style={[styles.statusBadge, isTracking && styles.statusBadgeLive]}>
          <View style={[styles.statusDot, isTracking && styles.statusDotLive]} />
          <Text style={styles.statusText}>{isTracking ? "LIVE" : "OFF"}</Text>
        </View>
      </View>

      <View style={styles.mapArea}>
        <TerritoryMap showRide={isTracking} />
        <View style={styles.targetCard}>
          <Text style={styles.targetLabel}>ЦІЛЬ ПОЇЗДКИ</Text>
          <Text style={styles.targetValue}>Замкнути контур</Text>
          <Text style={styles.targetHint}>Повернися до зеленої точки старту</Text>
        </View>
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.metricsRow}>
          <Metric value={timeLabel} label="час" />
          <Metric value={isTracking ? "8,4" : "0,0"} label="км" />
          <Metric value={isTracking ? "21,8" : "—"} label="км/год" />
        </View>
        <View style={styles.gpsRow}>
          <IconSymbol name="location" size={16} color={isTracking ? "#39D98A" : "#8EA9A5"} />
          <Text style={styles.gpsText}>{permissionNote || gpsStatus}</Text>
        </View>
        <Pressable onPress={startRide} style={({ pressed }) => [styles.action, isTracking && styles.actionStop, pressed && styles.actionPressed]}>
          <IconSymbol name={isTracking ? "stop.fill" : "bicycle"} size={21} color={isTracking ? "#F3FAF7" : "#07131A"} />
          <Text style={[styles.actionText, isTracking && styles.actionStopText]}>{isTracking ? "Завершити поїздку" : "Почати поїздку"}</Text>
        </Pressable>
        <Text style={styles.safetyNote}>Не користуйся телефоном під час руху · GPS працює у фоні після дозволу</Text>
      </View>
    </ScreenContainer>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingTop: 12, paddingBottom: 14, gap: 12 },
  backButton: { width: 40, height: 40, borderRadius: 13, backgroundColor: "#10232A", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#234149" },
  headerCopy: { flex: 1 },
  eyebrow: { color: "#8EA9A5", fontSize: 10, fontWeight: "800", letterSpacing: 1.6 },
  title: { color: "#F3FAF7", fontSize: 21, fontWeight: "800", marginTop: 3 },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: "#234149", paddingHorizontal: 9, paddingVertical: 6, borderRadius: 9 },
  statusBadgeLive: { borderColor: "#2E775A", backgroundColor: "rgba(57,217,138,0.08)" },
  statusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#6E8985" },
  statusDotLive: { backgroundColor: "#39D98A" },
  statusText: { color: "#8EA9A5", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  mapArea: { flex: 1, minHeight: 340, marginHorizontal: 12, borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "#234149", position: "relative" },
  targetCard: { position: "absolute", left: 14, bottom: 14, backgroundColor: "rgba(7,19,26,0.88)", borderRadius: 14, paddingHorizontal: 13, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(184,243,107,0.22)" },
  targetLabel: { color: "#B8F36B", fontSize: 9, fontWeight: "800", letterSpacing: 1.2 },
  targetValue: { color: "#F3FAF7", fontSize: 14, fontWeight: "800", marginTop: 3 },
  targetHint: { color: "#9DB4B1", fontSize: 10, marginTop: 2 },
  bottomPanel: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 12, gap: 12 },
  metricsRow: { flexDirection: "row", backgroundColor: "#10232A", borderWidth: 1, borderColor: "#1E3A42", borderRadius: 17, paddingVertical: 13 },
  metric: { flex: 1, alignItems: "center", borderRightWidth: 1, borderRightColor: "#1E3A42" },
  metricValue: { color: "#F3FAF7", fontSize: 19, fontWeight: "800" },
  metricLabel: { color: "#8EA9A5", fontSize: 10, marginTop: 3 },
  gpsRow: { flexDirection: "row", alignItems: "center", gap: 7, paddingHorizontal: 3 },
  gpsText: { color: "#8EA9A5", fontSize: 11 },
  action: { height: 54, borderRadius: 17, backgroundColor: "#B8F36B", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9 },
  actionStop: { backgroundColor: "#C74242" },
  actionPressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  actionText: { color: "#07131A", fontSize: 15, fontWeight: "800" },
  actionStopText: { color: "#F3FAF7" },
  safetyNote: { color: "#667F7B", fontSize: 10, lineHeight: 14, textAlign: "center" },
  pressed: { opacity: 0.7 },
});
