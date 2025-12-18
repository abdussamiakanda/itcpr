import '../assets/css/legal.css';

/**
 * Terms Page Component
 */
function Terms() {
  return (
    <div className="terms-page">
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
          <h1>Terms of Service</h1>
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
              Welcome to ITCPR. By accessing our website and using our services, you agree to these
              Terms of Service. Please read them carefully.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using ITCPR's website and services, you agree to be bound by these
              Terms of Service and all applicable laws and regulations. If you do not agree with
              any of these terms, you are prohibited from using or accessing this site.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials on ITCPR's website for
              personal, non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2>3. Research Collaboration</h2>
            <p>
              When participating in research activities through ITCPR:
            </p>
            <ul>
              <li>You agree to follow ethical research guidelines</li>
              <li>You will properly attribute all contributions</li>
              <li>You will maintain confidentiality of sensitive information</li>
              <li>You will report any conflicts of interest</li>
            </ul>

            <h2>4. User Content</h2>
            <p>
              By submitting content to ITCPR, you:
            </p>
            <ul>
              <li>Grant us a non-exclusive, royalty-free license to use your content</li>
              <li>Warrant that you have all necessary rights to grant this license</li>
              <li>Agree that your content does not violate any third-party rights</li>
            </ul>

            <h2>5. Disclaimer</h2>
            <p>
              The materials on ITCPR's website are provided on an 'as is' basis. ITCPR makes no
              warranties, expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>

            <h2>6. Limitations</h2>
            <p>
              In no event shall ITCPR or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on
              ITCPR's website.
            </p>

            <h2>7. Revisions and Errata</h2>
            <p>
              The materials appearing on ITCPR's website could include technical, typographical,
              or photographic errors. ITCPR does not warrant that any of the materials on its
              website are accurate, complete, or current.
            </p>

            <h2>8. Links</h2>
            <p>
              ITCPR has not reviewed all of the sites linked to its website and is not
              responsible for the contents of any such linked site. The inclusion of any link
              does not imply endorsement by ITCPR of the site.
            </p>

            <h2>9. Modifications</h2>
            <p>
              ITCPR may revise these terms of service at any time without notice. By using this
              website, you are agreeing to be bound by the then current version of these terms
              of service.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the
              laws of Bangladesh and you irrevocably submit to the exclusive jurisdiction of
              the courts in that location.
            </p>

            <div className="last-updated">
              Last Updated: February 15, 2024
            </div>
          </div>
        </div>
      </section>
  );
}

export default Terms;

