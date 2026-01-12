import { useAnalysis } from "../hooks/useAnalysis";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

function Analysis() {
  const { analysisResults } = useAnalysis();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analysis</h2>

      <Card>
        <CardContent>
          <h3>
            Sentiment
          </h3>

          {
            analysisResults?.sentiment ? <div>
<p
            className="text-lg font-bold mb-2"
          >{analysisResults.sentiment.output} ({(analysisResults.sentiment.probas[analysisResults.sentiment.output as keyof typeof analysisResults.sentiment.probas] * 100).toFixed(2)}%)</p>

          <Progress value={(analysisResults.sentiment.probas[analysisResults.sentiment.output as keyof typeof analysisResults.sentiment.probas] * 100)} className="w-full" />
            </div> : <>
             <p className="text-gray-500 mt-2">
            No sentiment analysis data available.
          </p>
            </>

          }




        </CardContent>
      </Card>
    </div>
  );
}

export default Analysis;
