ALTER TABLE "bus_live_tracking" DROP CONSTRAINT "bus_live_tracking_bus_id_bustable_bus_id_fk";
--> statement-breakpoint
ALTER TABLE "bus_live_tracking" ADD COLUMN "bus_number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "bus_live_tracking" ADD CONSTRAINT "bus_live_tracking_bus_number_bustable_bus_number_fk" FOREIGN KEY ("bus_number") REFERENCES "public"."bustable"("bus_number") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "bus_live_tracking" DROP COLUMN "bus_id";--> statement-breakpoint
ALTER TABLE "bus_live_tracking" ADD CONSTRAINT "bus_live_tracking_bus_number_unique" UNIQUE("bus_number");