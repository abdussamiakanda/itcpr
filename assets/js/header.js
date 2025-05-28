function myHeader() {
  document.getElementById("header").innerHTML = `
    <div class="top-bar">
      <div class="container">
        <div class="top-bar-right">
          <a href="https://www.linkedin.com/company/itcpr-org" target="_blank"><i class="fab fa-linkedin"></i></a>
          <a href="https://github.com/itcpr" target="_blank"><i class="fab fa-github"></i></a>
          <a href="https://www.facebook.com/itcpr.org" target="_blank"><i class="fab fa-facebook"></i></a>
          <a href="https://www.youtube.com/@itcpr-org" target="_blank"><i class="fab fa-youtube"></i></a>
          <a href="/rss.xml" target="_blank"><i class="fas fa-rss"></i></a>
        </div>
        <div class="top-bar-left">
          <a href="/internships">APPLY</a>
          <a href="/support">SUPPORT</a>
          <a href="https://portal.itcpr.org" target="_blank">LOGIN</a>
        </div>
      </div>
    </div>
    <div class="main-header">
      <div class="container">
        <div class="logo">
          <a href="/">
            <img src="/assets/image/logo.png" alt="ITCPR Logo">
            <span>ITCPR</span>
          </a>
        </div>
        <nav class="main-nav">
          <div class="nav-item has-dropdown">
            <a href="#">About</a>
            <div class="dropdown-menu">
              <a href="/story">Our Story</a>
              <a href="/charter">Institutional Charter</a>
              <a href="https://server.itcpr.org" target="_blank">Research Facilities</a>
            </div>
          </div>
          <div class="nav-item has-dropdown">
            <a href="#">Research</a>
            <div class="dropdown-menu">
              <a href="/groups">Research Groups</a>
              <a href="/publications">Publications</a>
            </div>
          </div>
          <a href="/outreach" class="nav-item">Outreach</a>
          <a href="/people" class="nav-item">People</a>
          <a href="/contact" class="nav-item">Contact</a>
        </nav>
        <button class="mobile-menu-toggle" onclick="handleMenu('o')">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu">
      <div class="mobile-menu-header">
        <button class="close-menu" onclick="handleMenu('c')">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="mobile-menu-content">
        <div class="mobile-nav-item">
          <a href="/story">Our Story</a>
        </div>
        <div class="mobile-nav-item">
          <a href="/charter">Institutional Charter</a>
        </div>
        <div class="mobile-nav-item">
          <a href="https://server.itcpr.org">Research Facilities</a>
        </div>
        <div class="mobile-nav-item">
          <a href="/groups">Research Groups</a>
        </div>
        <div class="mobile-nav-item">
          <a href="/publications">Publications</a>
        </div>
        <div class="mobile-nav-item">
          <a href="/outreach">Outreach</a>
        </div>
        <div class="mobile-nav-item">
          <a href="/people">People</a>
        </div>
        <div class="mobile-nav-item">
          <a href="/contact">Contact</a>
        </div>
      </div>
    </div>`;
}

function handleMenu(val) {
  const mobileMenu = document.getElementById('mobile-menu');
  if (val === 'o') {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function goTo(path) {
  window.location.assign(path);
}

function goToExternal(path) {
  window.open(path, "_blank");
}

myHeader();
