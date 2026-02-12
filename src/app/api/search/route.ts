import { NextRequest, NextResponse } from "next/server";
import { searchOpenLibrary } from "@/lib/openlibrary";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 },
    );
  }

  try {
    const books = await searchOpenLibrary(query);
    return NextResponse.json(books);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch books from OpenLibrary" },
      { status: 500 },
    );
  }
}
