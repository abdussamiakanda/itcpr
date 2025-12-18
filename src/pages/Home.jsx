import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import '../assets/css/index.css';

/**
 * Home Page Component
 * Main landing page for ITCPR website
 */
function Home() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchFeaturedNews();
  }, []);

  /**
   * Fetches the latest 3 news items from Supabase
   */
  const fetchFeaturedNews = async () => {
    try {
      setIsLoading(true);
      const { data: newsData, error: fetchError } = await supabase
        .from('news')
        .select('*')
        .eq('type', 'news')
        .order('created_at', { ascending: false })
        .limit(3);

      if (!fetchError && newsData) {
        setNews(newsData);
      } else if (fetchError) {
        console.error('Error fetching news:', fetchError);
      }
    } catch (error) {
      console.error('Unexpected error fetching news:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Generates a URL-friendly slug from a title
   * @param {string} title - The title to convert to a slug
   * @returns {string} - The generated slug
   */
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

  /**
   * Formats a date to a readable string
   * @param {string} dateString - ISO date string
   * @returns {string} - Formatted date string
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  /**
   * Handles navigation to a news article
   * @param {string} slug - The slug of the news article
   */
  const handleNewsClick = (slug) => {
    navigate(`/news/${slug}`);
  };

  return (
    <>
      <HeroSection />
      <WhyJoinSection />
      <QuickLinksSection />
      <FeaturedNewsSection 
        news={news}
        isLoading={isLoading}
        onNewsClick={handleNewsClick}
        generateSlug={generateSlugFromTitle}
        formatDate={formatDate}
      />
    </>
  );
}

/**
 * Hero Section Component
 * Displays the main hero content with title, description, and CTA buttons
 */
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1>Institute for Theoretical and Computational Physics Research</h1>
            <p>
              ITCPR is committed to transcending traditional boundaries in science, 
              providing research opportunities to individuals typically overlooked in 
              the scientific field.
            </p>
            <div className="hero-buttons">
              <Link to="/internships" className="btn btn-primary">
                Apply Now
              </Link>
              <Link to="/story" className="btn btn-secondary">
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Why Join Section Component
 * Displays the benefits of joining ITCPR
 */
function WhyJoinSection() {
  const features = [
    {
      icon: 'fa-solid fa-atom',
      title: 'Scientific Community',
      description: 'Immerse yourself in a vibrant community dedicated to nurturing and expanding your enthusiasm for physics and research.'
    },
    {
      icon: 'fa-solid fa-person-chalkboard',
      title: 'Career Mentorship',
      description: 'Embark on a journey of professional growth and achievement with guidance from experienced career mentors in your field.'
    },
    {
      icon: 'fa-solid fa-book-bookmark',
      title: 'Research Opportunities',
      description: 'Dive into a world of innovation and discovery with access to leading research projects that push the boundaries of knowledge.'
    }
  ];

  return (
    <section className="why-join">
      <div className="container">
        <div className="section-header">
          <h2>Why Join ITCPR?</h2>
        </div>
        <p className="section-description">
          Discover the unique opportunities and benefits of being part of our research community.
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Feature Card Component
 * Individual feature card for the Why Join section
 */
function FeatureCard({ feature }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <i className={feature.icon}></i>
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </div>
  );
}

/**
 * Quick Links Section Component
 * Displays quick navigation links
 */
function QuickLinksSection() {
  const quickLinks = [
    {
      to: '/story',
      icon: 'fa-solid fa-circle-info',
      title: 'Learn about ITCPR',
      description: 'Discover our mission and vision'
    },
    {
      to: '/groups',
      icon: 'fa-solid fa-users-viewfinder',
      title: 'Find Your Group',
      description: 'Join a research group'
    },
    {
      to: '/internships',
      icon: 'fa-solid fa-keyboard',
      title: 'Apply to ITCPR',
      description: 'Start your application process'
    }
  ];

  return (
    <section className="quick-links">
      <div className="container">
        <div className="section-header">
          <h2>Get Started</h2>
        </div>
        <p className="section-description">
          Explore our resources and opportunities to begin your journey with ITCPR.
        </p>
        <div className="links-grid">
          {quickLinks.map((link, index) => (
            <QuickLinkCard key={index} link={link} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Quick Link Card Component
 * Individual link card for the Quick Links section
 */
function QuickLinkCard({ link }) {
  return (
    <Link to={link.to} className="link-card">
      <div className="link-icon">
        <i className={link.icon}></i>
      </div>
      <div className="link-content">
        <h3>{link.title}</h3>
        <p>{link.description}</p>
      </div>
    </Link>
  );
}

/**
 * Featured News Section Component
 * Displays the latest featured news articles
 */
function FeaturedNewsSection({ news, isLoading, onNewsClick, generateSlug, formatDate }) {
  return (
    <section className="featured-research">
      <div className="container">
        <div className="section-header">
          <h2>Featured News</h2>
          <Link to="/newsletters" className="view-all">
            <span>View All News</span>
          </Link>
        </div>
        <div className="research-grid">
          {isLoading ? (
            <div className="loading-state">Loading news...</div>
          ) : news.length === 0 ? (
            <div className="empty-state">No news available at this time.</div>
          ) : (
            news.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                slug={item.slug || generateSlug(item.title)}
                formattedDate={formatDate(item.created_at)}
                onClick={() => onNewsClick(item.slug || generateSlug(item.title))}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * News Card Component
 * Individual news article card
 */
function NewsCard({ item, slug, formattedDate, onClick }) {
  /**
   * Truncates title to 70 characters with ellipsis
   * @param {string} title - The title to truncate
   * @returns {string} - Truncated title with ellipsis if needed
   */
  const truncateTitle = (title) => {
    if (title.length <= 70) {
      return title;
    }
    return title.substring(0, 70).trim() + '...';
  };

  return (
    <div
      className="research-card news-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Read article: ${item.title}`}
    >
      <div className="card-image">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>
      <div className="card-content">
        <span className="date">{formattedDate}</span>
        <h3 title={item.title}>{truncateTitle(item.title)}</h3>
      </div>
    </div>
  );
}

export default Home;
