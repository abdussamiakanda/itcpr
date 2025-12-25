import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import '../assets/css/internships.css';

/**
 * Internships Page Component
 * Displays internship program information
 */
function Internships() {
  const location = useLocation();
  const [applicationStatus, setApplicationStatus] = useState('');
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    let message = '';
    let applicationYear;
    let cycle = '';

    if (month === 11 && day >= 1 && day <= 25) {
      applicationYear = year + 1;
      cycle = '1st';
      message = `
        <p>The internship application portal for ${applicationYear} (${cycle} cycle) is now open.</p>
        <div class="application-btn-container">
          <a class="application-btn" href="https://apply.itcpr.org" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-wpforms"></i> Apply for Internship ${applicationYear}
          </a>
        </div>
      `;
    } else if (month === 5 && day >= 1 && day <= 25) {
      applicationYear = year;
      cycle = '2nd';
      message = `
        <p>The internship application portal for ${applicationYear} (${cycle} cycle) is now open.</p>
        <div class="application-btn-container">
          <a class="application-btn" href="https://apply.itcpr.org" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-wpforms"></i> Apply for Internship ${applicationYear}
          </a>
        </div>
      `;
    } else {
      if (month < 5 || (month === 5 && day < 1)) {
        applicationYear = year;
        cycle = '2nd';
        message = `
          <p>The internship application portal is currently closed.</p>
          <p>The application portal opens on June 1st for the ${cycle} cycle of ${applicationYear}.</p>
        `;
      } else if (month < 11 || (month === 11 && day < 1)) {
        applicationYear = year + 1;
        cycle = '1st';
        message = `
          <p>The internship application portal is currently closed.</p>
          <p>The application portal opens on December 1st for the ${cycle} cycle of ${applicationYear}.</p>
        `;
      } else {
        applicationYear = year + 1;
        cycle = '2nd';
        message = `
          <p>The internship application portal is currently closed.</p>
          <p>The application portal opens on June 1st for the ${cycle} cycle of ${applicationYear}.</p>
        `;
      }
    }

    setApplicationStatus(message);

    // Chart setup - wait for Chart.js to load
    const initChart = () => {
      if (chartRef.current && typeof window !== 'undefined' && window.Chart) {
      const rawdata = {
        '2025-1': { total: 16, accepted: 14, rejected: 2, drop: 4 },
        '2025-2': { total: 15, accepted: 10, rejected: 5, drop: 0 },
      };

      const dataset = {};
      for (const cycle in rawdata) {
        const { total, accepted, rejected, drop } = rawdata[cycle];
        const acceptanceRate = total > 0 ? (accepted / total) * 100 : 0;
        const rejectionRate = total > 0 ? (rejected / total) * 100 : 0;
        const dropOutRate = total > 0 ? (drop / total) * 100 : 0;

        dataset[cycle] = [
          parseFloat(acceptanceRate.toFixed(2)),
          parseFloat(rejectionRate.toFixed(2)),
          parseFloat(dropOutRate.toFixed(2)),
        ];
      }

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new window.Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: Object.keys(dataset).map(key => key.replace('-', ' (Cycle ').concat(')')),
          datasets: [{
            label: 'Acceptance Rate',
            data: Object.values(dataset).map(values => values[0]),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }, {
            label: 'Rejection Rate',
            data: Object.values(dataset).map(values => values[1]),
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }, {
            label: 'Drop Out Rate',
            data: Object.values(dataset).map(values => values[2]),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: 'Percentage (%)'
              }
            }
          }
        }
      });
      } else {
        // Retry if Chart.js not loaded yet
        setTimeout(initChart, 100);
      }
    };
    
    // Try to initialize chart after a short delay to ensure Chart.js is loaded
    setTimeout(initChart, 100);
  }, []);

  return (
    <div className="internships-page">
      <SEO
        title="Internships"
        description="Apply for ITCPR internship programs. Gain hands-on research experience in theoretical and computational physics. Learn about eligibility, application process, and program benefits."
        keywords="ITCPR internships, physics internships, research internships, computational physics internships, science internships"
        url={location.pathname}
      />
      <PageHeader />
      <ProgramOverviewSection />
      <EligibilitySection />
      <ApplicationProcessSection />
      <ApplicationDeadlinesSection />
      <WhatToExpectSection />
      <ProgramStatisticsSection chartRef={chartRef} />
      <StartApplicationSection applicationStatus={applicationStatus} />
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
          <h1>Internship Programs</h1>
          <p>
            Join our vibrant internship programs and immerse yourself in cutting-edge 
            research in theoretical and computational physics.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Program Overview Section Component
 */
function ProgramOverviewSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Program Overview</h2>
        </div>
        <p className="section-description">
          Dive into our vibrant year-long internship at ITCPR, where you'll immerse yourself
          in cutting-edge theoretical and computational physics research while receiving
          regular guidance and feedback.
        </p>
        <ul className="program-list">
          <li>
            <b>First 3 months - Foundations & Skill-Building:</b> Begin with an intensive
            training block focused on essential concepts, coding and data-analysis tools, and
            good research practices. Activities include guided lectures, paper-reproduction
            exercises, and literature reviews—everything you need to speak the language of
            modern physics research.
          </li>
          <li>
            <b>Monthly evaluations, year-round:</b> At the end of every month you'll meet with
            mentors to review your progress, set fresh goals, and make sure your learning path
            stays on track.
          </li>
          <li>
            <b>Next 9 months - Project Immersion:</b> Equipped with new skills, you'll join an
            active research team, tackle real-world problems, and contribute meaningful results—
            whether through simulations, theoretical modeling, or data analysis.
          </li>
        </ul>
        <p className="section-description">
          Throughout the entire year you'll collaborate with motivated scientists, expand your
          professional network, and help push the boundaries of scientific knowledge—all while
          benefiting from a structured feedback loop that keeps your growth front and center.
        </p>
      </div>
    </section>
  );
}

/**
 * Eligibility Section Component
 */
function EligibilitySection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Eligibility Criteria</h2>
        </div>
        <div className="eligibility-notice">
          <p className="notice-text">
            <strong>Important:</strong> We currently only accept internship applications from applicants based in Bangladesh.
          </p>
        </div>
        <ul className="eligibility-list">
          <li>
            Open to students currently enrolled in an undergraduate program
            (minimum 3rd year) or a graduate program in physics or a related field.
          </li>
          <li>
            Demonstrated interest in the specific research fields offered at
            ITCPR. For more information on our research areas, visit our
            <Link to="/groups"> Research Groups</Link> page.
          </li>
          <li>
            Commitment to engage fully for the entire duration of the internship
            program.
          </li>
          <li>Agree to adhere to the institutional policies of ITCPR.</li>
        </ul>
      </div>
    </section>
  );
}

/**
 * Application Process Section Component
 */
function ApplicationProcessSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Application Process</h2>
        </div>
        <p className="section-description">
          To apply for an internship at ITCPR, kindly prepare the following materials:
        </p>
        <ul className="application-list">
          <li>
            A comprehensive CV detailing your educational background and any
            relevant experiences.
          </li>
          <li>
            A cover letter that clearly expresses your enthusiasm for
            participating in our internship program, highlights the particular
            research group you wish to join, and defines your goals and
            expectations for the internship experience.
          </li>
          <li>
            Verification documents for student status, such as academic
            transcripts or grade sheets. Note: These documents are for
            verification purposes only and will not influence the acceptance
            decision.
          </li>
        </ul>
        <p className="section-description">
          Once you have prepared these materials, proceed to the ITCPR Portal to
          submit your application. The portal will guide you through the
          application process, allowing you to submit the required documents for review.
        </p>
      </div>
    </section>
  );
}

/**
 * Application Deadlines Section Component
 */
function ApplicationDeadlinesSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Application Deadlines</h2>
        </div>
        <p className="section-description">
          Our internship programs are meticulously organized into two key
          recruitment cycles annually, synchronized with our operational
          approach to guarantee seamless integration of interns into our
          projects and collaborative efforts.
        </p>
        <ul className="deadlines-list">
          <li>
            <b>1st Cycle:</b> Application portal opens on the 1st of December and closes on the 25th of December
          </li>
          <li>
            <b>2nd Cycle:</b> Application portal opens on the 1st of June and closes on the 25th of June
          </li>
        </ul>
        <p className="section-description">
          We emphasize the importance of adhering to the specified application
          timelines to facilitate a smooth and efficient entry into our programs,
          as we strictly observe the window for application submissions.
        </p>
      </div>
    </section>
  );
}

/**
 * What to Expect Section Component
 */
function WhatToExpectSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>What to Expect</h2>
        </div>
        <p className="section-description">
          Upon selection, interns will be notified via email. They may also be
          called for an interview as part of the final evaluation process. Once
          confirmed, they will join the dynamic environment of ITCPR, actively
          engaging in our research initiatives and contributing to the vibrant
          culture of scientific exploration and discovery within our projects.
          <br />
          <br />
          Contact us at <a href="mailto:majasem@mail.itcpr.org">majasem@mail.itcpr.org</a> for any questions or concerns.
        </p>
      </div>
    </section>
  );
}

/**
 * Program Statistics Section Component
 */
function ProgramStatisticsSection({ chartRef }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Program Statistics</h2>
        </div>
        <div className="chart-container">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </section>
  );
}

/**
 * Start Application Section Component
 */
function StartApplicationSection({ applicationStatus }) {
  return (
    <section className="content-section">
      <div className="container">
        <div className="section-header">
          <h2>Start Your Application</h2>
        </div>
        <div className="application-status-wrapper" dangerouslySetInnerHTML={{ __html: applicationStatus }}></div>
      </div>
    </section>
  );
}

export default Internships;

