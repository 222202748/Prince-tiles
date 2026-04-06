import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isDesigns = location.pathname === '/designs';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const header = document.getElementById('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <nav className="nav-container">
        <Link to="/" className="logo">Prince <span>Tiles</span></Link>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <li><a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a></li>
          <li><a href="#gallery" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}>Gallery</a></li>
          <li><a href="#about" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a></li>
          <li><Link to="/designs" className={`nav-link${isDesigns ? ' active' : ''}`}>Designs</Link></li>
          <li><a href="#contact" className="nav-link" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
        </ul>

        <a href="#contact" className="btn-nav" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Get Free Quote</a>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          id="hamburger"
          aria-label="Menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}
