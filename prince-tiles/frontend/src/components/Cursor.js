import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      }
    };

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
      }
      requestAnimationFrame(animateCursor);
    }

    document.addEventListener('mousemove', onMove);
    animateCursor();

    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-follower" id="cursorFollower" />
    </>
  );
}
