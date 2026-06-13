import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="logo">
          <span className="logo-mark">GV</span>
          <span>Gustavo Vieira</span>
        </Link>
        <nav className="nav-links">
          <Link href="/#projetos">Projetos</Link>
          <Link href="/#processo">Processo</Link>
          <Link href="/#tecnologias">Tecnologias</Link>
          <Link href="/#contato">Contato</Link>
        </nav>
        <a className="btn btn-primary" href="mailto:gstvgms8@gmail.com">E-mail</a>
      </div>
    </header>
  );
}
