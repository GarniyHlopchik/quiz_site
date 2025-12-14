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
  fetch("/api/add_quiz", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  .then(response => {
    // Check if the response was successful (HTTP status 200-299)
    if (!response.ok) {
      // Throw an error to be caught by the .catch() block
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Handle successful response (e.g., parse JSON, return data)
    return response.json(); 
  })
  .then(data => {
    console.log("Quiz saved successfully:", data);
  })
  .catch(error => {
    // This catches the 'Failed to fetch' network error
    // AND the error thrown if response.ok is false
    console.error("Fetch Error:", error.message);
  });

  console.log("Quiz data sent:", obj); // Note: This will execute before the fetch completes.
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