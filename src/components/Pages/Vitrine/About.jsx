import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import Icon from './Icon';

const features = [
  ['01', 'Para todas as fases', 'Turmas e uma proposta de treino pensadas para crianças e adultos.'],
  ['02', 'Técnica com propósito', 'Aprendizado marcial conectado a disciplina, confiança e qualidade de vida.'],
  ['03', 'Ambiente acolhedor', 'Um espaço em que respeito e evolução caminham juntos, treino após treino.'],
];

export default function About() {
  return (
    <section className="section about" id="apex">
      <div className="vitrine-container">
        <div className="about__head">
          <SectionTitle eyebrow="A experiência Apex" title={<>Mais que treino.<br/><span>Um lugar para evoluir.</span></>} />
          <Reveal className="about__intro" delay={100}>
            <p>A Apex Dojo Hub conecta arte marcial, comunidade e desenvolvimento pessoal em uma experiência moderna e acolhedora.</p>
            <a href="#contato" className="text-link">Conhecer o dojo <Icon name="arrow" size={17} /></a>
          </Reveal>
        </div>

        <div className="bento">
          <Reveal className="bento__main">
            <div className="bento__main-content">
              <span className="eyebrow eyebrow--dark"><i /> Nossa filosofia</span>
              <h3>O tatame ensina coisas que você leva para a vida.</h3>
              <p>Consistência, respeito, autocontrole e coragem não aparecem num passe de mágica. Ainda bem. Elas são construídas treino após treino.</p>
            </div>
            <div className="bento__symbol" aria-hidden="true">
              <span> apex </span>
              <div className="bento__symbol-circle"><Icon name="spark" size={50} /></div>
            </div>
          </Reveal>

          <Reveal className="bento__stat" delay={70}>
            <span className="bento__stat-number">02</span>
            <strong>Modalidades</strong>
            <p>Jiu-Jitsu + Muay Thai</p>
          </Reveal>

          <Reveal className="bento__stat bento__stat--dark" delay={140}>
            <span className="bento__stat-number">01</span>
            <strong>Aula cortesia</strong>
            <p>Seu primeiro passo, por conta da casa.</p>
          </Reveal>

          <Reveal className="bento__wide" delay={120}>
            <div className="bento__wide-orbit" />
            <span>CRIANÇAS</span><i>+</i><span>ADULTOS</span>
          </Reveal>
        </div>

        <div className="feature-list">
          {features.map(([number, title, text], index) => (
            <Reveal className="feature-row" key={title} delay={index * 70}>
              <span className="feature-row__number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="feature-row__icon"><Icon name="arrowUpRight" /></span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
