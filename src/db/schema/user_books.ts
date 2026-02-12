import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  pgEnum,
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

  rating: integer("rating").default(0), // READ & WISHLIST, default 0, supporta mezzi voti
  notes: text("notes"), // READ & READING
  progress: integer("progress"), // pagine lette per READING

  totalPages: integer("total_pages").default(0), // pagine dell’edizione scelta dall’utente, default null
  coverUrl: text("cover_url"), // cover scelta dall’utente

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  // editionKey: text("edition_key"), // opzionale, commentata per ora
});
