import { db, userBooks } from "@/db/db";
import { eq, and } from "drizzle-orm";

// Elimina un record da qualsiasi tabella
export async function deleteUserBook(id: number, userId: number) {
  try {
    // Elimina il record dalla tabella userBooks
    const [deletedRecord] = await db
      .delete(userBooks)
      .where(and(eq(userBooks.id, id), eq(userBooks.userId, userId)))
      .returning();
    // Restituisce il record eliminato o null se non trovato

    console.log("Deleted record:", deletedRecord);

    return deletedRecord ?? null;
  } catch (error) {
    console.error("Error deleting record:", error);
    throw new Error("Failed to delete record");
  }
}
