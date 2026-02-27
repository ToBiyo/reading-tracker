import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
  check,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { books } from "./books";
import { sql } from "drizzle-orm";

// enum per le liste
export const bookListEnum = pgEnum("book_list_enum", [
  "READ",
  "READING",
  "WISHLIST",
]);

export const userBooks = pgTable(
  "user_books",
  {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
      .notNull()
      .references(() => users.id),

    bookId: integer("book_id")
      .notNull()
      .references(() => books.id),

    list: bookListEnum("list").notNull(),

    rate: integer("rating").default(0), // READ & WISHLIST, default 0, supporta mezzi voti
    note: text("notes"), // READ & READING
    currentPage: integer("current_page").default(0).notNull(), // pagine lette per READING

    totalPages: integer("total_pages").default(0).notNull(), // pagine dell’edizione scelta dall’utente, default null
    coverUrl: text("cover_url"), // cover scelta dall’utente

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    // editionKey: text("edition_key"), // opzionale, commentata per ora
  },
  (table) => [
    check("current_page_valid", sql`${table.currentPage} >= 0`),
    check("total_pages_valid", sql`${table.totalPages} >= 0`),
    check(
      "current_page_progression",
      sql`${table.currentPage} <= ${table.totalPages}`,
    ),
    check("valid_rating", sql`${table.rate} >= 0 AND ${table.rate} <= 10`),
  ],
);
