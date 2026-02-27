import { NextRequest, NextResponse } from "next/server";
import { getOrCreateBook } from "@/db/books";
import { addBookToList } from "@/db/user-books";
import { AddToListSchema } from "@/lib/validators/userBooks";
import { jsonResponse } from "@/lib/helpers/jsonResponseHelper";

// This API route handles adding a book to a user's list (READ, READING, WISHLIST).

export async function POST(req: NextRequest) {
  // Validate the request body against the AddToListSchema using Zod
  const result = AddToListSchema.safeParse(await req.json());

  // If validation fails, return a 400 Bad Request response with error details
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: result.error.issues },
      { status: 400 },
    );
  }

  const body = result.data;

  try {
    const { title, author, externalId, ...rest } = body;

    // Get or create the book in the book table and retrieve its ID
    const bookId = await getOrCreateBook({
      title: title,
      author: author,
      externalId: externalId,
    });

    // Add the book to the user's list and retrieve the userBook entry
    const userBook = await addBookToList({
      ...rest,
      bookId,
    });

    return jsonResponse({
      success: true,
      message: "Book added successfully",
      data: userBook,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
