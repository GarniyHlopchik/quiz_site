import question from "../templates/question.html";
import question_edit from "../templates/question_edit.html";
import option from "../templates/option.html";
import option_edit from "../templates/option_edit.html";



export function LoadQuiz(quizObj,div_to,is_edit){
    //object, element, bool
    const question_template = (is_edit) ? question_edit : question;
    const option_template = (is_edit) ? option_edit : option;

    for(const question of quizObj.questions){
        const question_element = appendTemplate(question_template,div_to);
        question_element.querySelector(".question-text").textContent = question.text;
        for(const option of question.options){
            if(!is_edit){
                const option_element = appendTemplate(option_template,question_element.querySelector(".question-options"));
                option_element.querySelector(".option-text").textContent = option['option-text'];
                if("correct_option" in option){
                    option_element.is_correct = true;
                }
                else{
                    option_element.is_correct = false;
                }
            
            }
        }
    }

}
export function ReadQuizResults(div){
    const questions = [];
    for(const question_element of div.querySelectorAll(".question")){
        const options = [];
        for(const option_element of question_element.querySelectorAll(".option")){
            if(option_element.querySelector(".option-input").checked){
                options.push({correct_option: Array.from(question_element.querySelectorAll(".option")).indexOf(option_element)});
            }
        }
        questions.push(options);
    }
    return questions;
    
}
export function CountFullyCorrect(quiz_obj, parsedResults) {
  let correctCount = 0;

  quiz_obj.questions.forEach((question, i) => {
    // Extract indices of correct options (convert from string → number)
    const correctIndices = question.options
      .map((opt, idx) =>
        String(opt.correct_option) === String(idx) ? idx : null
      )
      .filter(idx => idx !== null);

    // Extract indices user selected (convert all to numbers)
    const chosenIndices = parsedResults[i]
      .map(opt => Number(opt.correct_option));

    // Check if chosen == correct (same values and count)
    const isFullyCorrect =
      correctIndices.length === chosenIndices.length &&
      correctIndices.every(idx => chosenIndices.includes(idx));

    if (isFullyCorrect) correctCount++;
  });

  return correctCount;
}
export function appendTemplate(template,element){
    const wrapper = document.createElement("div");
    wrapper.innerHTML = template.trim();
    const structure = wrapper.firstElementChild;
    element.appendChild(structure);
    return structure;
}