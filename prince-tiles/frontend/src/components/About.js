import { useEffect, useRef } from 'react';

export default function About() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement.querySelectorAll('[data-reveal]');
          let delay = 0;
          siblings.forEach((el, i) => { if (el === entry.target) delay = i * 100; });
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    refs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const header = document.getElementById('header');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight || 80);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-inner">

          <div className="about-visual" data-reveal ref={el => refs.current[0] = el}>
            <div className="about-img-wrap">
              <div className="about-img-main">
                <div className="about-pattern" />
                <div className="about-badge-exp">
                  <strong>10+</strong>
                  <span>Years of Excellence</span>
                </div>
              </div>
              <div className="about-img-secondary">
                <div className="about-pattern2" />
              </div>
            </div>
            <div className="about-stats-side">
              <div className="side-stat">
                <strong>20000+</strong>
                <span>Happy Clients</span>
              </div>
              <div className="side-stat">
                <strong>30000+</strong>
                <span>Tile Designs</span>
              </div>
            </div>
          </div>

          <div className="about-text" data-reveal ref={el => refs.current[1] = el}>
            <p className="section-eyebrow">About Prince Tiles</p>
            <h2 className="section-title left">Chennai's Most Trusted <em>Tile Partner</em></h2>
            <p className="about-lead">
              Founded in 2016, Prince Tiles has built a reputation for delivering exceptional tile solutions
              across residential, commercial, and industrial projects throughout Chennai.
            </p>
            <p className="about-body">
              We combine premium products from world-class manufacturers with skilled craftsmanship and
              meticulous attention to detail. We will Supply the Tiles on time and within budget.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <i className="fas fa-check-circle" />
                <span>3D Design Preview Before Work</span>
              </div>
              <div className="about-feature">
                <i className="fas fa-check-circle" />
                <span>Transparent Pricing – No Hidden Costs</span>
              </div>
              <div className="about-feature">
                <i className="fas fa-check-circle" />
                <span>Same-Week Tiles Supply</span>
              </div>
            </div>
            <a href="#contact" className="btn-primary mt-btn" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
              <span>Work With Us</span>
              <i className="fas fa-arrow-right" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
