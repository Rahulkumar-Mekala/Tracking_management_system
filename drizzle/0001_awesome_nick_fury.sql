/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'routetable'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "routetable" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "routetable" ADD PRIMARY KEY ("route_name");--> statement-breakpoint
ALTER TABLE "routetable" ALTER COLUMN "route_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "routetable" ADD CONSTRAINT "routetable_route_id_unique" UNIQUE("route_id");