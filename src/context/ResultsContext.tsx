import { createContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

export interface AnalysisResults {
  sentiment: {
    output: string,
    probas: {
      NEG: number,
      NEU: number,
      POS: number,
    }
  }
}

type ResultsContextType = {
  analysisResults: AnalysisResults | null;
  setAnalysisResults: Dispatch<SetStateAction<AnalysisResults | null>>;
}

export const ResultsContext = createContext<ResultsContextType | null>(null);

export function ResultsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);

  const value = useMemo(() => {
    return {
      analysisResults,
      setAnalysisResults,
    }
  }, [analysisResults]);

  return <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>;
}
