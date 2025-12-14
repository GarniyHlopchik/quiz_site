import '../../css/style.css';
import {addQuiz} from "../utils/storage.js"
import { appendTemplate } from '../utils/template_loader.js';
import question_edit from "../templates/question_edit.html";
import option_edit from "../templates/option_edit.html";
let question_counter = 0;
const add_question_button = document.getElementById("add_question");
const question_template = document.getElementById("question_template");
const created_questions_div = document.getElementById("created_questions");
add_question_button.addEventListener("click", () => {
    AddQuestion();
});
const save_button = document.getElementById("save_quiz");
save_button.addEventListener("click", () => {
    SaveQuiz();
});
created_questions_div.addEventListener("click",(event)=>{
    if (event.target.classList.contains('option-add')) {
        AddOption(event.target.parentElement.querySelector(".question-options"));
    }
})

const SaveQuiz = () => {
    const quiz_obj={};
    quiz_obj.name = document.getElementById("quiz_name").value;
    quiz_obj.questions = [];
    for(const question_element of created_questions_div.querySelectorAll(".question-edit")){
        const question_obj = {
            text:question_element.querySelector(".question-text").value
        };
        question_obj.options = []
        for(const form of question_element.querySelectorAll(".option-edit")){
            const data = new FormData(form);
            const obj = Object.fromEntries(data.entries());
            question_obj.options.push(obj);
        }
        quiz_obj.questions.push(question_obj);
    }
    //changed to using storage
    addQuiz(quiz_obj);

}
const AddQuestion = () => {
    //create instance of template when it's ready
    const question = appendTemplate(question_edit,created_questions_div);

};

const AddOption = (wrapper) => {
    const options_amount = wrapper.querySelectorAll(".option-edit").length;
    //add from template when it's done
    const option = appendTemplate(option_edit,wrapper);
    option.querySelector(".option-input").value = options_amount;
}