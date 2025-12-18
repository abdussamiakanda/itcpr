import '../assets/css/collaborations.css';

/**
 * Collaborations Page Component
 */
function Collaborations() {
  return (
    <div className="collaborations-page">
      <PageHeader />
      <TypesOfCollaborationsSection />
      <StepsToCollaborateSection />
      <CollaborationGuidelinesSection />
      <ContactSection />
    </div>
  );
}

/**
 * Page Header Component
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>Research Collaborations</h1>
          <p>
            ITCPR welcomes collaborative partnerships with academic institutions, research
            organizations, and individual researchers worldwide. Together, we can push the
            boundaries of theoretical and computational physics and create meaningful scientific
            impact.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Types of Collaborations Section Component
 */
function TypesOfCollaborationsSection() {
  const collaborationTypes = [
    {
      icon: 'fas fa-flask',
      title: 'Project Collaborations',
      description: 'Collaborative research projects, co-authored publications, and shared computational resources for advancing scientific knowledge.'
    },
    {
      icon: 'fas fa-user-friends',
      title: 'Referred Collaborations',
      description: 'Experts recommended by an ITCPR group lead, supervisor, or internal team member may be invited to collaborate through a referral-based process.'
    }
  ];

  return (
    <section className="collaboration-section">
      <div className="container">
        <div className="section-header">
          <h2>Types of Collaborations</h2>
        </div>
        <div className="collaboration-grid">
          {collaborationTypes.map((type, index) => (
            <CollaborationCard key={index} type={type} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Collaboration Card Component
 */
function CollaborationCard({ type, index }) {
  return (
    <div className="collaboration-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="card-icon">
        <i className={type.icon}></i>
      </div>
      <h3>{type.title}</h3>
      <p>{type.description}</p>
    </div>
  );
}

/**
 * Steps to Collaborate Section Component
 */
function StepsToCollaborateSection() {
  return (
    <section className="collaboration-section">
      <div className="container">
        <div className="section-header">
          <h2>Steps to Collaborate with ITCPR</h2>
        </div>
        <ol className="collaboration-steps">
          <li>
            <strong>Identify Alignment:</strong> Review our research areas to ensure your
            expertise or interests align with ITCPR's focus.
          </li>
          <li>
            <strong>Choose a Collaboration Path:</strong>
            <ul>
              <li>
                <strong>Project Collaboration:</strong> Reach out with a research proposal
                outlining your intended goals, methodology, and expected outcomes.
              </li>
              <li>
                <strong>Referred Collaboration:</strong> If you've been recommended by an
                ITCPR group lead or supervisor, your internal sponsor can provide a referral.
              </li>
            </ul>
          </li>
          <li>
            <strong>Review Process:</strong> Our team will assess the proposal or referral for
            feasibility, alignment, and available resources.
          </li>
          <li>
            <strong>Agreement & Onboarding:</strong> If approved, terms will be defined, and the
            collaborator will be onboarded into the appropriate project or group.
          </li>
        </ol>
      </div>
    </section>
  );
}

/**
 * Collaboration Guidelines Section Component
 */
function CollaborationGuidelinesSection() {
  return (
    <section className="collaboration-section">
      <div className="container">
        <div className="section-header">
          <h2>Research Collaboration Guidelines</h2>
        </div>
        <p className="section-description">
          We encourage researchers and institutions to submit collaboration proposals/referrals.
          Please follow our guidelines to ensure your proposal/referral receives proper consideration.
        </p>
        <div className="download-section">
          <h3>Templates</h3>
          <p>Download our standardized templates to structure your collaboration proposal/referral:</p>
          <div className="template-links">
            <a href="/assets/files/ITCPR_Research_Proposal_Template.pdf" className="template-link" download>
              <i className="fas fa-file-pdf"></i>
              <span>Project Proposal Template</span>
            </a>
            <a href="/assets/files/ITCPR_Collaboration_Referral_Template.docx" className="template-link" download>
              <i className="fas fa-file"></i>
              <span>Collaboration Referral Form</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Contact Section Component
 */
function ContactSection() {
  return (
    <section className="collaboration-section">
      <div className="container">
        <div className="section-header">
          <h2>Contact Information</h2>
        </div>
        <p className="section-description">
          For submitting proposals or referrals, please use the following contact details:{' '}
          <a href="mailto:info@itcpr.org">info@itcpr.org</a>
          <br /><br />
          For inquiries regarding research collaborations, please contact us
          at: <a href="mailto:majpikul@mail.itcpr.org">majpikul@mail.itcpr.org</a>
        </p>
      </div>
    </section>
  );
}

export default Collaborations;

