document.getElementById("newsletter").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!email) {
        showMessage("Please enter your email address.", "error");
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
    }

    // Disable form while submitting
    const submitButton = document.getElementById("newsform");
    submitButton.disabled = true;
    submitButton.value = "Subscribing...";

    let formData = new FormData();
    formData.append("entry.818826994", email);

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSdaa_6_iDSpFcERvqBxY8nu6kHHKBtfE0R158phIbVzJhjivQ/formResponse", {
        method: "POST",
        body: formData,
        mode: "no-cors"
    })
    .then(() => {
        showMessage("Thank you for subscribing to the ITCPR Newsletter!", "success");
        emailInput.value = "";
        document.getElementById("newsletter").reset();
    })
    .catch(error => {
        console.error("Error:", error);
        showMessage("An error occurred. Please try again later.", "error");
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.value = "Subscribe";
    });
});

function showMessage(message, type) {
    const formMessage = document.getElementById("form-message");
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Scroll to message if it's not visible
    formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to handle newsletter card clicks
function goTo(url) {
    window.location.href = url;
}