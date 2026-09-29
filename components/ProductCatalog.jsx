'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import GlowSurface from './GlowSurface';
import MotionCanvas from './MotionCanvas';
import Reveal from './Reveal';
import { collections } from '../data/projects';

export default function ProductCatalog({ projects }) {
  const [filter, setFilter] = useState('todos');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    return projects.filter((project) => {
      const categoryOk = filter === 'todos' || project.category === filter;
      const text = `${project.title} ${project.category} ${project.platform} ${project.tech.join(' ')}`.toLowerCase();
      return categoryOk && text.includes(query.trim().toLowerCase());
    });
  }, [filter, query, projects]);

  return (
    <>
      <div className="catalog-controls">
        <div className="catalog-tabs" role="tablist" aria-label="Filtrar por coleção">
          {collections.map((collection) => (
            <button
              key={collection.id}
              className={filter === collection.id ? 'is-active' : ''}
              onClick={() => setFilter(collection.id)}
              type="button"
            >
              {collection.label}
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <span>⌕</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produto ou tecnologia" />
        </label>
      </div>

      <div className="product-grid-store">
        {visible.map((project, index) => (
          <Reveal key={project.slug} variant={index % 2 ? 'blur-scale' : 'fade-rise'} delay={index * 70}>
            <GlowSurface className="product-card-store">
              <Link href={`/projetos/${project.slug}`} className="product-card-link" aria-label={`Ver detalhes de ${project.title}`}>
                <div className={`product-media accent-${project.accent}`}>
                  <MotionCanvas variant={project.motion} interactive={project.motion === 'droplets'} />
                  <div className="product-media-ui">
                    <span className="product-code">{project.sku}</span>
                    <span className="product-year">{project.year}</span>
                    <div className="product-preview">
                      <iframe src={project.demoEmbedPath} title="" loading="lazy" tabIndex="-1" />
                    </div>
                  </div>
                </div>
                <div className="product-card-body">
                  <div className="product-meta"><span>{project.category}</span><span>{project.platform}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.headline}</p>
                  <div className="product-card-footer">
                    <div className="mini-tech">{project.tech.slice(0,3).map((item) => <span key={item}>{item}</span>)}</div>
                    <span className="product-open">Ver produto ↗</span>
                  </div>
                </div>
              </Link>
            </GlowSurface>
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && <div className="catalog-empty">Nenhum produto encontrado para esse filtro.</div>}
    </>
  );
}
