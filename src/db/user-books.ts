import { db } from "./db";
import { sql } from "drizzle-orm";
import { userBooks } from "./db";

type UserBookInput = {
  coverUrl: string;
  userId: number;
  list: "READ" | "READING" | "WISHLIST";
  bookId: number;
};

//add book to userBookk list "reAD", "READING", "WISHLIST"

export const addBookToList = async (book: UserBookInput) => {
  // Check if the book is already in the user's list to prevent duplicates
  const existing = await db
    .select()
    .from(userBooks)
    .where(
      sql`${userBooks.userId} = ${book.userId} AND ${userBooks.bookId} = ${book.bookId} AND ${userBooks.list} = ${book.list}`,
    );

  // return the existing entry if found, otherwise create a new one
  if (existing.length) {
    return existing[0];
  }

  const [newUserBook] = await db
    .insert(userBooks)
    .values({
      userId: book.userId,
      bookId: book.bookId,
      list: book.list,
      coverUrl: book.coverUrl,
    })
    .returning();

  return newUserBook;
};
