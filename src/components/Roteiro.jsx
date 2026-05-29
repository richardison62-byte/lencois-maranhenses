// Roteiro.jsx — Componente principal do configurador de roteiro

import { useState, useMemo } from 'react';
import { passeios, transfers, hospedagem, WHATSAPP_NUMBER } from '../tourData.js';

const HOSPEDAGEM_KEYS = Object.keys(hospedagem);

function calcularPrecoPasseio(passeio, pessoas, modalidade) {
  if (!passeio) return 0;

  if (modalidade === 'coletivo') {
    if (passeio.soPrivativo || !passeio.coletivo) {
      // fallback para privativo
      return calcularPrecoPasseio(passeio, pessoas, 'privativo');
    }
    return passeio.coletivo * pessoas;
  }

  // Privativo
  if (passeio.precoPorPessoa) {
    return (passeio.privatePricePerPerson || 0) * pessoas;
  }

  const chave = Math.min(pessoas, 6);
  return passeio.privativo?.[chave] || passeio.privatePricePerPerson * pessoas;
}

export default function Roteiro() {
  const [pessoas, setPessoas] = useState(2);
  const [dias, setDias] = useState(3);
  const [incluirTransferIda, setIncluirTransferIda] = useState(true);
  const [incluirTransferVolta, setIncluirTransferVolta] = useState(true);
  const [incluirHospedagem, setIncluirHospedagem] = useState(true);
  const [tipoHospedagem, setTipoHospedagem] = useState('confortavel');
  const [diasRoteiro, setDiasRoteiro] = useState({});
  const [modalidades, setModalidades] = useState({});

  const qtdDias = Math.max(1, Math.min(dias, 10));
  const qtdPessoas = Math.max(1, Math.min(pessoas, 20));

  function setPasseioDia(dia, passeioId) {
    setDiasRoteiro(prev => ({ ...prev, [dia]: passeioId }));
    if (!modalidades[dia]) {
      const p = passeios.find(x => x.id === passeioId);
      if (p) {
        setModalidades(prev => ({
          ...prev,
          [dia]: p.soPrivativo ? 'privativo' : 'coletivo',
        }));
      }
    }
  }

  function setModalidadeDia(dia, mod) {
    setModalidades(prev => ({ ...prev, [dia]: mod }));
  }

  const custos = useMemo(() => {
    const noites = Math.max(0, qtdDias - 1);

    const custoTransferIda = incluirTransferIda
      ? transfers.ida.preco * qtdPessoas
      : 0;

    const custoTransferVolta = incluirTransferVolta
      ? transfers.volta.preco * qtdPessoas
      : 0;

    const custoHospedagem =
      incluirHospedagem && noites > 0
        ? hospedagem[tipoHospedagem].precoPorNoite * noites
        : 0;

    let custoPasseios = 0;
    const detalhePasseios = [];

    for (let d = 1; d <= qtdDias; d++) {
      const passeioId = diasRoteiro[d];
      const passeio = passeios.find(p => p.id === passeioId);
      const mod = modalidades[d] || (passeio?.soPrivativo ? 'privativo' : 'coletivo');
      if (passeio) {
        const valor = calcularPrecoPasseio(passeio, qtdPessoas, mod);
        custoPasseios += valor;
        detalhePasseios.push({
          dia: d,
          nome: passeio.nome,
          icone: passeio.icone,
          modalidade: mod,
          valor,
        });
      }
    }

    const total =
      custoTransferIda + custoTransferVolta + custoHospedagem + custoPasseios;

    return {
      transferIda: custoTransferIda,
      transferVolta: custoTransferVolta,
      hospedagem: custoHospedagem,
      passeios: detalhePasseios,
      totalPasseios: custoPasseios,
      total,
      noites,
    };
  }, [
    qtdPessoas,
    qtdDias,
    incluirTransferIda,
    incluirTransferVolta,
    incluirHospedagem,
    tipoHospedagem,
    diasRoteiro,
    modalidades,
  ]);

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function gerarMensagemWhatsApp() {
    const noites = custos.noites;
    const linhas = [];

    linhas.push('🌊 *ROTEIRO — LENÇÓIS MARANHENSES*');
    linhas.push('');
    linhas.push(`👥 Pessoas: *${qtdPessoas}*`);
    linhas.push(`📅 Dias: *${qtdDias}* (${noites} noite${noites !== 1 ? 's' : ''})`);
    linhas.push('');

    if (custos.transferIda > 0 || custos.transferVolta > 0) {
      linhas.push('🚐 *TRANSFER*');
      if (custos.transferIda > 0) {
        linhas.push(`  • Ida (São Luís → Barreirinhas): ${formatarMoeda(custos.transferIda)}`);
      }
      if (custos.transferVolta > 0) {
        linhas.push(`  • Volta (Barreirinhas → São Luís): ${formatarMoeda(custos.transferVolta)}`);
      }
      linhas.push('');
    }

    if (custos.hospedagem > 0) {
      linhas.push('🏨 *HOSPEDAGEM*');
      linhas.push(
        `  • ${hospedagem[tipoHospedagem].label}: ${formatarMoeda(custos.hospedagem)} (${noites} noite${noites !== 1 ? 's' : ''})`
      );
      linhas.push('');
    }

    if (custos.passeios.length > 0) {
      linhas.push('🗺️ *PASSEIOS*');
      custos.passeios.forEach(p => {
        linhas.push(
          `  ${p.icone} Dia ${p.dia} — ${p.nome} (${p.modalidade === 'coletivo' ? 'Coletivo' : 'Privativo'}): ${formatarMoeda(p.valor)}`
        );
      });
      linhas.push('');
    }

    linhas.push('━━━━━━━━━━━━━━━━━━━━');
    linhas.push(`💰 *TOTAL ESTIMADO: ${formatarMoeda(custos.total)}*`);
    linhas.push('');
    linhas.push('Olá! Gostaria de confirmar disponibilidade para esse roteiro. 😊');

    return linhas.join('\n');
  }

  function abrirWhatsApp() {
    const mensagem = gerarMensagemWhatsApp();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }

  const diasArray = Array.from({ length: qtdDias }, (_, i) => i + 1);

  return (
    <section className="section-roteiro" id="roteiro">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">✦ Monte seu roteiro</span>
          <h2 className="section-titulo">Seu Roteiro Personalizado</h2>
          <p className="section-desc">
            Configure dias, passeios e extras. O valor total é calculado em tempo real.
          </p>
        </div>

        {/* CONFIGURADOR GERAL */}
        <div className="configurador">
          <div className="config-grid">
            <div className="config-item">
              <label htmlFor="pessoas">Nº de Pessoas</label>
              <input
                id="pessoas"
                type="number"
                min={1}
                max={20}
                value={qtdPessoas}
                onChange={e => setPessoas(parseInt(e.target.value) || 1)}
              />
            </div>

            <div className="config-item">
              <label htmlFor="dias">Nº de Dias</label>
              <input
                id="dias"
                type="number"
                min={1}
                max={10}
                value={qtdDias}
                onChange={e => setDias(parseInt(e.target.value) || 1)}
              />
            </div>

            {incluirHospedagem && custos.noites > 0 && (
              <div className="config-item">
                <label htmlFor="tipoHospedagem">Tipo de Pousada</label>
                <select
                  id="tipoHospedagem"
                  value={tipoHospedagem}
                  onChange={e => setTipoHospedagem(e.target.value)}
                >
                  {HOSPEDAGEM_KEYS.map(k => (
                    <option key={k} value={k}>
                      {hospedagem[k].label} — R$ {hospedagem[k].precoPorNoite}/noite
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="config-checkboxes">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={incluirTransferIda}
                onChange={e => setIncluirTransferIda(e.target.checked)}
              />
              <div>
                <span className="checkbox-label">Transfer Ida</span>
                <span className="checkbox-preco">
                  R$ {transfers.ida.preco}/pessoa
                </span>
              </div>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={incluirTransferVolta}
                onChange={e => setIncluirTransferVolta(e.target.checked)}
              />
              <div>
                <span className="checkbox-label">Transfer Volta</span>
                <span className="checkbox-preco">
                  R$ {transfers.volta.preco}/pessoa
                </span>
              </div>
            </label>

            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={incluirHospedagem}
                onChange={e => setIncluirHospedagem(e.target.checked)}
              />
              <div>
                <span className="checkbox-label">Incluir Hospedagem</span>
                <span className="checkbox-preco">
                  {custos.noites} noite{custos.noites !== 1 ? 's' : ''}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* DIAS DO ROTEIRO */}
        <div className="dias-roteiro">
          {diasArray.length === 0 ? (
            <div className="empty-roteiro">
              Defina a quantidade de dias para montar seu roteiro.
            </div>
          ) : (
            diasArray.map(dia => {
              const passeioId = diasRoteiro[dia];
              const passeio = passeios.find(p => p.id === passeioId);
              const mod = modalidades[dia] || (passeio?.soPrivativo ? 'privativo' : 'coletivo');
              const valor = passeio
                ? calcularPrecoPasseio(passeio, qtdPessoas, mod)
                : 0;

              return (
                <div key={dia} className="dia-card">
                  <div className="dia-numero">{dia}</div>

                  <div className="dia-info">
                    <div className="dia-titulo">Dia {dia}</div>
                    <div className={`dia-passeio-nome ${!passeio ? 'vazio' : ''}`}>
                      {passeio ? `${passeio.icone} ${passeio.nome}` : 'Nenhum passeio selecionado'}
                    </div>
                  </div>

                  <div className="dia-select-wrap">
                    <select
                      className="dia-select"
                      value={passeioId || ''}
                      onChange={e => setPasseioDia(dia, e.target.value || null)}
                    >
                      <option value="">— Escolher passeio —</option>
                      {passeios.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.icone} {p.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  {passeio && (
                    <div className="dia-modalidade">
                      {!passeio.soPrivativo && (
                        <button
                          className={`modalidade-btn ${mod === 'coletivo' ? 'ativo' : ''}`}
                          onClick={() => setModalidadeDia(dia, 'coletivo')}
                        >
                          Coletivo
                        </button>
                      )}
                      <button
                        className={`modalidade-btn ${mod === 'privativo' ? 'ativo' : ''}`}
                        onClick={() => setModalidadeDia(dia, 'privativo')}
                      >
                        Privativo
                      </button>
                    </div>
                  )}

                  <div className="dia-preco">
                    {passeio ? formatarMoeda(valor) : '—'}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* RESUMO E TOTAL */}
        <div className="resumo-total">
          <div className="resumo-titulo">📋 Resumo do Roteiro</div>

          <div className="resumo-linhas">
            {custos.transferIda > 0 && (
              <div className="resumo-linha">
                <span className="nome">🚐 Transfer Ida ({qtdPessoas} pax)</span>
                <span className="valor">{formatarMoeda(custos.transferIda)}</span>
              </div>
            )}
            {custos.transferVolta > 0 && (
              <div className="resumo-linha">
                <span className="nome">🚐 Transfer Volta ({qtdPessoas} pax)</span>
                <span className="valor">{formatarMoeda(custos.transferVolta)}</span>
              </div>
            )}
            {custos.hospedagem > 0 && (
              <div className="resumo-linha">
                <span className="nome">
                  🏨 {hospedagem[tipoHospedagem].label} ({custos.noites} noite{custos.noites !== 1 ? 's' : ''})
                </span>
                <span className="valor">{formatarMoeda(custos.hospedagem)}</span>
              </div>
            )}
            {custos.passeios.map(p => (
              <div key={p.dia} className="resumo-linha">
                <span className="nome">
                  {p.icone} Dia {p.dia} — {p.nome}
                  <span style={{ fontSize: '0.7rem', opacity: 0.6, marginLeft: '0.4rem' }}>
                    ({p.modalidade === 'coletivo' ? 'Coletivo' : 'Privativo'})
                  </span>
                </span>
                <span className="valor">{formatarMoeda(p.valor)}</span>
              </div>
            ))}

            {custos.total === 0 && (
              <div className="resumo-linha" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
                Selecione passeios e serviços para ver o orçamento.
              </div>
            )}
          </div>

          <div className="resumo-total-linha">
            <span className="resumo-total-label">Total Estimado</span>
            <span className="resumo-total-valor">
              {formatarMoeda(custos.total)}
            </span>
          </div>
        </div>

        <div className="nota-info">
          <span>💡</span>
          <div>
            <strong>Observação importante</strong>
            Os valores são estimativas. Preços de passeio privativo variam conforme o grupo (calculado para {qtdPessoas} pessoa{qtdPessoas !== 1 ? 's' : ''}). Hospedagem cotada por quarto duplo. Confirme disponibilidade e valores finais via WhatsApp.
          </div>
        </div>

        {/* BOTÃO WHATSAPP */}
        <div style={{ marginTop: '1.5rem' }}>
          <button className="btn-whatsapp" onClick={abrirWhatsApp}>
            <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Enviar Roteiro via WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
