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
            
            }
        }
    }

}

export function appendTemplate(template,element){
    const wrapper = document.createElement("div");
    wrapper.innerHTML = template.trim();
    const structure = wrapper.firstElementChild;
    element.appendChild(structure);
    return structure;
}