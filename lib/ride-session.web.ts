import AsyncStorage from "@react-native-async-storage/async-storage";

import type { GeoPoint } from "@/shared/geometry";

const RIDE_POINTS_KEY = "territory-riders:ride-points";

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
  return { background: false };
}

export async function stopRideTracking() {}

export async function notifyTerritoryChange() {}
