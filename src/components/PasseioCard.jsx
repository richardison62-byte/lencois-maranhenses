// PasseioCard.jsx — Card clicável de cada passeio

export default function PasseioCard({ passeio, onClick }) {
  return (
    <article
      className="passeio-card animate-in"
      onClick={() => onClick(passeio)}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick(passeio)}
      aria-label={`Ver detalhes: ${passeio.nome}`}
    >
      <div className="passeio-icone-wrap">
        <span className="passeio-icone">{passeio.icone}</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
          <span className="passeio-regiao">{passeio.regiao}</span>
          <span className="passeio-duracao">⏱ {passeio.duracao}</span>
        </div>
      </div>

      <div className="passeio-corpo">
        <h3 className="passeio-nome">{passeio.nome}</h3>
        <p className="passeio-desc">{passeio.descricao}</p>
        <div className="passeio-destaque">✦ {passeio.destaque}</div>

        <div className="passeio-precos">
          {passeio.coletivo && !passeio.soPrivativo ? (
            <div className="preco-item">
              <span className="preco-label">Coletivo</span>
              <div className="preco-valor">
                R$ {passeio.coletivo}
                <span> /pessoa</span>
              </div>
            </div>
          ) : (
            !passeio.soPrivativo && (
              <div className="preco-item">
                <div className="preco-indisponivel">Só privativo</div>
              </div>
            )
          )}

          <div className="preco-item">
            <span className="preco-label">
              {passeio.soPrivativo ? 'Preço' : 'Privativo'}
            </span>
            <div className="preco-valor">
              R$ {passeio.id === 'trekking-lencois'
  ? passeio.privativo?.[1]
  : passeio.precoPorPessoa
  ? passeio.privatePricePerPerson
  : passeio.privativo?.[1] || passeio.privatePricePerPerson}
<span>
  {passeio.id === 'trekking-lencois' ? ' /pessoa' : passeio.precoPorPessoa ? ' /pessoa' : ' (Grupo)'}
</span>
            </div>
          </div>
        </div>

        <div className="card-ver-mais">
          Ver detalhes
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </article>
  );
}
