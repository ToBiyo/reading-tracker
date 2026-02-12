export interface ExternalBook {
  title: string;
  author: string;
  coverUrl: string | null;
  externalId: string; // work ID
  /* editionKey?: string;  */ // edizione specifica
}

export async function searchOpenLibrary(
  query: string,
): Promise<ExternalBook[]> {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("OpenLibrary request failed");
  }

  const data = await response.json();

  return data.docs.slice(0, 10).map((book: any) => ({
    title: book.title,
    author: book.author_name?.[0] ?? "Unknown",
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      : null,

    externalId: book.key, // work ID
    /* editionKey: book.edition_key?.[0] ?? undefined,  */ // prima edizione trovata
  }));
}
