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
}