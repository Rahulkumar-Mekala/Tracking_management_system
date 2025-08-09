CREATE TYPE "public"."bus_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'UNDER_MAINTENANCE');--> statement-breakpoint
CREATE TYPE "public"."bus_type_enum" AS ENUM('ORDINARY', 'EXPRESS', 'DELUXE', 'SUPER_LUXURY', 'GARUDA', 'METRO_EXPRESS');--> statement-breakpoint
CREATE TYPE "public"."route_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."transport_mode_enum" AS ENUM('CITY_BUS', 'INTERCITY_BUS', 'METRO', 'LOCAL_TRAIN', 'EXPRESS_BUS');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'MANAGER', 'DRIVER', 'CONDUCTOR', 'PASSENGER');--> statement-breakpoint
CREATE TABLE "Attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"role" "user_role" NOT NULL,
	"date" date NOT NULL,
	"status" varchar(20) NOT NULL,
	"login_time" timestamp,
	"logout_time" timestamp,
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ConductorAssignment" (
	"id" serial PRIMARY KEY NOT NULL,
	"driver_code" varchar(10) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"bus_number" varchar(50) NOT NULL,
	"route_name" varchar NOT NULL,
	"assigned_date" date NOT NULL,
	"shift_time" time NOT NULL,
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ConductorAssignment_driver_code_unique" UNIQUE("driver_code"),
	CONSTRAINT "ConductorAssignment_bus_number_unique" UNIQUE("bus_number")
);
--> statement-breakpoint
CREATE TABLE "ConductorTripReport" (
	"id" serial PRIMARY KEY NOT NULL,
	"conductor_id" integer NOT NULL,
	"bus_id" integer NOT NULL,
	"route_id" integer NOT NULL,
	"trip_date" date NOT NULL,
	"shift_time" time NOT NULL,
	"total_passengers" integer NOT NULL,
	"male_passengers" integer NOT NULL,
	"female_passengers" integer NOT NULL,
	"passengers_without_ticket" integer NOT NULL,
	"tickets_issued" integer NOT NULL,
	"total_fare_collected" real,
	"remarks" varchar(255),
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "DEPOTtable" (
	"depot_id" serial PRIMARY KEY NOT NULL,
	"depo_code_number" varchar(20) NOT NULL,
	"depo_name" varchar(100) NOT NULL,
	"location" varchar(255) NOT NULL,
	"contact_number" varchar(15) NOT NULL,
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "DEPOTtable_depo_code_number_unique" UNIQUE("depo_code_number"),
	CONSTRAINT "DEPOTtable_contact_number_unique" UNIQUE("contact_number")
);
--> statement-breakpoint
CREATE TABLE "DriverAssignment" (
	"id" serial PRIMARY KEY NOT NULL,
	"driver_code" varchar(10) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"bus_number" varchar(50) NOT NULL,
	"route_name" varchar NOT NULL,
	"assigned_date" date NOT NULL,
	"shift_time" time NOT NULL,
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "DriverAssignment_driver_code_unique" UNIQUE("driver_code"),
	CONSTRAINT "DriverAssignment_bus_number_unique" UNIQUE("bus_number")
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullname" varchar(50),
	"profile_url" varchar(255),
	"phone" varchar(15) NOT NULL,
	"email" varchar,
	"DateofBirth" date,
	"Gender" varchar(10),
	"role" "user_role" DEFAULT 'PASSENGER',
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "User_phone_unique" UNIQUE("phone"),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "bus_live_tracking" (
	"tracking_id" serial PRIMARY KEY NOT NULL,
	"bus_id" integer NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"speed" real,
	"recorded_at" timestamp NOT NULL,
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bustable" (
	"bus_id" serial PRIMARY KEY NOT NULL,
	"bus_number" varchar(50) NOT NULL,
	"bus_type" "bus_type_enum" NOT NULL,
	"transport_mode" "transport_mode_enum" NOT NULL,
	"capacity" integer NOT NULL,
	"status" "bus_status_enum" DEFAULT 'ACTIVE',
	"depo_code_number" varchar(20),
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bustable_bus_number_unique" UNIQUE("bus_number")
);
--> statement-breakpoint
CREATE TABLE "locationtable" (
	"location_id" serial PRIMARY KEY NOT NULL,
	"location_name" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(50) NOT NULL,
	"pincode" varchar(10),
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "locationtable_location_name_unique" UNIQUE("location_name")
);
--> statement-breakpoint
CREATE TABLE "routetable" (
	"route_id" serial PRIMARY KEY NOT NULL,
	"route_name" varchar NOT NULL,
	"source_location_id" varchar NOT NULL,
	"destination_location_id" varchar NOT NULL,
	"stops" jsonb,
	"distance_km" real,
	"status" "route_status_enum" DEFAULT 'ACTIVE',
	"estimated_time_minutes" real,
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "routetable_route_name_unique" UNIQUE("route_name")
);
--> statement-breakpoint
CREATE TABLE "timmingtable" (
	"timing_id" serial PRIMARY KEY NOT NULL,
	"bus_id" varchar(50) NOT NULL,
	"source_location_id" varchar NOT NULL,
	"destination_location_id" varchar NOT NULL,
	"departure_time" time NOT NULL,
	"arrival_time" time NOT NULL,
	"trip_date" date DEFAULT now() NOT NULL,
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConductorAssignment" ADD CONSTRAINT "ConductorAssignment_phone_User_phone_fk" FOREIGN KEY ("phone") REFERENCES "public"."User"("phone") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConductorAssignment" ADD CONSTRAINT "ConductorAssignment_bus_number_bustable_bus_number_fk" FOREIGN KEY ("bus_number") REFERENCES "public"."bustable"("bus_number") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConductorAssignment" ADD CONSTRAINT "ConductorAssignment_route_name_routetable_route_name_fk" FOREIGN KEY ("route_name") REFERENCES "public"."routetable"("route_name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConductorTripReport" ADD CONSTRAINT "ConductorTripReport_conductor_id_User_id_fk" FOREIGN KEY ("conductor_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConductorTripReport" ADD CONSTRAINT "ConductorTripReport_bus_id_bustable_bus_id_fk" FOREIGN KEY ("bus_id") REFERENCES "public"."bustable"("bus_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConductorTripReport" ADD CONSTRAINT "ConductorTripReport_route_id_routetable_route_id_fk" FOREIGN KEY ("route_id") REFERENCES "public"."routetable"("route_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DriverAssignment" ADD CONSTRAINT "DriverAssignment_phone_User_phone_fk" FOREIGN KEY ("phone") REFERENCES "public"."User"("phone") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DriverAssignment" ADD CONSTRAINT "DriverAssignment_bus_number_bustable_bus_number_fk" FOREIGN KEY ("bus_number") REFERENCES "public"."bustable"("bus_number") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "DriverAssignment" ADD CONSTRAINT "DriverAssignment_route_name_routetable_route_name_fk" FOREIGN KEY ("route_name") REFERENCES "public"."routetable"("route_name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bus_live_tracking" ADD CONSTRAINT "bus_live_tracking_bus_id_bustable_bus_id_fk" FOREIGN KEY ("bus_id") REFERENCES "public"."bustable"("bus_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bustable" ADD CONSTRAINT "bustable_depo_code_number_DEPOTtable_depo_code_number_fk" FOREIGN KEY ("depo_code_number") REFERENCES "public"."DEPOTtable"("depo_code_number") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routetable" ADD CONSTRAINT "routetable_source_location_id_locationtable_location_name_fk" FOREIGN KEY ("source_location_id") REFERENCES "public"."locationtable"("location_name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routetable" ADD CONSTRAINT "routetable_destination_location_id_locationtable_location_name_fk" FOREIGN KEY ("destination_location_id") REFERENCES "public"."locationtable"("location_name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timmingtable" ADD CONSTRAINT "timmingtable_bus_id_bustable_bus_number_fk" FOREIGN KEY ("bus_id") REFERENCES "public"."bustable"("bus_number") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timmingtable" ADD CONSTRAINT "timmingtable_source_location_id_locationtable_location_name_fk" FOREIGN KEY ("source_location_id") REFERENCES "public"."locationtable"("location_name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timmingtable" ADD CONSTRAINT "timmingtable_destination_location_id_locationtable_location_name_fk" FOREIGN KEY ("destination_location_id") REFERENCES "public"."locationtable"("location_name") ON DELETE no action ON UPDATE no action;