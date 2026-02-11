import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
  foreignKey,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { books } from "./books";

// enum per le liste
export const bookListEnum = pgEnum("book_list_enum", [
  "READ",
  "READING",
  "WISHLIST",
]);

export const userBooks = pgTable("user_books", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  bookId: integer("book_id")
    .notNull()
    .references(() => books.id),
  list: bookListEnum("list").notNull(),
  rating: integer("rating"), // READ & WISHLIST
  notes: text("notes"), // READ & READING
  progress: integer("progress"), // pagine lette per READINg
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
