import { useContext } from "react";

import { ResultsContext } from "../context/ResultsContext";

export function useAnalysis() {
  const context = useContext(ResultsContext);

  if (!context) {
    throw new Error("useAnalysis must be used within a ResultsProvider");
  }

  return context;
}
