import { useState, useEffect } from 'react';

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/917338770355"
      className="whatsapp-float"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
    >
      <i className="fab fa-whatsapp" />
      <span>Chat with us</span>
    </a>
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`back-to-top${visible ? ' visible' : ''}`}
      id="backToTop"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fas fa-arrow-up" />
    </button>
  );
}
