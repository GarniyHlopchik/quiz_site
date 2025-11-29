// src/utils/storage.js

const QUIZZES_KEY = 'quizes';
const CURRENT_QUIZ_KEY = 'current_quiz';


function getQuizzes() {
    try {
        const quizzes = localStorage.getItem(QUIZZES_KEY);
        return quizzes ? JSON.parse(quizzes) : [];
    } catch (error) {
        console.error('Error getting quizzes from localStorage:', error);
        return [];
    }
}


function saveQuizzes(quizzes) {
    try {
        localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes));
    } catch (error) {
        console.error('Error saving quizzes to localStorage:', error);
    }
}


function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}


export function addQuiz(quiz) {
    const quizzes = getQuizzes();
    const newQuiz = {
        ...quiz,
        id: generateId()
    };
    
    quizzes.push(newQuiz);
    saveQuizzes(quizzes);
    
    return newQuiz.id;
}


export function removeQuiz(quiz_id) {
    const quizzes = getQuizzes();
    const initialLength = quizzes.length;
    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== quiz_id);
    
    if (updatedQuizzes.length === initialLength) {
        return false; 
    }
    
    saveQuizzes(updatedQuizzes);
    return true;
}


export function editQuiz(quiz_id, edited_quiz) {
    const quizzes = getQuizzes();
    const quizIndex = quizzes.findIndex(quiz => quiz.id === quiz_id);
    
    if (quizIndex === -1) {
        return false; 
    }
    
   
    quizzes[quizIndex] = {
        ...edited_quiz,
        id: quiz_id
    };
    
    saveQuizzes(quizzes);
    return true;
}


export function getQuiz(quiz_id) {
    const quizzes = getQuizzes();
    return quizzes.find(quiz => quiz.id === quiz_id) || null;
}


export function setCurrentQuiz(quiz_id) {
    try {
        localStorage.setItem(CURRENT_QUIZ_KEY, quiz_id);
    } catch (error) {
        console.error('Error setting current quiz:', error);
    }
}


export function getCurrentQuiz() {
    try {
        return localStorage.getItem(CURRENT_QUIZ_KEY);
    } catch (error) {
        console.error('Error getting current quiz:', error);
        return null;
    }
}


export function getAllQuizzes() {
    return getQuizzes();
}

export function clearAllQuizzes() {
    try {
        localStorage.removeItem(QUIZZES_KEY);
        localStorage.removeItem(CURRENT_QUIZ_KEY);
    } catch (error) {
        console.error('Error clearing quizzes:', error);
    }
}