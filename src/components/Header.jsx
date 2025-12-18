import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenu = (val) => {
    if (val === 'o') {
      setMobileMenuOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      setMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-right">
            <a href="https://www.linkedin.com/company/itcpr-org" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/itcpr" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://www.facebook.com/itcpr.org" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.youtube.com/@itcpr-org" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-rss"></i>
            </a>
          </div>
          <div className="top-bar-left">
            <Link to="/internships">APPLY</Link>
            <Link to="/support">SUPPORT</Link>
            <a href="https://portal.itcpr.org" target="_blank" rel="noopener noreferrer">LOGIN</a>
          </div>
        </div>
      </div>
      <div className="main-header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/assets/image/logo.png" alt="ITCPR Logo" />
              <span>ITCPR</span>
            </Link>
          </div>
          <nav className="main-nav">
            <div className="nav-item has-dropdown">
              <a>About</a>
              <div className="dropdown-menu">
                <Link to="/story">Our Story</Link>
                <Link to="/charter">Institutional Charter</Link>
                <Link to="/infrastructure">Our Infrastructure</Link>
              </div>
            </div>
            <div className="nav-item has-dropdown">
              <a>Research</a>
              <div className="dropdown-menu">
                <Link to="/groups">Research Groups</Link>
                <Link to="/publications">Publications</Link>
              </div>
            </div>
            <Link to="/outreach" className="nav-item">Outreach</Link>
            <Link to="/people" className="nav-item">People</Link>
            <Link to="/newsletters" className="nav-item">News</Link>
            <Link to="/contact" className="nav-item">Contact</Link>
          </nav>
          <button className="mobile-menu-toggle" onClick={() => handleMenu('o')}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`} id="mobile-menu">
        <div className="mobile-menu-header">
          <button className="close-menu" onClick={() => handleMenu('c')}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="mobile-menu-content">
          <div className="mobile-nav-item">
            <Link to="/story" onClick={() => handleMenu('c')}>Our Story</Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/charter" onClick={() => handleMenu('c')}>Institutional Charter</Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/infrastructure" onClick={() => handleMenu('c')}>Our Infrastructure</Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/groups" onClick={() => handleMenu('c')}>Research Groups</Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/publications" onClick={() => handleMenu('c')}>Publications</Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/outreach" onClick={() => handleMenu('c')}>Outreach</Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/people" onClick={() => handleMenu('c')}>People</Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/newsletters" onClick={() => handleMenu('c')}>News</Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/contact" onClick={() => handleMenu('c')}>Contact</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

