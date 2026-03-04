import { db, userBooks, books } from "@/db/db";
import { eq } from "drizzle-orm";

// Verifica se esistono record con un certo id in qualsiasi tabella
export async function isBookReferencedInUserBooks(id: number) {
  const result = await db
    .select()
    .from(userBooks)
    .where(eq(userBooks.bookId, id));
  return result.length > 0;
}
