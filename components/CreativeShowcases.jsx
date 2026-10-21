import GlowSurface from './GlowSurface';
import Reveal from './Reveal';
import { showcases } from '../data/showcases';

export default function CreativeShowcases() {
  return (
    <section className="creative-showcases" id="vitrines" aria-labelledby="creative-showcases-title">
      <div className="section-wrap">
        <Reveal className="section-heading" variant="blur-scale">
          <div>
            <span className="section-index">02 / vitrines criativas</span>
            <h2 id="creative-showcases-title">Experiências que também contam histórias.</h2>
          </div>
          <p>Além de sistemas para negócios, crio vitrines digitais com identidade própria, movimento e experiências visuais.</p>
        </Reveal>

        <div className="creative-showcase-grid">
          {showcases.map((showcase, index) => (
            <Reveal key={showcase.id} variant={index % 2 ? 'blur-scale' : 'fade-rise'} delay={index * 90}>
              <GlowSurface className={`creative-showcase-card creative-showcase-card--${showcase.theme}`}>
                <div className={`creative-preview creative-preview--${showcase.theme}`} aria-hidden="true">
                  <div className="creative-preview-lines" />
                  <div className="creative-preview-orbit" />
                  <span className="creative-preview-overline">GV STUDIO / DIGITAL EXPERIENCE</span>
                  {showcase.theme === 'lyra' && (
                    <div className="creative-preview-book" aria-hidden="true">
                      <span className="creative-preview-book-crest">✧</span>
                      <span className="creative-preview-book-stem" />
                      <span className="creative-preview-book-branch creative-preview-book-branch--left" />
                      <span className="creative-preview-book-branch creative-preview-book-branch--right" />
                      <span className="creative-preview-book-rules" />
                    </div>
                  )}
                  <strong className="creative-preview-wordmark">{showcase.title}<span>.</span></strong>
                  <span className="creative-preview-caption">{showcase.subtitle}</span>
                  <span className="creative-preview-number">{showcase.number} / {String(showcases.length).padStart(2, '0')}</span>
                </div>

                <div className="creative-showcase-content">
                  <div className="creative-showcase-topline">
                    <span>{showcase.category}</span>
                    <span className={showcase.url ? 'creative-status creative-status--live' : 'creative-status'}>
                      <i aria-hidden="true" /> {showcase.status}
                    </span>
                  </div>
                  <h3>{showcase.headline}</h3>
                  <p>{showcase.description}</p>
                  <div className="creative-showcase-tags">
                    {showcase.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  {showcase.url ? (
                    <a className="creative-showcase-link" href={showcase.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${showcase.title} em uma nova aba`}>
                      Visitar projeto <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <div className="creative-showcase-soon" aria-label="O endereço deste projeto será disponibilizado após a publicação">
                      Link disponível após a publicação <span aria-hidden="true">↗</span>
                    </div>
                  )}
                </div>
              </GlowSurface>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
