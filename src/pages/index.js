import quiz_template from "../templates/quiz_browse.html"
const quizes_div = document.getElementById("quizes");
//replace with call of storage when it exists
for(const quiz of JSON.parse(localStorage.getItem("quizes") || "[]")){
    const quiz_element = quiz_template.content.cloneNode(true).firstElementChild;
    quizes_div.appendChild(quiz_element);
    quiz_element.querySelector(".quiz_name").textContent = quiz.name;
    quiz_element.querySelector(".complete_quiz").quiz_to_load = quiz;
    quiz_element.querySelector(".complete_quiz").addEventListener("click", (event) => {
        localStorage.setItem("current_quiz", JSON.stringify(event.target.quiz_to_load));
        window.location.assign("/quiz.html");
    });
}

