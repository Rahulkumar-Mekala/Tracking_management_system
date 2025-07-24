import { pgTable, serial, varchar, timestamp, time, date, integer, real, jsonb } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'MANAGER', 'DRIVER', 'PASSENGER']);
export const busTypeEnum = pgEnum("bus_type_enum", ["ORDINARY", "EXPRESS", "DELUXE", "SUPER_LUXURY", "GARUDA", "METRO_EXPRESS"]);
export const routeStatusEnum = pgEnum("route_status", ["on-time","delayed","cancelled","completed",]);
export const User = pgTable('User', {
  id: serial().primaryKey(),
  fullname: varchar('fullname', { length: 50 }),
  profile_url: varchar("profile_url"),
  phone: varchar('phone', { length: 15 }).unique().notNull(),
  email: varchar('Email-Address').unique(),
  DateofBirth: varchar('Date-of-Birth'),
  Gender: varchar('Gender'),
  role: userRoleEnum().default('PASSENGER'),
  Create_At: timestamp('Account_create').defaultNow().notNull(),
  Update_At: timestamp('Account_update').defaultNow().notNull()
});
export const Depot = pgTable("DEPOTtable", {
  depot_id: serial("depot_id").unique(),
  depo_code_number: varchar('depo_code_number', { length: 20 }).primaryKey().notNull(),
  depo_name: varchar("depo_name", { length: 100 }),
  location: varchar("location", { length: 255 }),
  contact_number: varchar("contact_number", { length: 15 }).unique(),
  Create_At: timestamp("Create_At").notNull().defaultNow(),
  Update_At: timestamp("Update_At").notNull().defaultNow(),
});
export const Bus = pgTable("bustable", {
  bus_id: serial("bus_id").unique(),
  bus_number: varchar("bus_number", { length: 50 }).primaryKey(),
  bus_type: busTypeEnum('bus_type').notNull(),
  capacity: integer("capacity"),
  depo_id: varchar("depo_id", { length: 20 }).references(() => Depot.depo_code_number),
  Create_At: timestamp("Create_At").notNull().defaultNow(),
  Update_At: timestamp("Update_At").notNull().defaultNow(),
});
export const Location = pgTable("locationtable", {
  location_id: serial("location_id").unique(),
  location_name: varchar("location_name", { length: 100 }).primaryKey(),
  city: varchar("city", { length: 500 }),
  state: varchar("state", { length: 100 }),
  pincode: varchar("pincode", { length: 10 }),
  Create_At: timestamp("Create_At").notNull().defaultNow(),
  Update_At: timestamp("Update_At").notNull().defaultNow(),
});
export const Route = pgTable("routetable", {
  route_id: serial("route_id").unique(),
  route_name: varchar("route_name", { length: 100 }).primaryKey(),
  source_location_id: varchar("source_location_id",{ length: 100 }).references(() => Location.location_name),
  destination_location_id: varchar("destination_location_id",{ length: 100 }).references(() => Location.location_name),
  stops: jsonb("stops"),
  status: routeStatusEnum("status").notNull().default("on-time"),
  distance_km: real("distance_km"),
  estimated_time_minutes: real("estimated_time_minutes"),
  Create_At: timestamp("Create_At").notNull().defaultNow(),
  Update_At: timestamp("Update_At").notNull().defaultNow(),
});
export const Timing = pgTable("timmingtable", {
  timing_id: serial("timing_id").unique().primaryKey(),
  bus_id: varchar("bus_id", { length: 50 }).references(() => Bus.bus_number),
  source_location_id: varchar("source_location_id",{length:100}).references(() => Location.location_name),
  destination_location_id: varchar("destination_location_id",{length:100}).references(() => Location.location_name),
  departure_time: time("departure_time"),
  arrival_time: time("arrival_time"),
  trip_date: date("trip_date"),
  Create_At: timestamp("Create_At").notNull().defaultNow(),
  Update_At: timestamp("Update_At").notNull().defaultNow(),
});
export const BusLiveTracking = pgTable("bus_live_tracking", {
  tracking_id: serial("tracking_id").unique(),
  bus_id: varchar("bus_id",{length:50}).references(() => Bus.bus_number),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  speed: real("speed"), 
  recorded_at: timestamp("recorded_at").notNull().defaultNow(),
});