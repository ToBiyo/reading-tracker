import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  coverUrl: text("cover_url").notNull(),
  pages: integer("pages").notNull(),
});
