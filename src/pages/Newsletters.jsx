import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../assets/css/newsletters.css';

/**
 * Newsletters Page Component
 * Displays newsletter subscription form and latest newsletter issues
 */
function Newsletters() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  const generateSlugFromTitle = (title) => {
    // Get first 10 words
    const words = title
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .slice(0, 10);
    
    return words
      .join('-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const truncateTitle = (title, maxLength = 70) => {
    if (title.length <= maxLength) {
      return title;
    }
    return title.substring(0, maxLength).trim() + '...';
  };

  useEffect(() => {
    const fetchNews = async () => {
      const { data: newsData, error: fetchError } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (!fetchError && newsData) {
        setNews(newsData);
      }
    };

    fetchNews();
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValue = email.trim();

    if (!emailValue) {
      setMessage("Please enter your email address.");
      return;
    }
    if (!isValidEmail(emailValue)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: existing, error: fetchError } = await supabase
        .from('subscribers')
        .select('email')
        .eq('email', emailValue)
        .maybeSingle();

      if (existing) {
        setMessage("You're already subscribed!");
      } else {
        const { error: insertError } = await supabase
          .from('subscribers')
          .insert([{ email: emailValue, location: 'newsletter', title: 'ITCPR Newsletter' }]);

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
    <div className="newsletters-page">
      <PageHeader />
      <SubscribeSection 
        email={email}
        setEmail={setEmail}
        isSubmitting={isSubmitting}
        message={message}
        handleSubmit={handleSubmit}
      />
      <NewsletterListSection 
        news={news}
        navigate={navigate}
        generateSlugFromTitle={generateSlugFromTitle}
        truncateTitle={truncateTitle}
      />
    </div>
  );
}

/**
 * Page Header Component
 * Hero section for the newsletters page
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>ITCPR Newsletters</h1>
          <p>
            Stay updated with the latest from ITCPR! Our newsletter brings you the newest 
            advancements in theoretical and computational physics research, upcoming events, 
            and insights into our community's activities.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Subscribe Section Component
 * Newsletter subscription form
 */
function SubscribeSection({ email, setEmail, isSubmitting, message, handleSubmit }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Subscribe to Our Newsletter</h2>
        </div>
        <p className="section-description">
          Sign up to stay connected and informed about our latest developments and opportunities.
        </p>
        
        <form id="newsletter" className="newsletter-email-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Your Email Address"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" value={isSubmitting ? "Subscribing..." : "Subscribe"} id="newsform" disabled={isSubmitting} />
          </div>
          <div id="form-message" className={`form-message ${message.includes('Successfully') ? 'success' : message ? 'error' : ''}`}>
            {message}
          </div>
        </form>
        
        <p className="privacy-note">
          We prioritize your privacy; your email is exclusively for sending our
          newsletter with the latest from ITCPR. You're free to unsubscribe
          whenever you wish.
        </p>
      </div>
    </section>
  );
}

/**
 * Newsletter List Section Component
 * Displays latest newsletter issues
 */
function NewsletterListSection({ news, navigate, generateSlugFromTitle, truncateTitle }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Latest News & Issues</h2>
        </div>
        <p className="section-description">
          Check out our latest newsletter issues for recent highlights and advancements.
        </p>

        <div className="newsletter-list">
          {news.map((item, index) => {
            const slug = item.slug || generateSlugFromTitle(item.title);
            return (
              <NewsletterCard
                key={item.id}
                item={item}
                slug={slug}
                index={index}
                navigate={navigate}
                truncateTitle={truncateTitle}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Newsletter Card Component
 * Individual newsletter card
 */
function NewsletterCard({ item, slug, index, navigate, truncateTitle }) {
  const formattedDate = new Date(item.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div 
      className="research-card news-card newsletter-card"
      onClick={() => navigate(`/news/${slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/news/${slug}`);
        }
      }}
      aria-label={`Read newsletter: ${item.title}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-image">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="card-content">
        <div className="newsletter-header">
          <span className="date">{formattedDate}</span>
          <span className={`newsletter-type ${item.type}`}>{item.type}</span>
        </div>
        <h3 title={item.title}>{truncateTitle(item.title)}</h3>
      </div>
    </div>
  );
}

export default Newsletters;

