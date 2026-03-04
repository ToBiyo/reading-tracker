import { NextRequest } from "next/server";
import { updateUserBook } from "@/db/updateBook";
import { jsonResponse } from "@/lib/helpers/jsonResponseHelper";
import { updateUserBookSchema } from "@/lib/validators/updateBook";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await req.json();
  const { id } = await params;
  const parsedId = parseInt(id, 10);
  const placeHolderUserId = 2; // Sostituisci con l'ID dell'utente autenticato

  if (Number.isNaN(parsedId)) {
    return jsonResponse(
      {
        success: false,
        message: "Invalid book ID",
      },
      { status: 400 },
    );
  }

  const parsedResult = updateUserBookSchema.safeParse(body);

  if (!parsedResult.success) {
    return jsonResponse(
      {
        success: false,
        message: "Invalid request data",
        error: parsedResult.error.message,
      },
      { status: 400 },
    );
  }

  try {
    const updatedData = parsedResult.data;
    const updatedBook = await updateUserBook(
      parsedId,
      placeHolderUserId,
      updatedData,
    );

    if (!updatedBook) {
      return jsonResponse(
        {
          success: false,
          message: "Book not found",
        },
        { status: 404 },
      );
    }

    return jsonResponse(
      {
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "CURRENT_PAGE_EXCEEDS_TOTAL"
    ) {
      return jsonResponse(
        {
          success: false,
          message: "Current page exceeds total pages",
        },
        { status: 400 },
      );
    }

    return jsonResponse(
      {
        success: false,
        message: "Failed to update book",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
