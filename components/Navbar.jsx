import Link from 'next/link';

const links = [
  ['/#catalogo', 'Projetos'],
  ['/#colecoes', 'Coleções'],
  ['/#processo', 'Processo'],
  ['/#contato', 'Contato']
];

export default function Navbar() {
  return (
    <header className="store-nav">
      <div className="store-nav-inner">
        <Link href="/" className="store-brand" aria-label="Gustavo Vieira, início">
          <span className="store-brand-mark">GV</span>
          <span className="store-brand-copy">
            <strong>Gustavo Vieira</strong>
            <small>software studio</small>
          </span>
        </Link>

        <nav className="store-nav-links" aria-label="Navegação principal">
          {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>

        <div className="store-nav-actions">
          <a className="nav-contact" href="mailto:gstvgms8@gmail.com">Falar comigo</a>
          <details className="mobile-nav">
            <summary aria-label="Abrir menu"><span></span><span></span></summary>
            <nav>
              {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
              <a href="mailto:gstvgms8@gmail.com">E-mail</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
