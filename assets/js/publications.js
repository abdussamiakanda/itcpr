const supabaseConfig = {
    url: 'https://fkhqjzzqbypkwrpnldgk.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZraHFqenpxYnlwa3dycG5sZGdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MzM0OTAsImV4cCI6MjA2MzIwOTQ5MH0.O5LjcwITJT3hIbnNnXJNYYYPDeOGBKkLmU6EyUUY478'
};

const { createClient } = supabase
const supabaseClient = createClient(supabaseConfig.url, supabaseConfig.key)

document.addEventListener('DOMContentLoaded', async () => {
    const { data: publications, error } = await supabaseClient
        .from('publications')
        .select('*')
        .order('year', { ascending: false })
        .order('month', { ascending: false });

    if (error) {
        console.error('Error fetching publications:', error);
        return;
    }

    const contentArea = document.getElementById('publications-list');
    publications.forEach(pub => {
        const pubElement = document.createElement('div');
        pubElement.className = 'publication-card';
        pubElement.innerHTML = `
            <div class="publication-tags"><span>${pub.type}</span> <span>${pub.group}</span></div>
            <div class="publication-details">${pub.authors}, <b>${pub.title}</b>, ${pub.journal}, (${pub.month} ${pub.year})</div>
            <a href="${pub.doi}" class="publication-link" target="_blank">Read More...</a>
        `;
        contentArea.appendChild(pubElement);
    });
});