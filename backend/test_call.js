"use strict"

fetch("http://localhost:8000/api/add_quiz/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    title: "MyNewQuizName2"
  })
}).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));