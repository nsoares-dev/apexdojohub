import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const reviews = [
  { name: 'Ryan Santos', discipline: 'Jiu-Jitsu', text: 'Uma academia muito acolhedora, com excelentes professores, que são precisos no que falam, ajudam os alunos sempre que precisam, além de serem engraçados, deixando o ambiente de treino confortável e feliz. A academia tbm conta com uma baita estrutura, com um tatame incrível, confortável e limpo e outras estruturas que dispensam apresentações 🙏🏻', initial: 'RS' },
  { name: 'Míriam Nascimento', discipline: 'Jiu-Jitsu Kids', text: 'Aulas de jiu-jitsu com professores experientes e super dedicados! Minha filha não quer perder nenhum dia de aula, é apaixonada!!! Espaço acolhedor! Obrigada Sensei Herbert!!!', initial: 'MN' },
  { name: 'Luciana Verago', discipline: 'Muay Thai', text: 'Treino Muay Thai nessa academia em Jandira e só tenho elogios! Os professores são experientes, atenciosos e sabem adaptar os treinos tanto pra quem está começando quanto pra quem já compete. É o lugar ideal pra quem busca Muay Thai em Jandira para iniciantes e competidores, com um ambiente acolhedor e motivador. Além disso, a estrutura é excelente, com tudo que você espera de uma academia de artes marciais completa em Jandira. Super recomendo!', initial: 'LV' },
];

export default function Testimonials() {
  return (
    <section className="section testimonials" id="avaliacoes">
      <div className="vitrine-container">
        <SectionTitle
          eyebrow="Avaliações públicas"
          title={<>Quem vive o treino<br/><span>sente a diferença.</span></>}
          text="Resumos de avaliações públicas exibidas pela própria Apex em seus canais, destacando experiências reais de alunos e famílias."
        />
        <div className="testimonial-grid">
          {reviews.map((review, index) => (
            <Reveal className="testimonial-card" key={review.name} delay={index * 90}>
              <div className="testimonial-card__quote">“</div>
              <p>{review.text}</p>
              <div className="testimonial-card__author">
                <span className="testimonial-card__avatar">{review.initial}</span>
                <div><strong>{review.name}</strong><span>{review.discipline}</span></div>
              </div>
              <div className="testimonial-card__stars" aria-label="5 estrelas">★★★★★</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
