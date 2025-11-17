import React from 'react';
import { getQuiz } from '../utils/storage';
import { useNavigate } from "react-router-dom";

export function QuizBrowse({ quiz_id }) {
  const navigate = useNavigate();
  const quiz = getQuiz(quiz_id);
  const quiz_title = quiz ? quiz.title : "No title";

  function completeQuiz() {
    navigate("/quiz", { state: { quiz_id } });
  }

  return (
    <div>
      <label>{quiz_title}</label>
      <button onClick={completeQuiz}>Пройти тест</button>
    </div>
  );
}