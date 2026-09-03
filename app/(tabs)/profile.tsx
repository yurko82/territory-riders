import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { PLAYER_STATS } from "@/shared/territory";

export default function ProfileScreen() {
  return (
    <ScreenContainer edges={["top", "left", "right"]} containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>МІЙ RIDER ID</Text>
            <Text style={styles.title}>Профіль</Text>
          </View>
          <Pressable onPress={() => router.push("/settings")} style={({ pressed }) => [styles.settingsButton, pressed && styles.pressed]}>
            <IconSymbol name="gearshape.fill" size={21} color="#F3FAF7" />
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>ОК</Text></View>
          <View style={styles.profileCopy}>
            <Text style={styles.name}>Олексій К.</Text>
            <Text style={styles.handle}>@kolobike · Київ</Text>
          </View>
          <View style={styles.rankPill}><Text style={styles.rankValue}>{PLAYER_STATS.rank}</Text><Text style={styles.rankLabel}>місто</Text></View>
        </View>

        <View style={styles.streakCard}>
          <View style={styles.streakIcon}><IconSymbol name="flame.fill" size={22} color="#07131A" /></View>
          <View style={styles.streakCopy}><Text style={styles.streakTitle}>Серія триває</Text><Text style={styles.streakText}>Ще одна поїздка сьогодні — і буде 7 днів</Text></View>
          <Text style={styles.streakValue}>{PLAYER_STATS.streak}</Text>
        </View>

        <Text style={styles.sectionTitle}>Твоя статистика</Text>
        <View style={styles.statsGrid}>
          <Stat value={`${PLAYER_STATS.totalArea} км²`} label="загальна територія" />
          <Stat value={PLAYER_STATS.rides} label="успішних поїздок" />
          <Stat value="86%" label="кіл замкнено" />
          <Stat value="3" label="території захищено" />
        </View>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Сезонний рейтинг</Text><Text style={styles.link}>Деталі</Text></View>
        <View style={styles.leaderboardCard}>
          <LeaderboardRow rank="05" initials="МК" name="Міла К." area="15,6 км²" color="#5FE0CF" />
          <LeaderboardRow rank="06" initials="ДР" name="Денис Р." area="13,1 км²" color="#AB7EFF" />
          <LeaderboardRow rank="07" initials="ОК" name="Ти" area="12,8 км²" color="#B8F36B" isYou />
        </View>

        <Pressable onPress={() => router.push("/settings")} style={({ pressed }) => [styles.privacyRow, pressed && styles.pressed]}>
          <IconSymbol name="lock.fill" size={17} color="#9DB4B1" />
          <Text style={styles.privacyText}>Твої live-переміщення приховані</Text>
          <IconSymbol name="chevron.right" size={17} color="#55716D" />
        </Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <View style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>;
}

function LeaderboardRow({ rank, initials, name, area, color, isYou = false }: { rank: string; initials: string; name: string; area: string; color: string; isYou?: boolean }) {
  return <View style={[styles.leaderRow, isYou && styles.youRow]}><Text style={styles.leaderRank}>{rank}</Text><View style={[styles.leaderAvatar, { backgroundColor: `${color}27`, borderColor: `${color}80` }]}><Text style={[styles.leaderInitials, { color }]}>{initials}</Text></View><Text style={styles.leaderName}>{name}</Text><Text style={styles.leaderArea}>{area}</Text></View>;
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 34, gap: 16 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  eyebrow: { color: "#8EA9A5", fontSize: 10, fontWeight: "800", letterSpacing: 1.7 },
  title: { color: "#F3FAF7", fontSize: 29, fontWeight: "800", marginTop: 4 },
  settingsButton: { width: 42, height: 42, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: "#10232A", borderWidth: 1, borderColor: "#234149" },
  profileCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#10232A", borderRadius: 20, borderWidth: 1, borderColor: "#234149", padding: 14, gap: 12 },
  avatar: { width: 55, height: 55, borderRadius: 18, backgroundColor: "#B8F36B", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#07131A", fontSize: 17, fontWeight: "900" },
  profileCopy: { flex: 1 },
  name: { color: "#F3FAF7", fontSize: 17, fontWeight: "800" },
  handle: { color: "#8EA9A5", fontSize: 12, marginTop: 4 },
  rankPill: { alignItems: "center", paddingHorizontal: 11, paddingVertical: 7, borderRadius: 11, backgroundColor: "rgba(184,243,107,0.09)" },
  rankValue: { color: "#B8F36B", fontSize: 16, fontWeight: "900" },
  rankLabel: { color: "#8EA9A5", fontSize: 9, marginTop: 2 },
  streakCard: { flexDirection: "row", alignItems: "center", gap: 10, padding: 13, borderRadius: 17, borderWidth: 1, borderColor: "rgba(255,200,87,0.24)", backgroundColor: "rgba(255,200,87,0.07)" },
  streakIcon: { width: 39, height: 39, borderRadius: 13, backgroundColor: "#FFC857", alignItems: "center", justifyContent: "center" },
  streakCopy: { flex: 1 },
  streakTitle: { color: "#F3FAF7", fontSize: 12, fontWeight: "800" },
  streakText: { color: "#BDAF8A", fontSize: 10, lineHeight: 14, marginTop: 3 },
  streakValue: { color: "#FFC857", fontSize: 12, fontWeight: "800" },
  sectionTitle: { color: "#F3FAF7", fontSize: 16, fontWeight: "800" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  stat: { width: "48%", flexGrow: 1, borderRadius: 15, borderWidth: 1, borderColor: "#1E3A42", backgroundColor: "#10232A", padding: 14 },
  statValue: { color: "#B8F36B", fontSize: 18, fontWeight: "800" },
  statLabel: { color: "#8EA9A5", fontSize: 10, lineHeight: 14, marginTop: 4 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 2 },
  link: { color: "#B8F36B", fontSize: 12, fontWeight: "700" },
  leaderboardCard: { backgroundColor: "#10232A", borderRadius: 17, borderWidth: 1, borderColor: "#1E3A42", paddingHorizontal: 12 },
  leaderRow: { flexDirection: "row", alignItems: "center", gap: 9, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#1E3A42" },
  youRow: { borderBottomWidth: 0 },
  leaderRank: { width: 20, color: "#6E8985", fontSize: 11, fontWeight: "800" },
  leaderAvatar: { width: 32, height: 32, borderRadius: 11, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  leaderInitials: { fontSize: 10, fontWeight: "900" },
  leaderName: { flex: 1, color: "#E6F1ED", fontSize: 12, fontWeight: "700" },
  leaderArea: { color: "#9DB4B1", fontSize: 11 },
  privacyRow: { flexDirection: "row", alignItems: "center", gap: 9, paddingVertical: 2 },
  privacyText: { flex: 1, color: "#8EA9A5", fontSize: 11 },
  pressed: { opacity: 0.7 },
});
