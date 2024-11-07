export function parseTitle(metadata: string): string {
  try {
    // Look for the meta title tag
    const titleMatch = metadata.match(/<meta name="title" content="([^"]+)"/);
    if (titleMatch && titleMatch[1]) {
      // Remove "by [Author Name]" from the title if present
      return titleMatch[1].split(" by ")[0].trim();
    }

    // Fallback: try to find h1 tag
    const h1Match = metadata.match(/<h1[^>]*>([^<]+)<\/h1>/);
    if (h1Match && h1Match[1]) {
      return h1Match[1].split(" by ")[0].trim();
    }

    return "Unknown Title";
  } catch (error) {
    console.error("Error parsing title:", error);
    return "Unknown Title";
  }
}

export function parseAuthor(metadata: string): string {
  try {
    // Look for the author in the meta title tag
    const titleMatch = metadata.match(
      /<meta name="title" content="[^"]+ by ([^"]+)"/
    );
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1].trim();
    }

    // Fallback: try to find author link
    const authorMatch = metadata.match(
      /typeof="pgterms:agent"[^>]*>([^<]+)<\/a>/
    );
    if (authorMatch && authorMatch[1]) {
      return authorMatch[1].trim();
    }

    return "Unknown Author";
  } catch (error) {
    console.error("Error parsing author:", error);
    return "Unknown Author";
  }
}

export function parseLanguage(metadata: string): string {
  try {
    const languageMatch = metadata.match(
      /<tr[^>]*>[\s\S]*?<th>Language<\/th>[\s\S]*?<td>([^<]+)<\/td>/
    );
    return languageMatch ? languageMatch[1].trim() : "Unknown Language";
  } catch (error) {
    console.error("Error parsing language:", error);
    return "Unknown Language";
  }
}

export function parseNotes(metadata: string): string {
  try {
    const noteMatch = metadata.match(
      /<tr[^>]*>[\s\S]*?<th>Note<\/th>[\s\S]*?<td>([^<]+)<\/td>/
    );
    return noteMatch ? noteMatch[1].trim() : "No notes available";
  } catch (error) {
    console.error("Error parsing notes:", error);
    return "No notes available";
  }
}

export function parseCredits(metadata: string): string {
  try {
    const creditsMatch = metadata.match(
      /<tr[^>]*>[\s\S]*?<th>Credits<\/th>[\s\S]*?<td>([\s\S]*?)<\/td>/
    );
    return creditsMatch ? creditsMatch[1].trim() : "No credits available";
  } catch (error) {
    console.error("Error parsing credits:", error);
    return "No credits available";
  }
}

// Helper function to parse all metadata at once
export function parseAllMetadata(metadata: string) {
  return {
    title: parseTitle(metadata),
    author: parseAuthor(metadata),
    language: parseLanguage(metadata),
    notes: parseNotes(metadata),
    credits: parseCredits(metadata),
  };
}
