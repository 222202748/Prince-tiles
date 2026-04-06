const items = ['Ceramic Tiles','Porcelain','Vitrified Tiles','Natural Stone','Floor Tiles','Wall Tiles','Custom Design','Expert Installation'];

export default function Marquee() {
  // Doubled for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i}>
            {item}
            <span className="dot"> ✦ </span>
          </span>
        ))}
      </div>
    </div>
  );
}
