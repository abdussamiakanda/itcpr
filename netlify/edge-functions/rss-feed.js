/**
 * Netlify Edge Function to generate dynamic RSS feed
 * Fetches news articles from Supabase and generates RSS 2.0 XML
 */

const SITE_URL = 'https://itcpr.org';
const SITE_NAME = 'Institute for Theoretical and Computational Physics Research';
const SITE_DESCRIPTION = 'ITCPR is committed to transcending traditional boundaries in science, providing research opportunities to individuals typically overlooked in the scientific field.';

/**
 * Generate slug from title (matches the logic used in the app)
 */
function generateSlugFromTitle(title) {
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
}

/**
 * Strip HTML tags and get plain text
 */
function stripHtml(html) {
  if (!html) return '';
  // Simple HTML tag removal for RSS description
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

/**
 * Truncate text to specified length
 */
function truncateText(text, maxLength = 300) {
  if (!text) return '';
  const plainText = stripHtml(text);
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Format date to RFC 822 format for RSS
 */
function formatRSSDate(dateString) {
  const date = new Date(dateString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = days[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${day}, ${String(date.getUTCDate()).padStart(2, '0')} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Fetch news articles from Supabase
 */
async function fetchNewsArticles() {
  try {
    const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL') || 
                       Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('VITE_SUPABASE_ANON_KEY') || 
                       Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not configured');
      return [];
    }
    
    const response = await fetch(`${supabaseUrl}/rest/v1/news?select=*&order=created_at.desc&limit=50`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });
    
    if (!response.ok) {
      console.error('Error fetching news:', response.status, response.statusText);
      return [];
    }
    
    const news = await response.json();
    return news || [];
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return [];
  }
}

/**
 * Generate RSS XML from news articles
 */
function generateRSSXML(newsArticles) {
  const now = new Date();
  const lastBuildDate = formatRSSDate(now.toISOString());
  
  let itemsXML = '';
  
  newsArticles.forEach(article => {
    const slug = article.slug || generateSlugFromTitle(article.title);
    const articleUrl = `${SITE_URL}/news/${slug}`;
    const pubDate = formatRSSDate(article.created_at || article.updated_at || now.toISOString());
    const description = truncateText(article.content || article.description || '');
    const imageUrl = article.image 
      ? (article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image.startsWith('/') ? '' : '/'}${article.image}`)
      : `${SITE_URL}/assets/image/logo.png`;
    
    itemsXML += `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(article.author || 'ITCPR')}</author>
      <enclosure url="${imageUrl}" type="image/png"/>
    </item>
`;
  });
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${lastBuildDate}</pubDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_URL}/assets/image/logo.png</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${SITE_URL}</link>
    </image>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXML}  </channel>
</rss>`;
}

/**
 * Edge Function Handler
 */
export default async (request, context) => {
  // Only handle GET requests for /rss.xml
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
  
  try {
    // Fetch news articles from Supabase
    const newsArticles = await fetchNewsArticles();
    
    // Generate RSS XML
    const rssXML = generateRSSXML(newsArticles);
    
    // Return RSS feed with proper headers
    return new Response(rssXML, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
};

