import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { TerritoryMap } from "@/components/territory-map";
import { DEMO_EVENTS, PLAYER_STATS } from "@/shared/territory";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function MapScreen() {
  const [mapMode, setMapMode] = useState<"all" | "mine">("all");

  return (
    <ScreenContainer edges={["top", "left", "right"]} containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>TERRITORY RIDERS</Text>
            <Text style={styles.title}>Моя арена</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Відкрити події"
            onPress={() => router.push("/(tabs)/activity")}
            style={({ pressed }) => [styles.notificationButton, pressed && styles.pressed]}
          >
            <IconSymbol name="bell.fill" size={22} color="#F3FAF7" />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.mapCard}>
          <View style={styles.mapFrame}>
            <TerritoryMap />
          </View>
          <View style={styles.mapControls}>
            <View style={styles.segmentedControl}>
              <Pressable
                onPress={() => setMapMode("all")}
                style={[styles.segment, mapMode === "all" && styles.segmentActive]}
              >
                <Text style={[styles.segmentText, mapMode === "all" && styles.segmentTextActive]}>Усі</Text>
              </Pressable>
              <Pressable
                onPress={() => setMapMode("mine")}
                style={[styles.segment, mapMode === "mine" && styles.segmentActive]}
              >
                <Text style={[styles.segmentText, mapMode === "mine" && styles.segmentTextActive]}>Моя</Text>
              </Pressable>
            </View>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <Stat value={`${PLAYER_STATS.totalArea} км²`} label="твоя територія" accent="#B8F36B" />
          <Stat value={PLAYER_STATS.weeklyArea} label="цього тижня" accent="#5FE0CF" />
          <Stat value={PLAYER_STATS.rank} label="позиція" accent="#FFC857" />
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/(tabs)/ride")}
          style={({ pressed }) => [styles.startRide, pressed && styles.startRidePressed]}
        >
          <View style={styles.startRideIcon}>
            <IconSymbol name="bicycle" size={25} color="#07131A" />
          </View>
          <View style={styles.startRideCopy}>
            <Text style={styles.startRideTitle}>Почати поїздку</Text>
            <Text style={styles.startRideSubtitle}>Замкни коло — забери більше</Text>
          </View>
          <IconSymbol name="chevron.right" size={22} color="#07131A" />
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Останні події</Text>
          <Pressable onPress={() => router.push("/(tabs)/activity")}>
            <Text style={styles.link}>Усі події</Text>
          </Pressable>
        </View>
        <View style={styles.eventsCard}>
          {DEMO_EVENTS.slice(0, 2).map((event) => (
            <View key={event.id} style={styles.eventRow}>
              <View style={[styles.eventIcon, { backgroundColor: `${event.accent}20` }]}>
                <IconSymbol
                  name={event.type === "cut" ? "scissors" : "flag.fill"}
                  size={18}
                  color={event.accent}
                />
              </View>
              <View style={styles.eventCopy}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDetail}>{event.detail}</Text>
              </View>
              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function Stat({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={[styles.statValue, { color: accent }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 20, paddingBottom: 34, gap: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  eyebrow: { color: "#8EA9A5", fontSize: 10, fontWeight: "800", letterSpacing: 1.8 },
  title: { color: "#F3FAF7", fontSize: 29, fontWeight: "800", marginTop: 4, letterSpacing: -0.6 },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#28464D",
    backgroundColor: "#10232A",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notificationDot: { position: "absolute", top: 10, right: 10, width: 7, height: 7, borderRadius: 4, backgroundColor: "#FF6B6B", borderWidth: 1, borderColor: "#10232A" },
  pressed: { opacity: 0.72 },
  mapCard: { borderRadius: 24, overflow: "hidden", borderWidth: 1, borderColor: "#234149", backgroundColor: "#10232A" },
  mapFrame: { height: 300 },
  mapControls: { position: "absolute", left: 14, right: 14, bottom: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  segmentedControl: { flexDirection: "row", backgroundColor: "rgba(7,19,26,0.86)", borderRadius: 11, padding: 3, borderWidth: 1, borderColor: "rgba(184,243,107,0.14)" },
  segment: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 8 },
  segmentActive: { backgroundColor: "#B8F36B" },
  segmentText: { color: "#A6BBB8", fontSize: 12, fontWeight: "700" },
  segmentTextActive: { color: "#07131A" },
  livePill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(7,19,26,0.86)", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10 },
  liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#39D98A" },
  liveText: { color: "#B8F36B", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  statsRow: { flexDirection: "row", gap: 8 },
  statCard: { flex: 1, backgroundColor: "#10232A", borderWidth: 1, borderColor: "#1E3A42", borderRadius: 16, padding: 13 },
  statValue: { fontSize: 18, fontWeight: "800", letterSpacing: -0.4 },
  statLabel: { color: "#8EA9A5", fontSize: 10, marginTop: 4, lineHeight: 13 },
  startRide: { flexDirection: "row", alignItems: "center", backgroundColor: "#B8F36B", borderRadius: 18, padding: 12, gap: 12 },
  startRidePressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  startRideIcon: { width: 44, height: 44, borderRadius: 13, backgroundColor: "rgba(7,19,26,0.12)", alignItems: "center", justifyContent: "center" },
  startRideCopy: { flex: 1 },
  startRideTitle: { color: "#07131A", fontSize: 16, fontWeight: "800" },
  startRideSubtitle: { color: "#345226", fontSize: 12, marginTop: 2 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 2 },
  sectionTitle: { color: "#F3FAF7", fontSize: 17, fontWeight: "800" },
  link: { color: "#B8F36B", fontSize: 12, fontWeight: "700" },
  eventsCard: { backgroundColor: "#10232A", borderRadius: 18, borderWidth: 1, borderColor: "#1E3A42", paddingHorizontal: 14 },
  eventRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14, gap: 10, borderBottomWidth: 1, borderBottomColor: "#1E3A42" },
  eventRowLast: { borderBottomWidth: 0 },
  eventIcon: { width: 34, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center" },
  eventCopy: { flex: 1 },
  eventTitle: { color: "#F3FAF7", fontSize: 12, fontWeight: "700" },
  eventDetail: { color: "#8EA9A5", fontSize: 11, marginTop: 3 },
  eventTime: { color: "#6E8985", fontSize: 10 },
});
