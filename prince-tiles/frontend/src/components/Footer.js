import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollTo = (id) => {
    const header = document.getElementById('header');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 80);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">

          <div className="footer-brand">
            <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
              Prince <span>Tiles</span>
            </a>
            <p>Chennai's most trusted tile specialist since 2016. Premium quality, expert installation, lasting beauty.</p>
            <div className="social-links">
              <a href="#" className="social-btn" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
              <a href="#" className="social-btn" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href="https://wa.me/917338770355" className="social-btn" aria-label="WhatsApp" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp" /></a>
              <a href="#" className="social-btn" aria-label="YouTube"><i className="fab fa-youtube" /></a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <a href="#home"     onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a>
            <a href="#gallery"  onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}>Gallery</a>
            <a href="#about"    onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About Us</a>
            <Link to="/designs">Designs</Link>
            <a href="#contact"  onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
            <Link to="/login" style={{ marginTop: '0.5rem', opacity: 0.8 }}>Developer Login</Link>
          </div>

          <div className="footer-links-col">
            <h4>Contact</h4>
            <a href="tel:+917338770355"><i className="fas fa-phone" /> +91 73387 70355</a>
            <a href="mailto:info@princetiles.in"><i className="fas fa-envelope" /> info@princetiles.in</a>
            <a href="https://maps.google.com/?cid=14612575471826842402" target="_blank" rel="noreferrer">
              <i className="fas fa-map-marker-alt" /> Kundrathur, Chennai
            </a>
          </div>

        </div>
        <div className="footer-bottom">
          <p>© 2024 Prince Tiles. All rights reserved. | Crafted with ♥ in Chennai</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <Link to="/login" style={{ marginLeft: '1rem', opacity: 0.6, fontSize: '0.8rem' }}>Developer Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
