import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import DemoViewer from '../../../components/DemoViewer';
import MotionCanvas from '../../../components/MotionCanvas';
import Reveal from '../../../components/Reveal';
import { getProject, projects } from '../../../data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  return project ? {
    title: `Demo · ${project.title}`,
    description: `Experimente a demonstração navegável de ${project.title}.`
  } : {};
}

export default function DemoPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="demo-page-v3">
        <section className="demo-showcase-head">
          <div className="demo-showcase-ambient" aria-hidden="true">
            <MotionCanvas variant={project.motion || 'floating-lines'} />
          </div>
          <div className="section-wrap demo-showcase-head-grid">
            <Reveal variant="clip-reveal" className="demo-title-block">
              <Link href={`/projetos/${project.slug}`} className="back-link">← produto</Link>
              <span className="section-index">{project.sku} / live showroom</span>
              <h1>Experimente<br/><em>{project.title}.</em></h1>
              <p>{project.headline}</p>
            </Reveal>

            <Reveal className="demo-intro-panel" variant="blur-scale" delay={100}>
              <div className="demo-intro-status">
                <span className="live-dot"></span>
                <strong>Demo disponível</strong>
              </div>
              <div className="demo-intro-row">
                <span>Categoria</span>
                <strong>{project.category}</strong>
              </div>
              <div className="demo-intro-row">
                <span>Plataforma</span>
                <strong>{project.platform}</strong>
              </div>
              <div className="demo-intro-row">
                <span>Ano</span>
                <strong>{project.year}</strong>
              </div>
              <div className="demo-intro-tech">
                {project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="demo-showcase-stage">
          <div className="section-wrap">
            <Reveal variant="fade-rise">
              <DemoViewer project={project} />
            </Reveal>
          </div>
        </section>

        <section className="demo-next-step">
          <div className="section-wrap demo-next-step-grid">
            <Reveal>
              <span className="section-index">depois da demo</span>
              <h2>Quer entender como isso foi construído?</h2>
            </Reveal>
            <Reveal delay={100} className="demo-next-actions">
              <Link href={`/projetos/${project.slug}`} className="shimmer-cta"><span>Ver estudo do produto</span></Link>
              <Link href="/#catalogo" className="text-link">Explorar outros projetos →</Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
