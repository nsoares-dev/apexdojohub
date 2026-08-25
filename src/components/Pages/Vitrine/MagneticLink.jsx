import { useRef } from 'react';
import Icon from './Icon';

export default function MagneticLink({ href, children, className = '', icon = 'arrow', target }) {
  const ref = useRef(null);

  const move = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      className={`magnetic-link ${className}`}
      onMouseMove={move}
      onMouseLeave={reset}
    >
      <span>{children}</span>
      {icon && <span className="magnetic-link__icon"><Icon name={icon} size={17} /></span>}
    </a>
  );
}
