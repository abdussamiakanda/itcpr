import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../assets/css/footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = email.trim().toLowerCase();

    if (!emailValue || !isValidEmail(emailValue)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: existingRows, error: fetchError } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', emailValue)
        .limit(1);

      if (fetchError) {
        console.error("Subscriber check error:", fetchError);
        setMessage("Something went wrong. Please try again.");
      } else if (existingRows?.length > 0) {
        setMessage("You're already subscribed!");
      } else {
        const { error: insertError } = await supabase
          .from('subscribers')
          .insert([{ email: emailValue, location: 'itcpr', title: 'ITCPR Footer' }]);

        if (insertError) {
          console.error("Insert error:", insertError);
          setMessage("Something went wrong. Please try again.");
        } else {
          setMessage("Successfully subscribed!");
          setEmail('');
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setMessage("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3>About ITCPR</h3>
            <p>ITCPR is committed to transcending traditional boundaries in science, providing research opportunities to individuals typically overlooked in the scientific field.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/story">Our Story</Link></li>
              <li><Link to="/groups">Research Groups</Link></li>
              <li><Link to="/publications">Publications</Link></li>
              <li><Link to="/outreach">Outreach</Link></li>
              <li><Link to="/people">People</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Resources</h3>
            <ul>
              <li><Link to="/internships">Apply</Link></li>
              <li><Link to="/support">Support Us</Link></li>
              <li><Link to="/newsletters">Newsletters</Link></li>
              <li><a href="https://events.itcpr.org" target="_blank" rel="noopener noreferrer">Seminars</a></li>
              <li><Link to="/financials">Financials</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest updates and research news.</p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && <p style={{ marginTop: '10px', color: message.includes('Successfully') ? 'green' : 'red' }}>{message}</p>}
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} Institute for Theoretical and Computational Physics Research. All rights reserved.
          </div>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

