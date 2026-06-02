// App.jsx — Componente raiz com roteamento por estado

import { useEffect, useState } from 'react';
import './roteiro.css';

import Hero from './components/Hero.jsx';
import PasseioCard from './components/PasseioCard.jsx';
import PasseioDetalhe from './components/PasseioDetalhe.jsx';
import Roteiro from './components/Roteiro.jsx';
import ContatoFlutuante from './components/ContatoFlutuante.jsx';
import { passeios } from './tourData.js';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [passeioAtivo, setPasseioAtivo] = useState(null); // null = home

  useEffect(() => {
    function onScroll() {
      const pos = window.scrollY;
      const altura = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(pos > 80);
      setProgresso(altura > 0 ? (pos / altura) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
  function onPopState() {
    setPasseioAtivo(null);
    setTimeout(() => {
      document.getElementById('passeios')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
  window.addEventListener('popstate', onPopState);
  return () => window.removeEventListener('popstate', onPopState);
}, []);

function abrirPasseio(passeio) {
  setPasseioAtivo(passeio);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.history.pushState({ passeioId: passeio.id }, '', `#passeio-${passeio.id}`);
}

function voltarParaHome() {
  setPasseioAtivo(null);
  window.history.pushState(null, '', '/');
  setTimeout(() => {
    document.getElementById('passeios')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

  return (
    <>
      {/* Barra de progresso */}
      <div className="progresso-bar" style={{ width: `${progresso}%` }} aria-hidden="true" />

      {/* Header fixo */}
      <header className={`header-fixo ${scrolled ? 'scrolled' : ''}`}>
        <button
          className={`header-logo ${(scrolled || passeioAtivo) ? 'visivel' : ''}`}
          onClick={() => { setPasseioAtivo(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          <img src="/imagens/logo.png" alt="Lençóis Maranhenses" 
          style={{ height: '65px', width: 'auto', marginTop: '-10px', marginBottom: '-10px'  }} />
        </button>
        <nav className="header-nav">
          {passeioAtivo ? (
            <button
              onClick={voltarParaHome}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', padding: '0.4rem 0.9rem', borderRadius: '100px', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Passeios
            </button>
          ) : (
            <>
              <a href="#passeios">Passeios</a>
              <a href="#roteiro">Roteiro</a>
              <a href="#sobre">Sobre</a>
            </>
          )}
        </nav>
      </header>

      <main>
        {passeioAtivo ? (
          /* PÁGINA DE DETALHE */
          <PasseioDetalhe passeio={passeioAtivo} onVoltar={voltarParaHome} />
        ) : (
          /* HOME */
          <>
            <Hero />

            {/* Sobre */}
            <section className="section-sobre" id="sobre">
              <div className="container">
                <div className="sobre-grid">
                  <div className="sobre-texto">
                    <h2>O paraíso escondido<br />no nordeste do Brasil</h2>
                    <p>
                      Os Lençóis Maranhenses são um fenômeno único no planeta: um
                      vasto deserto de dunas brancas que, nos meses chuvosos, se
                      transforma em um mosaico de lagoas de água doce cristalina.
                    </p>
                    <p>
                      Com acesso pelas cidades de Barreirinhas e Santo Amaro, o
                      parque nacional abriga ecossistemas raros, vilas de pescadores
                      e uma beleza que desafia qualquer imaginação.
                    </p>
                    <p>
                      Montamos roteiros completos, com transfer, hospedagem e
                      passeios guiados — para que você apenas precise chegar e se encantar.
                    </p>
                  </div>

                  <div className="sobre-numeros">
                    <div className="numero-item">
                      <div className="numero-valor">155k</div>
                      <div className="numero-label">Hectares de dunas e lagoas</div>
                    </div>
                    <div className="numero-item">
                      <div className="numero-valor">40m</div>
                      <div className="numero-label">Altura máxima das dunas</div>
                    </div>
                    <div className="numero-item">
                      <div className="numero-valor">8+</div>
                      <div className="numero-label">Passeios incríveis</div>
                    </div>
                    <div className="numero-item">
                      <div className="numero-valor">300+</div>
                      <div className="numero-label">Lagoas no período chuvoso</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Passeios */}
            <section className="section-passeios" id="passeios">
              <div className="container">
                <div className="section-header">
                  <span className="section-tag">✦ Catálogo completo</span>
                  <h2 className="section-titulo">Passeios & Experiências</h2>
                  <p className="section-desc">
                    Clique em qualquer passeio para ver fotos, detalhes e fazer sua reserva.
                  </p>
                </div>

                <div className="passeios-grid">
                  {passeios.map(passeio => (
                    <PasseioCard
                      key={passeio.id}
                      passeio={passeio}
                      onClick={abrirPasseio}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Roteiro */}
            <Roteiro />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">Lençóis Maranhenses</div>
        <p className="footer-sub">Barreirinhas & Santo Amaro · Maranhão · Brasil</p>
        <p style={{ marginTop: '1rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)' }}>
          Os preços são estimativas e podem variar conforme disponibilidade e temporada.
        </p>
      </footer>

      {/* Widget de contato flutuante */}
      <ContatoFlutuante />
    </>
  );
}
