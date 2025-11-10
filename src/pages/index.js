import '../../css/style.css';
import quiz_template from "../templates/quiz_browse.html";
import { getAllQuizzes, setCurrentQuiz, removeQuiz} from '../utils/storage.js';
const quizes_div = document.getElementById("quizes");
//replaced with storage
for(const quiz of getAllQuizzes()){
    const wrapper = document.createElement("div");
    wrapper.innerHTML = quiz_template.trim();
    const quiz_element = wrapper.firstElementChild;
    //now saves id instead of object itself
    quiz_element.quiz_to_load = quiz.id;
    quizes_div.appendChild(quiz_element);
    quiz_element.querySelector(".quiz_name").textContent = quiz.name;
    
    quiz_element.querySelector(".complete_quiz").addEventListener("click", (event) => {
        //replaced with storage
        setCurrentQuiz(event.target.parentElement.quiz_to_load);
        window.location.assign("/quiz.html");
    });

    quiz_element.querySelector(".edit_quiz").addEventListener("click", (event) => {
        //replaced with storage
        setCurrentQuiz(event.target.parentElement.quiz_to_load);
        window.location.assign("/edit.html");
    });

    quiz_element.querySelector(".remove_quiz").addEventListener("click", (event) => {
        //all it does is delete by id
        removeQuiz(event.target.parentElement.quiz_to_load);
        //now update the page
        location.reload();
        
    });
}

