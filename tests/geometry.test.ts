import { describe, expect, it } from "vitest";

import { countCapturedTerritories, isClosedLoop, polygonAreaKm2, totalDistanceMeters, type GeoPoint } from "../shared/geometry";

const square: GeoPoint[] = [
  { latitude: 50.45, longitude: 30.50 },
  { latitude: 50.46, longitude: 30.50 },
  { latitude: 50.46, longitude: 30.51 },
  { latitude: 50.45, longitude: 30.51 },
  { latitude: 50.45, longitude: 30.50 },
];

describe("territory geometry", () => {
  it("recognizes a sufficiently long closed loop", () => {
    expect(totalDistanceMeters(square)).toBeGreaterThan(1000);
    expect(isClosedLoop(square)).toBe(true);
  });

  it("calculates a positive polygon area", () => {
    expect(polygonAreaKm2(square)).toBeGreaterThan(0.5);
  });

  it("counts a foreign territory inside the submitted loop", () => {
    expect(countCapturedTerritories(square, [{ owner: "rival", coordinates: [{ latitude: 50.455, longitude: 30.505 }] }], "you")).toBe(1);
    expect(countCapturedTerritories(square, [{ owner: "you", coordinates: [{ latitude: 50.455, longitude: 30.505 }] }], "you")).toBe(0);
  });
});
