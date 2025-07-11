import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Summarizer from "./components/Summarizer";
import ImageGen from "./components/ImageGen";
import ChatBot from "./components/ChatBot";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setCurrentPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onPageChange={setCurrentPage} />;
      case "summarizer":
        return <Summarizer onBack={() => setCurrentPage("home")} />;
      case "image-gen":
        return <ImageGen onBack={() => setCurrentPage("home")} />;
      case "chatbot":
        return <ChatBot onBack={() => setCurrentPage("home")} />;
      default:
        return <Home onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}

export default App;
