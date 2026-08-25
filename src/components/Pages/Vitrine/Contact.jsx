import Reveal from './Reveal';
import MagneticLink from './MagneticLink';
import Icon from './Icon';

const gerarLinkWhatsApp = () => {
  const hoje = new Date();
  const horario = hoje.getHours();

  const saudacao = horario < 12 ? 'Bom dia' : horario < 18 ? 'Boa tarde' : 'Boa noite';

  // Monta a mensagem completa com as quebras de linha corretas
  const mensagem = `Olá, ${saudacao}! Gostaria de agendar uma aula cortesia. Poderia me informar os horários disponíveis?`;

  // Limpa o número de telefone (remove parênteses, traços e espaços)
  // CORREÇÃO: Removido o '$' antes da interrogação
  return `https://wa.me/5511978518084?text=${encodeURIComponent(mensagem)}`;
};


export default function Contact() {
  return (
    <section className="contact" id="contato">
      <div className="contact__noise" />
      <div className="vitrine-container contact__inner">
        <Reveal className="contact__copy">
          <span className="eyebrow eyebrow--dark"><i /> Seu próximo passo</span>
          <h2>O ápice não é um lugar.<br /><span>É uma direção.</span></h2>
          <p>Agende uma aula cortesia, conheça o espaço e descubra qual modalidade combina com a sua jornada.</p>
          <MagneticLink href={gerarLinkWhatsApp()} target="_blank" className="button button--dark" icon="arrowUpRight">
            Falar no WhatsApp
          </MagneticLink>
        </Reveal>

        <Reveal className="contact__card" delay={120}>
          <div className="contact__card-top">
            <span>APEX DOJO HUB</span><span>JANDIRA · SP</span>
          </div>
          <div className="contact__address">
            <Icon name="map" size={26} />
            <div><strong>R. Felipe Camarão, 232</strong><span>Vila Anita Costa · Jandira, SP</span></div>
          </div>
          <div className="contact__links">
            <a href="https://www.google.com/maps/search/?api=1&query=R.%20Felipe%20Camar%C3%A3o%2C%20232%20-%20Vila%20Anita%20Costa%2C%20Jandira" target="_blank" rel="noreferrer">Abrir no mapa <Icon name="arrowUpRight" /></a>
            <a href="https://www.instagram.com/apexdojohub/" target="_blank" rel="noreferrer">@apexdojohub <Icon name="instagram" /></a>
          </div>
          <div className="contact__rings" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}
