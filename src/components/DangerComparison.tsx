import { useState } from "react";
import compareDanger, {
  type DangerComparisonResponse,
} from "../services/api/CompareDanger";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";

const DANGER_COLORS: Record<string, Record<string, string>> = {
  evd: {
    normal: "bg-green-100 text-green-800",
    critico: "bg-yellow-100 text-yellow-800",
    muy_critico: "bg-red-100 text-red-800",
  },
  evd2: {
    bueno: "bg-green-100 text-green-800",
    bajo: "bg-gray-100 text-gray-800",
    critico: "bg-yellow-100 text-yellow-800",
    muy_critico: "bg-red-100 text-red-800",
  },
  evd3: {
    bajo: "bg-green-100 text-green-800",
    medio: "bg-yellow-100 text-yellow-800",
    alto: "bg-red-100 text-red-800",
  },
};

function DangerComparison() {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DangerComparisonResponse | null>(null);

  const handleCompare = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await compareDanger(comment);

      setResult(response);
    } catch (compareError) {
      setError(
        compareError instanceof Error
          ? compareError.message
          : "Error comparing models",
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Danger Model Comparison</h2>

      <Textarea
        rows={4}
        value={comment}
        placeholder="Write one comment to compare EVD, EVD2 and EVD3..."
        onChange={(event) => setComment(event.target.value)}
        disabled={loading}
      />

      <div className="flex justify-end mt-4">
        <Button onClick={handleCompare} disabled={!comment.trim() || loading}>
          {loading ? "Comparing..." : "Compare Danger"}
        </Button>
      </div>

      {error && (
        <Card className="mb-4 border-red-200 bg-red-50">
          <CardContent className="py-3">
            <p className="text-red-600 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <div>
          <p>Comparison Result</p>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{result.comment}</p>

            <div className="grid gap-3 md:grid-cols-3">
              {(["evd", "evd2", "evd3"] as const).map((modelName) => {
                const modelResult = result.danger_comparison[modelName];
                const colorClass =
                  DANGER_COLORS[modelName][modelResult.description] ||
                  "bg-gray-100 text-gray-800";

                return (
                  <Card key={modelName} className="border">
                    <CardContent className="pt-6 space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {modelName}
                      </p>

                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-bold uppercase ${colorClass}`}
                      >
                        {modelResult.description}
                      </span>

                      <p className="text-sm">
                        Label: <strong>{modelResult.label.label}</strong>
                      </p>

                      <p className="text-sm">
                        Score: {(modelResult.label.score * 100).toFixed(1)}%
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DangerComparison;
