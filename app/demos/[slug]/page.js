import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import DemoViewer from '../../../components/DemoViewer';
import { getProject, projects } from '../../../data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }) {
  const project = getProject(params.slug);
  return project ? { title: `Demo · ${project.title}`, description: `Demonstração navegável de ${project.title}.` } : {};
}

export default function DemoPage({ params }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="demo-page-v2">
        <section className="demo-page-head">
          <div className="section-wrap demo-page-head-inner">
            <div>
              <span className="section-index">{project.sku} / demonstração</span>
              <h1>{project.title}</h1>
            </div>
            <Link href={`/projetos/${project.slug}`} className="text-link">← Voltar ao produto</Link>
          </div>
        </section>
        <section className="demo-page-stage">
          <div className="section-wrap">
            <DemoViewer project={project} />
          </div>
        </section>
      </main>
    </>
  );
}
