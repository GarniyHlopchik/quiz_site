import React, { useState, useEffect } from 'react';
import { getAllQuizzes } from '../utils/storage';
import { QuizBrowse } from '../components/QuizBrowse';
export function Index(){
    return(
        <div>
        {ListQuizes()}
        </div>
    )
}

function ListQuizes(){
    const quizes = getAllQuizzes();
    const elements = [];
    for(const q of quizes){
        elements.push(<QuizBrowse quiz_id={q.quiz_id}/>);
    }
    return elements;
}