import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { marked } from 'marked';
import '../assets/css/post.css';

/**
 * News Page Component
 * Displays individual news article details
 */
function News() {
  const { slug } = useParams();
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          document.title = newsItem.title + ' - ITCPR';
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
        <div className="loading-state">
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !newsData) {
    return (
      <div className="news-page">
        <div className="error-state">
          <p>{error || 'News not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
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

