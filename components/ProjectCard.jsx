import Link from 'next/link';

export default function ProjectCard({ project }) {
  const cardContent = (
    <>
      <div>
        <div className="project-icon">{project.icon}</div>
        <span className="eyebrow">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.headline}</p>
      </div>
      <div className="tags">
        {project.tech.slice(0, 4).map((tech) => <span className="tag" key={tech}>{tech}</span>)}
      </div>
    </>
  );

  if (project.status === 'development') {
    return (
      <div className="project-card project-card-disabled" aria-disabled="true">
        {cardContent}
        <div className="project-disabled-cover">
          <span>{project.statusLabel}</span>
          <small>Em breve disponível para visualização</small>
        </div>
      </div>
    );
  }

  return (
    <Link className="project-card" href={`/projetos/${project.slug}`}>
      {cardContent}
    </Link>
  );
}
