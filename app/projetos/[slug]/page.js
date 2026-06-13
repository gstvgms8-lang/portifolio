import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getProject, projects } from '../../../data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  return { title: project ? `${project.title} | Gustavo Vieira` : 'Projeto | Gustavo Vieira' };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <main className="container page-hero"><h1>Projeto não encontrado.</h1></main>
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
            <span className="badge">{project.icon} {project.category}</span>
            <h1>{project.title}</h1>
            <p>{project.headline}</p>
            <div className="hero-actions">
              {project.status === 'development' ? (
                <span className="btn btn-disabled">{project.statusLabel}</span>
              ) : (
                <Link className="btn btn-primary" href={project.demoPath}>Abrir demonstração</Link>
              )}
              <Link className="btn" href="/#projetos">Voltar aos projetos</Link>
            </div>
          </div>
        </section>

        <section>
          <div className="container detail-grid">
            <div className="panel">
              <h3>Problema</h3>
              <p>{project.problem}</p>
              <h3>Solução</h3>
              <p>{project.solution}</p>
            </div>
            <div className="panel">
              <h3>Funcionalidades</h3>
              <ul className="feature-list">
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <h3>Tecnologias</h3>
              <div className="tags">
                {project.tech.map((tech) => <span className="tag" key={tech}>{tech}</span>)}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
