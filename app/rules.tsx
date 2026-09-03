import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function RulesScreen() {
  return (
    <ScreenContainer edges={["top", "left", "right", "bottom"]} containerClassName="bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}><IconSymbol name="chevron.left" size={21} color="#F3FAF7" /></Pressable>
          <Text style={styles.title}>Як це працює</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.hero}><View style={styles.heroIcon}><IconSymbol name="bicycle" size={28} color="#07131A" /></View><Text style={styles.heroTitle}>Їдь. Замикай. Володій.</Text><Text style={styles.heroText}>Твій маршрут стає територією, коли ти повертаєшся до точки старту.</Text></View>
        <Rule number="01" icon="antenna.radiowaves.left.and.right" title="Почни поїздку" text="Натисни «Почати» та дозволь геолокацію. Додаток запише твій маршрут навіть коли екран вимкнено." />
        <Rule number="02" icon="arrow.clockwise" title="Замкни коло" text="Повернися до стартової зони. Замкнений контур перетворюється на нову територію, якщо маршрут відповідає правилам чесної гри." />
        <Rule number="03" icon="flag.fill" title="Захоплюй територію" text="Якщо контур проходить усередині чужої зони або відтинає її частину, ти отримуєш відповідну площу." />
        <Rule number="04" icon="bell.fill" title="Слідкуй за межами" text="Власник зміненої території отримає повідомлення. На карті видно історію подій і нові межі." />
        <View style={styles.fairPlay}><IconSymbol name="shield.fill" size={18} color="#5FE0CF" /><View style={styles.fairCopy}><Text style={styles.fairTitle}>Чесна гра</Text><Text style={styles.fairText}>Ми відкидаємо стрибки GPS, нереалістичну швидкість, надто короткі контури й підозрілі повтори.</Text></View></View>
        <Pressable onPress={() => router.replace("/ride")} style={({ pressed }) => [styles.action, pressed && styles.pressed]}><Text style={styles.actionText}>Спробувати поїздку</Text><IconSymbol name="chevron.right" size={20} color="#07131A" /></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

function Rule({ number, icon, title, text }: { number: string; icon: "antenna.radiowaves.left.and.right" | "arrow.clockwise" | "flag.fill" | "bell.fill"; title: string; text: string }) {
  return <View style={styles.rule}><View style={styles.ruleNumber}><Text style={styles.ruleNumberText}>{number}</Text></View><View style={styles.ruleIcon}><IconSymbol name={icon} size={18} color="#B8F36B" /></View><View style={styles.ruleCopy}><Text style={styles.ruleTitle}>{title}</Text><Text style={styles.ruleText}>{text}</Text></View></View>;
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 40, gap: 17 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  backButton: { width: 40, height: 40, borderRadius: 13, backgroundColor: "#10232A", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#234149" },
  headerSpacer: { width: 40 },
  title: { color: "#F3FAF7", fontSize: 20, fontWeight: "800" },
  hero: { alignItems: "center", backgroundColor: "#10232A", borderWidth: 1, borderColor: "rgba(184,243,107,0.25)", borderRadius: 21, padding: 19 },
  heroIcon: { width: 56, height: 56, borderRadius: 19, backgroundColor: "#B8F36B", alignItems: "center", justifyContent: "center", marginBottom: 10 },
  heroTitle: { color: "#F3FAF7", fontSize: 20, fontWeight: "800" },
  heroText: { color: "#9DB4B1", textAlign: "center", fontSize: 12, lineHeight: 17, marginTop: 6 },
  rule: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  ruleNumber: { width: 24, paddingTop: 5 },
  ruleNumberText: { color: "#55716D", fontSize: 10, fontWeight: "900" },
  ruleIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: "rgba(184,243,107,0.10)", alignItems: "center", justifyContent: "center" },
  ruleCopy: { flex: 1, paddingTop: 2 },
  ruleTitle: { color: "#F3FAF7", fontSize: 13, fontWeight: "800" },
  ruleText: { color: "#8EA9A5", fontSize: 11, lineHeight: 17, marginTop: 4 },
  fairPlay: { flexDirection: "row", gap: 10, backgroundColor: "rgba(95,224,207,0.07)", borderRadius: 16, borderWidth: 1, borderColor: "rgba(95,224,207,0.2)", padding: 13 },
  fairCopy: { flex: 1 },
  fairTitle: { color: "#5FE0CF", fontSize: 12, fontWeight: "800" },
  fairText: { color: "#9DB4B1", fontSize: 10, lineHeight: 15, marginTop: 3 },
  action: { height: 52, borderRadius: 16, backgroundColor: "#B8F36B", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4 },
  actionText: { color: "#07131A", fontWeight: "800", fontSize: 14 },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
});
