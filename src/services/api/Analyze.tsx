import { API_URL } from "../../config";

import type { AnalysisResults } from "../../context/ResultsContext";

async function analyzeComment(comment: string): Promise<AnalysisResults[]> {
  const request = await fetch(`${API_URL}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: comment }),
  });

  if (!request.ok) {
    throw new Error("Failed to analyze comment");
  }

  const data = await request.json();

  return [data];
}

export default analyzeComment;
