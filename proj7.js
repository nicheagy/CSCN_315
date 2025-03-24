document.addEventListener("DOMContentLoaded", () => {
    // Requirement #1: Handle review selections using checkboxes
    const selectedRatings = [];
    const checkboxes = document.querySelectorAll("#reviewForm input[type='checkbox']");
    const submitReviewBtn = document.getElementById("submitReview");
    const reviewList = document.getElementById("reviewList");
    
    // Event listener for review submission
    submitReviewBtn.addEventListener("click", () => {
        const name = document.getElementById("customerName").value.trim(); // Get customer name
        const reviewText = document.getElementById("reviewText").value.trim(); // Get review text
        
        selectedRatings.length = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedRatings.push(checkbox.value); // Store selected ratings in array
            }
        });
        
        if (name && reviewText && selectedRatings.length > 0) {
            addReview(name, reviewText, selectedRatings); // Add review to list
        }
    });
    
    // Function to add a review to the list
    function addReview(name, reviewText, ratings) {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${name}</strong>: ${reviewText} (Rating: ${ratings.join(", ")})`;
        
        // Create a remove button for each review
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => li.remove(); // Remove review when clicked
        li.appendChild(removeBtn);
        
        reviewList.appendChild(li); // Append review to the list
    }

    // Requirement #2: Validate phone number using a regular expression
    const phoneInput = document.getElementById("phoneNumber");
    const phoneMessage = document.getElementById("phoneMessage");
    const phoneRegex = /^\d{10}$/; // Ensures exactly 10 digits without special characters
    
    // Event listener for phone number validation
    phoneInput.addEventListener("input", () => {
        if (phoneRegex.test(phoneInput.value)) {
            phoneMessage.textContent = "Valid phone number!";
            phoneMessage.style.color = "green";
        } else {
            phoneMessage.textContent = "Invalid phone number. Please enter 10 digits.";
            phoneMessage.style.color = "red";
        }
    });

    // Requirement #3: File upload and display contents
    const fileInput = document.getElementById("fileInput");
    const fileContents = document.getElementById("fileContents");
    
    // Event listener for file upload
    fileInput.addEventListener("change", function() {
        const file = this.files[0]; // Get the uploaded file
        if (file) {
            const reader = new FileReader(); // Create file reader
            reader.onload = function(e) {
                fileContents.textContent = e.target.result; // Display file contents
            };
            reader.readAsText(file); // Read file as text
        }
    });
});