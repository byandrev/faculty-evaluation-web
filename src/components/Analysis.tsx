import { useEffect, useState } from "react";
import { useAnalysis } from "../hooks/useAnalysis";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { Progress } from "./ui/progress";

const DANGER_LEVELS: Record<string, string> = {
  LABEL_0: "Normal",
  LABEL_1: "Critical",
  LABEL_2: "Very Critical",
};

function Analysis() {
  const { analysisResults } = useAnalysis();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    onSelect();

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

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

      <div className="flex flex-col items-center px-12">
        <Carousel setApi={setApi} className="w-full max-w-xl">
          <CarouselContent>
            {analysisResults?.map((result, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="space-y-6 pt-6">
                      {result.comment && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Comment
                          </h3>
                          <p className="text-gray-700 dark:text-gray-300 italic">
                            "{result.comment}"
                          </p>
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-semibold mb-3">
                          Sentiment Analysis
                        </h3>
                        {result.sentiment ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">
                                Dominant Sentiment:
                              </span>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-bold ${
                                  result.sentiment.output === "POS"
                                    ? "bg-green-100 text-green-800"
                                    : result.sentiment.output === "NEG"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {result.sentiment.output}
                              </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div className="space-y-1">
                                <p className="text-xs text-gray-500">
                                  Positive
                                </p>

                                <Progress
                                  value={result.sentiment.probas.POS * 100}
                                  className="h-2 [&>div]:bg-gray-400"
                                />

                                <p className="text-xs font-medium">
                                  {(result.sentiment.probas.POS * 100).toFixed(
                                    1,
                                  )}
                                  %
                                </p>
                              </div>

                              <div className="space-y-1">
                                <p className="text-xs text-gray-500">Neutral</p>

                                <Progress
                                  value={result.sentiment.probas.NEU * 100}
                                  className="h-2 [&>div]:bg-gray-400"
                                />

                                <p className="text-xs font-medium">
                                  {(result.sentiment.probas.NEU * 100).toFixed(
                                    1,
                                  )}
                                  %
                                </p>
                              </div>

                              <div className="space-y-1">
                                <p className="text-xs text-gray-500">
                                  Negative
                                </p>

                                <Progress
                                  value={result.sentiment.probas.NEG * 100}
                                  className="h-2 [&>div]:bg-gray-400"
                                />

                                <p className="text-xs font-medium">
                                  {(result.sentiment.probas.NEG * 100).toFixed(
                                    1,
                                  )}
                                  %
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
                        <h3 className="text-lg font-semibold mb-3">
                          Danger Level
                        </h3>

                        {result.danger ? (
                          <div className="space-y-4">
                            <div className="flex items-end justify-between mb-2">
                              <span className="font-medium text-sm">Score</span>

                              <div className="flex items-center gap-2 flex-col">
                                <span className="font-bold text-lg">
                                  {DANGER_LEVELS[result.danger.label]}
                                </span>

                                <span className="font-bold">
                                  {(result.danger.score * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>

                            <Progress
                              value={result.danger.score * 100}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </div>
  );
}

export default Analysis;
