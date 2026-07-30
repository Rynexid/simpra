import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const url = process.env.DATABASE_URL!;
const queryClient = postgres(url);
export const db = drizzle(queryClient, { schema });

export { schema };

export type Db = typeof db;
