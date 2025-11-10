import { getCurrentQuiz, getQuiz } from './utils/storage.js';
// import modalHTML from '../templates/test.html'; // uncomment if needed

// const wrapper = document.createElement('div');
// wrapper.innerHTML = modalHTML.trim();
// document.body.appendChild(wrapper.firstElementChild);

const quiz_template = document.getElementById("quiz");
const questions_div = document.getElementById("questions");

// Get current quiz using new module
const currentQuizId = getCurrentQuiz();
const quiz_obj = getQuiz(currentQuizId);

if (!quiz_obj) {
    questions_div.innerHTML = "<p>Quiz not found</p>";
    console.error("Quiz not found");
} else {
    console.log(quiz_obj);
    console.log(quiz_obj.questions, Array.isArray(quiz_obj.questions));
    
    let questionIndex = 0;
    for(const question of quiz_obj.questions){
        console.log("Processing question:", question);
        
        // spawn template
        const quiz_element = quiz_template.content.cloneNode(true).firstElementChild;
        // add to div
        questions_div.appendChild(quiz_element);
        console.log(quiz_element);
        
        // Fill question data
        quiz_element.querySelector(".question_text").textContent = question.question_text || question.question;
        
        const options = quiz_element.querySelectorAll(".option");
        const options_text = quiz_element.querySelectorAll(".option_text");
        
        // Fill answer options (support different formats)
        const answers = [
            question.option1_text || question.answers?.[0] || "Option 1",
            question.option2_text || question.answers?.[1] || "Option 2", 
            question.option3_text || question.answers?.[2] || "Option 3",
            question.option4_text || question.answers?.[3] || "Option 4"
        ];
        
        options_text[0].textContent = answers[0];
        options_text[1].textContent = answers[1];
        options_text[2].textContent = answers[2];
        options_text[3].textContent = answers[3];
        
        // Set names for radio button grouping
        options_text[0].name = `question_${questionIndex}`;
        options_text[1].name = `question_${questionIndex}`;
        options_text[2].name = `question_${questionIndex}`;
        options_text[3].name = `question_${questionIndex}`;
        
        // Get correct answer (support different formats)
        const correctAnswer = question.correct_answer || question.correct || 0;
        
        // Submit handler for each question
        const btn = quiz_element.querySelector(".submit_button");
        if (btn) {
            btn.addEventListener("click", function(event) {
                event.preventDefault();
                const form = event.target.closest('form');
                const answerForm = new FormData(form);
                const userAnswer = answerForm.get(`question_${questionIndex}`);
                
                if (userAnswer === null) {
                    alert("Please select an answer option");
                    return;
                }
                
                // Check answer
                const userAnswerIndex = parseInt(userAnswer);
                if(userAnswerIndex === correctAnswer) {
                    alert("Correct! 🎉");
                } else {
                    alert(`Incorrect. The right answer is: ${answers[correctAnswer]}`);
                }
                
                // Disable button after answering
                btn.disabled = true;
                options.forEach(opt => opt.disabled = true);
            });
        }
        
        questionIndex++;
    }
}

// Helper function (if still needed)
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}