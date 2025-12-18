import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { marked } from 'marked';
import SEO from '../components/SEO';
import '../assets/css/post.css';

/**
 * News Page Component
 * Displays individual news article details
 */
function News() {
  const { slug } = useParams();
  const location = useLocation();
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to strip HTML and get plain text
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength = 160) => {
    if (!text) return '';
    const plainText = stripHtml(text);
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength).trim() + '...';
  };

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

  useEffect(() => {
    const loadNewsDetails = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        const { data: allNews, error: fetchError } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) {
          throw new Error('Error fetching news data');
        }

        const newsItem = allNews.find(news => {
          const generatedSlug = generateSlugFromTitle(news.title);
          return generatedSlug === slug || news.slug === slug;
        });

        if (newsItem) {
          setNewsData(newsItem);
        } else {
          setError('News not found');
        }
      } catch (err) {
        console.error('Error fetching news details:', err);
        setError('Error loading news article');
      } finally {
        setLoading(false);
      }
    };

    loadNewsDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="news-page">
        <SEO 
          title="Loading..."
          description="Loading news article..."
        />
        <div className="loading-state">
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !newsData) {
    return (
      <div className="news-page">
        <SEO 
          title="News Not Found"
          description="The requested news article could not be found."
        />
        <section className="content-section">
          <div className="container">
            <div className="content-wrapper">
              <div className="error-state-content">
                <div className="error-icon">
                  <i className="fas fa-newspaper"></i>
                </div>
                <div className="section-header">
                  <h2>News Article Not Found!</h2>
                </div>
                <p className="section-description">
                  The news article you're looking for does not exist or has been removed. It might have been moved, deleted, or the URL might be incorrect.
                </p>
                <ul className="suggestions-list">
                  <li>Check the URL for any typos or errors</li>
                  <li>Browse our <a href="/newsletters">latest news</a> for recent articles</li>
                  <li>Return to our <a href="/">home page</a> to explore other content</li>
                  <li>Use the search or navigation menu to find what you need</li>
                </ul>
                <div className="error-actions">
                  <a href="/newsletters" className="btn btn-primary">
                    <span>View All News</span>
                  </a>
                  <a href="/" className="btn btn-secondary">
                    <span>Go to Home</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Prepare SEO data for news article
  const description = truncateText(newsData.content || newsData.description || '');
  // Ensure image URL is absolute for social sharing
  let image = newsData.image || '/assets/image/logo.png';
  if (image && !image.startsWith('http')) {
    image = image.startsWith('/') ? `https://itcpr.org${image}` : `https://itcpr.org/${image}`;
  }
  const publishedTime = newsData.created_at ? new Date(newsData.created_at).toISOString() : null;
  const modifiedTime = newsData.updated_at ? new Date(newsData.updated_at).toISOString() : publishedTime;

  return (
    <div className="news-page">
      <SEO
        title={newsData.title}
        description={description}
        keywords={`ITCPR, ${newsData.type || 'news'}, physics research, ${newsData.title}`}
        image={image}
        url={location.pathname}
        type="article"
        author={newsData.author}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
      />
      <PageHeader newsData={newsData} />
      <ContentSection newsData={newsData} />
    </div>
  );
}

/**
 * Page Header Component
 * Hero section for the news article
 */
function PageHeader({ newsData }) {
  const formattedDate = new Date(newsData.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>{newsData.title}</h1>
          <div className="post-meta">
            <div className="post-meta-item">
              <i className="fa-regular fa-calendar"></i>
              <span>{formattedDate}</span>
            </div>
            {newsData.author && (
              <div className="post-meta-item">
                <i className="fa-regular fa-user"></i>
                <span>By <span className="author">{newsData.author}</span></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Content Section Component
 * Displays the news article content
 */
function ContentSection({ newsData }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="content-wrapper" dangerouslySetInnerHTML={{
          __html: `
            <img src="${newsData.image}" alt="${newsData.title}" class="news-image">
            ${marked.parse(newsData.content.replaceAll('\n', '\n\n'))}
          `
        }}></div>
      </div>
    </section>
  );
}

export default News;

