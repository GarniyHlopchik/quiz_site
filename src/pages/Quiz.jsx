import React, { useState, useEffect } from 'react';
import quizData from '../../data/questions.json';

const Quiz = ({ quiz_id }) => {
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      console.log('All quizzes:', quizData);
      console.log('Looking for quiz with ID:', quiz_id);
      
 
      let foundQuiz = null;
      
 
      if (Array.isArray(quizData)) {
        foundQuiz = quizData.find(q => q.id === quiz_id || q.id === parseInt(quiz_id));
      } 

      else if (typeof quizData === 'object' && quizData !== null) {
        foundQuiz = quizData[quiz_id] || Object.values(quizData).find(q => q.id === quiz_id);
      }
      
      console.log('Found quiz:', foundQuiz);
      
      if (!foundQuiz) {
        throw new Error(`Quiz with ID "${quiz_id}" not found. Available IDs: ${getAvailableQuizIds(quizData)}`);
      }
      
      if (!foundQuiz.questions || !Array.isArray(foundQuiz.questions)) {
        throw new Error('Quiz has no questions or incorrect structure');
      }
      
      setQuiz(foundQuiz);
      

      const initialAnswers = {};
      foundQuiz.questions.forEach((question, index) => {
        initialAnswers[index] = question.type === 'multiple' ? [] : '';
      });
      setUserAnswers(initialAnswers);
      setError(null);
      
    } catch (err) {
      setError(err.message);
      console.error('Error loading quiz:', err);
    } finally {
      setLoading(false);
    }
  }, [quiz_id]);


  const getAvailableQuizIds = (data) => {
    if (Array.isArray(data)) {
      return data.map(q => q.id).join(', ');
    } else if (typeof data === 'object' && data !== null) {
      return Object.keys(data).join(', ');
    }
    return 'no data';
  };


  const handleAnswerSelect = (questionIndex, answerIndex, questionType) => {
    if (!quiz) return;
    
    setUserAnswers(prev => {
      const newAnswers = { ...prev };
      
      if (questionType === 'multiple') {
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
    if (!questions || !answers) return 0;
    
    let correctCount = 0;
    questions.forEach((question, questionIndex) => {
      const userAnswer = answers[questionIndex];
      const correctAnswers = question.answers
        ?.map((answer, index) => answer.correct ? index : -1)
        ?.filter(index => index !== -1) || [];
      
      if (question.type === 'multiple') {
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
    if (!quiz || !quiz.questions) return;

    const correctAnswersCount = countFullyCorrect(quiz.questions, userAnswers);
    const totalQuestions = quiz.questions.length;
    
    setResult({
      correct: correctAnswersCount,
      total: totalQuestions,
      percentage: totalQuestions > 0 ? Math.round((correctAnswersCount / totalQuestions) * 100) : 0
    });
  };


  if (loading) {
    return (
      <div className="quiz-loading">
        Loading quiz... (ID: {quiz_id})
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-error">
        <h3>Error loading quiz</h3>
        <p>{error}</p>
        <p>Please create a quiz first at: <a href="/create">/create</a></p>
        <p>Or check the structure of questions.json file</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="quiz-error">
        <h3>Quiz not found</h3>
        <p>No quiz data available for ID: {quiz_id}</p>
        <p>Please create a quiz first at: <a href="/create">/create</a></p>
      </div>
    );
  }


  return (
    <div className="quiz-container">
      <h1 className="quiz-title">{quiz.title || 'No title'}</h1>
      {quiz.description && <p className="quiz-description">{quiz.description}</p>}
      

      {(!quiz.questions || quiz.questions.length === 0) ? (
        <div className="no-questions">This quiz has no questions</div>
      ) : (
        <>
          {quiz.questions.map((question, questionIndex) => (
            <div key={question.id || questionIndex} className="question-container">
              <h3 className="question-text">
                {questionIndex + 1}. {question.text || 'Question without text'}
              </h3>
              
              <div className="answers-container">
                {question.answers?.map((answer, answerIndex) => (
                  <div key={answerIndex} className="answer-option">
                    <label className="answer-label">
                      <input
                        type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                        name={`question-${questionIndex}`}
                        value={answerIndex}
                        checked={
                          question.type === 'multiple'
                            ? userAnswers[questionIndex]?.includes(answerIndex) || false
                            : userAnswers[questionIndex] === answerIndex
                        }
                        onChange={() => handleAnswerSelect(questionIndex, answerIndex, question.type)}
                        className="answer-input"
                      />
                      <span className="answer-text">{answer.text || 'Answer without text'}</span>
                    </label>
                  </div>
                )) || <div>No answer options</div>}
              </div>
            </div>
          ))}
          
          <div className="quiz-actions">
            <button 
              onClick={handleSubmit}
              className="submit-button"
            >
              Check Answers
            </button>
            
            {result && (
              <div className="quiz-result">
                <h3>Results:</h3>
                <p>Correct answers: {result.correct} out of {result.total} ({result.percentage}%)</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;