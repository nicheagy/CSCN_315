// Main event listener for form submission
document.getElementById('userData').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userData = gatherUserInput();
    
    if (validateInput(userData)) {
        const calculations = performCalculations(userData.age);
        const greetingMessage = createGreetingMessage(userData, calculations);
        
        updateResultOnPage(greetingMessage);
        logDataToConsole(userData, calculations);
        addInspirationalMessage();
    } else {
        alert('Please enter valid data.');
    }
});

// Helper function to gather user input
function gatherUserInput() {
    return {
        firstName: document.getElementById('first_name').value.trim(),
        lastName: document.getElementById('last_name').value.trim(),
        age: document.getElementById('age').value.trim()
    };
}

// Helper function to validate user input
function validateInput({ firstName, lastName, age }) {
    return firstName && lastName && age;
}

// Helper function to perform calculations
function performCalculations(age) {
    const ageInMonths = age * 12;
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;

    return { ageInMonths, birthYear };
}

// Helper function to create greeting message
function createGreetingMessage({ firstName, lastName }, { ageInMonths, birthYear }) {
    return `Hello ${firstName} ${lastName}! Did you know you're approximately ${ageInMonths} months old? You were born around ${birthYear}.`;
}

// Helper function to update result on the web page
function updateResultOnPage(message) {
    const resultDiv = document.getElementById('results');
    resultDiv.textContent = message || "Welcome! Thank you for your submission";
}

// Helper function to log data to the console
function logDataToConsole(userData, calculations) {
    console.log('User Input:', userData);
    console.log('Calculations:', calculations);
}

// Helper function to add inspirational message
function addInspirationalMessage() {
    const inspirationalMessages = [
        '"I can do all things through Christ who strengthens me" -Philippians 4:13'
    ];
    const randomMessage = inspirationalMessages[Math.floor(Math.random() * inspirationalMessages.length)];
    const resultDiv = document.getElementById('results');
    resultDiv.innerHTML += `<br><br>${randomMessage}`;
}
