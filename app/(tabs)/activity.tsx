import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { DEMO_EVENTS, PLAYER_STATS, type ActivityEvent } from "@/shared/territory";

export default function ActivityScreen() {
  return (
    <ScreenContainer edges={["top", "left", "right"]} containerClassName="bg-background">
      <FlatList
        data={DEMO_EVENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>СОЦІАЛЬНА КАРТА</Text>
                <Text style={styles.title}>Події поруч</Text>
              </View>
              <View style={styles.unreadBadge}><Text style={styles.unreadText}>2 нові</Text></View>
            </View>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIcon}><IconSymbol name="bolt.fill" size={20} color="#07131A" /></View>
              <View style={styles.summaryCopy}>
                <Text style={styles.summaryTitle}>Твоя територія змінюється</Text>
                <Text style={styles.summaryText}>Суперники активні у твоєму районі. Час їхати.</Text>
              </View>
              <Text style={styles.summaryValue}>{PLAYER_STATS.totalArea} км²</Text>
            </View>
            <View style={styles.filterRow}>
              <Filter label="Усі" active />
              <Filter label="Мої" />
              <Filter label="Поруч" />
            </View>
            <Text style={styles.sectionTitle}>Сьогодні</Text>
          </>
        }
        renderItem={({ item }) => <ActivityItem event={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <View style={styles.footerCard}>
            <IconSymbol name="bell.fill" size={18} color="#B8F36B" />
            <Text style={styles.footerText}>Сповіщення про зміни території увімкнені</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

function Filter({ label, active = false }: { label: string; active?: boolean }) {
  return <View style={[styles.filter, active && styles.filterActive]}><Text style={[styles.filterText, active && styles.filterTextActive]}>{label}</Text></View>;
}

function ActivityItem({ event }: { event: ActivityEvent }) {
  const icon: "scissors" | "flag.fill" | "trophy.fill" = event.type === "cut" ? "scissors" : event.type === "claim" ? "flag.fill" : "trophy.fill";
  return (
    <Pressable onPress={() => router.push("/")} style={({ pressed }) => [styles.item, !event.read && styles.itemUnread, pressed && styles.pressed]}>
      <View style={[styles.itemIcon, { backgroundColor: `${event.accent}1A` }]}><IconSymbol name={icon} size={19} color={event.accent} /></View>
      <View style={styles.itemCopy}>
        <Text style={styles.itemTitle}>{event.title}</Text>
        <Text style={styles.itemDetail}>{event.detail}</Text>
        <Text style={styles.itemTime}>{event.time}</Text>
      </View>
      {!event.read && <View style={styles.unreadDot} />}
      <IconSymbol name="chevron.right" size={18} color="#55716D" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 30 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  eyebrow: { color: "#8EA9A5", fontSize: 10, fontWeight: "800", letterSpacing: 1.7 },
  title: { color: "#F3FAF7", fontSize: 29, fontWeight: "800", marginTop: 4 },
  unreadBadge: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10, backgroundColor: "rgba(255,107,107,0.12)", borderWidth: 1, borderColor: "rgba(255,107,107,0.26)" },
  unreadText: { color: "#FF8D8D", fontSize: 11, fontWeight: "800" },
  summaryCard: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#10232A", borderRadius: 18, borderWidth: 1, borderColor: "#29464B", padding: 14, marginBottom: 18 },
  summaryIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: "#B8F36B", alignItems: "center", justifyContent: "center" },
  summaryCopy: { flex: 1 },
  summaryTitle: { color: "#F3FAF7", fontWeight: "800", fontSize: 12 },
  summaryText: { color: "#8EA9A5", fontSize: 10, lineHeight: 14, marginTop: 3 },
  summaryValue: { color: "#B8F36B", fontWeight: "800", fontSize: 13 },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 22 },
  filter: { borderRadius: 10, borderWidth: 1, borderColor: "#234149", paddingHorizontal: 14, paddingVertical: 8 },
  filterActive: { backgroundColor: "#B8F36B", borderColor: "#B8F36B" },
  filterText: { color: "#8EA9A5", fontSize: 12, fontWeight: "700" },
  filterTextActive: { color: "#07131A" },
  sectionTitle: { color: "#F3FAF7", fontSize: 16, fontWeight: "800", marginBottom: 10 },
  item: { flexDirection: "row", alignItems: "center", paddingVertical: 14, gap: 11, borderRadius: 14 },
  itemUnread: { backgroundColor: "rgba(184,243,107,0.035)" },
  itemIcon: { width: 40, height: 40, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  itemCopy: { flex: 1 },
  itemTitle: { color: "#F3FAF7", fontSize: 13, fontWeight: "700" },
  itemDetail: { color: "#9DB4B1", fontSize: 11, marginTop: 4 },
  itemTime: { color: "#657F7B", fontSize: 10, marginTop: 5 },
  unreadDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "#FF6B6B" },
  separator: { height: 1, backgroundColor: "#1A353D", marginLeft: 51 },
  footerCard: { flexDirection: "row", alignItems: "center", gap: 9, marginTop: 20, borderRadius: 14, backgroundColor: "#10232A", borderWidth: 1, borderColor: "#1E3A42", padding: 13 },
  footerText: { color: "#9DB4B1", fontSize: 11 },
  pressed: { opacity: 0.7 },
});
