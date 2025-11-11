import "../../css/style.css";
import {getCurrentQuiz, getQuiz} from "../utils/storage";
import { LoadQuiz, ReadQuizResults,CountFullyCorrect} from "../utils/template_loader";
//const quizForm = document.getElementById('quiz-form');
//const resultsContainer = document.getElementById('results-container');
const quiz_template = document.getElementById("quiz");
const questions_div = document.getElementById("questions");
const submit_button = document.getElementById("submit-quiz");
const quiz_results=document.getElementById("quiz-results");

//spawn quiz from localstorage
const quiz_obj = getQuiz(getCurrentQuiz());
LoadQuiz(quiz_obj,questions_div,false);

submit_button.addEventListener("click",() => {
    const parsedResults = Array.from(ReadQuizResults(questions_div));
    console.log(parsedResults);
    quiz_results.textContent=CountFullyCorrect(quiz_obj,parsedResults);
})