import React from "react";
import { Option } from "./Option";
import { getQuiz } from "../utils/storage";
export function Question({ question, onSelect}) {
    const [options_selected, setSelectedArr] = useState()
    return (
        <div>
        {GenerateQuestions(question)}
        </div>
    )
}
function GenerateQuestions(question){
    const option_elements = [];
    for(const o of question.options){
        question_elements.push(<Option option={o} onSelect={onSelect} />);
    }
}