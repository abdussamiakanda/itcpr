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
            .insert([{ email, location: 'newsletter', title: 'ITCPR Newsletter' }]);

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
window.goTo = function(url) {
    window.location.href = url;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    const { data: newsData, error: fetchError } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

    if (fetchError) {
        console.error('Error fetching news data:', fetchError);
        return;
    }

    const newsContainer = document.getElementById('newsletter-list');

    newsData.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'newsletter-card';
        newsCard.onclick = () => goTo("/news?id=" + news.id);
        newsCard.innerHTML = `
            <img src="${news.image}" alt="${news.title}">
            <div class="newsletter-content">
                <div class="newsletter-header">
                    <span>${new Date(news.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                    <span class="newsletter-type ${news.type}">${news.type}</span>
                </div>
                <b>${news.title}</b>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
});