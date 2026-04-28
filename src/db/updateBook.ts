import { db, userBooks } from "@/db/db";
import { eq, and } from "drizzle-orm";

type UpdateData = {
  rating?: number;
  note?: string;
  currentPage?: number;
  totalPages?: number;
};

// Elimina un record da qualsiasi tabella
export async function updateUserBook(
  id: number,
  userId: string,
  updateData: UpdateData,
) {
  // Verifica che ci sia almeno un campo da aggiornare
  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields provided for update");
  }

  // Verifica se il record esiste prima di tentare l'aggiornamento
  const [existingRecord] = await db
    .select()
    .from(userBooks)
    .where(and(eq(userBooks.id, id), eq(userBooks.userId, userId)))
    .limit(1);

  // Se il record non esiste, restituisci null o gestisci l'errore come preferisci
  if (!existingRecord) {
    return null; // Record non trovato
  }

  try {
    //RECUPERO I VALORI ATTUALI PER FARE LE VALIDAZIONI
    const finalCurrentPage =
      updateData.currentPage ?? existingRecord.currentPage;
    const finalTotalPages = updateData.totalPages ?? existingRecord.totalPages;

    // VALIDAZIONE: CURRENT_PAGE NON PUO' ESSERE MAGGIORE DI TOTAL_PAGES
    if (finalCurrentPage > finalTotalPages) {
      throw new Error("CURRENT_PAGE_EXCEEDS_TOTAL");
    }

    // ESEGUO L'AGGIORNAMENTO
    const [updatedRecord] = await db
      .update(userBooks)
      .set(updateData)
      .where(and(eq(userBooks.id, id), eq(userBooks.userId, userId)))
      .returning();
    return updatedRecord ?? null;
  } catch (error) {
    console.error("Error updating record:", error);
    throw error; // Rilancia l'errore per essere gestito a un livello superiore
  }
}
