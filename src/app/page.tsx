"use client";

import React, { useState } from "react";
import ExploredBooks from "./components/ExploredBooks";
import BookContent from "./components/BookContent";
import { parseAllMetadata } from "./utils/metadataParser";
import { storeBookData } from "./services/bookService";
import { styles } from "./styles/styles";

interface BookMetadata {
  title: string;
  author: string;
  language: string;
  notes: string;
  credits: string;
}

export default function BooksPage() {
  const { layout, text, button, input } = styles;
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
  const [isLoading, setIsLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

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
    setIsLoading(true);
    setAnalysisComplete(false);
    try {
      const response = await fetch(`/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const result = await response.json();
      setSummary(result.fullSummary);
      setAnalysisComplete(true);
    } catch (error) {
      console.error("Error summarizing book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={layout.page}>
      <div
        className={`${layout.wrapper} flex flex-col items-center justify-center min-h-[70vh]`}
      >
        <div className="text-center w-full max-w-3xl">
          <h1 className={text.h1}>Project Gutenberg Books</h1>

          <div className={styles.input.container}>
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

        {content && (
          <BookContent
            content={content}
            summary={summary}
            parsedMetadata={parsedMetadata}
            isLoading={isLoading}
            analysisComplete={analysisComplete}
            onSummarize={summarizeBook}
          />
        )}
      </div>

      <div className={`${layout.wrapper} mt-16`}>
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
