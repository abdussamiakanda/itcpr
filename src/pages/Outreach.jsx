import { Link } from 'react-router-dom';
import '../assets/css/outreach.css';

/**
 * Outreach Page Component
 * Displays ITCPR's outreach programs and initiatives
 */
function Outreach() {
  const programs = [
    {
      title: 'Online Seminars',
      description: 'Our online seminars feature ITCPR members and invited experts sharing their latest research and insights across various fields of physics. These sessions provide a platform for knowledge exchange, discussions, and collaboration, helping researchers and students engage with cutting-edge topics. Join us to explore groundbreaking research and connect with the broader scientific community.',
      link: 'https://events.itcpr.org',
      linkText: 'See All Seminars',
      external: true
    },
    {
      title: 'Educational Programs',
      description: 'We offer a range of specialized workshops designed to deepen knowledge in various aspects of theoretical and computational physics. Our workshops are tailored to cater to different levels of expertise, from beginners to advanced learners, and are accessible to the public through our online platforms.',
      link: 'https://events.itcpr.org',
      linkText: 'See All Programs',
      external: true
    },
    {
      title: 'Collaborations',
      description: 'We actively seek collaboration with academic institutions and research organizations to enhance our outreach programs. These partnerships are vital in expanding our educational reach and providing diverse perspectives in our course offerings and seminars.',
      link: '/collaborations',
      linkText: 'Learn About Collaborations',
      external: false
    },
    {
      title: 'Scholarships',
      description: 'We offer scholarships to support students and researchers in the field of theoretical and computational physics. Our scholarships aim to promote diversity and inclusion within the scientific community by providing financial assistance to underrepresented groups.',
      link: '/scholarships',
      linkText: 'Learn About Scholarships',
      external: false
    }
  ];

  return (
    <div className="outreach-page">
      <PageHeader />
      {programs.map((program, index) => (
        <ProgramSection key={index} program={program} index={index} />
      ))}
    </div>
  );
}

/**
 * Page Header Component
 * Hero section for the outreach page
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>Outreach Programs</h1>
          <p>
            At ITCPR, our outreach programs are integral to our mission of fostering a deeper 
            understanding and appreciation of theoretical and computational physics. We are 
            committed to offering enriching educational experiences and opportunities for 
            professional growth.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Program Section Component
 * Individual program section
 */
function ProgramSection({ program, index }) {
  const ButtonComponent = program.external ? 'a' : Link;
  const buttonProps = program.external
    ? { href: program.link, target: '_blank', rel: 'noopener noreferrer' }
    : { to: program.link };

  return (
    <section className="program-section" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="container">
        <div className="section-header">
          <h2>{program.title}</h2>
        </div>
        <p className="section-description">{program.description}</p>
        <ButtonComponent className="action-button" {...buttonProps}>
          {program.linkText}
        </ButtonComponent>
      </div>
    </section>
  );
}

export default Outreach;

