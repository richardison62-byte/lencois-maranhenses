// Hero.jsx — Seção hero com dunas SVG animadas

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-content">
        <span className="hero-label">Maranhão · Brasil</span>

        <h1 className="hero-titulo">
          Lençóis<br />
          <em>Maranhenses</em>
        </h1>

        <p className="hero-subtitulo">
          Seu destino dos sonhos começa aqui: <br />
          personalize seu roteiro e explore cada detalhe do paraíso do seu jeito.
        </p>

        <a href="#passeios" className="hero-cta">
          <span>✦</span>
          Ver Passeios & Roteiros
        </a>
      </div>

      {/* Dunas SVG */}
      <div className="hero-dunes" aria-hidden="true">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="dunaGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d4b896" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e8d5a3" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="dunaGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e8d5a3" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#f5edd6" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="dunaGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5edd6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#f9f4e8" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Camada 1 — duna de fundo */}
          <path
            d="M0,200 C150,120 350,180 600,140 C850,100 1050,170 1200,130 C1310,100 1390,150 1440,140 L1440,320 L0,320 Z"
            fill="url(#dunaGrad1)"
          />

          {/* Camada 2 — duna do meio */}
          <path
            d="M0,240 C120,190 280,250 500,210 C720,170 900,240 1100,200 C1250,170 1370,220 1440,200 L1440,320 L0,320 Z"
            fill="url(#dunaGrad2)"
          />

          {/* Camada 3 — duna da frente */}
          <path
            d="M0,270 C100,240 250,280 450,255 C650,230 800,275 1000,255 C1150,238 1300,265 1440,248 L1440,320 L0,320 Z"
            fill="url(#dunaGrad3)"
          />
        </svg>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
