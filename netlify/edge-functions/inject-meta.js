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
 * Page SEO configuration
 * Maps routes to their SEO metadata
 */
const PAGE_SEO_CONFIG = {
  '/': {
    title: 'Home',
    description: 'ITCPR is committed to transcending traditional boundaries in science, providing research opportunities to individuals typically overlooked in the scientific field.',
    keywords: 'ITCPR, theoretical physics, computational physics, physics research, science education, research opportunities'
  },
  '/story': {
    title: 'Our Story',
    description: 'Learn about ITCPR\'s mission, vision, and objectives. Discover how we\'re transcending traditional boundaries in science and providing research opportunities.',
    keywords: 'ITCPR story, mission, vision, objectives, physics research, science education'
  },
  '/groups': {
    title: 'Research Groups',
    description: 'Explore ITCPR\'s research groups focused on spintronics, photonics, and other cutting-edge areas of theoretical and computational physics.',
    keywords: 'research groups, spintronics, photonics, physics research groups, theoretical physics'
  },
  '/publications': {
    title: 'Publications',
    description: 'Browse ITCPR\'s research publications in theoretical and computational physics. Explore our latest research papers, articles, and scientific contributions.',
    keywords: 'ITCPR publications, physics research papers, scientific publications, research articles, theoretical physics'
  },
  '/people': {
    title: 'People',
    description: 'Meet the ITCPR team, advisors, researchers, and collaborators who are advancing theoretical and computational physics research.',
    keywords: 'ITCPR team, physics researchers, scientists, advisors, collaborators'
  },
  '/contact': {
    title: 'Contact',
    description: 'Get in touch with ITCPR. Contact us for inquiries about research opportunities, collaborations, internships, and more.',
    keywords: 'contact ITCPR, physics research contact, collaboration inquiries'
  },
  '/newsletters': {
    title: 'Newsletters',
    description: 'Stay updated with ITCPR\'s latest news, research updates, and announcements. Subscribe to our newsletter for regular updates.',
    keywords: 'ITCPR newsletters, physics news, research updates, science news'
  },
  '/internships': {
    title: 'Internships',
    description: 'Explore internship opportunities at ITCPR. Join our research programs and gain hands-on experience in theoretical and computational physics.',
    keywords: 'physics internships, research internships, computational physics internships, science internships'
  },
  '/outreach': {
    title: 'Outreach',
    description: 'Learn about ITCPR\'s outreach programs and initiatives to promote physics education and research opportunities.',
    keywords: 'physics outreach, science education, research outreach, physics programs'
  },
  '/support': {
    title: 'Support',
    description: 'Support ITCPR\'s mission to advance theoretical and computational physics research. Learn how you can contribute.',
    keywords: 'support ITCPR, physics research support, donate to physics research'
  },
  '/scholarships': {
    title: 'Scholarships',
    description: 'Discover scholarship opportunities at ITCPR for students pursuing research in theoretical and computational physics.',
    keywords: 'physics scholarships, research scholarships, science scholarships, ITCPR scholarships'
  },
  '/collaborations': {
    title: 'Collaborations',
    description: 'Explore collaboration opportunities with ITCPR. Partner with us to advance theoretical and computational physics research.',
    keywords: 'physics collaborations, research partnerships, scientific collaborations'
  },
  '/charter': {
    title: 'Charter',
    description: 'Read ITCPR\'s charter and organizational principles that guide our mission in theoretical and computational physics research.',
    keywords: 'ITCPR charter, organization principles, physics research organization'
  },
  '/infrastructure': {
    title: 'Infrastructure',
    description: 'Learn about ITCPR\'s research infrastructure, computational resources, and facilities supporting theoretical physics research.',
    keywords: 'research infrastructure, computational resources, physics facilities'
  },
  '/financials': {
    title: 'Financials',
    description: 'View ITCPR\'s financial information, transparency reports, and how resources are allocated to support physics research.',
    keywords: 'ITCPR financials, research funding, transparency'
  },
  '/privacy': {
    title: 'Privacy Policy',
    description: 'ITCPR\'s privacy policy outlining how we collect, use, and protect your personal information.',
    keywords: 'privacy policy, data protection, ITCPR privacy'
  },
  '/terms': {
    title: 'Terms of Service',
    description: 'ITCPR\'s terms of service governing the use of our website and services.',
    keywords: 'terms of service, ITCPR terms, website terms'
  },
  '/accessibility': {
    title: 'Accessibility',
    description: 'ITCPR\'s commitment to web accessibility and ensuring our website is accessible to all users.',
    keywords: 'web accessibility, accessible website, ITCPR accessibility'
  },
  '/unsubscribe': {
    title: 'Unsubscribe',
    description: 'Unsubscribe from ITCPR newsletters and email communications.',
    keywords: 'unsubscribe, email preferences'
  }
};

/**
 * Group page SEO configuration
 */
const GROUP_SEO_CONFIG = {
  'spintronics': {
    title: 'Spintronics Group',
    description: 'Advancing theoretical research in spintronics through innovative models and computational approaches. Focus on magnetization reversal and domain wall dynamics.',
    keywords: 'spintronics, magnetization reversal, domain wall dynamics, theoretical physics, spintronics research'
  },
  'photonics': {
    title: 'Photonics Group',
    description: 'Advancing theoretical research in photonics through innovative models and computational approaches. Focus on optical computing, quantum optics, and nanophotonics.',
    keywords: 'photonics, optical computing, quantum optics, nanophotonics, theoretical physics, photonics research'
  }
};

/**
 * Fetch news article data from Supabase
 */
async function fetchNewsArticle(slug) {
  try {
    const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL') || 
                       Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('VITE_SUPABASE_ANON_KEY') || 
                       Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not configured');
      return null;
    }
    
    const response = await fetch(`${supabaseUrl}/rest/v1/news?select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) return null;
    
    const allNews = await response.json();
    
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
function generateMetaTags(pageData, pathname) {
  const siteUrl = 'https://itcpr.org';
  const siteName = 'ITCPR - Institute for Theoretical and Computational Physics Research';
  
  const title = pageData.title || siteName;
  const description = pageData.description || 'ITCPR is committed to transcending traditional boundaries in science, providing research opportunities to individuals typically overlooked in the scientific field.';
  const keywords = pageData.keywords || 'ITCPR, theoretical physics, computational physics, physics research';
  const type = pageData.type || 'website';
  let image = pageData.image || '/assets/image/logo.png';
  
  // Convert relative image URLs to absolute
  if (image && !image.startsWith('http')) {
    image = image.startsWith('/') ? `${siteUrl}${image}` : `${siteUrl}/${image}`;
  }
  
  const fullTitle = pageData.isArticle 
    ? `${title} | ${siteName}` 
    : title === siteName 
      ? siteName 
      : `${title} | ${siteName}`;
  
  let metaTags = `
    <title>${fullTitle}</title>
    <meta name="description" content="${description}" />
    ${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}
    <link rel="canonical" href="${siteUrl}${pathname}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:url" content="${siteUrl}${pathname}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${siteUrl}${pathname}" />
    <meta name="twitter:title" content="${fullTitle}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
  `;
  
  // Add article-specific meta tags
  if (type === 'article' && pageData.isArticle) {
    if (pageData.author) {
      metaTags += `\n      <meta name="author" content="${pageData.author}" />`;
      metaTags += `\n      <meta property="article:author" content="${pageData.author}" />`;
    }
    if (pageData.publishedTime) {
      metaTags += `\n      <meta property="article:published_time" content="${pageData.publishedTime}" />`;
    }
    if (pageData.modifiedTime) {
      metaTags += `\n      <meta property="article:modified_time" content="${pageData.modifiedTime}" />`;
    }
  }
  
  return metaTags;
}

/**
 * Get page data based on pathname
 */
async function getPageData(pathname) {
  // Check for news article
  const newsMatch = pathname.match(/^\/news\/(.+)$/);
  if (newsMatch) {
    const slug = newsMatch[1];
    const article = await fetchNewsArticle(slug);
    if (article) {
      const description = truncateText(article.content || article.description || '');
      let image = article.image || '/assets/image/logo.png';
      if (image && !image.startsWith('http')) {
        image = image.startsWith('/') ? `https://itcpr.org${image}` : `https://itcpr.org/${image}`;
      }
      return {
        title: article.title,
        description,
        keywords: `ITCPR, ${article.type || 'news'}, physics research, ${article.title}`,
        image,
        type: 'article',
        isArticle: true,
        author: article.author || '',
        publishedTime: article.created_at ? new Date(article.created_at).toISOString() : '',
        modifiedTime: article.updated_at ? new Date(article.updated_at).toISOString() : ''
      };
    }
  }
  
  // Check for group page
  const groupMatch = pathname.match(/^\/group\/(.+)$/);
  if (groupMatch) {
    const groupName = groupMatch[1];
    const groupData = GROUP_SEO_CONFIG[groupName];
    if (groupData) {
      return {
        ...groupData,
        type: 'website'
      };
    }
  }
  
  // Check for static pages
  const pageData = PAGE_SEO_CONFIG[pathname];
  if (pageData) {
    return {
      ...pageData,
      type: 'website'
    };
  }
  
  // Default/404 page
  return {
    title: 'ITCPR - Institute for Theoretical and Computational Physics Research',
    description: 'ITCPR is committed to transcending traditional boundaries in science, providing research opportunities to individuals typically overlooked in the scientific field.',
    keywords: 'ITCPR, theoretical physics, computational physics, physics research',
    type: 'website'
  };
}

export default async (request, context) => {
  const userAgent = request.headers.get('user-agent') || '';
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // Only process for crawlers
  if (!isCrawler(userAgent)) {
    return context.next();
  }
  
  // Get page data
  const pageData = await getPageData(pathname);
  
  // Fetch the original HTML
  const response = await context.next();
  
  // Only modify HTML responses
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) {
    return response;
  }
  
  const html = await response.text();
  
  // Generate meta tags
  const metaTags = generateMetaTags(pageData, pathname);
  
  // Remove existing default meta tags and inject new ones
  let modifiedHtml = html;
  
  // Remove existing meta tags
  modifiedHtml = modifiedHtml.replace(/<title[^>]*>.*?<\/title>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+name="description"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+name="keywords"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<link\s+rel="canonical"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+name="author"[^>]*>/gi, '');
  modifiedHtml = modifiedHtml.replace(/<meta\s+property="article:[^"]*"[^>]*>/gi, '');
  
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
