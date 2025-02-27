document.addEventListener("DOMContentLoaded", function () {
    const form = document.forms["registrationForm"];

    // Event listener for form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting by default
        let isValid = true;

        try {
            // Validate Full Name (only letters and spaces allowed)
            const fullName = form["fullName"].value;
            if (!/^[a-zA-Z ]+$/.test(fullName)) {
                isValid = false;
                console.warn("Full Name validation failed");
                alert("Invalid name: Only letters and spaces allowed.");
            }

            // Validate Username (6-15 characters, alphanumeric, must start with a letter)
            const username = form["username"].value;
            if (!/^[a-zA-Z][a-zA-Z0-9]{5,14}$/.test(username)) {
                isValid = false;
                console.warn("Username validation failed");
                alert("Invalid username: Must be 6-15 characters and start with a letter.");
            }

            // Validate Email (proper email format)
            const email = form["email"].value;
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                isValid = false;
                console.error("Email validation failed");
                alert("Invalid email format.");
            }

            // Validate Password (8-20 characters, uppercase, lowercase, number, special character)
            const password = form["password"].value;
            if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}/.test(password)) {
                isValid = false;
                console.error("Password validation failed");
                alert("Password must be 8-20 characters with uppercase, lowercase, number, and special character.");
            }

            // Validate Confirm Password (must match password exactly)
            const confirmPassword = form["confirmPassword"].value;
            if (password !== confirmPassword) {
                isValid = false;
                console.warn("Confirm password validation failed");
                alert("Passwords do not match.");
            }

            // Validate Phone Number (format: XXX-XXX-XXXX)
            const phone = form["phoneNumber"].value;
            if (!/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
                isValid = false;
                console.warn("Phone number validation failed");
                alert("Invalid phone format. Use XXX-XXX-XXXX.");
            }

            // Validate Date of Birth (must be at least 18 years old)
            const dob = new Date(form["dob"].value);
            const age = new Date().getFullYear() - dob.getFullYear();
            if (age < 18) {
                isValid = false;
                console.warn("Date of birth validation failed");
                alert("You must be at least 18 years old.");
            }

            // Validate Agreement to Terms (checkbox must be checked)
            if (!form["terms"].checked) {
                isValid = false;
                console.warn("Terms checkbox validation failed");
                alert("You must agree to the terms.");
            }

            // If all validations pass, submit the form
            if (isValid) {
                alert("Registration successful!");
                form.submit();
            }
        } catch (error) {
            console.error("Validation error: ", error);
            alert("An error occurred during validation. Please try again.");
        }
    });
});
