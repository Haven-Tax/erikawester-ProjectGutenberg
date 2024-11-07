import { NextResponse } from "next/server";
import axios from "axios";

const SAMBANOVA_API_KEY = process.env.SAMBANOVA_API_KEY;
const SAMBANOVA_MODEL_ID = "Meta-Llama-3.1-8B-Instruct";

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
  try {
    const response = await axios.post(
      "https://api.sambanova.ai/v1/chat/completions",
      {
        stream: false,
        model: SAMBANOVA_MODEL_ID,
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `Based on these three sequential parts of the book:
  
  Part 1: ${chunks[0]}
  
  Part 2: ${chunks[1]}
  
  Part 3: ${chunks[2]}

  Please provide ONE response with:
  1. A single comprehensive summary of the entire story (combining all parts)
  2. A list of ONLY the top 5 main characters with brief descriptions
  
  Do not summarize each part separately. Provide just one unified summary.`,
          },
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

  const fullSummary = summaries.join(" ");
  return NextResponse.json({ fullSummary });
}
