import logo from '../../../../public/logo 2-1.svg';
import MagneticLink from './MagneticLink';
import Icon from './Icon';


const gerarLinkWhatsApp = () => {
  const hoje = new Date();
  const horario = hoje.getHours();
  const saudacao = horario < 12 ? 'Bom dia' : horario < 18 ? 'Boa tarde' : 'Boa noite';
  const mensagem = `Olá, ${saudacao}! Gostaria de agendar uma aula cortesia. Poderia me informar os horários disponíveis?`;

  return `https://wa.me/5511978518084?text=${encodeURIComponent(mensagem)}`;
};


export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__grid" />
      <div className="hero__spotlight" />
      <div className="hero__watermark" aria-hidden="true">APEX</div>

      <div className="vitrine-container hero__layout">
        <div className="hero__content">
          <div className="hero__eyebrow hero-animate" style={{ '--d': '80ms' }}>
            <span className="live-dot" /> Jiu-Jitsu <i /> Muay Thai <i /> Jandira
          </div>
          <h1 className="hero__title">
            <span className="hero-animate" style={{ '--d': '150ms' }}>DISCIPLINA</span>
            <span className="hero-animate hero__title-outline" style={{ '--d': '240ms' }}>FORJA</span>
            <span className="hero-animate" style={{ '--d': '330ms' }}>SEU ÁPICE.</span>
          </h1>
          <p className="hero__copy hero-animate" style={{ '--d': '430ms' }}>
            Treino para crianças e adultos com uma proposta que vai além da técnica: movimento,
            confiança, disciplina e evolução dentro e fora do tatame.
          </p>
          <div className="hero__actions hero-animate" style={{ '--d': '520ms' }}>
            <MagneticLink href={gerarLinkWhatsApp()} target="_blank" className="button button--light">
              Agendar aula gratuita
            </MagneticLink>
            <a className="text-link" href="#modalidades">Explorar modalidades <Icon name="arrow" size={17} /></a>
          </div>
        </div>

        <div className="hero__visual hero-animate" style={{ '--d': '280ms' }} aria-label="Identidade Apex Dojo Hub">
          <div className="orbit orbit--one" />
          <div className="orbit orbit--two" />
          <div className="hero-card">
            <div className="hero-card__noise" />
            <div className="hero-card__top">
              <span>APEX DOJO HUB</span>
              <span>EST. JANDIRA</span>
            </div>
            <div className="hero-card__logo">
              <img src={logo} alt="Logo Apex Dojo Hub" />
            </div>
            <div className="hero-card__bottom">
              <span>JIU-JITSU</span>
              <span className="hero-card__slash">/</span>
              <span>MUAY THAI</span>
            </div>
          </div>
          <div className="floating-tag floating-tag--one">DISCIPLINA · RESPEITO</div>
          <div className="floating-tag floating-tag--two">MENTE · CORPO · TÉCNICA</div>
        </div>
      </div>

      <a href="#modalidades" className="scroll-cue" aria-label="Rolar para modalidades">
        <span>Scroll</span><i />
      </a>
    </section>
  );
}
