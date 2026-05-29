// PasseioDetalhe.jsx — Página de detalhe completa de cada passeio

import { useState, useEffect } from 'react';
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from '../tourData.js';

export default function PasseioDetalhe({ passeio, onVoltar }) {
  const [imgAtiva, setImgAtiva] = useState(0);
  const [imgCarregada, setImgCarregada] = useState(false);
  const [pessoas, setPessoas] = useState(2);

  // Scroll to top ao abrir
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [passeio.id]);

  function calcPrecoColetivo() {
    if (!passeio.coletivo || passeio.soPrivativo) return null;
    return passeio.coletivo * pessoas;
  }

  function calcPrecoPrivativo() {
    if (passeio.precoPorPessoa) return passeio.privatePricePerPerson * pessoas;
    const chave = Math.min(pessoas, 6);
    return passeio.privativo?.[chave] || passeio.privatePricePerPerson * pessoas;
  }

  function fmt(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function abrirWhatsApp(modalidade) {
    const mod = modalidade === 'coletivo' ? 'Coletivo' : 'Privativo';
    const preco = modalidade === 'coletivo' ? fmt(calcPrecoColetivo()) : fmt(calcPrecoPrivativo());
    const msg = `Olá! Tenho interesse no passeio *${passeio.nome}* (${mod}) para *${pessoas} pessoa${pessoas !== 1 ? 's' : ''}*.\n\nValor estimado: *${preco}*\n\nGostaria de verificar disponibilidade e fazer a reserva. 😊`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  }

  const difCor = {
    'Fácil': '#2bbcd4',
    'Moderado': '#e8a84c',
    'Difícil': '#e05c5c',
  };

  return (
    <div className="detalhe-page">
      {/* Header de navegação */}
      <div className="detalhe-nav">
        <button className="btn-voltar" onClick={onVoltar}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Todos os Passeios
        </button>
        <span className="detalhe-nav-label">
          {passeio.icone} {passeio.nome}
        </span>
      </div>

      {/* GALERIA */}
      <div className="detalhe-galeria">
        <div className="galeria-principal">
          <img
            key={imgAtiva}
            src={passeio.imagens[imgAtiva]}
            alt={passeio.nome}
            className={`galeria-img ${imgCarregada ? 'carregada' : ''}`}
            onLoad={() => setImgCarregada(true)}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80'; }}
          />
          <div className="galeria-overlay">
            <span className="galeria-regiao">{passeio.regiao}</span>
          </div>
        </div>

        <div className="galeria-thumbs">
          {passeio.imagens.map((img, i) => (
            <button
              key={i}
              className={`galeria-thumb ${i === imgAtiva ? 'ativa' : ''}`}
              onClick={() => { setImgCarregada(false); setImgAtiva(i); }}
            >
              <img
                src={img}
                alt={`Foto ${i + 1}`}
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=60'; }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* CORPO */}
      <div className="detalhe-corpo">
        {/* Coluna principal */}
        <div className="detalhe-main">
          {/* Título e badges */}
          <div className="detalhe-titulo-wrap">
            <div className="detalhe-badges">
              <span className="detalhe-badge duracao">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                {passeio.duracao}
              </span>
              <span
                className="detalhe-badge dificuldade"
                style={{ background: difCor[passeio.nivelDificuldade] + '22', color: difCor[passeio.nivelDificuldade], borderColor: difCor[passeio.nivelDificuldade] + '44' }}
              >
                {passeio.nivelDificuldade}
              </span>
              <span className="detalhe-badge epoca">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                {passeio.melhorEpoca}
              </span>
            </div>

            <h1 className="detalhe-titulo">
              <span className="detalhe-icone">{passeio.icone}</span>
              {passeio.nome}
            </h1>

            <p className="detalhe-destaque-pill">✦ {passeio.destaque}</p>
          </div>

          {/* Descrição longa */}
          <div className="detalhe-descricao">
            {passeio.descricaoLonga.split('\n\n').map((paragrafo, i) => (
              <p key={i}>{paragrafo}</p>
            ))}
          </div>

          {/* Incluso / Não incluso */}
          <div className="detalhe-incluso-grid">
            <div className="incluso-box incluso">
              <h3 className="incluso-titulo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
                O que está incluso
              </h3>
              <ul className="incluso-lista">
                {passeio.incluso.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="incluso-box nao-incluso">
              <h3 className="incluso-titulo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
                Não incluso
              </h3>
              <ul className="incluso-lista">
                {passeio.naoIncluso.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dicas */}
          <div className="detalhe-dica">
            <span className="dica-icone">💡</span>
            <div>
              <strong>Dica do guia</strong>
              <p>{passeio.dicas}</p>
            </div>
          </div>
        </div>

        {/* Sidebar — preços e reserva */}
        <aside className="detalhe-sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-titulo">Reservar este passeio</h3>

            <div className="sidebar-pessoas">
              <label>Quantidade de pessoas</label>
              <div className="pessoas-controle">
                <button
                  className="pessoas-btn"
                  onClick={() => setPessoas(p => Math.max(1, p - 1))}
                  disabled={pessoas <= 1}
                >−</button>
                <span className="pessoas-num">{pessoas}</span>
                <button
                  className="pessoas-btn"
                  onClick={() => setPessoas(p => Math.min(20, p + 1))}
                >+</button>
              </div>
            </div>

            <div className="sidebar-precos">
              {!passeio.soPrivativo && passeio.coletivo && (
                <div className="sidebar-preco-item">
                  <div className="sidebar-preco-header">
                    <span className="sidebar-preco-label">Coletivo</span>
                    <span className="sidebar-preco-desc">R$ {passeio.coletivo}/pessoa</span>
                  </div>
                  <div className="sidebar-preco-total">{fmt(calcPrecoColetivo())}</div>
                  <p className="sidebar-preco-nota">para {pessoas} pessoa{pessoas !== 1 ? 's' : ''}</p>
                  <button className="btn-reservar coletivo" onClick={() => abrirWhatsApp('coletivo')}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Reservar Coletivo
                  </button>
                </div>
              )}

              <div className="sidebar-preco-item">
                <div className="sidebar-preco-header">
                  <span className="sidebar-preco-label">
                    {passeio.soPrivativo ? 'Preço' : 'Privativo'}
                  </span>
                  <span className="sidebar-preco-desc">exclusivo para o seu grupo</span>
                </div>
                <div className="sidebar-preco-total">{fmt(calcPrecoPrivativo())}</div>
                <p className="sidebar-preco-nota">
                  {passeio.precoPorPessoa
                    ? `R$ ${passeio.privatePricePerPerson}/pessoa`
                    : `para ${pessoas} pessoa${pessoas !== 1 ? 's' : ''}`}
                </p>
                <button className="btn-reservar privativo" onClick={() => abrirWhatsApp('privativo')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Reservar Privativo
                </button>
              </div>
            </div>

            <div className="sidebar-nota">
              Valores estimados. Confirme disponibilidade via WhatsApp.
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Ver fotos no Instagram
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
