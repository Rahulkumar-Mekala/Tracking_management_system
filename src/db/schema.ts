import { 
  pgEnum, pgTable, integer, serial, varchar, timestamp, 
  time, date, real, jsonb 
} from 'drizzle-orm/pg-core';



export const bus_status_enum = pgEnum('bus_status_enum', ['ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE']);
export const user_role = pgEnum('user_role', ['ADMIN', 'MANAGER', 'DRIVER', 'CONDUCTOR', 'PASSENGER']);
export const bus_type_enum = pgEnum('bus_type_enum', ['ORDINARY', 'EXPRESS', 'DELUXE', 'SUPER_LUXURY', 'GARUDA', 'METRO_EXPRESS']);
export const transport_mode_enum = pgEnum('transport_mode_enum', ['CITY_BUS', 'INTERCITY_BUS', 'METRO', 'LOCAL_TRAIN', 'EXPRESS_BUS']);
export const route_status_enum = pgEnum("route_status_enum", ["ACTIVE","INACTIVE","CANCELLED"]);

export const User = pgTable('User', {
  id: serial('id').primaryKey().notNull(),
  fullname: varchar('fullname', { length: 50 }),
  profile_url: varchar('profile_url', { length: 255 }),
  phone: varchar('phone', { length: 15 }).unique().notNull(),
  email: varchar('email').unique(),
  DateofBirth: date('DateofBirth'),
  Gender: varchar('Gender', { length: 10 }),
  role: user_role('role').default('PASSENGER'),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});


export const DEPOTtable = pgTable('DEPOTtable', {
  depot_id: serial('depot_id').primaryKey().notNull(),
  depo_code_number: varchar('depo_code_number', { length: 20 }).notNull().unique(),
  depo_name: varchar('depo_name', { length: 100 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  contact_number: varchar('contact_number', { length: 15 }).unique().notNull(),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});


export const bustable = pgTable('bustable', {
  bus_id: serial('bus_id').primaryKey().notNull(),
  bus_number: varchar('bus_number', { length: 50 }).unique().notNull(),
  bus_type: bus_type_enum('bus_type').notNull(),
  transport_mode: transport_mode_enum('transport_mode').notNull(),
  capacity: integer('capacity').notNull(),
  status: bus_status_enum('status').default('ACTIVE'),
   depo_code_number: varchar('depo_code_number', { length: 20 }).references(()=>DEPOTtable.depo_code_number),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});

export const locationtable = pgTable('locationtable', {
  location_id: serial('location_id').primaryKey().notNull(),
  location_name: varchar('location_name', { length: 100 }).unique().notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 50 }).notNull(),
  pincode: varchar('pincode', { length: 10 }),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});


export const routetable = pgTable('routetable', {
  route_id: serial('route_id').primaryKey().notNull(),
  route_name: varchar('route_name').unique().notNull(),
  source_location_id: varchar('source_location_id').references(() => locationtable.location_name).notNull(),
  destination_location_id: varchar('destination_location_id').references(() => locationtable.location_name).notNull(),
  stops: jsonb('stops'),
  distance_km: real('distance_km'),
  status: route_status_enum('status').default('ACTIVE'),
  estimated_time_minutes: real('estimated_time_minutes'),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});


export const timmingtable = pgTable('timmingtable', {
  timing_id: serial('timing_id').primaryKey().notNull(),
  bus_id: varchar('bus_id',{length:50}).references(() => bustable.bus_number).notNull(),
  source_location_id: varchar('source_location_id').references(() => locationtable.location_name).notNull(),
  destination_location_id: varchar('destination_location_id').references(() => locationtable.location_name).notNull(),
  departure_time: time('departure_time').notNull(),
  arrival_time: time('arrival_time').notNull(),
  trip_date: date('trip_date').defaultNow().notNull(),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});


export const bus_live_tracking = pgTable('bus_live_tracking', {
  tracking_id: serial('tracking_id').primaryKey().notNull(),
  bus_id:  varchar('bus_number', { length: 50 }).unique().references(() => bustable.bus_number).notNull(),
  latitude: real('latitude').notNull(),
  longitude: real('longitude').notNull(),
  speed: real('speed'),
  recorded_at: timestamp('recorded_at'),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});

export const DriverAssignment = pgTable('DriverAssignment', {
  id: serial('id').primaryKey().notNull(),
   driver_code:varchar('driver_code',{length:10}).notNull().unique(),
  driver_phonenumber: varchar('phone',{ length: 15 }).references(() => User.phone).notNull(),
  bus_id:  varchar('bus_number', { length: 50 }).references(() => bustable.bus_number).notNull(),
  route_id: varchar('route_name').references(() => routetable.route_name).notNull(),
  assigned_date: date('assigned_date').defaultNow().notNull(),
  shift_time: time('shift_time').notNull(),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});



export const ConductorAssignment = pgTable('ConductorAssignment', {
  id: serial('id').primaryKey().notNull(),
  condutor_code:varchar('driver_code',{length:10}).notNull().unique(),
 conductor_phonenumber: varchar('phone',{ length: 15 }).references(() => User.phone).notNull(),
  bus_id:  varchar('bus_number', { length: 50 }).references(() => bustable.bus_number).notNull(),
  route_id: varchar('route_name').references(() => routetable.route_name).notNull(),
   assigned_date: date('assigned_date').defaultNow().notNull(),
  shift_time: time('shift_time').notNull(),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});


export const ConductorTripReport = pgTable('ConductorTripReport', {
  id: serial('id').primaryKey().notNull(),
  conductor_id: integer('conductor_id').references(() => User.id).notNull(),
  bus_id: integer('bus_id').references(() => bustable.bus_id).notNull(),
  route_id: integer('route_id').references(() => routetable.route_id).notNull(),
  trip_date: date('trip_date').notNull(),
  shift_time: time('shift_time').notNull(),
  total_passengers: integer('total_passengers').notNull(),
  male_passengers: integer('male_passengers').notNull(),
  female_passengers: integer('female_passengers').notNull(),
  passengers_without_ticket: integer('passengers_without_ticket').notNull(),
  tickets_issued: integer('tickets_issued').notNull(),
  total_fare_collected: real('total_fare_collected'),
  remarks: varchar('remarks', { length: 255 }),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});


export const Attendance = pgTable('Attendance', {
  id: serial('id').primaryKey().notNull(),
  user_id: integer('user_id').references(() => User.id).notNull(),
  role: user_role('role').notNull(),
  date: date('date').notNull(),
  status: varchar('status', { length: 20 }).notNull(),
  login_time: timestamp('login_time'),
  logout_time: timestamp('logout_time'),
  Create_At: timestamp('Create_At').defaultNow().notNull(),
  Update_At: timestamp('Update_At').defaultNow().notNull(),
});

export const revoked_tokens = pgTable('revoked_tokens', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 500 }).notNull(),
  revoked_at: timestamp('revoked_at').defaultNow().notNull(),
});
