import { useState } from 'react';
import '../assets/css/contact.css';

/**
 * Unsubscribe Page Component
 */
function Unsubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const sendEmail = async (email, subject, message) => {
    try {
      const apiUrl = import.meta.env.VITE_EMAIL_API_URL;
      if (!apiUrl) {
        throw new Error('Email API URL is not configured');
      }
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          to: email,
          subject: subject,
          message: message
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === 'success') {
        return true;
      } else {
        throw new Error(data.message || 'Failed to send email');
      }
    } catch (error) {
      return false;
    }
  };

  const getEmailTemplate = (message) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="border-bottom: 1px solid rgb(157, 157, 189); text-align: center; width: 100%;">
                  <span style="font-size: 35px; font-weight: bold; color: rgb(157, 157, 189);">ITCPR</span>
              </div>
              <div style="padding: 10px; background-color: #ffffff;">
                  <p>Dear Director of Operations,</p>
                  ${message}
              </div>
              <div style="background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; color: #666;">
                  <p>© ${new Date().getFullYear()} ITCPR. All rights reserved.</p>
                  <p>This is an automated message, please do not reply.</p>
              </div>
          </div>
      </body>
      </html>
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    const htmlMessage = getEmailTemplate(`<p>Sender Email: ${email}</p><p>This is an unsubscribe request from the user.</p>`);
    const unsubscribeEmail = import.meta.env.VITE_UNSUBSCRIBE_EMAIL || 'masakanda@mail.itcpr.org';
    const sent = await sendEmail(unsubscribeEmail, 'New Unsubscribe Request', htmlMessage);
    if (sent) {
      setStatus('Your unsubscribe request has been sent successfully. We will process it shortly.');
      setEmail('');
    } else {
      setStatus('Failed to send your unsubscribe request. Please try again later.');
    }
  };

  return (
    <div className="unsubscribe-page">
      <PageHeader />
      <UnsubscribeSection email={email} setEmail={setEmail} status={status} handleSubmit={handleSubmit} />
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
          <h1>Unsubscribe from ITCPR</h1>
          <p>If you wish to unsubscribe from our mailing list, please enter your email address below.</p>
        </div>
      </div>
    </section>
  );
}

/**
 * Unsubscribe Section Component
 */
function UnsubscribeSection({ email, setEmail, status, handleSubmit }) {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-content">
          <div className="section-header">
            <h2>Unsubscribe from our Mailing List</h2>
          </div>
          <p className="section-description">
            We respect your privacy and understand that you may no longer wish to receive our communications. 
            Please enter your email address below, and we will remove you from our mailing list.
            If you have any questions or concerns, feel free to contact us at{' '}
            <a href="mailto:info@itcpr.org">info@itcpr.org</a>.
          </p>
          <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" id="contact-submit" className="contact-submit">Unsubscribe</button>
            <div id="contact-status" className="contact-status" style={{ color: status.includes('successfully') ? 'green' : status.includes('Failed') ? 'red' : 'inherit' }}>
              {status}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Unsubscribe;

