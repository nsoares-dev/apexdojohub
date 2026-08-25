import logo from '../../../assets/apex-logo.webp';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="vitrine-container footer__top">
        <a className="footer__brand" href="#inicio"><img src={logo} alt="" /><span>APEX<br /><b>DOJO HUB</b></span></a>
        <div className="footer__nav">
          <div>
            <span>Navegação</span>
            <a href="#modalidades">Modalidades</a>
            <a href="#apex">A Apex</a><a href="#avaliacoes">Avaliações</a>
          </div>
          <div>
            <span>Contato</span>
            <a href="https://wa.me/5511978518084" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://www.instagram.com/apexdojohub/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://linktr.ee/apexdojohub" target="_blank" rel="noreferrer">Linktree</a>
            <a href="/login">Acesso administrativo</a>
          </div>
        </div>
        <a className="footer__back" href="#inicio" aria-label="Voltar ao topo">
          <Icon name="arrowUpRight" size={23} />
        </a>
      </div>
      <div className="vitrine-container footer__bottom"><span>© {new Date().getFullYear()} Apex Dojo Hub</span><span>Jiu-Jitsu · Muay Thai · Jandira</span></div>
    </footer>
  );
}
