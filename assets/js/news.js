import { supabase } from "./footer.js";

function generateSlugFromTitle(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, and multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

async function loadNewsDetails(newsSlug) {
    try {
        // Fetch all news and match by generated slug from title
        const { data: allNews, error: fetchError } = await supabase
            .from('news')
            .select('*')
            .order('created_at', { ascending: false });

        if (fetchError) {
            throw new Error('Error fetching news data');
        }

        // Find news item by matching generated slug from title
        const newsData = allNews.find(news => {
            const generatedSlug = generateSlugFromTitle(news.title);
            return generatedSlug === newsSlug;
        });

        if (!newsData) {
            throw new Error('News not found');
        }

        document.title = newsData.title + ' - ITCPR';

        document.querySelector('meta[name="description"]')?.setAttribute('content', newsData.content.substring(0, 150) + '...');

        updateMetaTag('og:title', newsData.title + ' - ITCPR');
        updateMetaTag('og:description', newsData.content.substring(0, 150) + '...');
        updateMetaTag('og:image', newsData.image || '/assets/image/logo.png');
        updateMetaTag('og:url', window.location.href);

        document.getElementById('news-title').textContent = newsData.title;
        document.getElementById('news-date').textContent = new Date(newsData.created_at).toLocaleDateString( 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('news-author').textContent = newsData.author;
        document.getElementById('news-content').innerHTML = `
            <img src="${newsData.image}" alt="${newsData.title}" class="news-image">
            ${markdownToHtml(newsData.content)}
        `;
    } catch (error) {
        console.error('Error fetching news details:', error);
    }
}

function updateMetaTag(property, content) {
    let metaTag = document.querySelector(`meta[property='${property}']`);
    if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
}

function markdownToHtml(markdownText) {
  // Make sure 'marked' is available
  if (typeof marked === 'undefined') {
    throw new Error("The 'marked' library is required. Include it via CDN or install it.");
  }

  return marked.parse(markdownText.replaceAll('\n', '\n\n'));
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    const newsSlug = new URLSearchParams(window.location.search).get('slug');
    if (newsSlug) {
        await loadNewsDetails(newsSlug);
    } else {
        console.error('No news slug provided in the URL.');
    }
});