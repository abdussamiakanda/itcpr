import '../assets/css/legal.css';

/**
 * Accessibility Page Component
 */
function Accessibility() {
  return (
    <div className="accessibility-page">
      <PageHeader />
      <ContentSection />
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
          <h1>Accessibility Statement</h1>
        </div>
      </div>
    </section>
  );
}

/**
 * Content Section Component
 */
function ContentSection() {
  return (
    <section className="content-section">
      <div className="container">
        <div className="content-wrapper">
            <p>
              ITCPR is committed to ensuring digital accessibility for people of all abilities.
              We strive to continually improve the user experience for everyone and apply
              relevant accessibility standards.
            </p>

            <h2>Our Commitment</h2>
            <p>
              We believe that websites and digital content should be accessible to everyone,
              regardless of their abilities. We are committed to:
            </p>
            <ul>
              <li>Making our website accessible to all users</li>
              <li>Following WCAG 2.1 Level AA guidelines</li>
              <li>Regularly testing and improving accessibility</li>
              <li>Providing alternative ways to access information</li>
            </ul>

            <h2>Accessibility Features</h2>
            <p>
              Our website includes several features to improve accessibility:
            </p>
            <ul>
              <li>Keyboard navigation support</li>
              <li>Screen reader compatibility</li>
              <li>Alternative text for images</li>
              <li>Clear heading structure</li>
              <li>High contrast text options</li>
              <li>Resizable text</li>
            </ul>

            <h2>Compatibility</h2>
            <p>
              Our website is designed to be compatible with:
            </p>
            <ul>
              <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
              <li>Screen magnifiers</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
              <li>Major browsers (Chrome, Firefox, Safari, Edge)</li>
            </ul>

            <h2>Known Limitations</h2>
            <p>
              While we strive to ensure that our website is fully accessible, some content
              may have limitations:
            </p>
            <ul>
              <li>Some older PDF documents may not be fully accessible</li>
              <li>Third-party content may not meet our accessibility standards</li>
              <li>Some complex mathematical equations may require alternative formats</li>
            </ul>

            <h2>Feedback and Assistance</h2>
            <p>
              We welcome your feedback on the accessibility of our website. If you encounter
              any accessibility barriers or have suggestions for improvement, please contact
              us at:
              <a href="mailto:info@itcpr.org"> info@itcpr.org</a>
            </p>

            <h2>Continuous Improvement</h2>
            <p>
              We are committed to ongoing improvements to our website's accessibility. This
              includes:
            </p>
            <ul>
              <li>Regular accessibility audits</li>
              <li>Staff training on accessibility</li>
              <li>User testing with people with disabilities</li>
              <li>Implementation of new accessibility features</li>
            </ul>

            <h2>Alternative Formats</h2>
            <p>
              If you need information in an alternative format, please contact us. We can
              provide:
            </p>
            <ul>
              <li>Large print materials</li>
              <li>Audio versions of content</li>
              <li>Braille documents</li>
              <li>Plain language summaries</li>
            </ul>

            <div className="last-updated">
              Last Updated: February 15, 2024
            </div>
          </div>
        </div>
      </section>
  );
}

export default Accessibility;

