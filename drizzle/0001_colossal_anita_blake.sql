ALTER TABLE "ConductorAssignment" ALTER COLUMN "assigned_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "DriverAssignment" ALTER COLUMN "assigned_date" SET DEFAULT now();