import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../assets/css/group.css';

/**
 * Group Page Component
 * Displays individual research group details
 */
function GroupPage() {
  const { groupName } = useParams();
  const [publications, setPublications] = useState([]);
  const [people, setPeople] = useState([]);
  const [groupInfo, setGroupInfo] = useState(null);

  const groupData = {
    spintronics: {
      title: 'Spintronics Group',
      description: 'Advancing theoretical research in spintronics through innovative models and computational approaches since January 2024.',
      intro: 'The Spintronics Group is a specialized team within ITCPR focused on the study of spintronics, an area of physics that deals with the intrinsic spin of electrons and its associated magnetic moment, in addition to the fundamental electronic charge. This group is dedicated to exploring advanced materials and technologies leveraging the principles of spintronics, which has significant implications in the fields of information storage, quantum computing, and advanced electronics. The group\'s work often involves cutting-edge research in nanotechnology, material science, and quantum mechanics.',
      researchFocus: {
        title: 'Research Focus',
        description: 'The Spintronics Group at ITCPR is currently concentrating on two critical areas within theoretical spintronics:',
        areas: [
          {
            title: 'Magnetization Reversal',
            text: 'This area of research is dedicated to understanding the theoretical principles behind magnetization reversal processes in various materials. Our focus is on developing models that accurately predict how magnetization can be switched in response to external stimuli, such as microwave fields or thermal fields. This research is vital for the development of future memory and logic devices, where controlled magnetization reversal is key.'
          },
          {
            title: 'Domain Wall Dynamics',
            text: 'Our group is deeply involved in studying the movement and behavior of domain walls within ferromagnetic and antiferromagnetic materials. This includes exploring the theoretical underpinnings of domain wall motion, the effects of thermal gradient on this motion, and how the properties can be harnessed for practical applications. Understanding domain wall dynamics is crucial for advancing spintronic devices, particularly in data storage and spintronic logic circuits.'
          }
        ],
        projects: [
          'Theoretical modeling of magnetization reversal in novel materials',
          'Domain wall dynamics in antiferromagnetic systems',
          'Thermal effects on spintronic devices',
          'Quantum computing applications in spintronics'
        ]
      }
    },
    photonics: {
      title: 'Photonics Group',
      description: 'Advancing theoretical research in photonics through innovative models and computational approaches since January 2024.',
      intro: 'The Photonics Group at ITCPR is dedicated to theoretical research in photonics. Their focus encompasses developing theoretical models and simulations to understand and predict the behavior of light and its interactions with various materials. The group aims to advance knowledge in areas like optical computing, quantum optics, and nanophotonics, contributing significantly to the field of photonics through theoretical insights and computational approaches.',
      researchFocus: {
        title: 'Research Focus',
        description: 'Our research focuses on several key areas in photonics, including:',
        areas: [
          'Optical computing and information processing',
          'Quantum optics and quantum information',
          'Nanophotonics and metamaterials',
          'Light-matter interactions',
          'Theoretical modeling of photonic devices'
        ],
        projects: [
          'Development of novel photonic crystal structures',
          'Quantum computing applications in photonics',
          'Advanced optical sensor design',
          'Metamaterial-based optical devices'
        ]
      }
    },
    materials: {
      title: 'Materials Group',
      description: 'Advancing theoretical research in materials science through innovative models and computational approaches since August 2025.',
      intro: 'The Materials Group is a specialized team within ITCPR focused on the study of materials science, an area of physics that deals with the properties and applications of advanced materials for electronics and photonics.',
      researchFocus: {
        title: 'Research Focus',
        description: 'Our research focuses on advanced materials for electronics and photonics applications.',
        areas: [],
        projects: []
      }
    }
  };

  useEffect(() => {
    const capitalizedGroupName = groupName.charAt(0).toUpperCase() + groupName.slice(1);
    setGroupInfo(groupData[groupName] || groupData.spintronics);

    const fetchData = async () => {
      const [pubResult, peopleResult] = await Promise.all([
        supabase
          .from('publications')
          .select('*')
          .eq('group', capitalizedGroupName)
          .order('year', { ascending: true })
          .order('month', { ascending: true }),
        supabase
          .from('itcpr_people')
          .select('*')
          .eq('group', capitalizedGroupName)
          .order('name', { ascending: true })
      ]);

      if (!pubResult.error && pubResult.data) {
        setPublications(pubResult.data);
      }
      if (!peopleResult.error && peopleResult.data) {
        const roleOrder = ['Lead', 'Supervisor', 'Member', 'Collaborator', 'Intern'];
        const roleIndex = new Map(roleOrder.map((r, i) => [r, i]));
        const sorted = peopleResult.data.sort((a, b) => {
          const ai = roleIndex.has(a.role) ? roleIndex.get(a.role) : Number.POSITIVE_INFINITY;
          const bi = roleIndex.has(b.role) ? roleIndex.get(b.role) : Number.POSITIVE_INFINITY;
          if (ai !== bi) return ai - bi;
          return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
        });
        setPeople(sorted);
      }
    };

    fetchData();
  }, [groupName]);

  if (!groupInfo) return <div className="group-page">Loading...</div>;

  return (
    <div className="group-page">
      <PageHeader groupInfo={groupInfo} />
      {groupInfo.intro && <IntroSection intro={groupInfo.intro} />}
      {groupInfo.researchFocus && (
        <>
          <ResearchFocusSection researchFocus={groupInfo.researchFocus} />
          {groupInfo.researchFocus.projects && groupInfo.researchFocus.projects.length > 0 && (
            <ProjectsSection projects={groupInfo.researchFocus.projects} />
          )}
        </>
      )}
      <TeamSection people={people} />
      <PublicationsSection publications={publications} />
    </div>
  );
}

/**
 * Page Header Component
 */
function PageHeader({ groupInfo }) {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>{groupInfo.title}</h1>
          <p>{groupInfo.description}</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Introduction Section Component
 */
function IntroSection({ intro }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Introduction</h2>
        </div>
        <p className="section-description">{intro}</p>
      </div>
    </section>
  );
}

/**
 * Research Focus Section Component
 */
function ResearchFocusSection({ researchFocus }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>{researchFocus.title}</h2>
        </div>
        <p className="section-description">{researchFocus.description}</p>
        {Array.isArray(researchFocus.areas) && researchFocus.areas.length > 0 && (
          <ul className="research-areas">
            {researchFocus.areas.map((area, idx) => (
              <li key={idx}>
                {typeof area === 'string' ? area : (
                  <>
                    <strong>{area.title}:</strong> {area.text}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/**
 * Projects Section Component
 */
function ProjectsSection({ projects }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Current Projects</h2>
        </div>
        <p className="section-description">Our current projects focus on:</p>
        <ul className="projects-list">
          {projects.map((project, idx) => (
            <li key={idx}>{project}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Team Section Component
 */
function TeamSection({ people }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Team Members</h2>
        </div>
        {people.length === 0 ? (
          <p className="section-description">Team members will be available soon.</p>
        ) : (
          <div className="team-grid">
            {people.map((person, index) => (
              <TeamCard key={person.id} person={person} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Team Card Component
 */
function TeamCard({ person, index }) {
  return (
    <div 
      className="team-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <img src={person.image || '/assets/image/placeholder-avatar.png'} alt={person.name} />
      <div className="team-info">
        <h3>{person.name}</h3>
        <span className="role">{person.role}</span>
        <a href={person.url} className="profile-link" target="_blank" rel="noopener noreferrer">
          Google Scholar <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
}

/**
 * Publications Section Component
 */
function PublicationsSection({ publications }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Publications</h2>
        </div>
        {publications.length === 0 ? (
          <p className="section-description">Publications will be available soon.</p>
        ) : (
          <div className="publications-list">
            {publications.map((pub, index) => (
              <PublicationCard key={pub.id} pub={pub} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Publication Card Component
 */
function PublicationCard({ pub, index }) {
  const typeClass = pub.type?.replaceAll(' ', '-').toLowerCase() || 'other';
  
  return (
    <div 
      className="publication-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="publication-content">
        <div className="publication-details">
          {pub.title && <b className="title">{pub.title}</b>}
          {pub.authors && pub.title && ', '}
          {pub.authors && <span className="authors">{pub.authors}</span>}
          {pub.journal && (
            <>
              {pub.title && ', '}
              <span className="journal">{pub.journal}</span>
            </>
          )}
          {(pub.month || pub.year) && (
            <>
              {' ('}
              {pub.month && <span>{pub.month} </span>}
              {pub.year && <span>{pub.year}</span>}
              {')'}
            </>
          )}
        </div>
        <div className="publication-footer">
          <div className="publication-tags">
            <span className={typeClass}>{pub.type}</span>
            {pub.group && <span className="group-tag">{pub.group}</span>}
          </div>
          {pub.doi && (
            <a 
              href={pub.doi} 
              className="publication-link" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View details →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupPage;

