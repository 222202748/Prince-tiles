import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_URL = 'https://prince-tiles-0fxc.onrender.com/api';
const BASE_URL = 'https://prince-tiles-0fxc.onrender.com';

const filters = [
  { key: 'all',      label: 'All' },
  { key: 'floor',    label: 'Flooring' },
  { key: 'wall',     label: 'Wall Tiles' },
  { key: 'bathroom', label: 'Bathroom' },
  { key: 'kitchen',  label: 'Kitchen' },
];

export default function Gallery() {
  const [active, setActive] = useState('all');
  const [galleryItems, setGalleryItems] = useState([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_URL}/gallery`);
      const dynamicItems = res.data.map(item => ({
        ...item,
        imgUrl: `${BASE_URL}/${item.imagePath}`
      }));
      setGalleryItems(dynamicItems);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    }
  };

  // Re-run reveal observer whenever filter changes
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
  }, [active, galleryItems]);

  const visible = galleryItems.filter(item => active === 'all' || item.category === active);

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">Our Portfolio</p>
          <h2 className="section-title">Recent <em>Projects</em></h2>
          <p className="section-desc">A selection of our finest installations across residential and commercial spaces.</p>
        </div>

        <div className="gallery-filter">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-btn${active === f.key ? ' active' : ''}`}
              data-filter={f.key}
              onClick={() => setActive(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid" id="galleryGrid">
          {visible.map((item, i) => (
            <div
              key={item._id || item.title}
              className={`gallery-item${item.large ? ' large' : ''}`}
              data-category={item.category}
              data-reveal
              ref={el => itemRefs.current[i] = el}
            >
              <div className="gallery-img" style={{ background: item.bg || '#f0f0f0', backgroundImage: `url(${item.imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              </div>
              <div className="gallery-info">
                <span className="gallery-tag">{item.tag}</span>
                <h4>{item.title}</h4>
                <p>{item.loc}</p>
              </div>
              <div className="gallery-overlay">
                <div className="overlay-content">
                  <i className="fas fa-expand-alt" />
                  <span>View Project</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
