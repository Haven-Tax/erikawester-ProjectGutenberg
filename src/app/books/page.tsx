"use client";

import React from "react";
import { useState } from "react";
import ExploredBooks from "../components/ExploredBooks";
import { parseAllMetadata } from "../utils/metadataParser";
import { storeBookData } from "../services/bookService";
interface BookMetadata {
  title: string;
  author: string;
  language: string;
  notes: string;
  credits: string;
}

export default function BooksPage() {
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
    const response = await fetch(`/api/books/${bookId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const result = await response.json();
    setSummary(result.fullSummary);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Project Gutenberg Books
        </h1>

        {/* Input and Buttons Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              placeholder="Enter Book ID"
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={fetchBook}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fetch Book
            </button>
            <button
              onClick={summarizeBook}
              disabled={!content}
              className={`px-6 py-3 rounded-lg transition-colors ${
                content
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Summarize
            </button>
          </div>
        </div>

        {content && (
          <div className="space-y-8">
            {/* Metadata Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Book Information</h2>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Title:</span>{" "}
                  <span>{parsedMetadata.title}</span>
                </div>
                <div>
                  <span className="font-semibold">Author:</span>{" "}
                  <span>{parsedMetadata.author}</span>
                </div>
                <div>
                  <span className="font-semibold">Language:</span>{" "}
                  <span>{parsedMetadata.language}</span>
                </div>
                <div>
                  <span className="font-semibold">Note:</span>{" "}
                  <span>{parsedMetadata.notes}</span>
                </div>
                <div>
                  <span className="font-semibold">Credits:</span>{" "}
                  <span>{parsedMetadata.credits}</span>
                </div>
              </div>
            </div>

            {/* Book Content Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Book Content</h2>
              <div className="max-h-[400px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
                <pre className="whitespace-pre-wrap font-sans">{content}</pre>
              </div>
            </div>

            {/* Summary Section */}
            {summary && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap font-sans">{summary}</pre>
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
        />
      </div>
    </div>
  );
}
