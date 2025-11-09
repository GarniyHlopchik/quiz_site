import '../../css/style.css';
import quiz_template from "../templates/quiz_browse.html"
const quizes_div = document.getElementById("quizes");
//replace with call of storage when it exists
for(const quiz of JSON.parse(localStorage.getItem("quizes") || "[]")){
    const wrapper = document.createElement("div");
    wrapper.innerHTML = quiz_template.trim();
    const quiz_element = wrapper.firstElementChild;
    //replace with id when storage is done
    quiz_element.quiz_to_load = quiz;
    quizes_div.appendChild(quiz_element);
    quiz_element.querySelector(".quiz_name").textContent = quiz.name;
    
    quiz_element.querySelector(".complete_quiz").addEventListener("click", (event) => {
        //replace with storage call when done
        localStorage.setItem("current_quiz", JSON.stringify(event.target.parentElement.quiz_to_load));
        window.location.assign("/quiz.html");
    });

    quiz_element.querySelector(".edit_quiz").addEventListener("click", (event) => {
        //replace with storage call when done
        localStorage.setItem("current_quiz", JSON.stringify(event.target.parentElement.quiz_to_load));
        window.location.assign("/edit.html");
    });

    quiz_element.querySelector(".remove_quiz").addEventListener("click", (event) => {
        //literally nothing to be done without storage.js
        //all it does is delete by id
        
    });
}

