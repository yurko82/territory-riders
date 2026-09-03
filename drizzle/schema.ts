import { boolean, int, json, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/** Core user table backing auth flow. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

/** A server-authoritative claimed territory. Geometry is GeoJSON-like polygon coordinates. */
export const territories = mysqlTable("territories", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  ownerName: varchar("ownerName", { length: 120 }).notNull(),
  areaM2: int("areaM2").notNull(),
  geometry: json("geometry").notNull(),
  color: varchar("color", { length: 16 }).notNull(),
  borderColor: varchar("borderColor", { length: 16 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/** Completed rides submitted for deterministic server-side validation. */
export const rides = mysqlTable("rides", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  distanceM: int("distanceM").notNull(),
  durationSec: int("durationSec").notNull(),
  route: json("route").notNull(),
  status: mysqlEnum("status", ["pending", "accepted", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/** User-facing social events, later delivered both in-app and via push. */
export const activityEvents = mysqlTable("activityEvents", {
  id: int("id").autoincrement().primaryKey(),
  recipientId: int("recipientId").notNull(),
  actorId: int("actorId"),
  territoryId: int("territoryId"),
  type: mysqlEnum("type", ["cut", "claim", "record"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  detail: text("detail").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Territory = typeof territories.$inferSelect;
export type InsertTerritory = typeof territories.$inferInsert;
export type Ride = typeof rides.$inferSelect;
export type InsertRide = typeof rides.$inferInsert;
export type ActivityEvent = typeof activityEvents.$inferSelect;
export type InsertActivityEvent = typeof activityEvents.$inferInsert;
