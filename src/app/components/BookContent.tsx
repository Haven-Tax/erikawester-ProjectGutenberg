import React from "react";
import { styles } from "../styles/styles";
import BookMetadata from "./BookMetadata";

interface BookContentProps {
  content: string;
  summary: string;
  parsedMetadata: {
    title: string;
    author: string;
    language: string;
    notes: string;
    credits: string;
  };
  isLoading: boolean;
  analysisComplete: boolean;
  onSummarize: () => void;
}

export default function BookContent({
  content,
  summary,
  parsedMetadata,
  isLoading,
  analysisComplete,
  onSummarize,
}: BookContentProps) {
  const { layout, text, button, contentStyle } = styles;

  return (
    <div className="w-full mt-16">
      <BookMetadata metadata={parsedMetadata} />

      <div className={layout.section}>
        <div className={layout.wrapper}>
          <h2 className={text.h2}>Book Content 📖</h2>

          <div className={contentStyle.scroll}>
            <pre className={text.pre}>{content}</pre>
          </div>

          <div className="mt-12 mb-4">
            <h2 className={text.h2}>AI Text Analysis 🤖</h2>
            <h4>
              Would you like to use AI to provide a Text Analysis of this book?
            </h4>
            <h5 className="text-gray-600 mb-2 text-sm">
              For when you don&apos;t feel like reading the full book 🤷‍♀
            </h5>
            <div className="mt-8">
              {isLoading ? (
                <div className="inline-block px-4 py-2 bg-gray-100 text-gray-600 rounded-md animate-pulse">
                  Fetching analysis... please hold!
                </div>
              ) : (
                <button onClick={onSummarize} className={button.secondary}>
                  Generate Analysis
                </button>
              )}
              {analysisComplete && !isLoading && (
                <div className="inline-block px-4 py-2 bg-green-100 text-green-600 rounded-md">
                  ✨ Summary and Main Characters Ready!
                </div>
              )}
            </div>
          </div>

          {summary && (
            <>
              <h2 className={text.h2}>Summary</h2>
              <div className={contentStyle.scroll}>
                <pre className={text.pre}>{summary}</pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
