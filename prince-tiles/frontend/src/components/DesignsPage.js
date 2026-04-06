import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { WhatsAppFloat, BackToTop } from './FloatingElements';

const API_URL = 'http://localhost:5000/api';

export default function DesignsPage() {
  const [designs, setDesigns] = useState([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      const res = await axios.get(`${API_URL}/designs`);
      const dynamicDesigns = res.data.map(d => ({
        ...d,
        pdf: `http://localhost:5000/${d.pdfPath}`
      }));
      setDesigns(dynamicDesigns);
    } catch (err) {
      console.error('Error fetching designs:', err);
    }
  };

  // Add page-designs class to body (matches original designs.html)
  useEffect(() => {
    document.body.classList.add('page-designs');
    return () => document.body.classList.remove('page-designs');
  }, []);

  // Scroll reveal — same observer as script.js
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

    itemRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [designs]);

  return (
    <>
      <section className="designs-page">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <p className="section-eyebrow" style={{ justifyContent: 'center' }}>Our Collections</p>
            <h2 className="section-title">Design <em>Catalogues</em></h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Browse through our extensive collection of tile designs. Download our PDF catalogues for detailed specifications and inspiration.
            </p>
          </div>

          <div className="designs-grid">
            {designs.map((d, i) => (
              <div
                key={i}
                className="design-card"
                data-reveal
                ref={el => itemRefs.current[i] = el}
              >
                <div className="design-icon">
                  <i className="fas fa-file-pdf" />
                </div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <a href={d.pdf} className="btn-download" target="_blank" rel="noreferrer">
                  <i className="fas fa-download" /> Download PDF
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
