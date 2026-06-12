import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getProject, projects } from '../../../data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function DemoPage({ params }) {
  const project = getProject(params.slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="container page-hero"><h1>Demo não encontrada.</h1></main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="container">
            <span className="badge">Demonstração Web</span>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <div className="hero-actions">
              <Link className="btn" href={`/projetos/${project.slug}`}>Voltar ao projeto</Link>
            </div>
          </div>
        </section>
        <section>
          <div className="container demo-frame">
            <div className="demo-placeholder">
              <div>
                <div className="project-icon">{project.icon}</div>
                <h2>Área reservada para Flutter Web</h2>
                <p>
                  Depois que você gerar o build web do app Flutter, coloque os arquivos dentro de
                  <strong> /site/public/demos/{project.slug}</strong> e troque este placeholder por um iframe ou link direto.
                </p>
                <div className="tags">
                  {project.tech.map((tech) => <span className="tag" key={tech}>{tech}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
