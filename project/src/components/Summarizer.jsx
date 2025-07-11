import React, { useState } from "react";
import axios from "axios";
import { FileText, Loader2, ArrowLeft } from "lucide-react";

const Summarizer = ({ onBack }) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Please enter some text to summarize");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/openai/summarize`,
        {
          text: text.trim(),
        }
      );

      setResult(response.data.result);
    } catch (err) {
      setError("Failed to summarize text. Please try again.");
      console.error("Summarization error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl">
              <FileText className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Text Summarizer</h1>
              <p className="text-gray-400">
                Transform long text into concise summaries
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="text-input"
                className="block text-sm font-medium text-gray-300 mb-3"
              >
                Enter text to summarize
              </label>
              <textarea
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={8}
                className="w-full px-4 py-4 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Paste your long text here..."
              />
            </div>

            <button
              onClick={handleSummarize}
              disabled={loading || !text.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-black py-4 px-6 rounded-xl font-semibold hover:from-green-400 hover:to-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Summarizing...</span>
                </>
              ) : (
                <span>Summarize Text</span>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-900/50 border border-red-700 rounded-xl">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {result && (
              <div className="p-6 bg-gray-800 border border-gray-700 rounded-xl">
                <h3 className="font-semibold text-green-400 mb-3 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Summary:</span>
                </h3>
                <p className="text-gray-200 leading-relaxed">{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
