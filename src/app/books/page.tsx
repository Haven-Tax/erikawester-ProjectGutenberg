"use client";

import { useState } from "react";
import { parseTitle, parseAuthor } from "../utils/metadataParser";
import { storeBookData } from "../services/bookService";
import ExploredBooks from "../components/ExploredBooks";

export default function BooksPage() {
  const [bookId, setBookId] = useState("");
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState("");
  const [summary, setSummary] = useState("");

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${bookId}`);
      const result = await response.json();
      setContent(result.content);
      setMetadata(result.metadata);

      // Extract title and author from metadata
      const title = parseTitle(result.metadata);
      const author = parseAuthor(result.metadata);

      // Store the complete book data
      await storeBookData(
        parseInt(bookId),
        title,
        author,
        result.content, // This is the full text
        result.metadata
      );

      console.log("metadata", result.metadata);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const summarizeBook = async () => {
    const response = await fetch(`/api/books/${bookId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const result = await response.json();
    setSummary(result.fullSummary);
  };

  return (
    <div>
      <h1>Project Gutenberg Books</h1>
      <input
        type="text"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Enter Book ID"
      />
      <button onClick={fetchBook}>Fetch Book</button>
      <button onClick={summarizeBook} disabled={!content}>
        Summarize
      </button>

      <div>
        <h2>Book Content</h2>
        <div
          style={{
            maxHeight: "400px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            padding: "1em",
          }}
        >
          <pre>{content}</pre>
        </div>
        <h2>Metadata</h2>
        <div dangerouslySetInnerHTML={{ __html: metadata }} />
        <h2>Summary</h2>
        <pre>{summary}</pre>
      </div>
      <h2>Explored Books</h2>
      <ExploredBooks />
    </div>
  );
}
