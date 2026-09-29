export default function Footer() {
  return (
    <footer className="store-footer" id="contato">
      <div className="store-footer-grid">
        <div>
          <span className="footer-kicker">Vamos construir algo útil.</span>
          <h2>Software bom deve desaparecer dentro do processo.</h2>
        </div>
        <div className="footer-actions">
          <a className="shimmer-cta" href="mailto:gstvgms8@gmail.com"><span>gstvgms8@gmail.com</span></a>
          <a href="https://www.linkedin.com/in/gustavo-vieira-237150166?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/gstvgms8-lang" target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
      <div className="store-footer-bottom">
        <span>© {new Date().getFullYear()} Gustavo Vieira</span>
        <span>Projetado e desenvolvido como catálogo vivo de produtos digitais.</span>
      </div>
    </footer>
  );
}
