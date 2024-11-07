import React from "react";
import { styles } from "../styles/styles";

interface BookMetadataProps {
  metadata: {
    title: string;
    author: string;
    language: string;
    notes: string;
    credits: string;
  };
}

export default function BookMetadata({ metadata }: BookMetadataProps) {
  const { layout, text } = styles;

  return (
    <div className={layout.wrapper}>
      <h2 className={text.h2}>Book Information</h2>
      <div className="space-y-1">
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key} className="text-md text-[#4A4A4A]">
            <span className="font-medium">
              {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
            </span>
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}
