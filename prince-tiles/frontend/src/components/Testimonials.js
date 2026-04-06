import { useState, useEffect, useRef, useCallback } from 'react';

const testimonials = [
  { initials: 'RK', text: '"Prince Tiles completely transformed our home. The Italian marble flooring in our living room is absolutely stunning. The team was professional, punctual, and the finish is immaculate."', name: 'Rajesh Kumar',        role: 'Villa Owner, Besant Nagar' },
  { initials: 'PM', text: '"Outstanding service from consultation to completion. They helped us choose the perfect tiles for our restaurant, and the result exceeded all expectations. Highly recommended!"',    name: 'Priya Mohan',         role: 'Restaurant Owner, T. Nagar' },
  { initials: 'AV', text: '"We renovated all 4 bathrooms using Prince Tiles. The attention to detail, especially with the mosaic work, is extraordinary. Worth every rupee. Our home looks like a luxury hotel now."', name: 'Arjun Venkatesh',    role: 'Homeowner, Adyar' },
  { initials: 'SK', text: '"Best tile contractor in Chennai, period. They completed our 3,000 sq ft office in just 8 days with zero mess and perfect quality. The after-sales support is also excellent."',     name: 'Suresh Krishnamurthy', role: 'IT Company Director, OMR' },
  { initials: 'DN', text: '"I was amazed by the 3D design preview they provided before starting work. It matched exactly what was installed. Very professional team and great quality tiles at competitive prices."', name: 'Deepa Nair',       role: 'Architect, Anna Nagar' },
];

function getCardsVisible() {
  if (window.innerWidth < 900) return 1;
  if (window.innerWidth < 1200) return 2;
  return 3;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(getCardsVisible());
  const autoRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const total = testimonials.length;

  const maxIndex = total - cardsVisible;
  const cardWidth = 100 / cardsVisible;
  const offset = currentIndex * (cardWidth + 1); // 1% gap approx

  const updateSlider = useCallback((idx) => {
    setCurrentIndex(Math.max(0, Math.min(idx, total - cardsVisible)));
  }, [total, cardsVisible]);

  const next = useCallback(() => {
    setCurrentIndex(i => i >= total - cardsVisible ? 0 : i + 1);
  }, [total, cardsVisible]);

  const prev = useCallback(() => {
    setCurrentIndex(i => i <= 0 ? total - cardsVisible : i - 1);
  }, [total, cardsVisible]);

  const resetAutoPlay = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 4500);
  }, [next]);

  useEffect(() => {
    autoRef.current = setInterval(next, 4500);
    return () => clearInterval(autoRef.current);
  }, [next]);

  useEffect(() => {
    const onResize = () => {
      setCardsVisible(getCardsVisible());
      setCurrentIndex(0);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const numDots = Math.ceil(total / cardsVisible);

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Client Reviews</p>
          <h2 className="section-title">What Our Customers <em>Say</em></h2>
        </div>

        <div className="testimonials-slider" id="testimonialsSlider">
          <div
            className="testimonials-track"
            id="testimonialsTrack"
            ref={trackRef}
            style={{ transform: `translateX(-${currentIndex * (cardWidth + 1)}%)` }}
            onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].screenX; }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].screenX;
              if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetAutoPlay(); }
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="testimonial-card"
                style={{ flex: `0 0 calc(${cardWidth}% - 1rem)` }}
              >
                <div className="t-stars">
                  {[...Array(5)].map((_, j) => <i key={j} className="fas fa-star" />)}
                </div>
                <p className="t-text">{t.text}</p>
                <div className="t-author">
                  <div className="t-avatar">{t.initials}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials-controls">
            <button className="t-btn" id="tPrev" onClick={() => { prev(); resetAutoPlay(); }}>
              <i className="fas fa-arrow-left" />
            </button>
            <div className="t-dots" id="tDots">
              {[...Array(numDots)].map((_, i) => (
                <div
                  key={i}
                  className={`t-dot${Math.floor(currentIndex / cardsVisible) === i ? ' active' : ''}`}
                  onClick={() => { updateSlider(i * cardsVisible); resetAutoPlay(); }}
                />
              ))}
            </div>
            <button className="t-btn" id="tNext" onClick={() => { next(); resetAutoPlay(); }}>
              <i className="fas fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
