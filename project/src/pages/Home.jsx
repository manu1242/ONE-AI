import React from 'react';
import { Brain, FileText, Image, MessageCircle, Zap, Shield, Cpu } from 'lucide-react';

const Home = ({ onPageChange }) => {
  const features = [
    {
      id: 'summarizer',
      title: 'Text Summarizer',
      description: 'Transform lengthy documents into concise, meaningful summaries with AI-powered analysis.',
      icon: FileText,
      color: 'from-green-400 to-green-600',
    },
    {
      id: 'image-gen',
      title: 'Image Generator',
      description: 'Create stunning, unique images from text descriptions using advanced AI models.',
      icon: Image,
      color: 'from-green-500 to-green-700',
    },
    {
      id: 'chatbot',
      title: 'AI ChatBot',
      description: 'Get intelligent responses to your questions with our conversational AI assistant.',
      icon: MessageCircle,
      color: 'from-green-600 to-green-800',
    },
  ];

  const stats = [
    { label: 'AI Models', value: '3+', icon: Cpu },
    { label: 'Processing Speed', value: '< 5s', icon: Zap },
    { label: 'Secure', value: '100%', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-green-600/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full">
                <Brain className="h-12 w-12 text-black" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              AI Tools
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent"> Suite</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Harness the power of artificial intelligence to summarize text, generate images, 
              and get intelligent responses. All in one powerful, intuitive platform.
            </p>
            <button
              onClick={() => onPageChange('summarizer')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gray-800 rounded-full border border-gray-700">
                    <Icon className="h-6 w-6 text-green-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Powerful AI Features</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our suite of AI-powered tools designed to enhance your productivity and creativity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={() => onPageChange(feature.id)}
                className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center text-green-400 font-medium group-hover:text-green-300 transition-colors">
                  <span>Try it now</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-3xl p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience AI Power?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join thousands of users who are already leveraging AI to boost their productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onPageChange('summarizer')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-black px-8 py-3 rounded-xl font-semibold hover:from-green-400 hover:to-green-500 transition-all duration-300"
            >
              Start Summarizing
            </button>
            <button
              onClick={() => onPageChange('image-gen')}
              className="border border-green-500 text-green-400 px-8 py-3 rounded-xl font-semibold hover:bg-green-500 hover:text-black transition-all duration-300"
            >
              Generate Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;