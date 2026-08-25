import Reveal from './Reveal';

export default function SectionTitle({ eyebrow, title, text, align = 'left' }) {
  return (
    <Reveal className={`section-title section-title--${align}`}>
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}
