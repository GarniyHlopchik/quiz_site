import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Index } from './pages/Index.jsx';
import Quiz from "./pages/Quiz.jsx";
import {Create} from "./pages/Create.jsx";

export default function App() {
  //localStorage.clear()
  return (
    <div>
      <nav>
        
      </nav>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}