import { Helmet } from 'react-helmet-async';

/**
 * SEO Component
 * Handles meta tags, Open Graph, Twitter Cards, and other SEO elements
 * 
 * @param {Object} props
 * @param {string} props.title - Page title (will be appended with site name)
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords (comma-separated)
 * @param {string} props.image - Open Graph/Twitter image URL
 * @param {string} props.url - Canonical URL
 * @param {string} props.type - Open Graph type (default: 'website')
 * @param {string} props.author - Article author (for news articles)
 * @param {string} props.publishedTime - Article published time (ISO 8601)
 * @param {string} props.modifiedTime - Article modified time (ISO 8601)
 */
function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime
}) {
  const siteName = 'ITCPR - Institute for Theoretical and Computational Physics Research';
  const siteUrl = 'https://itcpr.org'; // Update with your actual domain
  const defaultImage = `${siteUrl}/assets/image/logo.png`;
  const defaultDescription = 'ITCPR is committed to transcending traditional boundaries in science, providing research opportunities to individuals typically overlooked in the scientific field.';
  
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Article specific meta tags (for news/blog posts) */}
      {type === 'article' && (
        <>
          {author && <meta name="author" content={author} />}
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Helmet>
  );
}

export default SEO;

