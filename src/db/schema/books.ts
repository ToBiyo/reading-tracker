import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  externalId: text("external_id").notNull(), // work ID unico, evita duplicazioni
});
