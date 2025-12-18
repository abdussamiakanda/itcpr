import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import '../assets/css/404.css';

/**
 * NotFound Page Component
 */
function NotFound() {
  const location = useLocation();
  
  return (
    <div className="notfound-page">
      <SEO
        title="Page Not Found - 404"
        description="The page you're looking for doesn't exist. Return to ITCPR homepage or use the navigation menu to find what you need."
        url={location.pathname}
        keywords="404, page not found, ITCPR"
      />
      <PageHeader />
      <ContentSection />
    </div>
  );
}

/**
 * Page Header Component
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>404</h1>
          <p>Page Not Found</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Content Section Component
 */
function ContentSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="content-wrapper">
          <div className="section-header">
            <h2>Well, this is awkward...</h2>
          </div>
          <p className="section-description">
            It looks like the page you were trying to reach has decided to take a
            little vacation. But don't worry, there are plenty of other
            interesting places to visit on our site!
          </p>
          <ul className="suggestions-list">
            <li>Double-check the URL for typos</li>
            <li>Use the navigation menu to find your way</li>
            <li>Head back to our <Link to="/">home page</Link> and start a new journey</li>
            <li>Or, just enjoy this moment of serenity</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default NotFound;

