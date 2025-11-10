import { addQuiz } from './utils/storage.js';

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

const SaveQuiz = () => {
    const quiz_obj = {
        title: document.getElementById("quiz_name").value,
        questions: []
    };
    
    for(const form of created_questions_div.querySelectorAll(".question")){
        const data = new FormData(form);
        const obj = Object.fromEntries(data.entries());
        quiz_obj.questions.push(obj);
    }
    

    const quizId = addQuiz(quiz_obj);
    alert(`Квіз збережено з ID: ${quizId}`);
    

    document.getElementById("quiz_name").value = "";
    created_questions_div.innerHTML = "";
    question_counter = 0;
};

const AddQuestion = () => {
    const clone = question_template.content.cloneNode(true);
    const wrapper = clone.firstElementChild;
    created_questions_div.appendChild(clone);
    const options = wrapper.querySelectorAll(".option");

    for (const opt of options) {
        opt.name = `question_${question_counter}`;
    }

    question_counter++;
};