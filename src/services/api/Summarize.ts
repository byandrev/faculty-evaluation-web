import { API_URL } from "../../config";

export interface SummaryResponse {
  summary: string;
  total_comments: number;
  status: string;
}

async function summarizeComments(comments: string[]): Promise<SummaryResponse> {
  const request = await fetch(`${API_URL}/summarize/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comments }),
  });

  if (!request.ok) {
    throw new Error("Failed to generate summary");
  }

  const data = await request.json();
  return data;
}

export default summarizeComments;
