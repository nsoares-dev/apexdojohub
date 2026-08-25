export default function Marquee() {
  const items = ['JIU-JITSU', 'MUAY THAI', 'DISCIPLINA', 'RESPEITO', 'CONFIANÇA', 'EVOLUÇÃO'];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}
