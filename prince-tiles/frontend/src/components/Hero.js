export default function Hero() {
  const scrollTo = (id) => {
    const header = document.getElementById('header');
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = header ? header.offsetHeight : 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-blob blob1" />
        <div className="hero-blob blob2" />
        <div className="hero-blob blob3" />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">Chennai's Premier Tile Supplier</p>
        <h1 className="hero-title">
          <span className="line">Elevate Every</span>
          <span className="line accent-line">Surface.</span>
        </h1>
        <p className="hero-desc">
          Transform your spaces with exquisite ceramic, porcelain &amp; natural stone tiles.
          Over 20,000 projects completed across Chennai with guaranteed perfection.
        </p>
        <div className="hero-actions">
          <a href="#gallery" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo('gallery'); }}>
            <span>Explore Gallery</span>
            <i className="fas fa-arrow-right" />
          </a>
          <a href="#contact" className="btn-outline" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
            <i className="fas fa-phone" />
            <span>Free Consultation</span>
          </a>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>20000+</strong>
            <span>Projects Done</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <strong>10+</strong>
            <span>Years Experience</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <strong>100%</strong>
            <span>Satisfaction</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="tile-mosaic">
          <div className="mosaic-tile t1" />
          <div className="mosaic-tile t2" />
          <div className="mosaic-tile t3" />
          <div className="mosaic-tile t4" />
          <div className="mosaic-tile t5" />
          <div className="mosaic-tile t6" />
          <div className="mosaic-tile t7" />
          <div className="mosaic-tile t8" />
          <div className="mosaic-tile t9" />
          <div className="mosaic-badge">
            <i className="fas fa-star" />
            <strong>4.9/5</strong>
            <span>Rating</span>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-dot" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
