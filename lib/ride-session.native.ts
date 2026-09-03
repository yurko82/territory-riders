import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import { Platform } from "react-native";

import type { GeoPoint } from "@/shared/geometry";

const LOCATION_TASK_NAME = "territory-riders-location";
const RIDE_POINTS_KEY = "territory-riders:ride-points";

if (Platform.OS !== "web") {
  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error || !data) return;
    const locations = (data as { locations?: Location.LocationObject[] }).locations ?? [];
    if (!locations.length) return;
    const current = await loadRidePoints();
    const next = locations.map((item) => ({ latitude: item.coords.latitude, longitude: item.coords.longitude }));
    await AsyncStorage.setItem(RIDE_POINTS_KEY, JSON.stringify([...current, ...next].slice(-2000)));
  });
}

export async function loadRidePoints(): Promise<GeoPoint[]> {
  const stored = await AsyncStorage.getItem(RIDE_POINTS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as GeoPoint[];
  } catch {
    return [];
  }
}

export async function clearRidePoints() {
  await AsyncStorage.removeItem(RIDE_POINTS_KEY);
}

export async function startRideTracking() {
  if (Platform.OS === "web") return { background: false };
  const foreground = await Location.requestForegroundPermissionsAsync();
  if (foreground.status !== "granted") throw new Error("location_denied");
  const background = await Location.requestBackgroundPermissionsAsync();
  if (background.status !== "granted") return { background: false };
  const registered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
  if (!registered) {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 15_000,
      distanceInterval: 20,
      pausesUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Territory Riders записує маршрут",
        notificationBody: "Повернися до старту, щоб замкнути територію.",
        notificationColor: "#B8F36B",
      },
    });
  }
  return { background: true };
}

export async function stopRideTracking() {
  if (Platform.OS === "web") return;
  const registered = await TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME);
  if (registered) await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
}

export async function notifyTerritoryChange() {
  if (Platform.OS === "web") return;
  const permissions = await Notifications.getPermissionsAsync();
  if (permissions.status !== "granted") {
    const requested = await Notifications.requestPermissionsAsync();
    if (requested.status !== "granted") return;
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Територію захоплено",
      body: "Ти замкнув коло й додав 2,4 км² до своєї зони.",
      data: { url: "/result" },
    },
    trigger: null,
  });
}
