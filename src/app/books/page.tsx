"use client";
// import { useEffect, useState } from "react";

// type BookData = {
//   content: string;
//   metadata: string;
//   summary: string;
// };

// export default function BooksPage() {
//   // set up useState
//   const [data, setData] = useState<BookData | null>(null);
//   const [bookId, setBookId] = useState("");
//   const [error, setError] = useState(null);

//   const fetchBook = async () => {
//     setError(null);
//     try {
//       const response = await fetch(`/api/books/${bookId}`);
//       const result = await response.json();
//       if (response.ok) {
//         console.log("response", response);
//         setData(result);
//         console.log("result", result);
//       } else {
//         setError(result.error || "An error occurred");
//       }
//     } catch (err) {
//       console.error("Failed to fetch book data");
//     }
//   };

//   return (
//     <div>
//       <h1>Project Gutenberg Books</h1>
//       <input
//         type="text"
//         value={bookId}
//         onChange={(e) => setBookId(e.target.value)}
//         placeholder="Enter Book ID"
//       />
//       <button onClick={fetchBook}>Fetch Book</button>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {data && (
//         <div>
//           <h1>Book Content</h1>
//           <pre style={{ maxHeight: "400px", overflowY: "scroll" }}>
//             {data.content}
//           </pre>
//           <h1>Book Summary</h1>
//           <pre style={{ maxHeight: "400px", overflowY: "scroll" }}>
//             {data.summary}
//           </pre>
//           <h2> Metadata</h2>
//           <div dangerouslySetInnerHTML={{ __html: data.metadata }} />
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";

export default function BooksPage() {
  const [bookId, setBookId] = useState("");
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState("");
  const [summary, setSummary] = useState("");

  const fetchBook = async () => {
    const response = await fetch(`/api/books/${bookId}`);
    const result = await response.json();
    setContent(result.content);
    setMetadata(result.metadata);
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
    </div>
  );
}
