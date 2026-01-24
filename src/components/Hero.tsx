import { AlertTriangle, BrainCircuit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function Hero() {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-green-500 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <BrainCircuit className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
              Sentiment Analysis
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              Determines the emotional tone of the comment. Results are
              categorized as:
            </p>

            <ul className="list-disc list-inside mt-2 text-sm space-y-1 ml-1 text-muted-foreground">
              <li>
                <span className="font-semibold">Positive</span>: Encouraging and
                constructive.
              </li>
              <li>
                <span className="font-semibold">Neutral</span>: Factual and
                objective.
              </li>
              <li>
                <span className="font-semibold">Negative</span>: Critical or
                expressing dissatisfaction.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <AlertTriangle className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-400" />
              Danger Level
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              Flags comments that may require immediate attention. Levels
              include:
            </p>

            <ul className="list-disc list-inside mt-2 text-sm space-y-1 ml-1 text-muted-foreground">
              <li>
                <span className="font-semibold">Normal</span>: Standard
                feedback.
              </li>
              <li>
                <span className="font-semibold">Critical</span>: Concerning
                content that warrants review.
              </li>
              <li>
                <span className="font-semibold">Very Critical</span>: Severe
                issues or potential threats.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Hero;
