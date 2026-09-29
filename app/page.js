import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroShowcase from '../components/HeroShowcase';
import ProductCatalog from '../components/ProductCatalog';
import MotionCanvas from '../components/MotionCanvas';
import MotionShowcase from '../components/MotionShowcase';
import Reveal from '../components/Reveal';
import { projects } from '../data/projects';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroShowcase project={projects[0]} />

        <section className="signal-strip" aria-label="Capacidades">
          <div className="signal-strip-track">
            {['Mobile', 'Web', 'Desktop', 'APIs', 'Integrações', 'Automação', 'Dados', 'IA aplicada'].map((item) => (
              <span key={item}>{item}<i>•</i></span>
            ))}
          </div>
        </section>

        <section className="catalog-shell" id="catalogo">
          <div className="catalog-ambient" aria-hidden="true">
            <MotionCanvas variant="floating-lines" />
          </div>
          <div className="section-wrap">
            <Reveal className="section-heading" variant="blur-scale">
              <div>
                <span className="section-index">01 / catálogo</span>
                <h2>Produtos digitais que nasceram de problemas reais.</h2>
              </div>
              <p>Explore como uma vitrine: veja o contexto, a solução, a ficha técnica e abra a demonstração funcional.</p>
            </Reveal>
            <ProductCatalog projects={projects} />
          </div>
        </section>

        <MotionShowcase />

        <section className="interaction-story" id="colecoes">
          <div className="interaction-canvas" aria-hidden="true">
            <MotionCanvas variant="droplets" interactive />
          </div>
          <div className="section-wrap interaction-grid">
            <Reveal variant="clip-reveal" className="interaction-copy">
              <span className="section-index">02 / experiência</span>
              <h2>Interface não é maquiagem. É parte do produto.</h2>
              <p>Movimento, hierarquia e feedback visual entram quando ajudam a entender estado, ação e continuidade. Passe o cursor sobre o vidro para revelar a camada abaixo.</p>
            </Reveal>
            <div className="interaction-specs">
              <Reveal delay={80}><strong>Motion com propósito</strong><span>entradas, estados e respostas à ação</span></Reveal>
              <Reveal delay={140}><strong>Performance consciente</strong><span>efeitos pausam fora da viewport</span></Reveal>
              <Reveal delay={200}><strong>Acessibilidade</strong><span>fallback estático e reduced motion</span></Reveal>
            </div>
          </div>
        </section>

        <section className="process-section" id="processo">
          <div className="section-wrap">
            <Reveal className="section-heading" variant="fade-rise">
              <div>
                <span className="section-index">03 / processo</span>
                <h2>Da operação confusa ao software utilizável.</h2>
              </div>
              <p>O trabalho começa pelo processo e termina em uma ferramenta que alguém consegue usar de verdade.</p>
            </Reveal>
            <div className="process-grid">
              {[
                ['01', 'Entender', 'Regras, pessoas, gargalos e o que realmente precisa mudar.'],
                ['02', 'Modelar', 'Fluxos e telas antes de transformar decisão em código.'],
                ['03', 'Construir', 'Frontend, backend, dados, integrações e comportamento.'],
                ['04', 'Entregar', 'Teste, ajuste, publicação e evolução com uso real.']
              ].map(([number, title, text], index) => (
                <Reveal className="process-card" variant="blur-scale" delay={index * 70} key={number}>
                  <span>{number}</span><h3>{title}</h3><p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
