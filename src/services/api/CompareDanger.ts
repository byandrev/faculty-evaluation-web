import { API_URL } from "../../config";

type DangerLabel = {
  label: string;
  score: number;
};

type DangerResult = {
  label: DangerLabel;
  description: string;
};

export type DangerComparisonResponse = {
  comment: string;
  danger_comparison: {
    evd: DangerResult;
    evd2: DangerResult;
    evd3: DangerResult;
  };
  metrics?: {
    time_seconds: number;
    cpu_seconds: number;
    ram_delta_mb: number;
  };
  status: string;
};

async function compareDanger(
  comment: string,
): Promise<DangerComparisonResponse> {
  const request = await fetch(`${API_URL}/comments/compare-danger/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: comment }),
  });

  if (!request.ok) {
    throw new Error("Failed to compare danger models");
  }

  return request.json();
}

export default compareDanger;
