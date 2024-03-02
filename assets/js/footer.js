function myFooter() {
  document.getElementById("footer").innerHTML = `<div class="footer">
    <div class="links">
      <div class="footer-div">
        <b>Contact Info</b>
        <span class="bar"></span>
        Email: <a href="mailto:info@itcpr.org" target="_blank">info@itcpr.org</a> <br>
        URL: <a href="./../../../contact">itcpr.org/contact</a>
      </div>
      <div class="footer-div">
        <b>Resources</b>
        <span class="bar"></span>
        <a href="./../../../newsletters">ITCPR Newsletter</a><br>
        <a href="./../../../charter">Institutional Charter</a>
      </div>
      <div class="footer-div">
        <b>Related Links</b>
        <span class="bar"></span>
        <a href="./../../../groups">Research Groups</a><br>
        <a href="./../../../outreach">Outreach</a>
      </div>
    </div>
  </div>
  <p>
    Copyright © 2024 - Institution for Theoretical and Computational Physics
    Research.
    <br />
    All rights reserved.
  </p>`;
}

myFooter();
