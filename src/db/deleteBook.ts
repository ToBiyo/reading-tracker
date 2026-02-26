import { db, books } from "@/db/db";
import { eq } from "drizzle-orm";

// Elimina un record da qualsiasi tabella
export async function deleteBook(id: number) {
  try {
    const [deletedRecord] = await db
      .delete(books)
      .where(eq(books.id, id))
      .returning();
    return deletedRecord ?? null;
  } catch (error) {
    console.error("Error deleting record:", error);
    throw new Error("Failed to delete record");
  }
}
