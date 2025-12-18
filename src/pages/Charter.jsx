import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import '../assets/css/charter.css';

/**
 * Charter Page Component
 * Displays the institutional charter with expandable articles
 */
function Charter() {
  const [charterData, setCharterData] = useState(null);
  const [expandedArticles, setExpandedArticles] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCharterData();
  }, []);

  /**
   * Fetches charter data from JSON file
   */
  const fetchCharterData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/data/charter.json');
      if (!response.ok) {
        throw new Error('Failed to load charter data');
      }
      const data = await response.json();
      setCharterData(data);
    } catch (err) {
      console.error("Failed to load charter JSON:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggles the expansion state of an article
   * @param {number} idx - The index of the article to toggle
   */
  const toggleArticle = (idx) => {
    setExpandedArticles(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  if (isLoading) {
    return (
      <div className="charter-page">
        <div className="loading-state">Loading charter...</div>
      </div>
    );
  }

  if (!charterData) {
    return (
      <div className="charter-page">
        <div className="error-state">Failed to load charter data.</div>
      </div>
    );
  }

  return (
    <div className="charter-page">
      <SEO
        title="Charter"
        description="Read the ITCPR institutional charter. Learn about our mission, governance structure, articles, and organizational principles."
        keywords="ITCPR charter, institutional charter, governance, mission statement, organizational structure"
        url={location.pathname}
      />
      <PageHeader />
      <CharterSection 
        charterData={charterData}
        expandedArticles={expandedArticles}
        onToggleArticle={toggleArticle}
      />
    </div>
  );
}

/**
 * Page Header Component
 * Hero section for the charter page
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>Institutional Charter</h1>
          <p>
            Our guiding principles and organizational framework that shape 
            ITCPR's mission and operations.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Charter Section Component
 * Main content area with charter articles
 */
function CharterSection({ charterData, expandedArticles, onToggleArticle }) {
  return (
    <section className="charter-section">
      <div className="container">
        <div className="charter-content">
          {charterData.preamble && (
            <PreambleSection preamble={charterData.preamble} />
          )}

          {charterData.articles.map((article, idx) => (
            <ArticleSection
              key={idx}
              article={article}
              index={idx}
              isExpanded={expandedArticles[idx] || false}
              onToggle={onToggleArticle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Preamble Section Component
 * Displays the charter preamble
 */
function PreambleSection({ preamble }) {
  return (
    <div className="article-section preamble-section">
      <h2 className="charter-title">{preamble.title}</h2>
      <div className="charter-bar"></div>
      <div 
        className="charter-text" 
        dangerouslySetInnerHTML={{
          __html: preamble.content.replace(/\n/g, "<br>")
        }}
      />
    </div>
  );
}

/**
 * Article Section Component
 * Expandable article with sections and items
 */
function ArticleSection({ article, index, isExpanded, onToggle }) {
  return (
    <div className="article-section expandable-article">
      <div
        className="expandable-header"
        onClick={() => onToggle(index)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(index);
          }
        }}
        aria-expanded={isExpanded}
        aria-label={`Toggle ${article.title}`}
      >
        <h2 className="charter-title">
          <span className="expand-icon">
            <i className={`fa-solid fa-chevron-${isExpanded ? 'down' : 'right'}`}></i>
          </span>
          {article.title}
        </h2>
        <div className="charter-bar"></div>
      </div>
      {isExpanded && (
        <div className="expandable-content">
          {article.sections.map((section, sectionIdx) => (
            <ArticleSectionContent 
              key={sectionIdx} 
              section={section} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Article Section Content Component
 * Individual section within an article
 */
function ArticleSectionContent({ section }) {
  return (
    <div className="section-content">
      <h3>{section.title}</h3>
      <ul>
        {section.items.map((item, itemIdx) => (
          <li 
            key={itemIdx} 
            dangerouslySetInnerHTML={{
              __html: item.label
                ? `<b>${item.label}:</b> ${item.text}`
                : item.text
            }}
          />
        ))}
      </ul>
    </div>
  );
}

export default Charter;
