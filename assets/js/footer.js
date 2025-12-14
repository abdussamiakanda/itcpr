import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const supabase = createClient(
  'https://fkhqjzzqbypkwrpnldgk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZraHFqenpxYnlwa3dycG5sZGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MzM0OTAsImV4cCI6MjA2MzIwOTQ5MH0.O5LjcwITJT3hIbnNnXJNYYYPDeOGBKkLmU6EyUUY478'
);

function myFooter() {
  document.getElementById("footer").innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-section">
            <h3>About ITCPR</h3>
            <p>ITCPR is committed to transcending traditional boundaries in science, providing research opportunities to individuals typically overlooked in the scientific field.</p>
          </div>
          
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/story">Our Story</a></li>
              <li><a href="/groups">Research Groups</a></li>
              <li><a href="/publications">Publications</a></li>
              <li><a href="/outreach">Outreach</a></li>
              <li><a href="/people">People</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="/internships">Apply</a></li>
              <li><a href="/support">Support Us</a></li>
              <li><a href="/newsletters">Newsletters</a></li>
              <li><a href="https://events.itcpr.org" target="_blank">Seminars</a></li>
              <li><a href="/financials">Financials</a></li>
            </ul>
          </div>
          
          <div class="footer-section">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest updates and research news.</p>
            <form class="newsletter-form" id="footer-form" onsubmit="return false;">
              <input type="email" placeholder="Enter your email" id="footer-email" required>
              <button type="submit" id="footer-submit">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="copyright">
            © ${new Date().getFullYear()} Institute for Theoretical and Computational Physics Research. All rights reserved.
          </div>
          <div class="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
            <a href="/accessibility">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  document.getElementById("footer-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const emailInput = document.getElementById("footer-email");
    const email = emailInput.value.trim().toLowerCase();

    const submitButton = document.getElementById("footer-submit");
    submitButton.disabled = true;
    submitButton.value = "Checking...";

    if (!email || !isValidEmail(email)) {
      submitButton.disabled = false;
      submitButton.value = "Subscribe";
      return;
    }

    try {
      const { data: existing, error: fetchError } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        alert("You're already subscribed!");
      } else {
        submitButton.value = "Subscribing...";
        const { error: insertError } = await supabase
          .from('subscribers')
          .insert([{ email, location: 'itcpr', title: 'ITCPR Footer' }]);

        if (insertError) {
          console.error("Insert error:", insertError);
          alert("Something went wrong. Please try again.");
        } else {
          alert("Successfully subscribed!");
        }
      }

      emailInput.value = "";
      document.getElementById("footer-form").reset();
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Something went wrong.");
    } finally {
      submitButton.disabled = false;
      submitButton.value = "Subscribe";
    }
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

myFooter();
