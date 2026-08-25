import { useEffect, useState } from 'react';
import  logo from '../../../assets/apex-logo.webp';
import Icon from './Icon';
import MagneticLink from './MagneticLink';

const links = [
  ['Início', '#inicio'],
  ['Modalidades', '#modalidades'],
  ['A Apex', '#apex'],
  ['Avaliações', '#avaliacoes'],
  ['Contato', '#contato'],
  // ['Acesso', '/login'],
];


const gerarLinkWhatsApp = (discipline) => {
  const hoje = new Date();
  const horario = hoje.getHours();
  const saudacao = horario < 12 ? 'Bom dia' : horario < 18 ? 'Boa tarde' : 'Boa noite';
  const disciplinaNome = discipline ? discipline.title : 'aula';
  const mensagem = `Olá, ${saudacao}! Gostaria de agendar uma ${disciplinaNome} cortesia. Poderia me informar os horários disponíveis?`;

  return `https://wa.me/5511978518084?text=${encodeURIComponent(mensagem)}`;
};


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const desktopQuery = window.matchMedia('(min-width: 1081px)');
    const onDesktop = (event) => {
      if (event.matches) setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    desktopQuery.addEventListener?.('change', onDesktop);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
      desktopQuery.removeEventListener?.('change', onDesktop);
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#inicio" className="brand" aria-label="Apex Dojo Hub - Início" onClick={() => setOpen(false)}>
        <span className="brand__mark"><img src={logo} alt="" /></span>
        <span className="brand__name">APEX <b>DOJO HUB</b></span>
      </a>

      <nav className="navbar__desktop" aria-label="Navegação principal">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <div className="navbar__actions">
        <MagneticLink className="navbar__cta" href={gerarLinkWhatsApp()} target="_blank">
          Aula gratuita
        </MagneticLink>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
          <Icon name={open ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      <div id="mobile-navigation" className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu__inner">
          {links.map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{ '--i': index }}>
              <span>0{index + 1}</span>{label}<Icon name="arrowUpRight" />
            </a>
          ))}
          <MagneticLink href="https://wa.me/5511978518084" target="_blank" className="mobile-menu__cta">
            Agendar aula cortesia
          </MagneticLink>
        </div>
      </div>
    </header>
  );
}
