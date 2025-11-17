import React, { useState, useEffect } from 'react';
import { getQuiz } from '../utils/storage';
import { useNavigate } from "react-router-dom";

export function QuizBrowse({quiz_id}){
    
    const quiz_title = getQuiz(quiz_id).title;
    return(
        <div>
            <label>{quiz_title}</label>
            <button onClick={CompleteQuiz(quiz_id)}>Пройти тест</button>
        </div>
    )
}

function CompleteQuiz(quiz_id){
    const navigate = useNavigate();
    navigate("/quiz", { quiz_id: quiz_id });
}