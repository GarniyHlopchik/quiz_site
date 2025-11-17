import React, { useState, useEffect } from "react";

export function Option({ index, optionData, setOptionData }) {
  const { text: initialText = "", correct: initialCorrect = false } = optionData;

  const [text, setText] = useState(initialText);
  const [isSelected, setIsSelected] = useState(initialCorrect);

  // Оновлюємо батьківський стан при зміні тексту або чекбоксу
  useEffect(() => {
    setOptionData(index, { text, correct: isSelected });
  }, [text, isSelected]);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter option text"
      />
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => setIsSelected(e.target.checked)}
        />
        Correct
      </label>
    </div>
  );
}