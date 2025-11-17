import React from "react";
import { Option } from "./Option";
import { getQuiz } from "../utils/storage";
import { useState } from "react";
export function Question() {
    const [options, setOption] = useState([])
    const [question_title, setQuestionTitle] = useState("");
    function AddOption(){
        setOption([...options, <Option/>])
    }
    return(
        <div>
        <input type="text" 
        placeholder="Enter question text" 
        value={question_title} 
        onChange={(e)=>{setQuestionTitle(e.target.value)}}
        />
        <button onClick={AddOption()}>Додати Варіант</button>

        {options.map((option, index) => (
        <div key={index}>{option}</div>
      ))}
        </div>
    )
}
