import {
  createContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface AnalysisResults {
  comment: string;
  sentiment: {
    sentence: string;
    probas: {
      NEG: number;
      NEU: number;
      POS: number;
    };
    output: string;
  };
  hate: {
    sentence: string;
    probas: {
      hateful: number;
      targeted: number;
      aggressive: number;
    };
    context: string | null;
    is_multilabel: boolean;
    output: string[];
  };
  danger: {
    label: string;
    score: number;
  };
  status: string;
}

type ResultsContextType = {
  analysisResults: AnalysisResults | null;
  setAnalysisResults: Dispatch<SetStateAction<AnalysisResults | null>>;
};

export const ResultsContext = createContext<ResultsContextType | null>(null);

export function ResultsProvider({ children }: { children: ReactNode }) {
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResults | null>(null);

  const value = useMemo(() => {
    return {
      analysisResults,
      setAnalysisResults,
    };
  }, [analysisResults]);

  return (
    <ResultsContext.Provider value={value}>{children}</ResultsContext.Provider>
  );
}
