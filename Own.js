// To solve this part I use the following link :
// https://blog.logrocket.com/localstorage-javascript-complete-guide/
// https://www.taniarascia.com/how-to-use-local-storage-with-javascript/


document.addEventListener('DOMContentLoaded', function () {
    loadQuizFromLocalStorage();
});

function addNewQuestion() {
    // Get values from the form
    var questionText = document.getElementById('question-text').value;
    var answerType = document.getElementById('answer-type').value;
    var possibleAnswers = document.getElementById('answers').value.split('\n');
    var correctAnswers = document.getElementById('correct-answer').value.split(',');

  // Create an object 
    var question = {
        text: questionText,
        type: answerType,
        answers: possibleAnswers,
        correctAnswers: correctAnswers

    };
    // Save the question to the local storage
    storeQuestionInLocalStorage(question);
     // Display the question
    displayQuestion(question);

      // Clear the form for the next question
    document.getElementById('question-form').reset();
    
}
// Use local storage to save the created quiz on the user's browser.
function storeQuestionInLocalStorage(question) {
   // retrieves the current state of the quiz from the browser's local storage
    var quiz = JSON.parse(localStorage.getItem('quiz')) || [];

    // Add the new question to the quiz
    quiz.push(question);

    // Save the updated quiz to local storage
    localStorage.setItem('quiz', JSON.stringify(quiz));
}
function loadAndDisplayQuizFromLocalStorage() {
    // Retrieve quiz from local storage
    var quiz = JSON.parse(localStorage.getItem('quiz')) || [];

    // Display each question from the quiz
    quiz.forEach(function (question) {
        displayQuestion(question);
    });
}
function displayQuestion(question) {
    // Create HTML for the question
    var questionHTML = '<div class="question">';
    questionHTML += '<h3>' + question.text + '</h3>';

    // Display possible answers based on the answer type
    if (question.type === 'textbox') {
        questionHTML += '<input type="text" name="answer" required>';
    } else if (question.type === 'multiple-choice' || question.type === 'radio-buttons') {
        for (var i = 0; i < question.answers.length; i++) {
            questionHTML += '<label>';
            if (question.type === 'multiple-choice') {
                questionHTML += '<input type="checkbox" name="answer" value="' + question.answers[i] + '">';
            } else {
                questionHTML += '<input type="radio" name="answer" value="' + question.answers[i] + '">';
            }
            questionHTML += question.answers[i] + '</label>';
        }
    }
    questionHTML += '</div>';


    document.getElementById('quiz-questions').innerHTML += questionHTML;
}

function displayQuizUI() {
    
    var quiz = JSON.parse(localStorage.getItem('quiz')) || [];

    quiz.forEach(function (question, index) {
        displayQuestion(question, index);
    });

    var submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Answers';
    submitButton.addEventListener('click', submitAnswers);
    document.getElementById('quiz-questions').appendChild(submitButton);
}
function setAnswerType(type) {
    // Set the answer type based on the button clicked
    document.getElementById('answer-type').value = type;
}