import { useState } from "react";
export const useTruncate = (limit, mode = "words") => {
  const [truncatedText, setTruncatedText] = useState("");

  const truncate = (text) => {
    if (mode === "words") {
      const words = text?.split(" ");
      setTruncatedText(
        words?.slice(0, limit).join(" ") + (words?.length > limit ? "..." : "")
      );
    } else if (mode === "chars") {
      setTruncatedText(
        text?.slice(0, limit) + (text?.length > limit ? "..." : "")
      );
    }
  };

  return [truncatedText, truncate];
};
