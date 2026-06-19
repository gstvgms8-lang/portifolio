import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import VisitorCounter from '../components/VisitorCounter';
import { projects } from '../data/projects';

export default function HomePage() {
  const availableDemos = projects.filter((project) => project.demoEmbedPath);
  const developmentProjects = projects.filter((project) => project.status === 'development');

  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="badge">⚡ Apps, sites, sistemas desktop e soluções sob medida</span>
              <h1>Sistemas sob medida para <span className="gradient-text">operações reais.</span></h1>
              <p>
                Portfólio profissional em formato de vitrine comercial, apresentando projetos mobile,
                web, desktop, integrações, automações e demonstrações funcionais com dados fictícios.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#projetos">Ver projetos</a>
                <a className="btn" href="mailto:gstvgms8@gmail.com">Enviar e-mail</a>
              </div>
              <VisitorCounter />
            </div>
            <div className="mockup demo-showcase">
              <div className="mockup-top"><span className="dot"/><span className="dot"/><span className="dot"/></div>
              <div className="demo-showcase-head">
                <span className="eyebrow">Demos disponíveis</span>
                <strong>{availableDemos.length} projetos para conferir</strong>
              </div>
              <div className="demo-list">
                {availableDemos.map((project, index) => (
                  <a className="demo-list-item" href={project.demoPath} key={project.slug}>
                    <span className="demo-list-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="demo-list-icon">{project.icon}</span>
                    <span>
                      <strong>{project.title}</strong>
                      <small>{project.category}</small>
                    </span>
                    <b>Abrir demo</b>
                  </a>
                ))}
              </div>
              <div className="demo-development-note">
                <span>Em desenvolvimento</span>
                <strong>{developmentProjects.map((project) => project.title).join(', ')}</strong>
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
              {['Node.js', 'Next.js', 'React', 'Flutter', 'Dart', 'FastAPI', 'Python', 'Supabase', 'PostgreSQL', 'SQL Server', 'APIs REST', 'Vercel', 'OpenAI GPT', 'Codex', 'ChatGPT', 'Automação com IA'].map((item) => <span className="tag" key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section id="contato">
          <div className="container panel">
            <span className="eyebrow">Contato</span>
            <h2>Tem uma ideia de sistema?</h2>
            <p>Este portfólio foi criado para apresentar habilidades práticas em desenvolvimento de sistemas empresariais, apps mobile, sites, integrações e soluções personalizadas.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="mailto:gstvgms8@gmail.com">gstvgms8@gmail.com</a>
              <a className="btn" href="https://www.linkedin.com/in/gustavo-vieira-237150166?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
