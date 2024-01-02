// Function to display error messages
function displayErrorMessage(message) {
    document.getElementById('error-message').textContent = message;
}
// Function to validate the form
function formValidate() {
    // Reset error message
    document.getElementById('error-message').textContent = '';
     // VALID NAME
   // I use this link to solve this part :https://www.codexworld.com/how-to/validate-first-last-name-with-regular-expression-using-javascript/
    var firstName = document.getElementById('firstName').value; //  method to access the input field by its ID
    var lastName = document.getElementById('lastName').value;
    var nameRegex = /^[A-Za-z]+$/; //  Regular expressions to check if both first name and last name contain only letters

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        displayErrorMessage('Try again, only letters are accepted');
        return;
    }

   // VALID EMAIL
    var email = document.getElementById('email').value;
    var emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // to check if the email has a valid format

    if (!emailRegex.test(email)) {
        displayErrorMessage('Please enter a valid email address');
        return;
    }
}