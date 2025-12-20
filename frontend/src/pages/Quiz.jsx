import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getQuiz } from '../utils/storage';
const Quiz = () => {
  const location = useLocation();
  const { quiz_id } = location.state ?? {};
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/get_quiz/${quiz_id}`);
        const quizData = await response.json();
        setQuiz(quizData);
        
        
        const initialAnswers = {};
        quizData.questions.forEach((question, index) => {
          initialAnswers[index] = question.type === 'multiple' ? [] : '';
        });
        setUserAnswers(initialAnswers);
        
      } catch (err) {
        setError('Error loading quiz');
        console.error('Error loading quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    if (quiz_id) {
      loadQuiz();
      

    }
  }, [quiz_id]);

 
  const handleAnswerSelect = (questionIndex, answerIndex, isMultiple) => {
    setUserAnswers(prev => {
      const newAnswers = { ...prev };
      
      if (isMultiple) {
        
        const currentAnswers = newAnswers[questionIndex] || [];
        if (currentAnswers.includes(answerIndex)) {
          newAnswers[questionIndex] = currentAnswers.filter(a => a !== answerIndex);
        } else {
          newAnswers[questionIndex] = [...currentAnswers, answerIndex];
        }
      } else {
       
        newAnswers[questionIndex] = answerIndex;
      }
      
      return newAnswers;
    });
  };

 
  const countFullyCorrect = (questions, answers) => {
    let correctCount = 0;
    
    questions.forEach((question, questionIndex) => {
      const userAnswer = answers[questionIndex];
      const correctAnswers = question.options
        .map((answer, index) => answer.correct ? index : -1)
        .filter(index => index !== -1);
      
      if (isMultipleChoice(question)) {
       
        if (userAnswer && userAnswer.length === correctAnswers.length &&
            userAnswer.every(answer => correctAnswers.includes(answer))) {
          correctCount++;
        }
      } else {
        
        if (userAnswer !== undefined && correctAnswers.includes(parseInt(userAnswer))) {
          correctCount++;
        }
      }
    });
    
    return correctCount;
  };

 
  const handleSubmit = () => {
    if (!quiz) return;

    
    const quizResults = {
      quizId: quiz_id,
      questions: quiz.questions.map((question, questionIndex) => ({
        id: question.id,
        text: question.text,
        type: question.type,
        userAnswer: userAnswers[questionIndex],
        correctAnswers: question.options
          .map((answer, index) => answer.correct ? index : -1)
          .filter(index => index !== -1)
      }))
    };

    
    const correctAnswersCount = countFullyCorrect(quiz.questions, userAnswers);
    const totalQuestions = quiz.questions.length;
    
    setResult({
      correct: correctAnswersCount,
      total: totalQuestions,
      percentage: Math.round((correctAnswersCount / totalQuestions) * 100)
    });

    
    console.log('Quiz results:', quizResults);
  };
  
  if (!quiz) return <div>Loading quiz...</div>;
  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quiz.title}</h1>
      {/*<p className="quiz-description">{quiz.description}</p>   -- дескріпшн не робимо поки  */}
      
      {console.log(quiz)}
      {console.log(quiz.questions)}
      {quiz.questions.map((question, questionIndex) => (
        <div key={question.id || questionIndex} className="question-container">
          <h3 className="question-text">
            {questionIndex + 1}. {question.text}
          </h3>
          
          <div className="answers-container">
            {question.options.map((answer, answerIndex) => (
              <div key={answerIndex} className="answer-option">
                <label className="answer-label">
                  <input
                    type={isMultipleChoice(question) ? 'checkbox' : 'radio'}
                    name={`question-${questionIndex}`}
                    value={answerIndex}
                    checked={
                      isMultipleChoice(question)
                        ? Array.isArray(userAnswers[questionIndex]) &&
                        userAnswers[questionIndex].includes(answerIndex)
                        : userAnswers[questionIndex] === answerIndex
                    }
                    onChange={() => handleAnswerSelect(questionIndex, answerIndex, isMultipleChoice(question))}
                    className="answer-input"
                  />
                  <span className="answer-text">{answer.text}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
      
     
      <div className="quiz-actions">
        <button 
          onClick={handleSubmit}
          className="submit-button btn btn-primary"
          disabled={!quiz.questions.length}
        >
          Check Answers
        </button>
        
        {result && (
          <div className="quiz-result">
            <h3>Result:</h3>
            <p>
              Correct answers: {result.correct} out of {result.total} ({result.percentage}%)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
function isMultipleChoice(question) {
  if (!question?.options) return false;

  const correctCount = question.options.filter(opt => opt.correct).length;
  return correctCount > 1;
}
export default Quiz;