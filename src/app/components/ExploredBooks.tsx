import { useState, useEffect } from "react";
import { getExploredBooks } from "../services/bookService";

interface Book {
  book_id: number;
  title: string;
  author: string;
  accessed_at: string;
}

export default function ExploredBooks() {
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
              onClick={() => {
                // Update the input field with this book's ID
                const input = document.querySelector('input[type="text"]');
                if (input) {
                  (input as HTMLInputElement).value = book.book_id.toString();
                  input.dispatchEvent(new Event("change", { bubbles: true }));
                }
                // Scroll to the top of the page
                window.scrollTo({ top: 0, behavior: "smooth" });
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
