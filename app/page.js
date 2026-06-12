import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="badge">⚡ Apps, sites, sistemas desktop e soluções sob medida</span>
              <h1>Desenvolvimento de <span className="gradient-text">sistemas reais</span> para problemas reais.</h1>
              <p>
                Portfólio profissional em formato de vitrine comercial, apresentando projetos mobile,
                web, desktop, integrações, automações e demonstrações funcionais com dados fictícios.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projetos">Ver projetos</a>
                <a className="btn" href="#contato">Falar sobre um sistema</a>
              </div>
            </div>
            <div className="mockup">
              <div className="mockup-top"><span className="dot"/><span className="dot"/><span className="dot"/></div>
              <div className="dashboard">
                <div className="dash-card">
                  <strong>Check Empilhadeira</strong>
                  <div className="dash-row"><span>Pendências abertas</span><b>07</b></div>
                  <div className="progress"><span style={{ width: '72%' }} /></div>
                </div>
                <div className="dash-card">
                  <strong>Gestor Fiscal</strong>
                  <div className="dash-row"><span>Notas processadas</span><b>1.248</b></div>
                  <div className="progress"><span style={{ width: '86%' }} /></div>
                </div>
                <div className="dash-card">
                  <strong>Delivery Restaurante</strong>
                  <div className="dash-row"><span>Pedidos do dia</span><b>42</b></div>
                  <div className="progress"><span style={{ width: '58%' }} /></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container stats">
            <div className="stat"><strong>Mobile</strong><span>Apps Android e demos web</span></div>
            <div className="stat"><strong>Web</strong><span>Sites, painéis e sistemas online</span></div>
            <div className="stat"><strong>Desktop</strong><span>Sistemas corporativos e fiscais</span></div>
            <div className="stat"><strong>APIs</strong><span>Integrações e automações</span></div>
          </div>
        </section>

        <section id="projetos">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Projetos em destaque</span>
                <h2>Uma vitrine de soluções.</h2>
              </div>
              <p>Cada projeto é apresentado como uma solução comercial, sem dados reais de empresas, usando informações fictícias e telas demonstrativas.</p>
            </div>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard project={project} key={project.slug} />)}
            </div>
          </div>
        </section>

        <section id="processo">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Como eu trabalho</span>
                <h2>Do problema ao sistema funcionando.</h2>
              </div>
            </div>
            <div className="timeline">
              <div className="timeline-item"><strong>01. Entendimento</strong><p>Mapeamento do processo, regras de negócio, usuários e dores principais.</p></div>
              <div className="timeline-item"><strong>02. Protótipo</strong><p>Criação das telas, fluxo de uso e dados fictícios para validação visual.</p></div>
              <div className="timeline-item"><strong>03. Desenvolvimento</strong><p>Construção do frontend, backend, banco de dados, integrações e regras do sistema.</p></div>
              <div className="timeline-item"><strong>04. Entrega</strong><p>Publicação, testes, ajustes finais e versão demonstrativa para apresentação.</p></div>
            </div>
          </div>
        </section>

        <section id="tecnologias">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow">Stack</span>
                <h2>Tecnologias usadas nos projetos.</h2>
              </div>
            </div>
            <div className="tags">
              {['Node.js', 'Next.js', 'React', 'Flutter', 'Dart', 'FastAPI', 'Python', 'Supabase', 'PostgreSQL', 'SQL Server', 'APIs REST', 'Vercel'].map((item) => <span className="tag" key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section id="contato">
          <div className="container panel">
            <span className="eyebrow">Contato</span>
            <h2>Tem uma ideia de sistema?</h2>
            <p>Este portfólio foi criado para apresentar habilidades práticas em desenvolvimento de sistemas empresariais, apps mobile, sites, integrações e soluções personalizadas.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
              <a className="btn" href="mailto:seuemail@exemplo.com">Enviar e-mail</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
