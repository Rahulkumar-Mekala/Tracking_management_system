CREATE TABLE "revoked_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" varchar(500) NOT NULL,
	"revoked_at" timestamp DEFAULT now() NOT NULL
);
