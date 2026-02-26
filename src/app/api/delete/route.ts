import { NextRequest, NextResponse } from "next/server";
import { deleteUserBook } from "@/db/deleteUserBook";
import { deleteBook } from "@/db/deleteBook";
import { userBooks } from "@/db/schema";
import { existsRecord } from "@/db/existsRecord";
import { jsonResponse } from "@/lib/helpers/jsonResponseHelper";
import { deleteUserBookSchema } from "@/lib/validators/userBookId";

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  const parsedResult = deleteUserBookSchema.safeParse(body);

  if (!parsedResult.success) {
    return jsonResponse(
      {
        success: false,
        message: "Invalid input",
        error: parsedResult.error.message,
      },
      { status: 400 },
    );
  }

  const { userBookId } = parsedResult.data;

  try {
    // 1️⃣ Elimina il record dalla tabella userBooks
    const deleted = await deleteUserBook(userBookId);
    if (!deleted) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const { bookId } = deleted;
    const exists = await existsRecord(bookId, userBooks);

    // 3️⃣ Se nessun altro record, elimina anche da books
    if (!exists) {
      await deleteBook(bookId);
    }

    return jsonResponse({ success: true, message: "Book removed" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return jsonResponse(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
