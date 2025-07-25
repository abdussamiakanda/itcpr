import { supabase } from "./footer.js";

async function loadNewsDetails(newsId) {
    try {
        const { data: newsData, error: fetchError } = await supabase
            .from('news')
            .select('*')
            .eq('id', newsId)
            .single();

        if (fetchError) {
            throw new Error('Error fetching news data');
        }

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

function markdownToHtml(markdownText) {
  // Make sure 'marked' is available
  if (typeof marked === 'undefined') {
    throw new Error("The 'marked' library is required. Include it via CDN or install it.");
  }

  return marked.parse(markdownText.replaceAll('\n', '\n\n'));
}

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    const newsId = new URLSearchParams(window.location.search).get('id');
    if (newsId) {
        await loadNewsDetails(newsId);
    } else {
        console.error('No news ID provided in the URL.');
    }
});