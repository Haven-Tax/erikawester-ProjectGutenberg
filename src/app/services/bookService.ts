// src/services/bookService.ts

import supabase from "../utils/supabaseClient";

export async function storeBookData(
  bookId: number,
  title: string,
  author: string,
  fullText: string,
  metadata: string
) {
  // Check if book already exists
  const { data: existingBook } = await supabase
    .from("books_history")
    .select("*")
    .eq("book_id", bookId)
    .single();

  if (existingBook) {
    console.log("Book already exists:", existingBook);
    return;
  }

  // if book doesn't exist, add to db
  const { data, error } = await supabase
    .from("books_history")
    .insert([
      {
        book_id: bookId,
        title,
        author,
        full_text: fullText,
        metadata,
        accessed_at: new Date(),
      },
    ])
    .select();

  if (error) {
    console.error("Error storing book data:", error);
    throw error;
  }
  return data;
}

export async function getExploredBooks() {
  const { data, error } = await supabase
    .from("books_history")
    .select("book_id, title, author, accessed_at")
    .order("accessed_at", { ascending: false }) // Most recent first

  if (error) {
    console.error("Error fetching explored books:", error);
    throw error;
  }
  return data;
}

// remove this after testing complete
export async function testDatabaseConnection() {
  // Insert a test entry
  const { data: insertData, error: insertError } = await supabase
    .from("books_history")
    .insert([
      {
        book_id: 99999,
        title: "Test Title",
        author: "Test Author",
        accessed_at: new Date(),
      },
    ]);

  if (insertError) {
    console.error("Error inserting test data:", insertError);
    return { success: false, message: insertError.message };
  } else {
    console.log("Test data inserted:", insertData);
  }

  // Retrieve the test entry
  const { data: fetchData, error: fetchError } = await supabase
    .from("books_history")
    .select("*")
    .eq("book_id", 99999);

  if (fetchError) {
    console.error("Error fetching test data:", fetchError);
    return { success: false, message: fetchError.message };
  } else {
    console.log("Test data fetched:", fetchData);
  }

  return { success: true, data: fetchData };
}
