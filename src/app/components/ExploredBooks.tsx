"use client";

import { useState, useEffect } from "react";
import { getExploredBooks, fetchBookContents } from "../services/bookService";
import { parseAllMetadata } from "../utils/metadataParser";

interface Book {
  book_id: number;
  title: string;
  author: string;
  accessed_at: string;
}

interface BookMetadata {
  title: string;
  author: string;
  // Add other metadata fields as needed
}

interface ExploredBooksProps {
  setContent: (content: string) => void;
  setMetadata: (metadata: string) => void;
  setParsedMetadata: React.Dispatch<React.SetStateAction<BookMetadata>>;
}

export default function ExploredBooks({
  setContent,
  setMetadata,
  setParsedMetadata,
}: ExploredBooksProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const exploredBooks = await getExploredBooks();
        setBooks(exploredBooks);
      } catch (error) {
        console.error("Error fetching explored books:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (isLoading)
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Loading available books...</h2>
      </div>
    );

  if (books.length === 0)
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          No books have been explored yet. Be the first to add one!
        </h2>
      </div>
    );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Available Books to Explore ({books.length} books)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={`${book.book_id}-${book.accessed_at}`}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-sm text-gray-500 mt-2">
              Book ID: {book.book_id}
            </p>
            <p className="text-sm text-gray-500">
              Added: {new Date(book.accessed_at).toLocaleDateString()}
            </p>
            <button
              onClick={async () => {
                try {
                  const bookData = await fetchBookContents(book.book_id);
                  if (bookData) {
                    setContent(bookData.full_text);
                    setMetadata(bookData.metadata);
                  }
                  const parsedMetadata = parseAllMetadata(bookData.metadata);
                  setParsedMetadata(parsedMetadata);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } catch (error) {
                  console.error("Error loading book:", error);
                }
              }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full"
            >
              Load This Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
