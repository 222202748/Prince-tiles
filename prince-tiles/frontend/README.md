# Prince Tiles – React Frontend

Faithful React conversion of the original Prince Tiles static website.
All CSS, fonts, colors, animations and layout are **exactly as the original** HTML/CSS files.

## 🚀 Getting Started

```bash
npm install
npm start
```

Opens at **http://localhost:3000**

### Production Build

```bash
npm run build
```

---

## 📁 Project Structure

```
public/
├── index.html          # Loads original fonts + FontAwesome
└── style.css           # ← Original style.css, unchanged

src/
├── App.js              # Router + global scroll/reveal/active-nav logic
├── index.js
└── components/
    ├── Loader.js           # Page loader (2s, fade out with .hide class)
    ├── Cursor.js           # Custom gold cursor + follower animation
    ├── Header.js           # Sticky nav, scrolled class, hamburger menu
    ├── Hero.js             # Hero section with tile mosaic
    ├── Marquee.js          # Gold marquee banner
    ├── Gallery.js          # Filterable gallery with p1–p6 tile patterns
    ├── About.js            # About section with image collage
    ├── Counter.js          # Animated counters (easeOutCubic, same as original)
    ├── Testimonials.js     # Slider with autoplay, touch swipe, dots
    ├── Contact.js          # Form → WhatsApp redirect (same as original)
    ├── Footer.js           # Dark footer
    ├── DesignsPage.js      # /designs route (page-designs body class)
    ├── FloatingElements.js # WhatsApp float + Back-to-top button
    └── ParallaxBlobs.js    # Hero blob parallax on scroll
```

## 📄 Pages / Routes

| Route      | Page |
|------------|------|
| `/`        | Full homepage |
| `/designs` | Design catalogues (15 PDF cards) |

## 🗂️ Adding Real PDFs

Place your catalogues in `public/pdfs/`:
```
public/pdfs/design1.pdf  →  design15.pdf
```

## ✅ Features Preserved

- Original white/off-white light theme (not dark)
- Gold (#c9a96e) accent colour throughout
- Cormorant Garamond display font + DM Sans body font
- Custom gold cursor with smooth follower
- Page load animation with gold progress bar
- Hero tile mosaic with staggered reveal animations
- Gold marquee banner
- Scroll-reveal with staggered siblings delay
- Gallery filter (All / Flooring / Wall Tiles / Bathroom / Kitchen)
- Gallery gold overlay on hover
- Animated counters with easeOutCubic (same algorithm as original)
- Testimonial slider: autoplay every 4.5s, touch swipe, dot nav
- Contact form → opens WhatsApp with pre-filled message
- page-designs body class on /designs (header always white/scrolled)
- Parallax blob scroll effect
- Active nav link tracking on scroll
- Responsive hamburger menu
- WhatsApp floating button (collapses on mobile)
- Back-to-top button
