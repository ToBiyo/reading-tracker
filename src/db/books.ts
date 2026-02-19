import { eq } from "drizzle-orm";
import { db } from "./db";
import { books } from "./db";

type BookInput = {
  title: string;
  author: string;
  externalId: string;
};

// This function checks if a book with the given externalId already exists in the database.
export const getOrCreateBook = async (book: BookInput) => {
  // Check if the book already exists in the database using the externalId
  const [existingBook] = await db
    .select()
    .from(books)
    .where(eq(books.externalId, book.externalId));

  // If the book exists, return its ID. Otherwise, insert the new book and return the new ID.
  if (existingBook) {
    return existingBook.id;
  }

  const recordBook = {
    title: book.title,
    author: book.author,
    externalId: book.externalId,
  };

  const newBook = await db.insert(books).values(recordBook).returning();

  const { id } = newBook[0];

  return id;
};
