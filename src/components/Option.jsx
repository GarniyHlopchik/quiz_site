import React from "react";

export function Option({option, onSelect, isSelected}){
    return(
        <div>
            <label>{option["option-text"]}</label>
            <input type="checkbox" checked={isSelected}></input>
        </div>
    )
}