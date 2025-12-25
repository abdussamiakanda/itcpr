import { useNavigate, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import '../assets/css/groups.css';

/**
 * Groups Page Component
 * Displays research groups
 */
function Groups() {
  const navigate = useNavigate();
  const location = useLocation();

  const groups = [
    {
      name: 'Spintronics Group',
      path: '/group/spintronics',
      image: '/assets/image/group/spintronics.png',
      alt: 'Spintronics Research'
    },
    {
      name: 'Photonics Group',
      path: '/group/photonics',
      image: '/assets/image/group/photonics.png',
      alt: 'Photonics Research'
    // },
    // {
    //   name: 'Materials Group',
    //   path: '/group/materials',
    //   image: '/assets/image/group/materials.png',
    //   alt: 'Materials Research'
    }
  ];

  return (
    <div className="groups-page">
      <SEO
        title="Research Groups"
        description="Explore ITCPR's research groups: Spintronics, Photonics, and Materials. Learn about our cutting-edge research in theoretical and computational physics."
        keywords="ITCPR research groups, spintronics, photonics, materials research, physics research groups"
        url={location.pathname}
      />
      <PageHeader />
      <GroupsSection groups={groups} navigate={navigate} />
      <CollaborationSection />
    </div>
  );
}

/**
 * Page Header Component
 * Hero section for the groups page
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>Research Groups</h1>
          <p>
            Our research groups are at the forefront of exploring and expanding the realms 
            of theoretical and computational physics. Each group, led by enthusiastic 
            researchers and teams, focuses on specific areas within physics to drive forward 
            innovation and discovery.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Groups Section Component
 * Displays the research groups
 */
function GroupsSection({ groups, navigate }) {
  return (
    <section className="groups-section">
      <div className="container">
        <div className="section-header">
          <h2>Current Groups</h2>
        </div>
        <p className="section-description">
          Initiated with two research groups, our institute is now seeking expert leaders 
          to form and guide new research teams, broadening our scope in theoretical and 
          computational physics.
        </p>
        <div className="groups-grid">
          {groups.map((group, index) => (
            <GroupCard 
              key={index}
              group={group}
              navigate={navigate}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Group Card Component
 * Individual group card
 */
function GroupCard({ group, navigate, index }) {
  return (
    <div 
      className="group-card"
      onClick={() => navigate(group.path)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(group.path);
        }
      }}
      aria-label={`View ${group.name}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="group-image-wrapper">
        <img src={group.image} alt={group.alt} className="group-image" />
      </div>
      <div className="group-content">
        <h3>{group.name}</h3>
      </div>
    </div>
  );
}

/**
 * Collaboration Section Component
 * Information about collaboration
 */
function CollaborationSection() {
  return (
    <section className="collaboration-section">
      <div className="container">
        <div className="section-header">
          <h2>Collaboration and Participation</h2>
        </div>
        <p className="section-description">
          Collaboration is key to our success. We actively seek engagement with academic 
          institutions, research centers, and industry partners to enrich our research. 
          Students and professionals are welcome to join our research endeavors, contributing 
          to and learning from these dynamic groups.
        </p>
      </div>
    </section>
  );
}

export default Groups;

