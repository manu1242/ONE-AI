import React, { useState } from "react";
import axios from "axios";
import {
  MessageCircle,
  Loader2,
  Send,
  ArrowLeft,
  Bot,
  User,
} from "lucide-react";


const ChatBot = ({ onBack }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!prompt.trim()) {
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      text: prompt.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/openai/ask`,
        { prompt: userMessage.text }
      );

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: result.data.result,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);

      console.error("Chatbot error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
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
            <div className="p-3 bg-gradient-to-r from-green-600 to-green-800 rounded-xl">
              <MessageCircle className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI ChatBot</h1>
              <p className="text-gray-400">
                Get intelligent responses to your questions
              </p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.isUser ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isUser ? "bg-green-600" : "bg-gray-700"
                  }`}
                >
                  {message.isUser ? (
                    <User className="h-4 w-4 text-black" />
                  ) : (
                    <Bot className="h-4 w-4 text-green-400" />
                  )}
                </div>
                <div
                  className={`flex-1 max-w-xs lg:max-w-md ${
                    message.isUser ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-xl ${
                      message.isUser
                        ? "bg-green-600 text-black"
                        : "bg-gray-800 text-gray-200"
                    }`}
                  >
                    <p className="leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="inline-block p-3 bg-gray-800 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-green-400" />
                      <span className="text-gray-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-800 p-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Type your message here..."
                disabled={loading}
              />
              <button
                onClick={handleAsk}
                disabled={loading || !prompt.trim()}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-black rounded-xl font-semibold hover:from-green-400 hover:to-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-xl">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
