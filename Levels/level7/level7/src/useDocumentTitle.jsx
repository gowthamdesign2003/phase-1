// useDocumentTitle.js
import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]); // Re-run effect when title changes
}

export default useDocumentTitle;
