import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import '../assets/css/contact.css';

/**
 * Contact Page Component
 * Displays contact form and information
 */
function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const location = useLocation();

  const sendEmail = async (email, subject, message) => {
    try {
      const response = await fetch('https://api.itcpr.org/email/itcpr', {
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

  const getEmailTemplate = (name, message) => {
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
                  <p>Dear Admin,</p>
                  ${message}
                  <p>Best regards,<br>${name}</p>
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
    const htmlMessage = getEmailTemplate('New message submitted in itcpr.org', 
      `<p>Sender Name: ${formData.name}</p><p>Sender Email: ${formData.email}</p><p>Message:<br>${formData.message.replace(/\n/g, '<br>')}</p>`);
    const sent = await sendEmail('mnnamina@mail.itcpr.org', formData.subject, htmlMessage);
    if (sent) {
      setStatus('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus('Failed to send your message. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <PageHeader />
      <ContactSection 
        formData={formData}
        setFormData={setFormData}
        status={status}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

/**
 * Page Header Component
 * Hero section for the contact page
 */
function PageHeader() {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>Contact Us</h1>
          <p>
            Get in touch with us to learn more about our programs, research 
            opportunities, or how you can support our mission.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Contact Section Component
 * Displays contact form
 */
function ContactSection({ formData, setFormData, status, handleSubmit }) {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>Questions?</h2>
        </div>
        <p className="section-description">
          If you have any questions, would like more information about our
          programs, are interested in collaborating with us, or would like to
          make a donation, we'd love to hear from you. You can email us at
          <a href="mailto:info@itcpr.org"> info@itcpr.org</a> or use the form below.
        </p>
        <ContactForm 
          formData={formData}
          setFormData={setFormData}
          status={status}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}

/**
 * Contact Form Component
 * Contact form with validation
 */
function ContactForm({ formData, setFormData, status, handleSubmit }) {
  return (
    <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Your Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          className="form-input"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Your Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          className="form-input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="form-label">Subject</label>
        <input 
          type="text" 
          id="subject" 
          name="subject" 
          required 
          className="form-input"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows="5" 
          required 
          className="form-input"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        ></textarea>
      </div>
      <button type="submit" id="contact-submit" className="contact-submit">Send Message</button>
      <div id="contact-status" className="contact-status" style={{ color: status.includes('successfully') ? 'green' : status.includes('Failed') ? 'red' : 'inherit' }}>
        {status}
      </div>
    </form>
  );
}

export default Contact;

