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
