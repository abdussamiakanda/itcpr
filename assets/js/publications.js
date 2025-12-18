import { supabase } from "./footer.js";

document.addEventListener('DOMContentLoaded', async () => {
    const { data: publications, error } = await supabase
        .from('publications')
        .select('*')
        .order('year', { ascending: true })
        .order('month', { ascending: true });

    if (error) {
        console.error('Error fetching publications:', error);
        return;
    }

    const contentArea = document.getElementById('publications-list');
    publications.forEach(pub => {
        const pubElement = document.createElement('div');
        pubElement.className = 'publication-card';
        pubElement.innerHTML = `
            <div class="publication-tags"><span class="${pub.type.replaceAll(' ', '-').toLowerCase()}">${pub.type}</span> <span>${pub.group}</span></div>
            <div class="publication-details">${pub.authors}, <b>${pub.title}</b>, ${pub.journal}, (${pub.month} ${pub.year})</div>
            <a href="${pub.doi}" class="publication-link" target="_blank">View details...</a>
        `;
        contentArea.appendChild(pubElement);
    });
});