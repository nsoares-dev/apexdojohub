import { useState } from 'react';
import Reveal from './Reveal';
import Icon from './Icon';

const faqs = [
  ['Nunca pratiquei arte marcial. Posso começar?', 'Sim. Entre em contato e a equipe indica a melhor forma de começar de acordo com seu perfil e disponibilidade.'],
  ['A Apex tem aulas para crianças?', 'Sim. Temos aulas de Jiu-Jitsu e Muay Thai para crianças e adultos.'],
  ['A primeira aula é gratuita?', 'Sim. Temos uma aula cortesia gratuita. O agendamento pode ser feito diretamente pelo WhatsApp.'],
  ['Quais são as modalidades?', 'Jiu-Jitsu e Muay Thai. Para saber dias, horários e turmas disponíveis, confirme diretamente com a equipe.'],
];

export default function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <section className="section faq">
      <div className="vitrine-container faq__layout">
        <Reveal className="faq__title">
          <span className="eyebrow"><i /> Dúvidas rápidas</span>
          <h2>Antes de pisar<br/>no <span>tatame.</span></h2>
          <p>Algumas respostas rápidas para você chegar à primeira aula com mais tranquilidade.</p>
        </Reveal>
        <div className="faq__items">
          {faqs.map(([question, answer], index) => (
            <Reveal key={question} delay={index * 50} className={`faq-item ${active === index ? 'faq-item--active' : ''}`}>
              <button onClick={() => setActive(active === index ? -1 : index)} aria-expanded={active === index}>
                <span>0{index + 1}</span><strong>{question}</strong><Icon name="chevron" />
              </button>
              <div className="faq-item__answer"><div><p>{answer}</p></div></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
