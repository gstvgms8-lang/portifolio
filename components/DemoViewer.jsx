'use client';

import { Maximize2, Monitor, Smartphone } from 'lucide-react';
import { useRef, useState } from 'react';

export default function DemoViewer({ project }) {
  const availableViews = project.demoViews || (project.demoDefaultView === 'desktop'
    ? ['desktop']
    : ['mobile', 'desktop']);
  const [viewMode, setViewMode] = useState(availableViews[0]);
  const stageRef = useRef(null);
  const singleViewIcon = availableViews[0] === 'mobile'
    ? <Smartphone size={18} aria-hidden="true" />
    : <Monitor size={18} aria-hidden="true" />;
  const singleViewLabel = availableViews[0] === 'mobile'
    ? 'Visualização mobile'
    : 'Visualização desktop';

  async function enterFullscreen() {
    if (!stageRef.current || !stageRef.current.requestFullscreen) {
      return;
    }

    await stageRef.current.requestFullscreen();
  }

  if (!project.demoEmbedPath) {
    return (
      <div className="demo-placeholder">
        <div>
          <div className="project-icon">{project.icon}</div>
          <h2>Área reservada para Flutter Web</h2>
          <p>
            Depois que você gerar o build web do app Flutter, coloque os arquivos dentro de
            <strong> /site/public/demos/{project.slug}</strong> e troque este placeholder por um iframe ou link direto.
          </p>
          <div className="tags">
            {project.tech.map((tech) => <span className="tag" key={tech}>{tech}</span>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {availableViews.length > 1 ? (
        <div className="demo-toolbar" aria-label="Opções de visualização da demonstração">
          <button
            className={`demo-toggle ${viewMode === 'mobile' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setViewMode('mobile')}
          >
            <Smartphone size={18} aria-hidden="true" />
            Visualizar app mobile
          </button>
          <button
            className={`demo-toggle ${viewMode === 'desktop' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setViewMode('desktop')}
          >
            <Monitor size={18} aria-hidden="true" />
            Visualizar versão site desktop
          </button>
          <button className="demo-link" type="button" onClick={enterFullscreen}>
            <Maximize2 size={18} aria-hidden="true" />
            Tela cheia
          </button>
        </div>
      ) : (
        <div className="demo-toolbar" aria-label="Visualização da demonstração">
          <span className="demo-toggle is-active">
            {singleViewIcon}
            {singleViewLabel}
          </span>
          <button className="demo-link" type="button" onClick={enterFullscreen}>
            <Maximize2 size={18} aria-hidden="true" />
            Tela cheia
          </button>
        </div>
      )}

      <div ref={stageRef} className={`device-stage ${viewMode === 'mobile' ? 'is-mobile' : 'is-desktop'}`}>
        {viewMode === 'mobile' ? (
          <div className="phone-shell">
            <div className="phone-notch" />
            <iframe
              className="demo-iframe phone-iframe"
              src={project.demoEmbedPath}
              title={`${project.title} - visualização mobile`}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="desktop-shell">
            <div className="monitor-bezel">
              <iframe
                className="demo-iframe desktop-iframe"
                src={project.demoEmbedPath}
                title={`${project.title} - visualização desktop`}
                loading="lazy"
              />
            </div>
            <div className="monitor-stand" />
          </div>
        )}
      </div>
    </>
  );
}
