import React, { useState } from "react";
import axios from "axios";
import { Image, Loader2, ArrowLeft, Download } from "lucide-react";

const ImageGen = ({ onBack }) => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter an image description");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/gemini/image`,
        { prompt: prompt.trim() }
      );

      setImageUrl(response.data.image);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
      
      console.error("Image generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-700 rounded-xl">
              <Image className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                AI Image Generator
              </h1>
              <p className="text-gray-400">
                Create stunning images from text descriptions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="prompt-input"
                className="block text-sm font-medium text-gray-300 mb-3"
              >
                Describe the image you want to generate
              </label>
              <input
                id="prompt-input"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-4 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="e.g., A beautiful sunset over a mountain lake"
              />
            </div>

            <button
              onClick={handleGenerateImage}
              disabled={loading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-black py-4 px-6 rounded-xl font-semibold hover:from-green-400 hover:to-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Image</span>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-900/50 border border-red-700 rounded-xl">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {imageUrl && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-green-400 flex items-center space-x-2">
                    <Image className="h-4 w-4" />
                    <span>Generated Image:</span>
                  </h3>
                  <a
                    href={imageUrl}
                    download
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </a>
                </div>
                <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800">
                  <img
                    src={imageUrl}
                    alt="Generated image"
                    className="w-full h-auto max-h-96 object-contain"
                    onError={() =>
                      setError("Failed to load the generated image")
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGen;
