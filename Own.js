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

    // Append the question to the quiz container
    document.getElementById('quiz-questions').innerHTML += questionHTML;
}
function setAnswerType(type) {
    // Set the answer type based on the button clicked
    document.getElementById('answer-type').value = type;
}
document.addEventListener('DOMContentLoaded', function () {
    loadQuizFromLocalStorage();
});