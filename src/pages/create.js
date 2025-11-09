import '../../css/style.css';
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
    const quiz_obj={};
    quiz_obj.name = document.getElementById("quiz_name").value;
    quiz_obj.questions = [];
    for(const form of created_questions_div.querySelectorAll(".question")){
        const data = new FormData(form);
        const obj = Object.fromEntries(data.entries());
        quiz_obj.questions.push(obj);
    }
    let arr = JSON.parse(localStorage.getItem("quizes")) || [];
    arr.push(quiz_obj);
    localStorage.setItem("quizes", JSON.stringify(arr));

}
const AddQuestion = () => {
    //create instance of template when it's ready
    const clone = question_template.content.cloneNode(true);
    const wrapper = clone.firstElementChild;
    created_questions_div.appendChild(clone);
    const options = wrapper.querySelectorAll(".option");

    for (const opt of options) {
        opt.name = String(question_counter);
    }

    question_counter++;
    //then add button to add new option
    console.log(wrapper);
    const add_option_button = document.createElement("button");
    add_option_button.textContent = "Додати Варіант";
    wrapper.appendChild(add_option_button);
    add_option_button.addEventListener("click",() => {
    AddOption(wrapper);
});
};

const AddOption = (wrapper) => {
    //add from template when it's done
    return
}