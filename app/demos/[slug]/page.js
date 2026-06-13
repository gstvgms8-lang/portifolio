import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import DemoViewer from '../../../components/DemoViewer';
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
            <DemoViewer project={project} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
