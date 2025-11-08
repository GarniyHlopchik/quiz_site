"use strict"
//const quizForm = document.getElementById('quiz-form');
//const resultsContainer = document.getElementById('results-container');
const quiz_template = document.getElementById("quiz");
const questions_div = document.getElementById("questions");
//spawn quiz from localstorage
const quiz_obj = JSON.parse(localStorage.getItem("current_quiz"));
console.log(quiz_obj);
console.log(quiz_obj.questions, Array.isArray(quiz_obj.questions));
for(const question of quiz_obj.questions){
    console.log("a")
    //spawn template
    const quiz_element = quiz_template.content.cloneNode(true).firstElementChild;
    //add to div
    questions_div.appendChild(quiz_element);
    console.log(quiz_element);
    quiz_element.querySelector(".question_text").textContent = question.question_text;
    const options = quiz_element.querySelectorAll(".option");
    const options_text = quiz_element.querySelectorAll(".option_text");
    options_text[0].textContent = question.option1_text;
    options_text[1].textContent = question.option2_text;
    options_text[2].textContent = question.option3_text;
    options_text[3].textContent = question.option4_text;
    options_text[0].name = Number(getKeyByValue(quiz_obj.questions,question));
    options_text[1].name = Number(getKeyByValue(quiz_obj.questions,question));
    options_text[2].name = Number(getKeyByValue(quiz_obj.questions,question));
    options_text[3].name = Number(getKeyByValue(quiz_obj.questions,question));

    //give it data of what is correct
    options[question[Number(getKeyByValue(quiz_obj.questions,question))-1]];

    //connect to func
    const btn = quiz_element.querySelector("submit_button").addEventListener("click",function(event){
        event.preventDefault();
    const answerForm = new FormData(event.target.parentElement);
    const userAnswer = answerForm.get('opros');

    if (userAnswer === null) {
        resultsDiv.textContent = "click cirkle bro";
        resultsContainer.style.display = "block";
        return;
    }

    if(userAnswer === correctAnswer){
    resultsDiv.textContent = "Correct";
    }
    else{
    resultsDiv.textContent = "unlucky";
    }
    resultsContainer.style.display = "block";
    })
}
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
/*
quizForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const answerForm = new FormData(quizForm);
    const userAnswer = answerForm.get('opros');

    if (userAnswer === null) {
        resultsDiv.textContent = "click cirkle bro";
        resultsContainer.style.display = "block";
        return;
    }

    if(userAnswer === correctAnswer){
    resultsDiv.textContent = "Correct";
    }
    else{
    resultsDiv.textContent = "unlucky";
    }
    resultsContainer.style.display = "block";
});
*/
