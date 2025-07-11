import React from 'react';
import { Brain, FileText, Image, MessageCircle, Home, } from 'lucide-react';

const Navbar = ({ currentPage, onPageChange, user, onLogout }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'summarizer', label: 'Summarizer', icon: FileText },
    { id: 'image-gen', label: 'Image Gen', icon: Image },
    { id: 'chatbot', label: 'ChatBot', icon: MessageCircle },
  ];

  return (
    <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 text-green-400" />
            <span className="text-xl font-bold text-white">ONE - AI</span>
          </div>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-gray-300">
                
              </div>
              
                
            
            </div>
            
            {/* Mobile User Menu */}
            <div className="md:hidden">
              <button
                onClick={onLogout}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              >
               
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;