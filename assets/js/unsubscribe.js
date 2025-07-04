async function sendEmail(email, subject, message) {
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
      console.log('Email sent successfully:', data.message);
      return true;
    } else {
      throw new Error(data.message || 'Failed to send email');
    }
  } catch (error) {
    return false;
  }
}

function getEmailTemplate(message) {
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
}

document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const statusDiv = document.getElementById('contact-status');
  statusDiv.textContent = 'Sending...';
  const htmlMessage = getEmailTemplate(`<p>Sender Email: ${email}</p><p>This is an unsubscribe request from the user.</p>`);
  const sent = await sendEmail('masakanda@mail.itcpr.org', 'New Unsubscribe Request', htmlMessage);
  if (sent) {
    statusDiv.style.color = 'green';
    statusDiv.textContent = 'Your unsubscribe request has been sent successfully. We will process it shortly.';
    document.getElementById('contact-form').reset();
  } else {
    statusDiv.style.color = 'red';
    statusDiv.textContent = 'Failed to send your unsubscribe request. Please try again later.';
  }
});