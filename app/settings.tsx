import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { router } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function SettingsScreen() {
  const [privateMode, setPrivateMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <ScreenContainer edges={["top", "left", "right", "bottom"]} containerClassName="bg-background">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}><IconSymbol name="chevron.left" size={21} color="#F3FAF7" /></Pressable>
          <Text style={styles.title}>Налаштування</Text>
          <View style={styles.headerSpacer} />
        </View>

        <Text style={styles.sectionLabel}>ПРИВАТНІСТЬ</Text>
        <View style={styles.card}>
          <SettingRow icon="lock.fill" title="Приватний live-режим" description="Інші бачать лише завершені території" right={<Switch value={privateMode} onValueChange={setPrivateMode} trackColor={{ false: "#29464B", true: "#7DA849" }} thumbColor={privateMode ? "#B8F36B" : "#A6BBB8"} />} />
          <View style={styles.divider} />
          <SettingRow icon="location" title="Дозвіл геолокації" description="Потрібен для поїздок і контурів" right={<Text style={styles.enabled}>Увімкнено</Text>} />
        </View>

        <Text style={styles.sectionLabel}>СПОВІЩЕННЯ</Text>
        <View style={styles.card}>
          <SettingRow icon="bell.fill" title="Зміни території" description="Коли хтось відріже або займе твою зону" right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: "#29464B", true: "#7DA849" }} thumbColor={notifications ? "#B8F36B" : "#A6BBB8"} />} />
          <View style={styles.divider} />
          <SettingRow icon="trophy.fill" title="Рекорди та рейтинг" description="Нові позиції та особисті досягнення" right={<Switch value={notifications} onValueChange={setNotifications} trackColor={{ false: "#29464B", true: "#7DA849" }} thumbColor={notifications ? "#B8F36B" : "#A6BBB8"} />} />
        </View>

        <Text style={styles.sectionLabel}>ПРО ГРУ</Text>
        <View style={styles.card}>
          <Pressable onPress={() => router.push("/rules")} style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}>
            <View style={styles.rowIcon}><IconSymbol name="book.fill" size={17} color="#B8F36B" /></View>
            <View style={styles.rowCopy}><Text style={styles.rowTitle}>Як захоплювати території</Text><Text style={styles.rowDescription}>Коло, відсікання та чесна гра</Text></View>
            <IconSymbol name="chevron.right" size={18} color="#55716D" />
          </Pressable>
          <View style={styles.divider} />
          <View style={styles.linkRow}><View style={styles.rowIcon}><IconSymbol name="map.fill" size={17} color="#5FE0CF" /></View><View style={styles.rowCopy}><Text style={styles.rowTitle}>OpenStreetMap</Text><Text style={styles.rowDescription}>© OpenStreetMap contributors</Text></View></View>
        </View>

        <Text style={styles.version}>Territory Riders · 0.1.0 prototype</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

function SettingRow({ icon, title, description, right }: { icon: "lock.fill" | "location" | "bell.fill" | "trophy.fill"; title: string; description: string; right: React.ReactNode }) {
  return <View style={styles.settingRow}><View style={styles.rowIcon}><IconSymbol name={icon} size={17} color="#B8F36B" /></View><View style={styles.rowCopy}><Text style={styles.rowTitle}>{title}</Text><Text style={styles.rowDescription}>{description}</Text></View>{right}</View>;
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 40, gap: 14 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  backButton: { width: 40, height: 40, borderRadius: 13, backgroundColor: "#10232A", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#234149" },
  headerSpacer: { width: 40 },
  title: { color: "#F3FAF7", fontSize: 20, fontWeight: "800" },
  sectionLabel: { color: "#6E8985", fontSize: 10, fontWeight: "800", letterSpacing: 1.5, marginTop: 5 },
  card: { backgroundColor: "#10232A", borderWidth: 1, borderColor: "#1E3A42", borderRadius: 17, paddingHorizontal: 13 },
  settingRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 14 },
  linkRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 14 },
  rowIcon: { width: 33, height: 33, borderRadius: 11, backgroundColor: "rgba(184,243,107,0.09)", alignItems: "center", justifyContent: "center" },
  rowCopy: { flex: 1 },
  rowTitle: { color: "#F3FAF7", fontSize: 12, fontWeight: "700" },
  rowDescription: { color: "#8EA9A5", fontSize: 10, marginTop: 3, lineHeight: 14 },
  divider: { height: 1, backgroundColor: "#1E3A42", marginLeft: 43 },
  enabled: { color: "#39D98A", fontSize: 11, fontWeight: "700" },
  version: { color: "#55716D", textAlign: "center", fontSize: 10, marginTop: 10 },
  pressed: { opacity: 0.7 },
});
