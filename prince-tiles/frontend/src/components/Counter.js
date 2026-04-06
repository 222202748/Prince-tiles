import { useEffect, useRef, useState } from 'react';

const stats = [
  { icon: 'fa-project-diagram', target: 20000, label: 'Projects Completed' },
  { icon: 'fa-users',           target: 19800, label: 'Happy Customers' },
  { icon: 'fa-calendar-check',  target: 10,    label: 'Years Experience' },
  { icon: 'fa-award',           target: 50,    label: 'Brand Partners' },
];

function CounterItem({ stat }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const duration = 2000;
        const start = performance.now();
        function update(time) {
          const elapsed = time - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
          const current = Math.round(eased * stat.target);
          setDisplay(current);
          if (progress < 1) requestAnimationFrame(update);
          else setDisplay(stat.target);
        }
        requestAnimationFrame(update);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.target]);

  return (
    <div className="counter-item" ref={ref}>
      <i className={`fas ${stat.icon}`} />
      <h3 className="counter-num">{display.toLocaleString()}</h3>
      <span className="counter-plus">+</span>
      <p>{stat.label}</p>
    </div>
  );
}

export default function Counter() {
  return (
    <section className="counter-section">
      <div className="container">
        <div className="counters-grid">
          {stats.map((s, i) => <CounterItem key={i} stat={s} />)}
        </div>
      </div>
    </section>
  );
}
