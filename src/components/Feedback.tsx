import { Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useAnalysis } from "../hooks/useAnalysis";
import analyzeComment from "../services/api/Analyze";
import uploadCsv from "../services/api/Upload";

function Feedback() {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("evd");

  const { setAnalysisResults } = useAnalysis();

  const handleSubmit = () => {
    if (!comment.trim()) return;

    setLoading(true);

    analyzeComment(comment, model)
      .then((response) => {
        setAnalysisResults(response);
      })
      .finally(() => setLoading(false));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    uploadCsv(file, model)
      .then((response) => {
        setAnalysisResults(response);
      })
      .finally(() => {
        setLoading(false);
        e.target.value = "";
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <Textarea
        rows={5}
        className="w-full"
        value={comment}
        placeholder="Your feedback..."
        onChange={(e) => setComment(e.target.value)}
        disabled={loading}
      />

      <div className="flex justify-between mt-4">
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="application/csv"
            id="csv-upload"
            className="hidden"
            onChange={handleFileUpload}
            disabled={loading}
          />
          <Label
            htmlFor="csv-upload"
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-2 py-2 cursor-pointer ${
              loading ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Upload className="h-4 w-4" />
            Upload CSV
          </Label>

          <Select
            value={model}
            onValueChange={(value: string | null) => {
              if (value) setModel(value);
            }}
            disabled={loading}
          >
            <SelectTrigger className="w-20 h-8!">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="evd">EVD</SelectItem>
              <SelectItem value="evd2">EVD2</SelectItem>
              <SelectItem value="evd3">EVD3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button disabled={!comment.trim() || loading} onClick={handleSubmit}>
          {loading ? "Analyzing..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

export default Feedback;
