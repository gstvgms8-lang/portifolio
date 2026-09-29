'use client';

import {
  ExternalLink,
  Maximize2,
  Monitor,
  RotateCcw,
  Smartphone
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import MotionCanvas from './MotionCanvas';

export default function DemoViewer({ project }) {
  const availableViews = useMemo(
    () => project.demoViews || (project.demoDefaultView === 'desktop'
      ? ['desktop']
      : ['mobile', 'desktop']),
    [project.demoViews, project.demoDefaultView]
  );

  const [viewMode, setViewMode] = useState(availableViews[0]);
  const [frameKey, setFrameKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const stageRef = useRef(null);

  useEffect(() => {
    function onFullscreenChange() {
      setFullscreen(document.fullscreenElement === stageRef.current);
    }

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  async function enterFullscreen() {
    if (!stageRef.current?.requestFullscreen) return;
    await stageRef.current.requestFullscreen();
  }

  function restartDemo() {
    setLoading(true);
    setFrameKey((value) => value + 1);
  }

  function changeView(mode) {
    if (mode === viewMode) return;
    setLoading(true);
    setViewMode(mode);
  }

  if (!project.demoEmbedPath) {
    return (
      <div className="demo-empty-state">
        <span className="section-index">{project.sku} / demonstração</span>
        <h2>Demo ainda não publicada.</h2>
        <p>O produto já está catalogado, mas o build navegável ainda não foi anexado a esta vitrine.</p>
      </div>
    );
  }

  const mobile = viewMode === 'mobile';

  return (
    <div className="demo-showroom">
      <div className="demo-command-bar">
        <div className="demo-live-state">
          <i aria-hidden="true"></i>
          <div>
            <strong>Demo ao vivo</strong>
            <span>{project.sku} · ambiente demonstrativo</span>
          </div>
        </div>

        <div className="demo-command-actions">
          {availableViews.length > 1 && (
            <div className="demo-view-switch" role="group" aria-label="Escolher dispositivo">
              <button
                className={mobile ? 'is-active' : ''}
                type="button"
                onClick={() => changeView('mobile')}
                aria-pressed={mobile}
              >
                <Smartphone size={15} aria-hidden="true" />
                <span>Mobile</span>
              </button>
              <button
                className={!mobile ? 'is-active' : ''}
                type="button"
                onClick={() => changeView('desktop')}
                aria-pressed={!mobile}
              >
                <Monitor size={15} aria-hidden="true" />
                <span>Desktop</span>
              </button>
            </div>
          )}

          {availableViews.length === 1 && (
            <span className="demo-single-view">
              {mobile ? <Smartphone size={15} aria-hidden="true" /> : <Monitor size={15} aria-hidden="true" />}
              {mobile ? 'Mobile' : 'Desktop'}
            </span>
          )}

          <button className="demo-icon-action" type="button" onClick={restartDemo} title="Reiniciar demonstração">
            <RotateCcw size={15} aria-hidden="true" />
            <span>Reiniciar</span>
          </button>

          <a
            className="demo-icon-action"
            href={project.demoEmbedPath}
            target="_blank"
            rel="noreferrer"
            title="Abrir demo isolada"
          >
            <ExternalLink size={15} aria-hidden="true" />
            <span>Abrir</span>
          </a>

          <button className="demo-icon-action demo-fullscreen-action" type="button" onClick={enterFullscreen}>
            <Maximize2 size={15} aria-hidden="true" />
            <span>Tela cheia</span>
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={`demo-experience-stage ${mobile ? 'is-mobile' : 'is-desktop'} ${fullscreen ? 'is-fullscreen' : ''}`}
      >
        <div className="demo-stage-motion" aria-hidden="true">
          <MotionCanvas variant={project.motion || 'floating-lines'} />
        </div>
        <div className="demo-stage-grid" aria-hidden="true"></div>

        <div className="demo-device-zone">
          {mobile ? (
            <div className="premium-phone-shell">
              <div className="premium-phone-top">
                <span></span>
                <i></i>
              </div>
              <div className="premium-phone-screen">
                {loading && <DemoLoader label={project.shortTitle || project.title} />}
                <iframe
                  key={`${viewMode}-${frameKey}`}
                  className="demo-app-frame"
                  src={project.demoEmbedPath}
                  title={`${project.title} - visualização mobile`}
                  loading="eager"
                  onLoad={() => setLoading(false)}
                />
              </div>
              <div className="premium-phone-home" aria-hidden="true"></div>
            </div>
          ) : (
            <div className="premium-desktop-shell">
              <div className="browser-chrome">
                <div className="browser-dots"><i></i><i></i><i></i></div>
                <div className="browser-address">
                  <span className="browser-lock">●</span>
                  demo.gustavovieira.dev/{project.slug}
                </div>
                <span className="browser-menu">•••</span>
              </div>
              <div className="premium-desktop-screen">
                {loading && <DemoLoader label={project.shortTitle || project.title} />}
                <iframe
                  key={`${viewMode}-${frameKey}`}
                  className="demo-app-frame"
                  src={project.demoEmbedPath}
                  title={`${project.title} - visualização desktop`}
                  loading="eager"
                  onLoad={() => setLoading(false)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="demo-stage-meta" aria-hidden="true">
          <span>{mobile ? 'MOBILE VIEW' : 'DESKTOP VIEW'}</span>
          <span>{project.category.toUpperCase()}</span>
        </div>
      </div>

      <div className="demo-showroom-footer">
        <div>
          <span>Ambiente</span>
          <strong>Demonstrativo</strong>
        </div>
        <div>
          <span>Dados</span>
          <strong>Fictícios / seguros</strong>
        </div>
        <div>
          <span>Interface</span>
          <strong>{mobile ? 'Mobile' : 'Desktop'}</strong>
        </div>
        <p>Você pode navegar normalmente pela aplicação. Algumas integrações externas podem estar desabilitadas na versão pública.</p>
      </div>
    </div>
  );
}

function DemoLoader({ label }) {
  return (
    <div className="demo-loader">
      <div className="demo-loader-mark">GV</div>
      <div>
        <strong>Preparando {label}</strong>
        <span>carregando experiência interativa</span>
      </div>
      <i aria-hidden="true"></i>
    </div>
  );
}
