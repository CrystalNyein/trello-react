import { useEffect } from "react";
export const useDocumentEvent = (event) => {
  useEffect(() => {
    document.addEventListener(event.type, event.callback);
    return () => document.removeEventListener(event.type, event.callback);
  }, [event]);
};
