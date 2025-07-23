CREATE TYPE "public"."bus_type_enum" AS ENUM('ORDINARY', 'EXPRESS', 'DELUXE', 'SUPER_LUXURY', 'GARUDA', 'METRO_EXPRESS');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'MANAGER', 'DRIVER', 'PASSENGER');--> statement-breakpoint
CREATE TABLE "bustable" (
	"bus_id" serial NOT NULL,
	"bus_number" varchar(50) PRIMARY KEY NOT NULL,
	"bus_type" "bus_type_enum" NOT NULL,
	"capacity" integer,
	"depo_id" varchar(20),
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bustable_bus_id_unique" UNIQUE("bus_id")
);
--> statement-breakpoint
CREATE TABLE "bus_live_tracking" (
	"tracking_id" serial NOT NULL,
	"bus_id" varchar(50),
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"speed" real,
	"recorded_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "bus_live_tracking_tracking_id_unique" UNIQUE("tracking_id")
);
--> statement-breakpoint
CREATE TABLE "DEPOTtable" (
	"depot_id" serial NOT NULL,
	"depo_code_number" varchar(20) PRIMARY KEY NOT NULL,
	"depo_name" varchar(100),
	"location" varchar(255),
	"contact_number" varchar(15),
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "DEPOTtable_depot_id_unique" UNIQUE("depot_id"),
	CONSTRAINT "DEPOTtable_contact_number_unique" UNIQUE("contact_number")
);
--> statement-breakpoint
CREATE TABLE "locationtable" (
	"location_id" serial NOT NULL,
	"location_name" varchar(100) PRIMARY KEY NOT NULL,
	"city" varchar(100),
	"Districts" varchar(100) NOT NULL,
	"state" varchar(100),
	"pincode" varchar(10),
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "locationtable_location_id_unique" UNIQUE("location_id")
);
--> statement-breakpoint
CREATE TABLE "routetable" (
	"route_id" serial PRIMARY KEY NOT NULL,
	"route_name" varchar(100),
	"source_location_id" varchar(100),
	"destination_location_id" varchar(100),
	"distance_km" real,
	"estimated_time_minutes" real,
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timmingtable" (
	"timing_id" serial NOT NULL,
	"bus_id" varchar(50),
	"source_location_id" varchar(100),
	"destination_location_id" varchar(100),
	"departure_time" time,
	"arrival_time" time,
	"trip_date" date,
	"Create_At" timestamp DEFAULT now() NOT NULL,
	"Update_At" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "timmingtable_timing_id_unique" UNIQUE("timing_id")
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullname" varchar(50),
	"profile_url" varchar,
	"phone" varchar(15) NOT NULL,
	"Email-Address" varchar,
	"Date-of-Birth" varchar,
	"Gender" varchar,
	"role" "user_role" DEFAULT 'PASSENGER',
	"Account_create" timestamp DEFAULT now() NOT NULL,
	"Account_update" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "User_phone_unique" UNIQUE("phone"),
	CONSTRAINT "User_Email-Address_unique" UNIQUE("Email-Address")
);
--> statement-breakpoint
ALTER TABLE "bustable" ADD CONSTRAINT "bustable_depo_id_DEPOTtable_depo_code_number_fk" FOREIGN KEY ("depo_id") REFERENCES "public"."DEPOTtable"("depo_code_number") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bus_live_tracking" ADD CONSTRAINT "bus_live_tracking_bus_id_bustable_bus_number_fk" FOREIGN KEY ("bus_id") REFERENCES "public"."bustable"("bus_number") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routetable" ADD CONSTRAINT "routetable_source_location_id_locationtable_location_name_fk" FOREIGN KEY ("source_location_id") REFERENCES "public"."locationtable"("location_name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "routetable" ADD CONSTRAINT "routetable_destination_location_id_locationtable_location_name_fk" FOREIGN KEY ("destination_location_id") REFERENCES "public"."locationtable"("location_name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timmingtable" ADD CONSTRAINT "timmingtable_bus_id_bustable_bus_number_fk" FOREIGN KEY ("bus_id") REFERENCES "public"."bustable"("bus_number") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timmingtable" ADD CONSTRAINT "timmingtable_source_location_id_locationtable_location_name_fk" FOREIGN KEY ("source_location_id") REFERENCES "public"."locationtable"("location_name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timmingtable" ADD CONSTRAINT "timmingtable_destination_location_id_locationtable_location_name_fk" FOREIGN KEY ("destination_location_id") REFERENCES "public"."locationtable"("location_name") ON DELETE no action ON UPDATE no action;