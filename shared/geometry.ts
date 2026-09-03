export type GeoPoint = { latitude: number; longitude: number };

const EARTH_RADIUS_KM = 6371;

export function distanceMeters(a: GeoPoint, b: GeoPoint) {
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;
  const dLat = lat2 - lat1;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const haversine = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * 1000 * Math.asin(Math.sqrt(haversine));
}

export function totalDistanceMeters(points: GeoPoint[]) {
  return points.slice(1).reduce((total, point, index) => total + distanceMeters(points[index], point), 0);
}

export function isClosedLoop(points: GeoPoint[], closureMeters = 80) {
  if (points.length < 4) return false;
  return distanceMeters(points[0], points[points.length - 1]) <= closureMeters && totalDistanceMeters(points) >= 1000;
}

export function polygonAreaKm2(points: GeoPoint[]) {
  if (points.length < 3) return 0;
  const origin = points[0];
  const metersPerDegreeLat = 111_320;
  const metersPerDegreeLon = 111_320 * Math.cos((origin.latitude * Math.PI) / 180);
  const xy = points.map((point) => ({
    x: (point.longitude - origin.longitude) * metersPerDegreeLon,
    y: (point.latitude - origin.latitude) * metersPerDegreeLat,
  }));
  const area = xy.reduce((sum, point, index) => {
    const next = xy[(index + 1) % xy.length];
    return sum + point.x * next.y - next.x * point.y;
  }, 0);
  return Math.abs(area / 2) / 1_000_000;
}

export function pointInPolygon(point: GeoPoint, polygon: GeoPoint[]) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
    const currentPoint = polygon[index];
    const previousPoint = polygon[previous];
    const intersects = currentPoint.latitude > point.latitude !== previousPoint.latitude > point.latitude && point.longitude < ((previousPoint.longitude - currentPoint.longitude) * (point.latitude - currentPoint.latitude)) / (previousPoint.latitude - currentPoint.latitude) + currentPoint.longitude;
    if (intersects) inside = !inside;
  }
  return inside;
}

export function countCapturedTerritories(route: GeoPoint[], territories: Array<{ coordinates: GeoPoint[]; owner: string }>, currentOwner: string) {
  if (!isClosedLoop(route)) return 0;
  return territories.filter((territory) => territory.owner !== currentOwner && territory.coordinates.some((point) => pointInPolygon(point, route))).length;
}
