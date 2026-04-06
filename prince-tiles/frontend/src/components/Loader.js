import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`loader${hidden ? ' hide' : ''}`} id="loader">
      <div className="loader-logo">Prince <span>Tiles</span></div>
      <div className="loader-bar">
        <div className="loader-fill" />
      </div>
    </div>
  );
}
