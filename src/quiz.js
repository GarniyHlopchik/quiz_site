const correctAnswer = 'option3';

const quizForm = document.getElementById('quiz-form');
const resultsContainer = document.getElementById('results-container');
const resultsDiv = document.getElementById('results');

quizForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const answerForm = new FormData(quizForm);
    const userAnswer = answerForm.get('opros');

    if (userAnswer === null) {
        resultsDiv.textContent = "click cirkle bro";
        resultsContainer.style.display = "block";
        return;
    }

    if(userAnswer === correctAnswer){
    resultsDiv.textContent = "Correct";
    }
    else{
    resultsDiv.textContent = "unlucky";
    }
    resultsContainer.style.display = "block";
});

