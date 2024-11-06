"use client";

import React, { useState } from "react";
import ExploredBooks from "./components/ExploredBooks";
import { parseAllMetadata } from "./utils/metadataParser";
import { storeBookData } from "./services/bookService";
import BookMetadata from "./components/BookMetadata";
import { styles } from "./styles/styles";

interface BookMetadata {
  title: string;
  author: string;
  language: string;
  notes: string;
  credits: string;
}

export default function BooksPage() {
  const { layout, text, button, input, contentStyle } = styles;
  const [bookId, setBookId] = useState("");
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState("");
  const [summary, setSummary] = useState("");

  const [parsedMetadata, setParsedMetadata] = useState<BookMetadata>({
    title: "",
    author: "",
    language: "",
    notes: "",
    credits: "",
  });

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${bookId}`);
      const result = await response.json();
      setContent(result.content);
      setMetadata(result.metadata);

      const parsedData = parseAllMetadata(result.metadata);
      setParsedMetadata(parsedData);

      await storeBookData(
        parseInt(bookId),
        parsedData.title,
        parsedData.author,
        result.content,
        result.metadata
      );
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const summarizeBook = async () => {
    const response = await fetch(`/api/summarize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const result = await response.json();
    setSummary(result.fullSummary);
  };

  return (
    <div className={layout.page}>
      <div className={layout.wrapper}>
        <h1 className={text.h1}>Project Gutenberg Books</h1>

        {/* Input and Buttons Section */}
        <div className={layout.card}>
          <div className={input.container}>
            <input
              type="text"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              placeholder="Enter Book ID"
              className={input.field}
            />
            <button onClick={fetchBook} className={button.primary}>
              Fetch Book
            </button>
          </div>
        </div>

        {/* Book Metadata Section */}
        {content && (
          <div className={layout.section}>
            <BookMetadata metadata={parsedMetadata} />

            {/* Book Content Section */}
            <div className={layout.card}>
              <h2 className={text.h2}>Book Content</h2>
              <div className="mb-4">
                <p className="text-gray-600 mb-2">
                  Would you like to use AI to summarize this book?
                </p>
                <button onClick={summarizeBook} className={button.secondary}>
                  Summarize
                </button>
              </div>
              <div className={contentStyle.scroll}>
                <pre className={text.pre}>{content}</pre>
              </div>
            </div>

            {/* Summary Section */}
            {summary && (
              <div className={layout.card}>
                <h2 className={text.h2}>Summary</h2>
                <div className={contentStyle.scroll}>
                  <pre className={text.pre}>{summary}</pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Explored Books Section */}
        <ExploredBooks
          setContent={setContent}
          setMetadata={setMetadata}
          setParsedMetadata={setParsedMetadata}
          setBookId={setBookId}
        />
      </div>
    </div>
  );
}
