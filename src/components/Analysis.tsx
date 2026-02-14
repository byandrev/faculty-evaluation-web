import { useAnalysis } from "../hooks/useAnalysis";
import { Card, CardContent } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const DANGER_LEVELS: Record<string, string> = {
  LABEL_0: "Normal",
  LABEL_1: "Critical",
  LABEL_2: "Very Critical",
};

const SENTIMENT_COLORS: Record<string, string> = {
  POS: "bg-green-100 text-green-800",
  NEG: "bg-red-100 text-red-800",
  NEU: "bg-gray-100 text-gray-800",
};

const DANGER_COLORS: Record<string, string> = {
  LABEL_0: "bg-green-100 text-green-800",
  LABEL_1: "bg-yellow-100 text-yellow-800",
  LABEL_2: "bg-red-100 text-red-800",
};

function Analysis() {
  const { analysisResults } = useAnalysis();

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
      <h2 className="text-2xl font-bold mb-4">Analysis</h2>

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
                        className={`px-2 py-1 rounded-full text-xs font-bold ${DANGER_COLORS[result.danger.label] || "bg-gray-100 text-gray-800"}`}
                      >
                        {DANGER_LEVELS[result.danger.label]}
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell>
                    {result.danger
                      ? `${(result.danger.score * 100).toFixed(1)}%`
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
