var totalScore = 0;
// Function to display error messages
function displayErrorMessage(message) {
    document.getElementById('error-message').textContent = message;
    alert(message); 
}

function displaySuccessMessage(message) {
    document.getElementById('error-message').textContent = message;
    alert(message);
}

// Function to hide error messages
function hideErrorMessages() {
    document.getElementById('error-message').textContent = '';
}
function isQuestionAnswered(question) {
    var inputElements = document.getElementsByName(question);

    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type === 'text' || inputElements[i].checked) {
            return true;
        }
    }

    return false;
}

// Function to calculate and display the total score
function displayTotalScore() {
    var totalScoreElement = document.getElementById('total-score');
    totalScoreElement.textContent = 'Quiz submitted successfully! Your total score is: ' + totalScore;
}

function getCorrectAnswers() {
    return {
        q1: 'Qatar',
        q2: 'Inter Miami',
        q3: 'Kevin Durant',
        q4: ['Joe Biden'],
        q5: ['New Delhi'],
        q6: ['Blue'],
        q7: ['Blue Whale'],
        q8: 'Violet',  
        q9: 'The Nile',
        q10: '31',
        q11: 'Summer',
        q12: '88'
    };
}

function calculateScore() {
    var correctAnswers = getCorrectAnswers();
    var userAnswers = {
        q1: getSelectedRadioValue('q1'),
        q2: getSelectedRadioValue('q2'),
        q3: getSelectedRadioValue('q3'),
        q4: getSelectedCheckboxValues('q4'),
        q5: getSelectedCheckboxValues('q5'),
        q6: getSelectedCheckboxValues('q6'),
        q7: getSelectedCheckboxValues('q7'),
        q8: document.getElementsByName('q8')[0].value.trim().toLowerCase(),
        q9: document.getElementsByName('q9')[0].value.trim().toLowerCase(),
        q10: document.getElementsByName('q10')[0].value.trim().toLowerCase(),
        q11: document.getElementsByName('q11')[0].value.trim().toLowerCase(),
        q12: document.getElementsByName('q12')[0].value.trim().toLowerCase()
    };

    console.log('correctAnswers:', correctAnswers);
    console.log('userAnswers:', userAnswers);

    totalScore = 0;

    for (var question in correctAnswers) {
        if (Array.isArray(correctAnswers[question])) {
            if (arraysEqual(correctAnswers[question], userAnswers[question])) {
                totalScore++;
            }
        } else {
            if (typeof userAnswers[question] === 'string' && correctAnswers[question].toLowerCase() === userAnswers[question].toLowerCase()) {
                totalScore++;
            }
        }
    }

    console.log('totalScore:', totalScore);
}
function getSelectedRadioValue(question) {
    var inputElements = document.getElementsByName(question);

    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            return inputElements[i].value;
        }
    }

    return null;
}

function getSelectedCheckboxValues(question) {
    var inputElements = document.getElementsByName(question);
    var selectedValues = [];

    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].checked) {
            selectedValues.push(inputElements[i].value);
        }
    }

    return selectedValues;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}
// Function to validate the form
function formValidate() {
    // Reset error message
    hideErrorMessages();
     // VALID NAME
   // I use this link to solve this part :https://www.codexworld.com/how-to/validate-first-last-name-with-regular-expression-using-javascript/
    var firstName = document.getElementById('firstName').value; //  method to access the input field by its ID
    var lastName = document.getElementById('lastName').value;
    var nameRegex = /^[A-Za-z]+$/; //  Regular expressions to check if both first name and last name contain only letters

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        displayErrorMessage('Try again, First name and Last name must contain only letters');
        return;
    }

   // VALID EMAIL
    var email = document.getElementById('email').value;
    var emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // to check if the email has a valid format

    if (!emailRegex.test(email)) {
        displayErrorMessage('Please enter a valid email address');
        return;
    }
// Validate required questions are not left unanswered
    var requiredQuestions = ['q1', 'q2'];
    var isValid = true;

    for (var i = 0; i < requiredQuestions.length; i++) {
        var question = requiredQuestions[i];

        if (!isQuestionAnswered(question)) {
            isValid = false;
           // Display specific error message for each required question
            switch (question) {
                case 'q1':
                    displayErrorMessage('Question 1 is required to answer');
                    break;
                case 'q2':
                    displayErrorMessage('Question 2 is required to answer');
                    break;
            }
            break;
        }
    }

    if (!isValid) {
        return;
    }

    calculateScore();
    displayTotalScore(); // Display the total score immediately after calculating
    document.getElementById('quiz-form').reset();
}
// Function to display the total score
// Add an event listener to the submit button
document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault(); 
    formValidate();
});

document.getElementById('showResultBtn').addEventListener('click', function (event) {
    event.preventDefault();
    calculateScore();
    displayTotalScore();
});
function showResult() {
    var correctAnswers = getCorrectAnswers();
    var resultMessage = 'Correct Answers:\n\n';

    for (var question in correctAnswers) {
        var answer = correctAnswers[question];

        if (Array.isArray(answer)) {
            resultMessage += question + ': ' + answer.join(', ') + '\n';
        } else {
            resultMessage += question + ': ' + answer + '\n';
        }
    }

    alert(resultMessage);
}