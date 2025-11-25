import React, { useState } from 'react';
import { Question } from '../components/Question';
import { addQuiz } from '../utils/storage';

export function Create() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  // Додаємо нове питання
  function addQuestion() {
    setQuestions([
      ...questions,
      { id: Date.now(), text: "", options: [] }
    ]);
  }

  // Оновлюємо дані конкретного питання
  function setQuestionData(index, data) {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], ...data };
    setQuestions(newQuestions);
  }

  // Зберегти квіз
  function saveQuiz() {
    const obj = { title: quizTitle, questions };
    addQuiz(obj);
    console.log("Quiz saved:", obj);
  }

  return (
    <div className='container-fluid'>
      <input
      className='form-control'
        type="text"
        value={quizTitle}
        placeholder="Enter Quiz Name Here"
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      <button className='btn btn-primary' onClick={addQuestion}>Додати питання</button>
      <button className='btn btn-secondary' onClick={saveQuiz}>Зберегти квіз</button>
      
      {questions.map((q, index) => (
        <Question
          key={q.id}
          index={index}
          questionData={q}
          setQuestionData={setQuestionData}
        />
      ))}
    </div>
  );
}