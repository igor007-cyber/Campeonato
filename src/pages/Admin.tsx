import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MotionSection = motion.section
const MotionArticle = motion.article
const MotionDiv = motion.div

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

const eventTypes = [
  {
    id: 'campeonato',
    title: 'Campeonato',
    description:
      'Rodadas completas com ida e volta, critérios de desempate sofisticados e destaque para regularidade.'
  },
  {
    id: 'torneio',
    title: 'Torneio',
    description:
      'Fase de grupos curta + mata-mata dinâmico. Ideal para eventos concentrados em poucos dias.'
  },
  {
    id: 'copa',
    title: 'Copa',
    description:
      'Eliminatória direta. Cada jogo é decisivo e permite experiências rápidas ou festivais temáticos.'
  }
]

const structureOptions = [
  {
    id: 'grupos',
    label: 'Fase de grupos',
    description: 'Monte chaves, defina quantas rodadas e envie critérios de desempate automáticos.'
  },
  {
    id: 'mata-mata',
    label: 'Mata-mata',
    description: 'Crie chaves eliminatórias simples ou ida e volta, com bolhas para terceiro lugar.'
  },
  {
    id: 'hibrido',
    label: 'Híbrido',
    description: 'Combine grupos e mata-mata na mesma jornada sem perder o controle das estatísticas.'
  }
]

const distributionOptions = [
  {
    id: 'manual',
    title: 'Distribuição manual',
    description:
      'Arraste e solte equipes para cada grupo ou chave. Ideal quando você conhece as rivalidades.'
  },
  {
    id: 'aleatoria',
    title: 'Sorteio inteligente',
    description:
      'O sistema embaralha automaticamente considerando seeds, confederações ou níveis configurados.'
  }
]

const knockoutPaths = [
  { id: 'oitavas', label: 'Oitavas de final', teams: 16 },
  { id: 'quartas', label: 'Quartas de final', teams: 8 },
  { id: 'semis', label: 'Semifinais', teams: 4 },
  { id: 'final', label: 'Final', teams: 2 }
]

const scoringBlocks = [
  {
    id: 'tres-pontos',
    title: 'Modalidades 3 pontos por vitória',
    sports: ['Handebol', 'Videogame de futebol', 'Futsal', 'Futebol de campo'],
    rules: ['Vitória = 3 pts', 'Empate = 1 pt', 'Derrota = 0 pt', 'Saldo de gols define empate'],
    metrics: ['J', 'V', 'E', 'D', 'Gols pró', 'Gols contra', 'Saldo', 'Pontos']
  },
  {
    id: 'dois-pontos',
    title: 'Modalidades 2 pontos por vitória',
    sports: ['Vôlei', 'Tênis de mesa', 'Basquete', 'Vôlei de praia'],
    rules: ['Vitória = 2 pts', 'Empate = 1 pt', 'Derrota = 0 pt', 'Saldo de pontos define empate'],
    metrics: ['J', 'V', 'E', 'D', 'Pontos pró', 'Pontos contra', 'Saldo', 'Pontos']
  }
]

function Admin() {
  const navigate = useNavigate()
  const [eventType, setEventType] = useState<string>('campeonato')
  const [visibility, setVisibility] = useState<'publico' | 'privado'>('publico')
  const [structure, setStructure] = useState<'grupos' | 'mata-mata' | 'hibrido'>('grupos')
  const [groupMatches, setGroupMatches] = useState<number>(3)
  const [distribution, setDistribution] = useState<'manual' | 'aleatoria'>('aleatoria')
  const [knockoutBase, setKnockoutBase] = useState<string>('oitavas')

  const visibilityLabel =
    visibility === 'publico'
      ? 'Visibilidade pública – o evento aparece imediatamente na vitrine de torneios.'
      : 'Evento privado – visível apenas para convidados até você decidir publicar.'

  const knockoutDescription = useMemo(() => {
    const selected = knockoutPaths.find((path) => path.id === knockoutBase)
    if (!selected) return ''
    return `Comece no estágio de ${selected.label} com ${selected.teams} equipes classificadas. `
  }, [knockoutBase])

  return (
    <div className="page">
      <MotionSection
        id="administrador"
        className="admin-section"
        variants={fadeInScale}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.55 }}
      >
        <div className="section-header">
          <h2>Área Administrativa – construa o evento do seu jeito</h2>
          <p>
            Defina estrutura, visibilidade, critérios de pontuação e deixe o sistema entregar tabelas,
            chaveamentos e rankings automaticamente.
          </p>
          <button type="button" className="ghost-btn" onClick={() => navigate('/')}>
            ← Voltar ao início
          </button>
        </div>

        <div className="admin-grid">
          <MotionArticle className="admin-card" variants={fadeInUp}>
            <h3>Tipo de evento</h3>
            <div className="option-grid">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={eventType === type.id ? 'option-card active' : 'option-card'}
                  onClick={() => setEventType(type.id)}
                >
                  <span className="option-title">{type.title}</span>
                  <p>{type.description}</p>
                </button>
              ))}
            </div>
            <p className="hint">
              O sistema solicita uma justificativa rápida para entender se você privilegia pontos corridos,
              jornadas curtas ou mata-mata puro.
            </p>
          </MotionArticle>

          <MotionArticle className="admin-card" variants={fadeInUp} transition={{ delay: 0.08 }}>
            <h3>Visibilidade e publicação</h3>
            <div className="toggle-group">
              <button
                type="button"
                className={visibility === 'publico' ? 'toggle-pill active' : 'toggle-pill'}
                onClick={() => setVisibility('publico')}
              >
                Público
              </button>
              <button
                type="button"
                className={visibility === 'privado' ? 'toggle-pill active' : 'toggle-pill'}
                onClick={() => setVisibility('privado')}
              >
                Privado
              </button>
            </div>
            <p className="hint">{visibilityLabel}</p>
            <div className="visibility-actions">
              <button type="button" className="outline-btn">
                Pré-visualizar vitrine
              </button>
              <button type="button" className="ghost-btn">
                Alternar visibilidade
              </button>
            </div>
          </MotionArticle>

          <MotionArticle className="admin-card" variants={fadeInUp} transition={{ delay: 0.16 }}>
            <h3>Estrutura técnica</h3>
            <div className="option-grid structure">
              {structureOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={structure === option.id ? 'option-card active' : 'option-card'}
                  onClick={() => setStructure(option.id as typeof structure)}
                >
                  <span className="option-title">{option.label}</span>
                  <p>{option.description}</p>
                </button>
              ))}
            </div>

            {structure !== 'mata-mata' ? (
              <div className="group-config">
                <label>
                  <span>Partidas por fase de grupos</span>
                  <input
                    type="range"
                    min={1}
                    max={6}
                    value={groupMatches}
                    onChange={(event) => setGroupMatches(Number(event.target.value))}
                  />
                </label>
                <p className="hint">
                  Cada equipe joga <strong>{groupMatches}</strong> vezes na fase classificatória antes de avançar.
                </p>
              </div>
            ) : null}

            <div className="distribution-grid">
              {distributionOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={distribution === option.id ? 'option-card active' : 'option-card'}
                  onClick={() => setDistribution(option.id as typeof distribution)}
                >
                  <span className="option-title">{option.title}</span>
                  <p>{option.description}</p>
                </button>
              ))}
            </div>
          </MotionArticle>

          <MotionArticle className="admin-card" variants={fadeInUp} transition={{ delay: 0.24 }}>
            <h3>Chaveamento automático</h3>
            <div className="toggle-group knockout">
              {knockoutPaths.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  className={knockoutBase === path.id ? 'toggle-pill active' : 'toggle-pill'}
                  onClick={() => setKnockoutBase(path.id)}
                >
                  {path.label}
                </button>
              ))}
            </div>
            <p className="hint">{knockoutDescription}</p>
            <div className="bracket-preview">
              <div className="bracket-column">
                <span>Grupos</span>
                <span>1º &amp; 2º</span>
              </div>
              <div className="bracket-column">
                <span>Quartas</span>
                <span>Semis</span>
                <span>Final</span>
              </div>
              <div className="bracket-column highlight">
                <span>🥇 Campeão</span>
                <span>🥈 Vice</span>
                <span>🥉 Terceiro</span>
              </div>
            </div>
            <p className="hint">
              Você pode definir manualmente os confrontos ou deixar a inteligência do ArenaPlay sortear em
              segundos.
            </p>
          </MotionArticle>

          <MotionDiv className="admin-card scoring" variants={fadeInUp} transition={{ delay: 0.32 }}>
            <h3>Regras de pontuação e classificação</h3>
            <div className="scores-grid">
              {scoringBlocks.map((block) => (
                <article key={block.id}>
                  <h4>{block.title}</h4>
                  <p>{block.sports.join(' · ')}</p>
                  <ul>
                    {block.rules.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                  <div className="metrics-chip">
                    {block.metrics.map((metric) => (
                      <span key={metric}>{metric}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p className="hint">
              Empates na pontuação usam saldo (gols ou pontos), depois confronto direto e fair play – tudo
              configurável no painel avançado.
            </p>
          </MotionDiv>

          <MotionDiv className="admin-card actions" variants={fadeInUp} transition={{ delay: 0.4 }}>
            <h3>Publicação e manutenção</h3>
            <div className="actions-grid">
              <button type="button" className="primary-btn">
                Salvar rascunho
              </button>
              <button type="button" className="outline-btn">
                Publicar agora
              </button>
              <button type="button" className="ghost-btn danger">
                Excluir evento
              </button>
            </div>
            <p className="hint">
              Eventos podem ser excluídos ou reabertos a qualquer momento. O histórico permanece disponível
              para relatórios e estatísticas.
            </p>
          </MotionDiv>
        </div>
      </MotionSection>
    </div>
  )
}

export default Admin

