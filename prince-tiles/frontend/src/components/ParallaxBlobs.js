import { useEffect } from 'react';

export default function ParallaxBlobs() {
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const blobs = document.querySelectorAll('.hero-blob');
      blobs.forEach((blob, i) => {
        const speed = (i + 1) * 0.3;
        blob.style.transform = `translateY(${scrollY * speed * 0.1}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
