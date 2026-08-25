import Reveal from './Reveal';
import SectionTitle from './SectionTitle';
import Icon from './Icon';

const disciplines = [
  {
    id: '01', code: 'JJ', title: 'Jiu-Jitsu', subtitle: 'A arte suave. Estratégia em movimento.',
    text: 'Desenvolva técnica, autocontrole, condicionamento e confiança em um treino que desafia corpo e mente.',
    tags: ['Técnica', 'Estratégia', 'Controle'], variant: 'jiu',
  },
  {
    id: '02', code: 'MT', title: 'Muay Thai', subtitle: 'Potência, ritmo e precisão.',
    text: 'Uma experiência intensa para evoluir condicionamento, coordenação, foco e defesa pessoal com constância.',
    tags: ['Foco', 'Condicionamento', 'Defesa'], variant: 'muay',
  },
];

const gerarLinkWhatsApp = (discipline) => {

  const disciplinaNome = discipline ? discipline.title : 'aula';
  const hoje = new Date();
  const horario = hoje.getHours();
  const saudacao = horario < 12 ? 'Bom dia' : horario < 18 ? 'Boa tarde' : 'Boa noite';
  const mensagem = `Olá, ${saudacao}! Gostaria de agendar uma aula de ${disciplinaNome} cortesia. Poderia me informar os horários disponíveis?`;

  return `https://wa.me/5511978518084?text=${encodeURIComponent(mensagem)}`;
};


export default function Disciplines() {
  return (
    <section className="section disciplines" id="modalidades">
      <div className="vitrine-container">
        <SectionTitle
          eyebrow="Modalidades"
          title={<>Escolha sua arte.<br/><span>Construa sua evolução.</span></>}
          text="Duas modalidades, diferentes caminhos e o mesmo propósito: fazer você sair de cada treino um pouco melhor do que entrou."
        />
        <div className="discipline-grid">
          {disciplines.map((item, index) => (
            <Reveal key={item.title} delay={index * 110} className={`discipline-card discipline-card--${item.variant}`}>
              <div className="discipline-card__art">
                <span className="discipline-card__index">{item.id}</span>
                <div className="discipline-card__code">{item.code}</div>
                <div className="discipline-card__rings" />
                <div className="discipline-card__cross">+</div>
              </div>
              <div className="discipline-card__body">
                <div>
                  <span className="discipline-card__kicker">APEX PROGRAM</span>
                  <h3>{item.title}</h3>
                  <strong>{item.subtitle}</strong>
                </div>
                <p>{item.text}</p>
                <div className="discipline-card__footer">
                  <div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <a href={gerarLinkWhatsApp(item)} target="_blank" rel="noreferrer" aria-label={`Conhecer ${item.title}`}>
                    <Icon name="arrowUpRight" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
