import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import DemoViewer from '../../../components/DemoViewer';
import MotionCanvas from '../../../components/MotionCanvas';
import Reveal from '../../../components/Reveal';
import GlowSurface from '../../../components/GlowSurface';
import { getProject, projects } from '../../../data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.headline,
    openGraph: {
      title: `${project.title} | Gustavo Vieira`,
      description: project.headline
    }
  };
}

export default function ProjectPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="product-detail-page">
        <section className="product-detail-hero">
          <div className="detail-bg"><MotionCanvas variant={project.motion} /></div>
          <div className="section-wrap detail-hero-grid">
            <Reveal variant="clip-reveal" className="detail-copy">
              <Link href="/#catalogo" className="back-link">← catálogo</Link>
              <div className="detail-meta-line"><span>{project.sku}</span><span>{project.category}</span><span>{project.platform}</span></div>
              <h1>{project.title}</h1>
              <p className="detail-lead">{project.headline}</p>
              <div className="hero-cta-row">
                <Link className="shimmer-cta" href={project.demoPath}><span>Abrir demonstração</span></Link>
                <a className="text-link" href="#case">Ver estudo do produto ↓</a>
              </div>
            </Reveal>

            <GlowSurface className="detail-device-card">
              <div className="detail-device-stage">
                <iframe src={project.demoEmbedPath} title={project.title} loading="eager" tabIndex="-1" />
              </div>
              <div className="detail-device-caption">
                <span>preview ao vivo</span><strong>{project.platform}</strong>
              </div>
            </GlowSurface>
          </div>
        </section>

        <section className="detail-metrics">
          <div className="section-wrap metrics-grid">
            {project.highlights.map((item, index) => (
              <Reveal key={item.label} delay={index * 80} className="metric-tile">
                <strong>{item.value}</strong><span>{item.label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="case-section" id="case">
          <div className="section-wrap case-grid">
            <Reveal className="case-block">
              <span className="section-index">problema</span>
              <h2>O que precisava ser resolvido.</h2>
              <p>{project.problem}</p>
            </Reveal>
            <Reveal className="case-block" delay={100}>
              <span className="section-index">solução</span>
              <h2>Como o produto responde.</h2>
              <p>{project.solution}</p>
            </Reveal>
          </div>
        </section>

        <section className="features-section">
          <div className="section-wrap">
            <Reveal className="section-heading">
              <div><span className="section-index">recursos</span><h2>O que existe dentro do produto.</h2></div>
            </Reveal>
            <div className="feature-commerce-grid">
              {project.features.map((feature, index) => (
                <Reveal key={feature} className="feature-commerce-card" variant="blur-scale" delay={index * 65}>
                  <span>{String(index + 1).padStart(2,'0')}</span><strong>{feature}</strong>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="tech-section">
          <div className="section-wrap tech-layout">
            <Reveal>
              <span className="section-index">ficha técnica</span>
              <h2>Stack e plataforma.</h2>
            </Reveal>
            <div className="tech-table">
              {project.tech.map((tech) => <div key={tech}><span>{tech}</span><i></i></div>)}
            </div>
          </div>
        </section>

        <section className="embedded-demo-section">
          <div className="section-wrap">
            <Reveal className="section-heading">
              <div><span className="section-index">demo ao vivo</span><h2>Use o produto, não apenas olhe para ele.</h2></div>
              <p>Dados demonstrativos e navegação segura dentro do próprio portfólio.</p>
            </Reveal>
            <DemoViewer project={project} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
