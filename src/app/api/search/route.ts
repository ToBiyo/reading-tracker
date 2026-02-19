import { NextRequest, NextResponse } from "next/server";
import { searchOpenLibrary } from "@/lib/openlibrary";
import { jsonResponse } from "@/lib/helpers/jsonResponseHelper";

// This API route handles search queries for books using the OpenLibrary API.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  // Validate that the query parameter 'q' is provided and not empty
  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 },
    );
  }

  try {
    // Fetch books from OpenLibrary based on the search query
    const books = await searchOpenLibrary(query);

    return jsonResponse({
      success: true,
      message: "Query executed successfully",
      data: books,
    });
  } catch (error) {
    console.error("Search API error:", error);

    return jsonResponse(
      {
        success: false,
        message: "Failed to fetch books from OpenLibrary",
      },
      { status: 500 },
    );
  }
}
