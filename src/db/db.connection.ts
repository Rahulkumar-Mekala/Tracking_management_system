import { drizzle } from 'drizzle-orm/node-postgres'
import {Pool} from 'pg'
const pool = new Pool(
    {
        host: process.env.db_Host||"localhost",
        port:process.env.db_port||5432,
        user:process.env.db_Username|| "postgres",
        password:process.env.db_password||"rahul",
        database:process.env.db_Databse||"Bus_Tracking_Management_System",

    }
     
);
export const db= drizzle(pool);