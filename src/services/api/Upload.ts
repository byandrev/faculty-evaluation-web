import { API_URL } from "../../config";

import type { AnalysisResults } from "../../context/ResultsContext";

async function uploadCsv(file: File, model: string): Promise<AnalysisResults[]> {
  const formData = new FormData();

  formData.append("file", file);


  const request = await fetch(`${API_URL}/upload/?model=${model}`, {
    method: "POST",
    body: formData,
  });

  if (!request.ok) {
    throw new Error("Failed to upload CSV");
  }

  const data = await request.json();

  return data.results;
}

export default uploadCsv;
