import '../assets/css/collaborations.css';

/**
 * Scholarships Page Component
 */
function Scholarships() {
  return (
    <div className="scholarships-page">
      <PageHeader />
      <TypesOfSupportSection />
      <HowToApplySection />
      <ScholarshipGuidelinesSection />
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
          <h1>Scholarships & Financial Assistance</h1>
          <p>
            ITCPR is committed to supporting students and early-career researchers in pursuing academic
            and professional opportunities. Our scholarships assist with registration fees, travel costs,
            and other expenses related to conferences, Olympiads, and international competitions in
            science and research.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Types of Support Section Component
 */
function TypesOfSupportSection() {
  const supportTypes = [
    {
      icon: 'fas fa-certificate',
      title: 'Competition & Olympiad Support',
      description: 'Assistance with registration fees for international academic competitions and Olympiads in physics, mathematics, computer science, and related fields.'
    },
    {
      icon: 'fas fa-plane',
      title: 'Conference & Workshop Support',
      description: 'Coverage for registration fees and partial travel assistance to attend scientific conferences, workshops, and symposia.'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Special Academic Opportunities',
      description: 'Support for unique academic initiatives, training programs, or exchange activities that align with ITCPR\'s mission.'
    }
  ];

  return (
    <section className="collaboration-section">
      <div className="container">
        <div className="section-header">
          <h2>Types of Support</h2>
        </div>
        <div className="collaboration-grid">
          {supportTypes.map((type, index) => (
            <SupportCard key={index} type={type} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Support Card Component
 */
function SupportCard({ type, index }) {
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
 * How to Apply Section Component
 */
function HowToApplySection() {
  const steps = [
    {
      title: 'Check Eligibility',
      description: 'Ensure you are a student, early-career researcher, or active participant in an ITCPR program.'
    },
    {
      title: 'Prepare Documentation',
      description: 'Gather proof of acceptance/registration for the event, budget breakdown, and a short statement on the academic value of your participation.'
    },
    {
      title: 'Submit Application',
      description: 'Complete the scholarship application form with supporting documents. Submit via email to info@itcpr.org.'
    },
    {
      title: 'Review & Decision',
      description: 'Applications will be reviewed based on merit, relevance, and available funding. Applicants will be notified via email.'
    },
    {
      title: 'Disbursement',
      description: 'Approved funds will be disbursed directly or as reimbursement.'
    }
  ];

  return (
    <section className="collaboration-section">
      <div className="container">
        <div className="section-header">
          <h2>How to Apply for Support</h2>
        </div>
        <ol className="collaboration-steps">
          {steps.map((step, index) => (
            <li key={index}>
              <strong>{step.title}:</strong> {step.description}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Scholarship Guidelines Section Component
 */
function ScholarshipGuidelinesSection() {
  return (
    <section className="collaboration-section">
      <div className="container">
        <div className="section-header">
          <h2>Scholarship Guidelines & Forms</h2>
        </div>
        <p className="section-description">
          Please follow our guidelines and use the official forms when applying for ITCPR scholarships.
          This ensures your application is complete and reviewed promptly.
        </p>
        <div className="download-section">
          <h3>Downloads</h3>
          <p>Download our standardized templates:</p>
          <div className="template-links">
            <a href="/assets/files/ITCPR_Scholarship_Application_Form.docx" className="template-link" download>
              <i className="fas fa-file"></i>
              <span>Scholarship Application Form</span>
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
          For scholarship applications and related inquiries, please contact:{' '}
          <a href="mailto:info@itcpr.org">info@itcpr.org</a>
        </p>
      </div>
    </section>
  );
}

export default Scholarships;

