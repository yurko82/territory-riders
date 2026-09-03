import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { TerritoryMap } from "@/components/territory-map";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function RideResultScreen() {
  return (
    <ScreenContainer edges={["top", "left", "right", "bottom"]} containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.successIcon}>
          <IconSymbol name="checkmark" size={28} color="#07131A" />
        </View>
        <Text style={styles.eyebrow}>ПОЇЗДКУ ЗАВЕРШЕНО</Text>
        <Text style={styles.title}>Коло замкнено.</Text>
        <Text style={styles.subtitle}>Твоя територія стала більшою, а межа — чіткішою.</Text>

        <View style={styles.mapCard}>
          <View style={styles.mapFrame}>
            <TerritoryMap showRide />
          </View>
          <View style={styles.mapCaption}>
            <View style={styles.captionDot} />
            <Text style={styles.captionText}>Нова зона · +2,4 км²</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <ResultStat value="2,4 км²" label="захоплено" accent="#B8F36B" />
          <ResultStat value="24,6 км" label="дистанція" accent="#5FE0CF" />
          <ResultStat value="+180" label="очок" accent="#FFC857" />
          <ResultStat value="#07" label="новий ранг" accent="#AB7EFF" />
        </View>

        <View style={styles.eventCard}>
          <View style={styles.eventIcon}><IconSymbol name="scissors" size={18} color="#FF6B6B" /></View>
          <View style={styles.eventCopy}>
            <Text style={styles.eventTitle}>Ти відрізав частину зони Ольги</Text>
            <Text style={styles.eventText}>Власниця отримає сповіщення про зміну межі.</Text>
          </View>
        </View>

        <Pressable onPress={() => router.replace("/")} style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}>
          <Text style={styles.primaryActionText}>Повернутися на карту</Text>
          <IconSymbol name="chevron.right" size={20} color="#07131A" />
        </Pressable>
        <Pressable onPress={() => router.replace("/")} style={({ pressed }) => [styles.secondaryAction, pressed && styles.pressed]}>
          <Text style={styles.secondaryActionText}>Поділитися результатом</Text>
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

function ResultStat({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <View style={styles.resultStat}>
      <Text style={[styles.resultValue, { color: accent }]}>{value}</Text>
      <Text style={styles.resultLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 22, paddingBottom: 32, alignItems: "center", gap: 12 },
  successIcon: { width: 58, height: 58, borderRadius: 20, backgroundColor: "#B8F36B", alignItems: "center", justifyContent: "center", marginTop: 12 },
  eyebrow: { color: "#B8F36B", fontSize: 10, fontWeight: "800", letterSpacing: 1.7, marginTop: 4 },
  title: { color: "#F3FAF7", fontSize: 31, fontWeight: "800", letterSpacing: -0.7 },
  subtitle: { color: "#8EA9A5", textAlign: "center", fontSize: 13, lineHeight: 19, maxWidth: 290 },
  mapCard: { width: "100%", borderRadius: 22, overflow: "hidden", borderWidth: 1, borderColor: "#234149", marginTop: 6 },
  mapFrame: { height: 200, width: "100%" },
  mapCaption: { flexDirection: "row", alignItems: "center", gap: 8, padding: 11, backgroundColor: "#10232A" },
  captionDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#B8F36B" },
  captionText: { color: "#D8E9E2", fontSize: 12, fontWeight: "700" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, width: "100%" },
  resultStat: { width: "48%", flexGrow: 1, backgroundColor: "#10232A", borderRadius: 15, borderWidth: 1, borderColor: "#1E3A42", padding: 13 },
  resultValue: { fontSize: 18, fontWeight: "800" },
  resultLabel: { color: "#8EA9A5", fontSize: 10, marginTop: 4 },
  eventCard: { flexDirection: "row", alignItems: "center", width: "100%", gap: 10, backgroundColor: "rgba(255,107,107,0.08)", borderWidth: 1, borderColor: "rgba(255,107,107,0.24)", borderRadius: 16, padding: 13 },
  eventIcon: { width: 34, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,107,107,0.14)" },
  eventCopy: { flex: 1 },
  eventTitle: { color: "#F3FAF7", fontSize: 12, fontWeight: "700" },
  eventText: { color: "#C9D7D3", fontSize: 11, lineHeight: 16, marginTop: 3 },
  primaryAction: { width: "100%", height: 52, borderRadius: 16, backgroundColor: "#B8F36B", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 },
  primaryActionText: { color: "#07131A", fontSize: 14, fontWeight: "800" },
  secondaryAction: { paddingVertical: 8 },
  secondaryActionText: { color: "#B8F36B", fontSize: 12, fontWeight: "700" },
  pressed: { opacity: 0.74, transform: [{ scale: 0.98 }] },
});
