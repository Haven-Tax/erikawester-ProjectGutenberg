import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Gutenberg Books",
  description: "Explore and summarize Project Gutenberg books!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <main>{children}</main>
      </body>
    </html>
  );
}
