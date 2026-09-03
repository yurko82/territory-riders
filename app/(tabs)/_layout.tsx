import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.muted,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: "700" },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Карта", tabBarIcon: ({ color }) => <IconSymbol size={23} name="map.fill" color={color} /> }} />
      <Tabs.Screen name="ride" options={{ title: "Поїздка", tabBarIcon: ({ color }) => <IconSymbol size={23} name="bicycle" color={color} /> }} />
      <Tabs.Screen name="activity" options={{ title: "Події", tabBarIcon: ({ color }) => <IconSymbol size={23} name="bell.fill" color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Профіль", tabBarIcon: ({ color }) => <IconSymbol size={23} name="person.fill" color={color} /> }} />
    </Tabs>
  );
}
