import { NextResponse } from "next/server";
import axios from "axios";

const SAMBANOVA_API_KEY = process.env.SAMBANOVA_API_KEY;
const SAMBANOVA_MODEL_ID = "Meta-Llama-3.1-8B-Instruct";

// GET: Fetches content and metadata from Project Gutenberg
export async function GET(
  req: Request,
  context: { params: { bookId: string } }
) {
  const { bookId } = context.params;
  const contentUrl = `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`;
  const metadataUrl = `https://www.gutenberg.org/ebooks/${bookId}`;

  try {
    // Fetch the book content
    const contentResponse = await fetch(contentUrl);
    if (!contentResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch book content" },
        { status: 500 }
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

// POST: Summarizes the content using SambaNova API
export async function POST(req: Request) {
  const { content } = await req.json();

  // Split content into chunks for summarization
  const words = content.split(" ").slice(0, 10000);
  const chunks = [
    words.slice(0, 4000).join(" "),
    words.slice(4000, 8000).join(" "),
    words.slice(8000, 10000).join(" "),
  ];

  const summaries = [];
  for (let i = 0; i < chunks.length; i++) {
    try {
      const response = await axios.post(
        "https://api.sambanova.ai/v1/chat/completions",
        {
          stream: false,
          model: SAMBANOVA_MODEL_ID,
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Summarize this text: ${chunks[i]}` },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${SAMBANOVA_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const chunkSummary =
        response.data.choices[0]?.message?.content || "Summary unavailable";
      summaries.push(chunkSummary);
    } catch (error) {
      console.error("Error with SambaNova API:", error);
      summaries.push("Error generating summary for this chunk.");
    }
  }

  const fullSummary = summaries.join(" ");
  return NextResponse.json({ fullSummary });
}
