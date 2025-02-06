// Event listener for form submission
document.getElementById('userData').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gather user input
    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const age = document.getElementById('age').value.trim();

    // Validate input
    if (!firstName || !lastName || !age) {
        alert('Please enter valid data.');
        return;
    }

    // Perform calculations
    const ageInMonths = age * 12;
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - age;

    // Fun interaction: Greeting message
    const greetingMessage = `Hello ${firstName} ${lastName}! Did you know you're approximately ${ageInMonths} months old? You were born around ${birthYear}.`;

    // Update result on the web page
    const resultDiv = document.getElementById('results');
    resultDiv.textContent = greetingMessage|| "Welcome! Thank you for your submission";

    // Log data to the console
    console.log('User Input:', { firstName, lastName, age });
    console.log('Calculations:', { ageInMonths, birthYear });

    // Additional fun interaction: Inspirational message
    const inspirationalMessages = [
        '"I can do all things through Christ who strengthens me" Philipians 4:13'
    ];
    const randomMessage = inspirationalMessages[Math.floor(Math.random() * inspirationalMessages.length)];
    resultDiv.innerHTML += `<br><br>${randomMessage}`;
});
