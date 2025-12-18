import { supabase } from "./footer.js";

document.getElementById("newsletter").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

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

function generateSlugFromTitle(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

function truncateTitle(title, maxLength = 70) {
    if (title.length <= maxLength) {
        return title;
    }
    return title.substring(0, maxLength).trim() + '...';
}

// Function to handle newsletter card clicks
window.goTo = function(url) {
    window.location.href = url;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    // Check for newsletter-list (newsletters page)
    const newsletterList = document.getElementById('newsletter-list');
    if (newsletterList) {
        const { data: newsData, error: fetchError } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });

        if (fetchError) {
            console.error('Error fetching news data:', fetchError);
            return;
        }

        newsData.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'newsletter-card';
            const newsSlug = news.slug || generateSlugFromTitle(news.title);
            newsCard.onclick = () => goTo("/news?slug=" + newsSlug);
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
                    <b>${truncateTitle(news.title)}</b>
                </div>
            `;
            newsletterList.appendChild(newsCard);
        });
        return;
    }

    // Check for news-grid (other pages)
    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
        const { data: newsData, error: fetchError } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(3);

        if (fetchError) {
            console.error('Error fetching news data:', fetchError);
            return;
        }

        newsData.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.className = 'newsletter-card';
            const newsSlug = news.slug || generateSlugFromTitle(news.title);
            newsCard.onclick = () => goTo("/news?slug=" + newsSlug);
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
                    <b>${truncateTitle(news.title)}</b>
                </div>
            `;
            newsGrid.appendChild(newsCard);
        });
    }
});