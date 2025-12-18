import '../assets/css/support.css';

/**
 * Support Page Component
 * Displays information about supporting ITCPR
 */
function Support() {
  const benefactors = [
    { name: 'Md Abu Jafar Pikul', country: 'United States' },
    { name: 'Md Abdus Sami Akanda', country: 'United States' },
    { name: 'Fariha Tasnim', country: 'United States' },
    { name: 'Abhijeet Dutta', country: 'United States' },
    { name: 'Tasnim Jahan', country: 'United States' },
    { name: 'Menhajur Rahman Jitu', country: 'Canada' },
    { name: 'Raihan Khan Nayan', country: 'Canada' },
    { name: 'Hasib Mahmudul Hasan Rumi', country: 'Germany' },
    { name: 'Monoara Aktar Bithi', country: 'Bangladesh' },
    { name: 'Sharia Sharmin Tonni', country: 'Bangladesh' },
    { name: 'Md Al Fahat Hossain', country: 'Bangladesh' },
    { name: 'Md Koushik Alam', country: 'Bangladesh' },
    { name: 'Sagar Chandra Roy', country: 'Bangladesh' }
  ];

  return (
    <div className="support-page">
      <PageHeader />
      <MissionSection />
      <BenefactorsSection benefactors={benefactors} />
      <WhySupportSection />
      <WaysToSupportSection />
      <GetInTouchSection />
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
          <h1>Support Us</h1>
          <p>
            Join us in advancing scientific research and education by supporting ITCPR's 
            mission to make physics research accessible to all.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Mission Section Component
 */
function MissionSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Mission</h2>
        </div>
        <p className="section-description">
          As a growing institute in theoretical and computational physics research, ITCPR
          is dedicated to advancing the frontiers of science. Our mission is to provide
          accessible research opportunities to underprivileged students and those lacking
          access to formal research environments. Your support plays a vital role in sustaining
          and expanding our research, educational programs, and outreach initiatives, ensuring
          that talented individuals from all backgrounds can contribute to groundbreaking discoveries.
        </p>
      </div>
    </section>
  );
}

/**
 * Benefactors Section Component
 */
function BenefactorsSection({ benefactors }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Benefactors</h2>
        </div>
        <p className="section-description">
          Benefactors are individuals who have supported ITCPR through donations, sponsorships, 
          or contributions of research equipment and software. We are grateful for their support 
          and contributions.
        </p>
        <div className="benefactors-grid">
          {benefactors.map((benefactor, index) => (
            <BenefactorCard key={index} benefactor={benefactor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Benefactor Card Component
 */
function BenefactorCard({ benefactor, index }) {
  return (
    <div 
      className="benefactor-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <b>{benefactor.name}</b>
      <span>{benefactor.country}</span>
    </div>
  );
}

/**
 * Why Support Section Component
 */
function WhySupportSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Why Support ITCPR?</h2>
        </div>
        <p className="section-description">
          By supporting ITCPR, you become an integral part of a community committed to scientific
          innovation and discovery. Your contributions enable us to:
        </p>
        <ul className="support-list">
          <li>
            <b>Expand Research Opportunities:</b> We provide students and early-career researchers
            with the tools and mentorship needed to conduct cutting-edge research in quantum mechanics,
            spintronics, condensed matter physics, computational modeling, and more.
          </li>
          <li>
            <b>Maintain State-of-the-Art Research Infrastructure:</b> Your donations help us acquire
            essential research instruments, computing resources, and software licenses to facilitate
            advanced simulations and data analysis.
          </li>
          <li>
            <b>Attract Leading Scientific Talent:</b> We aim to bring together expert physicists from
            around the world to mentor and collaborate with young researchers. Your support helps us
            fund visiting researchers, guest lectures, and workshops.
          </li>
          <li>
            <b>Offer Free Educational Resources:</b> ITCPR is committed to providing open-access
            courses, tutorials, and research guides for students worldwide, ensuring that knowledge
            remains barrier-free.
          </li>
          <li>
            <b>Promote Diversity and Inclusion in Science:</b> We actively support underprivileged
            students and those with limited research access, fostering a more inclusive scientific
            community.
          </li>
        </ul>
      </div>
    </section>
  );
}

/**
 * Ways to Support Section Component
 */
function WaysToSupportSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Ways to Support</h2>
        </div>
        <p className="section-description">
          Your contributions—big or small—play a crucial role in advancing research, mentoring young
          scientists, and expanding access to theoretical and computational physics. Below are various
          ways you can support ITCPR and help foster a more inclusive scientific community.
        </p>

        <div className="support-subsection">
          <h3>Available Donation Methods:</h3>
          <p className="section-description">
            We aim to provide multiple convenient ways to donate. Currently, donations can be made via:
          </p>
          <ul className="donation-methods-list">
            <li>Bank Transfer (BDT or USD) - If you'd like to donate via direct bank transfer, please contact us for banking details.</li>
            <li>PayPal (USD) - Secure online donations via PayPal.</li>
            <li>Zelle (USD) - Secure online donations via Zelle.</li>
            <li>Venmo (USD) - Secure online donations via Venmo.</li>
            <li>Bkash (BDT) - Secure online donations via Bkash.</li>
            <li>Nagad (BDT) - Secure online donations via Nagad.</li>
          </ul>
        </div>
        
        <div className="support-subsection">
          <h3>Sponsorships:</h3>
          <p className="section-description">
            We welcome sponsorships from individuals, organizations, and corporations that believe in 
            advancing scientific research and education. Sponsorship opportunities include:
          </p>
          <ul className="sponsorship-list">
            <li>Research Sponsorship - Fund specific research areas such as spintronics, condensed matter physics, quantum computing, and AI in physics.</li>
            <li>Student & Early-Career Researcher Sponsorships - Provide financial support to students who need resources for conducting high-quality research.</li>
            <li>Event Sponsorship - Sponsor workshops, conferences, and outreach programs that bring together researchers and students worldwide.</li>
          </ul>
        </div>
        
        <div className="support-subsection">
          <h3>Equipment & Software Contributions:</h3>
          <p className="section-description">
            Donations of research equipment and software are invaluable to our scientific efforts. 
            ITCPR relies on access to high-performance computing (HPC) clusters, simulation software, 
            and lab instruments. Contributions may include:
          </p>
          <ul className="equipment-list">
            <li>Computing Hardware - GPUs, CPUs, and workstations for high-performance simulations</li>
            <li>Lab Instruments - Measurement tools, sensors, and testing devices for experimental research</li>
            <li>Software Licenses - Computational physics tools such as MATLAB, Mathematica, and specialized physics simulation software</li>
          </ul>
        </div>

        <p className="section-description">
          For more details on making a donation, or sponsorship, please reach out to{' '}
          <a href="mailto:info@itcpr.org">info@itcpr.org</a>.
        </p>
      </div>
    </section>
  );
}

/**
 * Get in Touch Section Component
 */
function GetInTouchSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Get in Touch</h2>
        </div>
        <p className="section-description">
          If you are interested in supporting ITCPR or would like more
          information, please contact us. You can find the contact information in
          our contact page. We are grateful for your interest and support in
          advancing the field of physics.
        </p>
      </div>
    </section>
  );
}

export default Support;

