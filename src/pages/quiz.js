import "../../css/style.css";
import {getCurrentQuiz, getQuiz} from "../utils/storage";
import { LoadQuiz } from "../utils/template_loader";
//const quizForm = document.getElementById('quiz-form');
//const resultsContainer = document.getElementById('results-container');
const quiz_template = document.getElementById("quiz");
const questions_div = document.getElementById("questions");
//spawn quiz from localstorage
const quiz_obj = getQuiz(getCurrentQuiz());
LoadQuiz(quiz_obj,questions_div,false);
