import { db, userBooks, books } from "@/db/db";
import { eq } from "drizzle-orm";

// Verifica se esistono record con un certo id in qualsiasi tabella
export async function existsRecord(
  id: number,
  table: typeof userBooks | typeof books,
) {
  const result = await db.select().from(table).where(eq(table.id, id));
  return result.length > 0;
}
