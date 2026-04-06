import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Gallery from './components/Gallery';
import About from './components/About';
import Counter from './components/Counter';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DesignsPage from './components/DesignsPage';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { WhatsAppFloat, BackToTop } from './components/FloatingElements';
import ParallaxBlobs from './components/ParallaxBlobs';

function ScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Re-observe any data-reveal elements after route change
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

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [location]);

  return null;
}

function ActiveNav() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    const updateActiveNav = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.nav-link');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const scrollY = window.scrollY;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + section.id) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
    return () => window.removeEventListener('scroll', updateActiveNav);
  }, [location]);

  return null;
}

function RouteClassHandler() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === '/login') {
      document.body.classList.add('page-login');
    } else if (path === '/admin') {
      document.body.classList.add('page-admin');
    } else {
      document.body.classList.remove('page-login', 'page-admin');
    }
  }, [location]);

  return null;
}

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Gallery />
      <About />
      <Counter />
      <Testimonials />
      <Contact />
      <ParallaxBlobs />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isDeveloperPage = ['/login', '/admin'].includes(location.pathname);

  return (
    <>
      <Loader />
      <Cursor />
      <ScrollToTop />
      {!isDeveloperPage && <Header />}
      <ScrollReveal />
      <ActiveNav />
      <RouteClassHandler />
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/designs" element={<DesignsPage />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/admin"   element={<AdminDashboard />} />
      </Routes>
      {!isDeveloperPage && <Footer />}
      {!isDeveloperPage && <WhatsAppFloat />}
      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppContent />
    </BrowserRouter>
  );
}
