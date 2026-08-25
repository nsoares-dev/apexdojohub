import { useEffect, useRef } from 'react';
import './vitrine.css';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Disciplines from './Disciplines';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Contact from './Contact';
import Footer from './Footer';
import Marquee from './Marquee';

export default function VitrineHome() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!root || !finePointer.matches || reducedMotion.matches) return undefined;

    let currentX = window.innerWidth / 5;
    let currentY = window.innerHeight / 5;
    let targetX = currentX;
    let targetY = currentY;
    let animationFrame;

    const followPointer = () => {
      currentX += (targetX - currentX) * 5;
      currentY += (targetY - currentY) * 5;

      root.style.setProperty('--mouse-x', `${currentX}px`);
      root.style.setProperty('--mouse-y', `${currentY}px`);

      animationFrame = window.requestAnimationFrame(followPointer);
    };

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    animationFrame = window.requestAnimationFrame(followPointer);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    // A classe vitrine-theme garante que o CSS não quebre o dashboard financeiro
    <div ref={rootRef} className="vitrine-root">
      <div className="cursor-glow" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Disciplines />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
