import Link from 'next/link';

export default function ProjectCard({ project }) {
  return (
    <Link className="project-card" href={`/projetos/${project.slug}`}>
      <div>
        <div className="project-icon">{project.icon}</div>
        <span className="eyebrow">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.headline}</p>
      </div>
      <div className="tags">
        {project.tech.slice(0, 4).map((tech) => <span className="tag" key={tech}>{tech}</span>)}
      </div>
    </Link>
  );
}
