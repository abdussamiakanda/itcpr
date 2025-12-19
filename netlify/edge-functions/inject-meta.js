/**
 * Netlify Edge Function to inject meta tags for social media crawlers
 * This function detects crawlers and injects the correct meta tags server-side
 */

// List of known social media crawlers
const CRAWLER_USER_AGENTS = [
  // Social & previews
  'facebookexternalhit','Facebot','Twitterbot','LinkedInBot','WhatsApp',
  'Slackbot','Discordbot','TelegramBot','SkypeUriPreview',
  'Pinterest','Pinterestbot','Redditbot','VKShare','VKontakte',
  'WeChat','Weibo','Line','KakaoTalk','Applebot',
  // Search engines
  'Googlebot','Googlebot-Image','Googlebot-News','Googlebot-Video',
  'AdsBot-Google','bingbot','BingPreview','Slurp','DuckDuckBot',
  'Baiduspider','YandexBot','Sogou','Exabot','SeznamBot','Qwantify',
  'MojeekBot','ia_archiver',
  // SEO / crawlers
  'AhrefsBot','SemrushBot','MJ12bot','DotBot','CCBot',
  // AI crawlers
  'GPTBot','ChatGPT-User','ClaudeBot','PerplexityBot',
  'Amazonbot','Bytespider',
  // Email / scanners
  'Outlook','Thunderbird','YahooMailProxy','Gmail','ProtonMail',
  // Monitoring
  'Pingdom','UptimeRobot','StatusCake','Datadog','NewRelicPinger'
];

function isCrawler(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(crawler => ua.includes(crawler.toLowerCase()));
}

/**
 * Fetch news article data from Supabase
 */
async function fetchNewsArticle(slug) {
  try {
    // Use Supabase REST API
    // Edge Functions can access Netlify environment variables
    const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL') || 
                       Deno.env.get('SUPABASE_URL') || 
                       'https://fkhqjzzqbypkwrpnldgk.supabase.co';
    const supabaseKey = Deno.env.get('VITE_SUPABASE_ANON_KEY') || 
                       Deno.env.get('SUPABASE_ANON_KEY') || 
                       '';
    
    const response = await fetch(`${supabaseUrl}/rest/v1/news?select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) return null;
    
    const allNews = await response.json();
    
    // Generate slug from title (matching the client-side logic)
    const generateSlugFromTitle = (title) => {
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
    
    // Find matching article
    const article = allNews.find(news => {
      const generatedSlug = generateSlugFromTitle(news.title);
      return generatedSlug === slug || news.slug === slug;
    });
    
    return article;
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

/**
 * Strip HTML and truncate text
 */
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function truncateText(text, maxLength = 160) {
  if (!text) return '';
  const plainText = stripHtml(text);
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

/**
 * Generate meta tags HTML
 */
function generateMetaTags(article, pathname) {
  const siteUrl = 'https://itcpr.org';
  const siteName = 'ITCPR - Institute for Theoretical and Computational Physics Research';
  
  if (article) {
    // News article meta tags
    const title = article.title;
    const description = truncateText(article.content || article.description || '');
    let image = article.image || '/assets/image/logo.png';
    if (image && !image.startsWith('http')) {
      image = image.startsWith('/') ? `${siteUrl}${image}` : `${siteUrl}/${image}`;
    }
    const publishedTime = article.created_at ? new Date(article.created_at).toISOString() : '';
    const modifiedTime = article.updated_at ? new Date(article.updated_at).toISOString() : publishedTime;
    const author = article.author || '';
    
    return `
      <title>${title} | ${siteName}</title>
      <meta name="description" content="${description}" />
      <link rel="canonical" href="${siteUrl}${pathname}" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="${siteUrl}${pathname}" />
      <meta property="og:title" content="${title} | ${siteName}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content="${siteName}" />
      <meta property="og:locale" content="en_US" />
      ${author ? `<meta name="author" content="${author}" />` : ''}
      ${author ? `<meta property="article:author" content="${author}" />` : ''}
      ${publishedTime ? `<meta property="article:published_time" content="${publishedTime}" />` : ''}
      ${modifiedTime ? `<meta property="article:modified_time" content="${modifiedTime}" />` : ''}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="${siteUrl}${pathname}" />
      <meta name="twitter:title" content="${title} | ${siteName}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:image" content="${image}" />
    `;
  } else {
    // Default meta tags
    const defaultDescription = 'ITCPR is committed to transcending traditional boundaries in science, providing research opportunities to individuals typically overlooked in the scientific field.';
    return `
      <meta property="og:type" content="website" />
      <meta property="og:url" content="${siteUrl}${pathname}" />
      <meta property="og:title" content="${siteName}" />
      <meta property="og:description" content="${defaultDescription}" />
      <meta property="og:image" content="${siteUrl}/assets/image/logo.png" />
      <meta property="og:site_name" content="${siteName}" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${siteName}" />
      <meta name="twitter:description" content="${defaultDescription}" />
      <meta name="twitter:image" content="${siteUrl}/assets/image/logo.png" />
    `;
  }
}

export default async (request, context) => {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Only process for crawlers
  if (!isCrawler(userAgent)) {
    // Not a crawler, pass through
    return context.next();
  }
  
  // Check if this is a news article route
  const newsMatch = pathname.match(/^\/news\/(.+)$/);
  let article = null;
  
  if (newsMatch) {
    const slug = newsMatch[1];
    article = await fetchNewsArticle(slug);
  }
  
  // Fetch the original HTML (this will get index.html due to SPA redirect)
  const response = await context.next();
  
  // Only modify HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }
  
  const html = await response.text();
  
  // Generate meta tags
  const metaTags = generateMetaTags(article, pathname);
  
  // Remove existing default meta tags and inject new ones
  let modifiedHtml = html;
  
  // Remove default og:url, og:title, og:description, og:image if they exist
  modifiedHtml = modifiedHtml.replace(/<meta\s+property="og:url"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+property="og:title"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+property="og:description"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+property="og:image"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+name="twitter:title"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+name="twitter:description"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+name="twitter:image"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  
  // Inject new meta tags before </head>
  modifiedHtml = modifiedHtml.replace(
    '</head>',
    metaTags + '</head>'
  );
  
  // Create new response with modified HTML
  return new Response(modifiedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...Object.fromEntries(response.headers),
      'content-type': 'text/html; charset=utf-8',
    },
  });
};

