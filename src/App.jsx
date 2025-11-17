import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Index } from './pages/Index';
import {Quiz} from "./pages/Quiz.jsx";

export default function App() {
  return (
    <div>
      <nav>
        
      </nav>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz/" element={<Quiz />} />
        <Route path="/create/" element={<Quiz />} />
      </Routes>
    </div>
  );
}