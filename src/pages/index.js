import { getAllQuizzes, setCurrentQuiz } from './utils/storage.js';

console.log("home");
const quizes_div = document.getElementById("quizes");
const quiz_template = document.getElementById("quiz_template");


const quizzes = getAllQuizzes();

for(const quiz of quizzes){
    const quiz_element = quiz_template.content.cloneNode(true).firstElementChild;
    quizes_div.appendChild(quiz_element);
    quiz_element.querySelector(".quiz_name").textContent = quiz.title || quiz.name; 
    quiz_element.querySelector(".complete_quiz").quiz_to_load = quiz;
    quiz_element.querySelector(".complete_quiz").addEventListener("click", (event) => {
        setCurrentQuiz(quiz.id);
        window.location.assign("./quiz.html");
    });
}
