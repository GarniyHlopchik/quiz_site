import React from 'react';
import { getQuiz } from '../utils/storage';
import { useNavigate } from "react-router-dom";

export function QuizBrowse({ quiz, quiz_id }) {
  const navigate = useNavigate();
  const quiz_title = quiz ? quiz.title : "No title";

  function completeQuiz() {
    navigate("/quiz", { state: { quiz_id } });
  }

  return (
    <div className='row my-4' style={{height:80}}>
      <label className='col-sm-8'>{quiz_title}</label>
      <button className='col-sm-4 btn btn-primary'onClick={completeQuiz}>Пройти тест</button>
    </div>
  );
}