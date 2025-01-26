import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Tasks from "./pages/Tasks";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  return (
    <>
      {!isAuthenticated ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
          >
            Login
          </button>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Tasks setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </Router>
      )}
    </>
  );
};

export default App;
