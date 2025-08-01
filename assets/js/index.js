import { supabase } from "./footer.js";

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    const { data: newsData, error: fetchError } = await supabase
        .from('news')
        .select('*')
        .eq('type', 'news')
        .order('created_at', { ascending: false })
        .limit(3);

    if (fetchError) {
        console.error('Error fetching news data:', fetchError);
        return;
    }

    const newsContainer = document.getElementById('news-grid');

    newsData.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.className = 'research-card news-card';
        newsCard.onclick = () => goTo("/news?id=" + news.id);
        newsCard.innerHTML = `
            <div class="card-image">
                <img src="${news.image}" alt="${news.title}">
            </div>
            <div class="card-content">
                <span class="date">${new Date(news.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</span>
                <h3>${news.title}</h3>
            </div>
        `;
        newsContainer.appendChild(newsCard);
    });
});