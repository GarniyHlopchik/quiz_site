import React from 'react';
import { getAllQuizzes } from '../utils/storage';
import { QuizBrowse } from '../components/QuizBrowse';

export function Index() {
  const quizzes = getAllQuizzes();

  return (
    <div>
      {quizzes.map(q => (
        <QuizBrowse key={q.id} quiz_id={q.id} />
      ))}
    </div>
  );
}