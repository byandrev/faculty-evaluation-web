import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import analyzeComment from "../services/api/Analyze";
import { useAnalysis } from "../hooks/useAnalysis";

function Feedback() {
  const [comment, setComment] = useState("");

  const { setAnalysisResults } = useAnalysis();

  const handleSubmit = () => {
    analyzeComment(comment).then((response) => {
      setAnalysisResults(response);
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <Textarea
        rows={5}
        className="w-full"
        value={comment}
        placeholder="Your feedback..."
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex justify-end mt-4">
        <Button
          disabled={!comment.trim()}
          onClick={handleSubmit}
        >Submit</Button>
      </div>
    </div>
  );
}

export default Feedback;
