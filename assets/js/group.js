import { supabase } from "./footer.js";

document.addEventListener('DOMContentLoaded', async () => {
    const currentPath = window.location.pathname;
    let groupName = currentPath.split('/').pop().replace('.html', '');
    groupName = groupName.charAt(0).toUpperCase() + groupName.slice(1);

    const { data: publications, errorPub } = await supabase
        .from('publications')
        .select('*')
        .eq('group', groupName)
        .order('year', { ascending: false })
        .order('month', { ascending: false });

    const { data: people, errorPeople } = await supabase
        .from('itcpr_people')
        .select('*')
        .eq('group', groupName)
        .order('name', { ascending: true });

    if (errorPub) {
        console.error('Error fetching publications:', errorPub);
    }

    if (errorPeople) {
        console.error('Error fetching people:', errorPeople);
    }

    if (errorPub && errorPeople) {
        console.error('Error fetching publications and people:', errorPub, errorPeople);
    }

    const publicationArea = document.getElementById('publications-list');
    const peopleArea = document.getElementById('teamGrid');

    if (publications.length === 0) {
        publicationArea.innerHTML = '<p>Publications will be available soon.</p>';
    } else {
        publications.forEach(pub => {
            const pubElement = document.createElement('div');
            pubElement.className = 'publication-card';
            pubElement.innerHTML = `
                <div class="publication-tags"><span>${pub.type}</span></span></div>
                <div class="publication-details">${pub.authors}, <b>${pub.title}</b>, ${pub.journal}, (${pub.month} ${pub.year})</div>
                <a href="${pub.doi}" class="publication-link" target="_blank">View details...</a>
            `;
            publicationArea.appendChild(pubElement);
        });
    }

    if (people.length === 0) {
        peopleArea.innerHTML = '<p>Team members will be available soon.</p>';
    } else {
        const roleOrder = ['Lead', 'Supervisor', 'Member', 'Collaborator', 'Intern'];
        const roleIndex = new Map(roleOrder.map((r, i) => [r, i]));

        const sorted = (people ?? []).slice().sort((a, b) => {
        const ai = roleIndex.has(a.role) ? roleIndex.get(a.role) : Number.POSITIVE_INFINITY;
        const bi = roleIndex.has(b.role) ? roleIndex.get(b.role) : Number.POSITIVE_INFINITY;

        if (ai !== bi) return ai - bi;
            return a.name.localeCompare(b.name, undefined, {
                sensitivity: 'base'
            });
        });

        sorted.forEach(person => {
            const peepElement = document.createElement('div');
            peepElement.className = 'team-card';
            peepElement.innerHTML = `
                <img src="${person.image || '/assets/image/placeholder-avatar.png'}" alt="${person.name}" />
                <div class="team-info">
                    <h3>${person.name}</h3>
                    <span class="role">${person.role}</span>
                    <a href="${person.url}" class="profile-link" target="_blank" rel="noopener noreferrer">
                    Google Scholar <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            `;
            peopleArea.appendChild(peepElement);
        });
    }              
});