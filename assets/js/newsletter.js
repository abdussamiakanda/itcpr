import { supabase } from "./footer.js";

document.getElementById("newsletter").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();    // Basic email validation

    if (!email) {
        showMessage("Please enter your email address.", "error");
        return;
    }
    if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address.", "error");
        return;
    }
    
    const submitButton = document.getElementById("newsform");
    submitButton.disabled = true;
    submitButton.value = "Subscribing...";

    try {
        const { data: existing, error: fetchError } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', email)
        .maybeSingle();

        if (existing) {
            showMessage("You're already subscribed!", "success");
        } else {
        submitButton.value = "Subscribing...";
        const { error: insertError } = await supabase
            .from('subscribers')
            .insert([{ email }]);

        if (insertError) {
            console.error("Insert error:", insertError);
            showMessage("Something went wrong. Please try again.", "error");
        } else {
            showMessage("Successfully subscribed!", "success");
        }
        }

        emailInput.value = "";
        document.getElementById("footer-form").reset();
    } catch (err) {
        console.error("Unexpected error:", err);
        showMessage("Something went wrong.", "error");
    } finally {
        submitButton.disabled = false;
        submitButton.value = "Subscribe";
    }
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