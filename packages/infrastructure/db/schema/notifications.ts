import { pgTable, text, uuid, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { organizations } from "./organizations";
import { user } from "./better-auth";

export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id").notNull().references(() => organizations.id, { onDelete: "cascade" }),
  recipientUserId: text("recipient_user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 100 }).notNull(),
  payload: jsonb("payload").notNull(),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
