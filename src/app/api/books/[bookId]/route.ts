import { NextResponse } from "next/server";

// GET: Fetches content and metadata from Project Gutenberg
export async function GET(request: Request) {
  const bookId = request.url.match(/\/books\/(\d+)/)?.[1] ?? "";
  const contentUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`;
  const metadataUrl = `https://www.gutenberg.org/ebooks/${bookId}`;

  try {
    // Fetch the book content
    const contentResponse = await fetch(contentUrl);
    if (!contentResponse.ok) {
      return NextResponse.json(
        { error: "Book not found in Gutenberg library" },
        { status: 404 }
      );
    }
    const content = await contentResponse.text();

    // Fetch the metadata
    const metadataResponse = await fetch(metadataUrl);
    if (!metadataResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch metadata" },
        { status: 500 }
      );
    }
    let metadata = await metadataResponse.text();
    metadata = metadata.replace(
      /https:\/\/www\.gutenberg\.org\/(gutenberg|cache\/epub|pics)\/([^\s"'>]+)/g,
      "/api/proxy?url=https://www.gutenberg.org/$1/$2"
    );

    // Return JSON response with both content and metadata
    return NextResponse.json({ content, metadata });
  } catch (error) {
    console.error("Error fetching book data:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
