import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Index } from './pages/Index.jsx';
import Quiz from "./pages/Quiz.jsx";
import {Create} from "./pages/Create.jsx";

export default function App() {
  //localStorage.clear()
  return (
    <div className='container my-20'>
      <h1>BobaQuiz</h1>
      <nav className='nav mb-10'>
        <Link to="/" className='btn btn-primary'>Домашня</Link>
        <Link to="/create" className='btn btn-secondary'>Створити квіз</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}