'use client';

import { useEffect, useRef, useState } from 'react';
import MotionCanvas from './MotionCanvas';
import Reveal from './Reveal';

const options = ['Flutter', 'Next.js', 'Python', 'APIs', 'Dados', 'Automação'];

export default function MotionShowcase() {
  const [active, setActive] = useState(0);
  const wheelRef = useRef(null);

  useEffect(() => {
    const node = wheelRef.current;
    if (!node) return;

    function onWheel(event) {
      event.preventDefault();
      setActive((current) => {
        const direction = event.deltaY > 0 ? 1 : -1;
        return (current + direction + options.length) % options.length;
      });
    }

    function onKeyDown(event) {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      setActive((current) => (current + direction + options.length) % options.length);
    }

    node.addEventListener('wheel', onWheel, { passive: false });
    node.addEventListener('keydown', onKeyDown);
    return () => {
      node.removeEventListener('wheel', onWheel);
      node.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <section className="motion-merch">
      <div className="aurora-field" aria-hidden="true"></div>
      <div className="light-pillar" aria-hidden="true"></div>
      <div className="section-wrap motion-merch-grid">
        <Reveal className="motion-merch-copy" variant="clip-reveal">
          <span className="section-index">coleção / engenharia visual</span>
          <h2>Movimento que explica, direciona e dá acabamento.</h2>
          <p>O portfólio usa uma biblioteca de microinterações e ambientes visuais adaptada para continuar leve, legível e navegável.</p>

          <div className="cloth-mark" aria-hidden="true">
            <div className="cloth-sheet">
              <strong>GV</strong>
              <span>product<br/>engineering</span>
            </div>
          </div>
        </Reveal>

        <div className="motion-merch-panel">
          <div className="particle-scroll-window">
            <MotionCanvas variant="floating-lines" />
            <div className="particle-field" aria-hidden="true">
              {Array.from({ length: 28 }).map((_, i) => <i key={i} style={{ '--i': i }} />)}
            </div>
            <div className="particle-copy">
              <span>PARTICLE / SCROLL</span>
              <strong>Explore a stack</strong>
              <small>use a roda, trackpad ou setas</small>
            </div>
          </div>

          <div className="option-wheel" ref={wheelRef} tabIndex="0" role="listbox" aria-label="Tecnologias em destaque">
            {options.map((option, index) => {
              const offset = index - active;
              const wrapped = offset > options.length / 2 ? offset - options.length : offset < -options.length / 2 ? offset + options.length : offset;
              const distance = Math.abs(wrapped);
              const visualStyle = {
                transform: `translateY(${wrapped * 58}px) translateZ(${-distance * 40}px) scale(${Math.max(.7, 1 - distance * .08)})`,
                opacity: Math.max(.28, 1 - distance * .18)
              };
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={index === active}
                  className={index === active ? 'is-active' : ''}
                  style={visualStyle}
                  onClick={() => setActive(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>{option}
                </button>
              );
            })}
            <div className="wheel-core" aria-hidden="true">
              <span>stack ativa</span>
              <strong>{options[active]}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
