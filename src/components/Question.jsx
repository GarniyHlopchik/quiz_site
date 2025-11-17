import React from "react";
import { Option } from "./Option";

export function Question({ index, questionData, setQuestionData }) {
  const { text = "", options = [] } = questionData;

  // Додаємо новий варіант відповіді
  function addOption() {
    const newOptions = [...options, { id: Date.now(), text: "", correct: false }];
    setQuestionData(index, { ...questionData, options: newOptions });
  }

  // Оновлюємо дані конкретного варіанту
  function setOptionData(optIndex, data) {
    const newOptions = [...options];
    newOptions[optIndex] = { ...newOptions[optIndex], ...data };
    setQuestionData(index, { ...questionData, options: newOptions });
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="Enter question text"
        onChange={(e) =>
          setQuestionData(index, { ...questionData, text: e.target.value, options })
        }
      />
      <button onClick={addOption}>Додати Варіант</button>

      {options.map((opt, i) => (
        <Option
          key={opt.id}
          index={i}
          optionData={opt}
          setOptionData={setOptionData}
        />
      ))}
    </div>
  );
}