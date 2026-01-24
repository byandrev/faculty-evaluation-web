import { useAnalysis } from "../hooks/useAnalysis";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

const DANGER_LEVELS: Record<string, string> = {
  LABEL_0: "Normal",
  LABEL_1: "Critical",
  LABEL_2: "Very Critical",
};

function Analysis() {
  const { analysisResults } = useAnalysis();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analysis</h2>

      <Card>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Sentiment Analysis</h3>
            {analysisResults?.sentiment ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Dominant Sentiment:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      analysisResults.sentiment.output === "POS"
                        ? "bg-green-100 text-green-800"
                        : analysisResults.sentiment.output === "NEG"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {analysisResults.sentiment.output}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Positive</p>

                    <Progress
                      value={analysisResults.sentiment.probas.POS * 100}
                      className="h-2 [&>div]:bg-gray-400"
                    />

                    <p className="text-xs font-medium">
                      {(analysisResults.sentiment.probas.POS * 100).toFixed(1)}%
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Neutral</p>

                    <Progress
                      value={analysisResults.sentiment.probas.NEU * 100}
                      className="h-2 [&>div]:bg-gray-400"
                    />

                    <p className="text-xs font-medium">
                      {(analysisResults.sentiment.probas.NEU * 100).toFixed(1)}%
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Negative</p>

                    <Progress
                      value={analysisResults.sentiment.probas.NEG * 100}
                      className="h-2 [&>div]:bg-gray-400"
                    />

                    <p className="text-xs font-medium">
                      {(analysisResults.sentiment.probas.NEG * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No sentiment analysis data available.
              </p>
            )}
          </div>

          <div className="h-px bg-gray-200" />

          <div>
            <h3 className="text-lg font-semibold mb-3">Danger Level</h3>
            {analysisResults?.danger ? (
              <div className="space-y-4">
                <div className="flex items-end justify-between mb-2">
                  <span className="font-medium text-sm">Score</span>

                  <div className="flex items-center gap-2 flex-col">
                    <span className="font-bold text-lg">
                      {DANGER_LEVELS[analysisResults.danger.label]}
                    </span>

                    <span className="font-bold">
                      {(analysisResults.danger.score * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <Progress
                  value={analysisResults.danger.score * 100}
                  className="h-2 [&>div]:bg-gray-400"
                />
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No danger analysis data available.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Analysis;
