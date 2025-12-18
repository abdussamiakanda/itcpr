import '../assets/css/legal.css';

/**
 * Privacy Page Component
 */
function Privacy() {
  return (
    <div className="privacy-page">
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
          <h1>Privacy Policy</h1>
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
              At ITCPR, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our website or use our
              services.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Email address</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Send newsletters and updates</li>
              <li>Respond to your inquiries and requests</li>
              <li>Improve our website and services</li>
              <li>Communicate with you about research opportunities</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties
              without your consent, except as described in this policy. We may share your information
              with:
            </p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Research collaborators (with your consent)</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of communications</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to improve your browsing experience
              and analyze website traffic. You can control cookie settings through your browser
              preferences.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <a href="mailto:info@itcpr.org"> info@itcpr.org</a>
            </p>

            <div className="last-updated">
              Last Updated: February 15, 2024
            </div>
          </div>
        </div>
      </section>
  );
}

export default Privacy;

