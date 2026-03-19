import { useState } from "react";
import { useAnalysis } from "../hooks/useAnalysis";
import summarizeComments, {
  type SummaryResponse,
} from "../services/api/Summarize";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const SENTIMENT_COLORS: Record<string, string> = {
  POS: "bg-green-100 text-green-800",
  NEG: "bg-red-100 text-red-800",
  NEU: "bg-gray-100 text-gray-800",
};

const DANGER_COLORS: Record<string, string> = {
  bueno: "bg-green-100 text-green-800",
  bajo: "bg-green-100 text-green-800",
  normal: "bg-green-100 text-green-800",
  critico: "bg-yellow-100 text-yellow-800",
  medio: "bg-yellow-100 text-yellow-800",
  alto: "bg-red-100 text-red-800",
  muy_critico: "bg-red-100 text-red-800",
};

function Analysis() {
  const { analysisResults } = useAnalysis();
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const handleGenerateSummary = async () => {
    if (!analysisResults || analysisResults.length === 0) return;

    setIsLoadingSummary(true);
    setSummaryError(null);

    try {
      const comments = analysisResults.map((result) => result.comment);
      const response = await summarizeComments(comments);
      setSummary(response);
    } catch (error) {
      setSummaryError(
        error instanceof Error ? error.message : "Error generating summary",
      );
    } finally {
      setIsLoadingSummary(false);
    }
  };

  if (!analysisResults || analysisResults.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Analysis</h2>
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <p className="text-lg font-medium">No results to display</p>
            <p className="text-sm">
              Submit a comment or upload a CSV file to see the analysis.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Analysis</h2>
        <Button onClick={handleGenerateSummary} disabled={isLoadingSummary}>
          {isLoadingSummary ? "Generating..." : "Generate Summary"}
        </Button>
      </div>

      {summaryError && (
        <Card className="mb-4 border-red-200 bg-red-50">
          <CardContent className="py-3">
            <p className="text-red-600 text-sm">{summaryError}</p>
          </CardContent>
        </Card>
      )}

      {summary && (
        <Card className="mb-4 border-blue-200 bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-800">
              Comments Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-gray-700 mb-2">{summary.summary}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>Total comments: {summary.total_comments}</span>
              <span>Status: {summary.status}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead className="w-30">Sentiment</TableHead>
                <TableHead className="w-25">POS</TableHead>
                <TableHead className="w-25">NEU</TableHead>
                <TableHead className="w-25">NEG</TableHead>
                <TableHead className="w-30">Danger Level</TableHead>
                <TableHead className="w-25">Score</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {analysisResults.map((result, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>

                  <TableCell
                    className="max-w-75 truncate"
                    title={result.comment}
                  >
                    {result.comment || "-"}
                  </TableCell>

                  <TableCell>
                    {result.sentiment ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${SENTIMENT_COLORS[result.sentiment.output] || "bg-gray-100 text-gray-800"}`}
                      >
                        {result.sentiment.output}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell>
                    {result.sentiment
                      ? `${(result.sentiment.probas.POS * 100).toFixed(1)}%`
                      : "-"}
                  </TableCell>

                  <TableCell>
                    {result.sentiment
                      ? `${(result.sentiment.probas.NEU * 100).toFixed(1)}%`
                      : "-"}
                  </TableCell>

                  <TableCell>
                    {result.sentiment
                      ? `${(result.sentiment.probas.NEG * 100).toFixed(1)}%`
                      : "-"}
                  </TableCell>

                  <TableCell>
                    {result.danger ? (
                      <span
                        className={`px-2 py-1 uppercase rounded-full text-xs font-bold ${DANGER_COLORS[result.danger.description] || "bg-gray-100 text-gray-800"}`}
                      >
                        {result.danger.description}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell>
                    {result.danger
                      ? `${(result.danger.label.score * 100).toFixed(1)}%`
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="py-2 text-center text-sm text-muted-foreground">
        {analysisResults.length} result{analysisResults.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export default Analysis;
