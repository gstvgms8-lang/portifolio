'use client';

import Link from 'next/link';
import MotionCanvas from './MotionCanvas';
import GlowSurface from './GlowSurface';

export default function HeroShowcase({ project }) {
  return (
    <section className="commerce-hero">
      <div className="hero-aurora" aria-hidden="true"><MotionCanvas variant="liquid" /></div>
      <div className="hero-pillar" aria-hidden="true"></div>
      <div className="hero-grid-store">
        <div className="hero-copy-store">
          <div className="hero-kicker"><span className="live-dot"></span> produtos digitais em demonstração</div>
          <h1 className="clip-title">
            <span>Software</span>
            <span>feito para</span>
            <span>trabalho real.</span>
          </h1>
          <p>Uma vitrine de sistemas que eu projetei e desenvolvi para operações, estoque, atendimento e processos empresariais.</p>
          <div className="hero-cta-row">
            <a className="shimmer-cta" href="#catalogo"><span>Explorar catálogo</span></a>
            <Link className="text-link" href={project.demoPath}>Abrir uma demo <span>↗</span></Link>
          </div>
          <div className="hero-proof">
            <div><strong>04</strong><span>produtos navegáveis</span></div>
            <div><strong>100%</strong><span>dados demonstrativos</span></div>
            <div><strong>Live</strong><span>demos no navegador</span></div>
          </div>
        </div>

        <GlowSurface className="hero-product-card">
          <div className="hero-card-head">
            <span>{project.sku}</span>
            <span className="stock-pill">demo disponível</span>
          </div>
          <div className="hero-product-media">
            <MotionCanvas variant="floating-lines" />
            <div className="glass-object" aria-hidden="true">
              <div className="glass-object-inner"></div>
            </div>
            <div className="hero-product-device">
              <iframe src={project.demoEmbedPath} title={project.title} loading="eager" tabIndex="-1" />
            </div>
          </div>
          <div className="hero-product-info">
            <div>
              <span>{project.category} · {project.platform}</span>
              <h2>{project.title}</h2>
              <p>{project.headline}</p>
            </div>
            <Link href={project.demoPath} className="round-arrow" aria-label={`Abrir demo de ${project.title}`}>↗</Link>
          </div>
        </GlowSurface>
      </div>
    </section>
  );
}
