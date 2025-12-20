import React from 'react';
import { getQuiz } from '../utils/storage';
import { useNavigate } from "react-router-dom";

export function QuizBrowse({ quiz, quiz_id,setQuizzes }) {
  const navigate = useNavigate();
  const quiz_title = quiz ? quiz.title : "No title";

  function completeQuiz() {
    navigate("/quiz", { state: { quiz_id } });
  }
  function deleteQuiz(){
    fetch(`/api/delete_quiz/${quiz_id}`, {
    method: 'DELETE',
    })
    .then(response => {
  if (response.ok) {
    console.log('Quiz deleted successfully');
  } else {
    console.error('Failed to delete quiz', response.status);
  }
})
.catch(error => {
  console.error('Error:', error);
});
  setQuizzes(prevQuizzes => prevQuizzes.filter(q => q.id !== quiz_id))
  }

  return (
    <div className='row my-4' style={{height:80}}>
      <label className='col-sm-8'>{quiz_title}</label>
      <button className='col-sm-2 btn btn-primary'onClick={completeQuiz}>Пройти тест</button>
      <button className='col-sm-2 btn btn-danger'onClick={deleteQuiz}>Видалити тест</button>
    </div>
  );
}