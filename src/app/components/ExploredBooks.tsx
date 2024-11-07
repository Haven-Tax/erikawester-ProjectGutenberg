"use client";

import { useState, useEffect } from "react";
import { getExploredBooks, fetchBookContents } from "../services/bookService";
import { parseAllMetadata } from "../utils/metadataParser";
import { styles } from "../styles/styles";

interface Book {
  book_id: number;
  title: string;
  author: string;
  accessed_at: string;
}

interface ExploredBooksProps {
  setContent: (content: string) => void;
  setMetadata: (metadata: string) => void;
  setBookId: (bookId: string) => void;
  setParsedMetadata: React.Dispatch<
    React.SetStateAction<{
      title: string;
      author: string;
      language: string;
      notes: string;
      credits: string;
    }>
  >;
}

export default function ExploredBooks({
  setContent,
  setMetadata,
  setParsedMetadata,
}: ExploredBooksProps) {
  const { layout, text, button } = styles;
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookId, setBookId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBooks() {
      setIsLoading(true);
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
      <div className={layout.section}>
        <h2 className={text.h2}>Loading available books...</h2>
      </div>
    );

  if (books.length === 0)
    return (
      <div className={layout.section}>
        <h2 className={text.h2}>
          No books have been explored yet. Be the first to add one!
        </h2>
      </div>
    );

  return (
    <div className={layout.section}>
      <h2 className={text.h4}>
        Previously Explored Books ({books.length} books)
      </h2>
      <h3 className={text.h3}>
        Check out books that users have previously explored on our site! The
        more books you search, the more books will be added here! Let's get
        reading... 👀
      </h3>
      <div className={styles.layout.grid}>
        {books.map((book) => (
          <div key={book.book_id} className={styles.card.container}>
            <h3 className={styles.card.title}>{book.title}</h3>
            <p className={styles.card.author}>{book.author}</p>
            <p className={styles.card.meta}>Book ID: {book.book_id}</p>
            <p className={styles.card.meta}>
              Added: {new Date(book.accessed_at).toLocaleDateString()}
            </p>
            <div className={styles.card.button}>
              <button
                onClick={async () => {
                  try {
                    const bookData = await fetchBookContents(book.book_id);
                    if (bookData) {
                      setContent(bookData.full_text);
                      setMetadata(bookData.metadata);
                      setBookId(book.book_id.toString());
                    }
                    const parsedMetadata = parseAllMetadata(bookData.metadata);
                    setParsedMetadata(parsedMetadata);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } catch (error) {
                    console.error("Error loading book:", error);
                  }
                }}
                className={styles.button.primary}
              >
                Load This Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}