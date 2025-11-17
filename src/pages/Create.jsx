import React, { useState, useEffect } from 'react';
import { Question } from '../components/Question';
export function Create(){
    const [questions, setQuestions] = useState([]);
    const [quiz_title, SetTitle] = useState("");
    function AddQuestion() {
        setQuestions([...questions, <Question/>]);
    }
    return(
        <div>
            <input type='text' value={quiz_title} placeholder='Enter Quiz Name Here' onChange={(e) => SetTitle(e.target.value)}/>
            <button onClick={AddQuestion()}>Додати питання</button>
            <button>Зберегти квіз</button>

            {questions.map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </div>
    )
}
