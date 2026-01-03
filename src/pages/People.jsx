import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';
import '../assets/css/people.css';

/**
 * People Page Component
 * Displays ITCPR's team members, advisors, and collaborators
 */
function People() {
  const [team, setTeam] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [leads, setLeads] = useState([]);
  const [members, setMembers] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const { data, error } = await supabase
          .from("itcpr_people")
          .select("id,name,position,role,group,institute,image,url");

        if (error) throw error;
        const all = Array.isArray(data) ? data : [];

        const sortByName = (a, b) =>
          (a.name || "").localeCompare(b.name || "", undefined, { sensitivity: "base" });

        const teamRoleOrder = [
          "Executive Director",
          "Director of Operations",
          "Director of Research",
          "Director of Policy",
          "Director of Outreach",
          "Director of Finance",
          "Internship Coordinator",
        ];
        const teamRoleIndex = new Map(teamRoleOrder.map((r, i) => [r, i]));
        const roleRank = pos => (teamRoleIndex.has(pos) ? teamRoleIndex.get(pos) : Number.POSITIVE_INFINITY);

        const advisorsList = all.filter(p => p.position === "Advisor").sort(sortByName);
        const teamList = all
          .filter(p => p.position !== null && p.position !== "Advisor")
          .sort((a, b) => {
            const ai = roleRank(a.position);
            const bi = roleRank(b.position);
            return ai === bi ? sortByName(a, b) : ai - bi;
          });

        const byRole = role =>
          all.filter(p => p.role === role).sort(sortByName);

        setAdvisors(advisorsList);
        setTeam(teamList);
        setLeads(byRole("Lead"));
        setMembers(byRole("Member"));
        setCollaborators(byRole("Collaborator"));
        setInterns(byRole("Intern"));
      } catch (err) {
        console.error("Error building people grids:", err);
      }
    };

    fetchPeople();
  }, []);

  const safeImg = url => (url && String(url).trim()) || "/assets/image/placeholder-avatar.png";
  const safeUrl = url => (url && String(url).trim()) || "#";

  /**
   * Page Header Component
   * Hero section for the people page
   */
  const PageHeader = () => (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>Our People</h1>
          <p>
            Meet the talented and dedicated individuals behind ITCPR. Our team combines 
            expertise in theoretical and computational physics with a passion for research 
            and education, driving us towards our mission of advancing scientific knowledge.
          </p>
        </div>
      </div>
    </section>
  );

  /**
   * People Section Component
   * Reusable section component for displaying different groups of people
   */
  const PeopleSection = ({ title, description, people, CardComponent, gridClass, emptyMessage }) => (
    <section className="team-section">
      <div className="container">
        <div className="section-header">
          <h2>{title}</h2>
        </div>
        <p className="section-description">{description}</p>
        {people.length === 0 && emptyMessage ? (
          <p className="empty-message">{emptyMessage}</p>
        ) : (
          <div className={gridClass}>
            {people.map((person, index) => (
              <CardComponent key={person.id} person={person} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );

  /**
   * Team Card Component
   * Card for administrative team members
   */
  const TeamCard = ({ person, index }) => (
    <div className="team-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <img src={safeImg(person.image)} alt={person.name || "Member"} />
      <div className="team-info">
        <h3>{person.name || ""}</h3>
        <p>{person.position || ""}</p>
        <a href={safeUrl(person.url)} target="_blank" className="team-link" rel="noopener noreferrer">
          Google Scholar <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );

  /**
   * Advisor Card Component
   * Card for advisors
   */
  const AdvisorCard = ({ person, index }) => (
    <div className="team-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <img src={safeImg(person.image)} alt={person.name || "Advisor"} />
      <div className="team-info">
        <h3>{person.name || ""}</h3>
        <p>{person.institute || ""}</p>
        <a href={safeUrl(person.url)} target="_blank" className="team-link" rel="noopener noreferrer">
          Google Scholar <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );

  /**
   * Lead Card Component
   * Card for research group leads
   */
  const LeadCard = ({ person, index }) => (
    <div className="team-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <img src={safeImg(person.image)} alt={person.name || "Lead"} />
      <div className="team-info">
        <h3>{person.name || ""}</h3>
        <p>{person.group ? `${person.group} Group Lead` : "Group Lead"}</p>
        <a href={safeUrl(person.url)} target="_blank" className="team-link" rel="noopener noreferrer">
          Google Scholar <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );

  /**
   * Overlay Card Component
   * Card for members, collaborators, and interns with overlay effect
   */
  const OverlayCard = ({ person, index }) => (
    <div 
      className="member-card"
      onClick={() => window.open(safeUrl(person.url), "_blank", "noopener")}
      style={{ cursor: 'pointer', animationDelay: `${index * 0.03}s` }}
    >
      <img src={safeImg(person.image)} alt={person.name || "Member"} />
      <div className="member-overlay">
        <span className="member-name">{person.name || ""}</span>
      </div>
    </div>
  );

  return (
    <div className="people-page">
      <SEO
        title="People"
        description="Meet the ITCPR team: researchers, advisors, group leads, members, collaborators, and interns contributing to theoretical and computational physics research."
        keywords="ITCPR team, physics researchers, research team, advisors, collaborators, scientists"
        url={location.pathname}
      />
      <PageHeader />
      <PeopleSection 
        title="Administrative Team"
        description="The Administrative Team at ITCPR plays a crucial role in facilitating the institute's smooth operations, expertly managing key areas like finance, human resources, and organizational logistics."
        people={team}
        CardComponent={TeamCard}
        gridClass="team-grid"
      />
      <PeopleSection 
        title="Our Advisors"
        description="ITCPR is guided by a number of advisors, composed of distinguished individuals who bring a wealth of knowledge and experience to our institute. They play a pivotal role in shaping our strategic direction and ensuring that we adhere to our mission and values."
        people={advisors}
        CardComponent={AdvisorCard}
        gridClass="team-grid"
      />
      <PeopleSection 
        title="Research Group Leads"
        description="Our research groups are led by experts in their respective fields, contributing to our diverse range of studies and projects."
        people={leads}
        CardComponent={LeadCard}
        gridClass="team-grid"
      />
      <PeopleSection 
        title="Members"
        description="Members are actively involved in our research groups, and they are a vital part of our team. Their enthusiasm and new perspectives significantly contribute to our diverse projects, offering them a rich experience in the realm of scientific research."
        people={members}
        CardComponent={OverlayCard}
        gridClass="members-grid"
      />
      <PeopleSection 
        title="Collaborators"
        description="Collaborators play a crucial role in our research initiatives. They are external partners who bring unique expertise and insights to our projects."
        people={collaborators}
        CardComponent={OverlayCard}
        gridClass="members-grid"
      />
      <PeopleSection 
        title="Interns"
        description="Our interns are a vital part of our team, bringing fresh perspectives and enthusiasm to our projects. They work closely with our researchers and staff, gaining valuable experience in the field."
        people={interns}
        CardComponent={OverlayCard}
        gridClass="members-grid"
        emptyMessage="Interns data not found!"
      />
    </div>
  );
}

export default People;

