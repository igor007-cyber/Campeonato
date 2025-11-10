import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const featureHighlights = [
  {
    icon: '📊',
    title: 'Painel inteligente',
    description:
      'Visualize resultados, tabelas, rankings e estatísticas em tempo real em um dashboard vivo e personalizável.'
  },
  {
    icon: '🧭',
    title: 'Fluxo organizado',
    description:
      'Automatize fases, sorteios e chaves eliminatórias com poucos cliques – o sistema cuida das regras por você.'
  },
  {
    icon: '🤝',
    title: 'Engaje a comunidade',
    description:
      'Gerencie inscrições, convites e comunicação em um só lugar, com notificações e agenda integrada.'
  },
  {
    icon: '📱',
    title: 'Experiência mobile-first',
    description:
      'Acompanhe tudo do celular: resultados ao vivo, transmissões integradas e zonas interativas para torcedores.'
  }
]

const sampleEvents = [
  {
    title: 'Copa Elite de Futebol 7',
    sport: 'Futebol',
    status: 'Inscrições abertas',
    participants: '32 equipes',
    image:
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Arena Masters de E-sports',
    sport: 'E-sports',
    status: 'Top 16 definidos',
    participants: '8 finalistas',
    image:
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Circuito Nacional de Vôlei de Praia',
    sport: 'Vôlei',
    status: 'Etapa 5 em andamento',
    participants: '24 duplas',
    image:
      'https://images.unsplash.com/photo-1505842465776-3acb7e612d96?auto=format&fit=crop&w=1200&q=80'
  }
]

const sportsSlides = [
  {
    title: 'Liga Universitária de Basquete',
    description:
      'Temporada completa com calendário inteligente, estatísticas avançadas e rankings semanais.',
    image:
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1600&q=80',
    tag: 'Basquete'
  },
  {
    title: 'Champions Cup de Futebol Digital',
    description:
      'Torneio híbrido com fases online e presencial, transmissão integrada e experiência gamificada.',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80',
    tag: 'FIFA 25'
  },
  {
    title: 'Battle Race Series',
    description:
      'Organize corridas de kart, ciclismo ou corrida de rua com checkpoints, rankings por ritmo e kit do atleta.',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80',
    tag: 'Corridas'
  }
]

const testimonials = [
  {
    quote:
      'Centralizamos toda a organização da liga em um só painel. Inscrições, calendário e comunicação ficaram impecáveis.',
    name: 'Mariana Duarte',
    role: 'Diretora da Liga Metropolitana',
    initials: 'MD'
  },
  {
    quote:
      'O engajamento da comunidade triplicou. Os atletas adoram votar nos destaques e receber alertas instantâneos.',
    name: 'Thiago Lopes',
    role: 'Fundador da Arena Vision',
    initials: 'TL'
  }
]

const stats = [
  { label: 'eventos criados', value: '+1000' },
  { label: 'organizadores ativos', value: '+260' },
  { label: 'participantes satisfeitos', value: '97%' },
  { label: 'esportes suportados', value: '40+' }
]

const standingsData = [
  {
    position: 1,
    team: 'Urban Lions',
    badge: '🦁',
    wins: 5,
    draws: 1,
    losses: 0,
    goalsFor: 26,
    goalsAgainst: 9,
    points: 16,
    form: ['W', 'W', 'W', 'D', 'W']
  },
  {
    position: 2,
    team: 'Riviera Storm',
    badge: '🌪️',
    wins: 4,
    draws: 2,
    losses: 0,
    goalsFor: 22,
    goalsAgainst: 11,
    points: 14,
    form: ['W', 'D', 'W', 'W', 'D']
  },
  {
    position: 3,
    team: 'Atlético Aurora',
    badge: '✨',
    wins: 3,
    draws: 1,
    losses: 2,
    goalsFor: 19,
    goalsAgainst: 14,
    points: 10,
    form: ['L', 'W', 'W', 'L', 'W']
  },
  {
    position: 4,
    team: 'Fênix Digital',
    badge: '🦾',
    wins: 3,
    draws: 0,
    losses: 3,
    goalsFor: 16,
    goalsAgainst: 17,
    points: 9,
    form: ['W', 'L', 'W', 'L', 'L']
  },
  {
    position: 5,
    team: 'Coastline Vipers',
    badge: '🐍',
    wins: 2,
    draws: 1,
    losses: 3,
    goalsFor: 14,
    goalsAgainst: 18,
    points: 7,
    form: ['D', 'L', 'W', 'L', 'W']
  },
  {
    position: 6,
    team: 'Neo Orbit',
    badge: '🪐',
    wins: 1,
    draws: 2,
    losses: 3,
    goalsFor: 11,
    goalsAgainst: 21,
    points: 5,
    form: ['L', 'D', 'L', 'W', 'D']
  }
]

const formIcons: Record<string, string> = {
  W: '🏆',
  D: '🤝',
  L: '⚔️'
}

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
}

const fadeInFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 }
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
}

const MotionSection = motion.section
const MotionArticle = motion.article
const MotionDiv = motion.div
const MotionTr = motion.tr
const MotionTable = motion.table

const competitionTypes = [
  {
    name: 'Campeonato',
    structure: 'Fase de grupos com pontuação acumulada',
    justification:
      'Ideal para temporadas longas, garante equilíbrio com jogos de ida e volta e critérios detalhados de classificação.'
  },
  {
    name: 'Torneio',
    structure: 'Grupos + mata-mata',
    justification:
      'Perfeito para experiências intensas: fase classificatória garante rodagem e mata-mata entrega emoção na reta final.'
  },
  {
    name: 'Copa',
    structure: 'Eliminatória direta (mata-mata)',
    justification:
      'Formato clássico e ágil, excelente para eventos especiais e festivais com foco em partidas decisivas.'
  }
]

const creationFlow = [
  {
    title: 'Informações essenciais',
    items: [
      'Defina nome do evento, modalidade(s) e tipo de disputa',
      'Escolha a visibilidade: público para exposição ou privado para eventos fechados'
    ]
  },
  {
    title: 'Estrutura da competição',
    items: [
      'Selecione se haverá fase de grupos, mata-mata ou a combinação de ambos',
      'Determine partidas por grupo, critérios de distribuição e quantos avançam por chave'
    ]
  },
  {
    title: 'Organização dos participantes',
    items: [
      'Cadastre equipes manualmente ou importe listas em massa',
      'Use sorteio automatizado ou distribua times manualmente, com pré-visualização das chaves'
    ]
  }
]

const phaseBlueprint = {
  groupStage: {
    title: 'Fase de grupos',
    highlights: [
      'Cadastro de clubes manual ou por sorteio automático',
      'Tabela dinâmica com jogos, resultados, classificação e atualização automática',
      'Critérios de desempate configuráveis: saldo de gols/pontos, confronto direto, fair play'
    ]
  },
  knockoutStage: {
    title: 'Mata-mata',
    highlights: [
      'Chaves geradas automaticamente com base na classificação dos grupos',
      'Atualização em tempo real conforme vencedores avançam',
      'Opções para jogo único, ida e volta e disputa de terceiro lugar'
    ]
  }
}

const publicEvents = [
  {
    name: 'Liga Metropolitana de Futsal',
    modality: 'Futsal',
    type: 'Campeonato',
    status: 'Em andamento',
    owner: 'Academia Urban Sports'
  },
  {
    name: 'Arena Cup de Basquete 3x3',
    modality: 'Basquete',
    type: 'Copa',
    status: 'Inscrições abertas',
    owner: 'ArenaPlay Originals'
  },
  {
    name: 'Circuito Nacional de Vôlei de Praia',
    modality: 'Vôlei de praia',
    type: 'Torneio',
    status: 'Finalizado',
    owner: 'Federação Brasileira de Praia'
  }
]

const publishedGames = [
  {
    id: 'game-01',
    modality: 'Futsal',
    eventType: 'Campeonato',
    eventName: 'Liga Metropolitana de Futsal',
    teams: ['Urban Lions', 'Riviera Storm'],
    date: '12/11/2025',
    time: '20:00',
    status: 'Em andamento',
    score: '3 x 2',
    location: 'Arena Centro'
  },
  {
    id: 'game-02',
    modality: 'Basquete',
    eventType: 'Copa',
    eventName: 'Arena Cup de Basquete 3x3',
    teams: ['Sky Dunkers', 'Coastline Vipers'],
    date: '13/11/2025',
    time: '18:30',
    status: 'Aguardando',
    score: '—',
    location: 'Quadra Leste'
  },
  {
    id: 'game-03',
    modality: 'Videogame de futebol',
    eventType: 'Torneio',
    eventName: 'Champions Digital Series',
    teams: ['eFalcons', 'Pixel United'],
    date: '09/11/2025',
    time: '16:00',
    status: 'Finalizado',
    score: '2 x 1',
    location: 'Sala Streaming ArenaPlay'
  },
  {
    id: 'game-04',
    modality: 'Vôlei de praia',
    eventType: 'Torneio',
    eventName: 'Circuito Nacional de Vôlei de Praia',
    teams: ['Duna Wave', 'Sunset Kings'],
    date: '10/11/2025',
    time: '10:00',
    status: 'Em andamento',
    score: '1 x 0 (21-18, 18-21, 15-12)',
    location: 'Arena Copacabana'
  }
]

function Home() {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  const [selectedModality, setSelectedModality] = useState('todas')
  const [selectedType, setSelectedType] = useState('todos')
  const [selectedStatus, setSelectedStatus] = useState('todos')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % sportsSlides.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  const filteredGames = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return publishedGames.filter((game) => {
      const matchesModality =
        selectedModality === 'todas' || game.modality.toLowerCase() === selectedModality
      const matchesType =
        selectedType === 'todos' || game.eventType.toLowerCase() === selectedType
      const matchesStatus =
        selectedStatus === 'todos' || game.status.toLowerCase() === selectedStatus

      const matchesSearch =
        !normalizedSearch ||
        game.eventName.toLowerCase().includes(normalizedSearch) ||
        game.teams.some((team) => team.toLowerCase().includes(normalizedSearch))

      return matchesModality && matchesType && matchesStatus && matchesSearch
    })
  }, [searchTerm, selectedModality, selectedStatus, selectedType])

  return (
    <>
      <header className="hero">
        <MotionDiv
          className="hero-content"
          id="como-funciona"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <MotionDiv className="hero-text" variants={fadeInUp}>
            <span className="highlight-pill">O palco dos seus campeonatos</span>
            <h1>
              Crie, organize e viva cada fase dos seus torneios em uma única
              plataforma.
            </h1>
            <p>
              Do planejamento à final, transforme campeonatos em experiências
              inesquecíveis. Simplifique inscrições, automatize tabelas e entregue
              diversão para atletas, staffs e torcedores.
            </p>
            <div className="hero-cta">
              <button type="button" className="primary-btn" onClick={() => navigate('/cadastro')}>
                Crie seu campeonato agora!
              </button>
              <button type="button" className="outline-btn" onClick={() => navigate('/cadastro')}>
                Participe de torneios incríveis!
              </button>
            </div>
            <div className="hero-metrics">
              {stats.slice(0, 3).map((stat) => (
                <div className="metric-card" key={stat.label}>
                  <span className="metric-value">{stat.value}</span>
                  <span className="metric-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </MotionDiv>
          <MotionDiv className="hero-visual" variants={fadeInFromRight}>
            <div className="score-card">
              <div className="score-card__head">
                <span>Final ao vivo</span>
                <span className="badge">Streaming</span>
              </div>
              <div className="score-card__teams">
                <div>
                  <span className="team-name">Falcons</span>
                  <span className="team-score">78</span>
                </div>
                <div>
                  <span className="team-name">Tigers</span>
                  <span className="team-score">74</span>
                </div>
              </div>
              <div className="score-card__progress">
                <span>4º quarto</span>
                <div className="progress-bar">
                  <span className="progress-fill" />
                </div>
              </div>
            </div>
            <div className="floating-card">
              <span className="floating-title">Inscrições em destaque</span>
              <ul>
                <li>
                  <span className="bullet" />
                  Copa Elite de Futebol 7
                  <span className="tag">+128 espectadores</span>
                </li>
                <li>
                  <span className="bullet" />
                  Battle Race Series
                  <span className="tag">Novo</span>
                </li>
                <li>
                  <span className="bullet" />
                  Arena Masters de E-sports
                  <span className="tag">8 vagas</span>
                </li>
              </ul>
            </div>
          </MotionDiv>
        </MotionDiv>
      </header>

      <nav className="secondary-nav" aria-label="Jogos publicados">
        <div className="secondary-nav__content">
          <div>
            <span className="secondary-nav__title">Jogos publicados</span>
            <p className="secondary-nav__subtitle">
              Acompanhe partidas públicas em tempo real, mesmo sem login.
            </p>
          </div>
          <a className="secondary-nav__cta" href="#jogos-publicados">
            Ver lista de jogos
          </a>
        </div>
      </nav>

      <main>
        <MotionSection
          className="features"
          id="destaques"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-header">
            <h2>Como sua organização ganha ritmo</h2>
            <p>
              Fluxos visuais, automações inteligentes e ferramentas que elevam o padrão dos seus eventos
              — tudo pensado para encantar atletas e torcedores.
            </p>
          </div>
          <div className="feature-grid">
            {featureHighlights.map((feature, index) => (
              <MotionArticle
                className="feature-card"
                key={feature.title}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <span className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="competition-types"
          id="tipos"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-header">
            <h2>Escolha o formato perfeito</h2>
            <p>
              Cada tipo de evento vem com fluxos guiados, justificativas pré-configuradas e ajustes para
              análise esportiva personalizada.
            </p>
          </div>
          <div className="types-grid">
            {competitionTypes.map((type, index) => (
              <MotionArticle
                className="type-card"
                key={type.name}
                variants={fadeInScale}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <h3>{type.name}</h3>
                <p className="type-structure">{type.structure}</p>
                <p>{type.justification}</p>
                <button type="button" className="outline-btn">
                  Justificar escolha
                </button>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="creation-flow"
          id="criacao"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="section-header">
            <h2>Criação orientada passo a passo</h2>
            <p>
              Um assistente visual conduz organizadores desde a definição da identidade até a montagem
              da tabela final.
            </p>
          </div>
          <div className="flow-grid">
            {creationFlow.map((block, index) => (
              <MotionArticle
                className="flow-card"
                key={block.title}
                variants={fadeInUp}
                transition={{ duration: 0.55, delay: index * 0.07 }}
              >
                <h3>{block.title}</h3>
                <ul>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="phase-structure"
          id="estruturas"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div className="section-header">
            <h2>Estruturas de fases inteligentes</h2>
            <p>
              Combine fases de grupos e mata-mata sem complicação. Ajuste critérios e acompanhe a
              evolução dos times com visualizações intuitivas.
            </p>
          </div>
          <div className="phase-grid">
            {Object.values(phaseBlueprint).map((phase, index) => (
              <MotionArticle
                className="phase-card"
                key={phase.title}
                variants={fadeInScale}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <h3>{phase.title}</h3>
                <ul>
                  {phase.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="standings-section"
          id="classificacao"
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <h2>Tabela de classificação vibrante</h2>
            <p>
              Visualização moderna com ícones para vitórias, empates e derrotas. Destaque automático
              para os três primeiros colocados e feedback instantâneo a cada atualização.
            </p>
          </div>
          <div className="standings-wrapper">
            <MotionTable
              className="standings-table"
              variants={fadeInScale}
              transition={{ duration: 0.55 }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Equipe</th>
                  <th>
                    <span className="icon-label" aria-hidden="true">
                      {formIcons.W}
                    </span>
                    V
                  </th>
                  <th>
                    <span className="icon-label" aria-hidden="true">
                      {formIcons.D}
                    </span>
                    E
                  </th>
                  <th>
                    <span className="icon-label" aria-hidden="true">
                      {formIcons.L}
                    </span>
                    D
                  </th>
                  <th>GP</th>
                  <th>GC</th>
                  <th>SG</th>
                  <th>Pontos</th>
                  <th>Forma</th>
                </tr>
              </thead>
              <tbody>
                {standingsData.map((row, index) => {
                  const goalDiff = row.goalsFor - row.goalsAgainst
                  const podiumClass =
                    row.position === 1
                      ? 'podium-1'
                      : row.position === 2
                      ? 'podium-2'
                      : row.position === 3
                      ? 'podium-3'
                      : ''
                  return (
                    <MotionTr
                      key={row.team}
                      className={`standings-row ${podiumClass}`}
                      variants={fadeInUp}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                    >
                      <td>
                        <span className="position-badge">{row.position}</span>
                      </td>
                      <td>
                        <div className="team-info">
                          <span className="team-badge" aria-hidden="true">
                            {row.badge}
                          </span>
                          {row.team}
                        </div>
                      </td>
                      <td>{row.wins}</td>
                      <td>{row.draws}</td>
                      <td>{row.losses}</td>
                      <td>{row.goalsFor}</td>
                      <td>{row.goalsAgainst}</td>
                      <td className={goalDiff >= 0 ? 'positive' : 'negative'}>
                        {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                      </td>
                      <td>
                        <span className="points-chip">{row.points}</span>
                      </td>
                      <td>
                        <div className="form-sequence">
                          {row.form.map((result, trendIndex) => (
                            <span key={`${row.team}-${result}-${trendIndex}`}>
                              {formIcons[result] ?? result}
                            </span>
                          ))}
                        </div>
                      </td>
                    </MotionTr>
                  )
                })}
              </tbody>
            </MotionTable>
            <div className="standings-legend">
              <span>
                {formIcons.W} = vitória · {formIcons.D} = empate · {formIcons.L} = derrota
              </span>
              <span>Medalhas destacam os três primeiros colocados.</span>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          className="final-results"
          id="ranking-final"
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-header">
            <h2>Resultados finais memoráveis</h2>
            <p>
              Ao final da competição, celebre os destaques e compartilhe o ranking completo em uma
              vitrine interativa.
            </p>
          </div>
          <div className="podium-card">
            <div className="podium-highlight">
              <span>🥇 Campeão</span>
              <strong>Time/Atleta em destaque com estatísticas do evento</strong>
            </div>
            <div className="podium-grid">
              <span>🥈 Vice-campeão</span>
              <span>🥉 Terceiro colocado</span>
              <span>📊 Ranking completo com exportação em PDF/CSV</span>
              <span>🏅 Destaques individuais e prêmios especiais</span>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          className="event-management"
          id="gerenciamento"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-header">
            <h2>Controle total do evento</h2>
            <p>
              Organize a jornada completa: atualize informações, ajuste visibilidade ou encerre ligas com
              poucos cliques.
            </p>
          </div>
          <div className="management-grid">
            <MotionArticle variants={fadeInUp} transition={{ duration: 0.5 }}>
              <h3>Editar & manter</h3>
              <p>Atualize dados, troque equipes, ajuste fases ou reabra inscrições após feedback.</p>
            </MotionArticle>
            <MotionArticle variants={fadeInUp} transition={{ duration: 0.5, delay: 0.06 }}>
              <h3>Visibilidade dinâmica</h3>
              <p>
                Transforme eventos privados em públicos instantaneamente para atrair torcida e novos
                patrocinadores.
              </p>
            </MotionArticle>
            <MotionArticle variants={fadeInUp} transition={{ duration: 0.5, delay: 0.12 }}>
              <h3>Encerramento estratégico</h3>
              <p>Congele resultados, arquive estatísticas e mantenha histórico disponível sob demanda.</p>
            </MotionArticle>
          </div>
        </MotionSection>

        <MotionSection
          className="public-events"
          id="eventos-publicos"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-header">
            <h2>Eventos públicos em destaque</h2>
            <p>
              Explore campeonatos, torneios e copas disponíveis para inscrição ou acompanhamento em
              tempo real.
            </p>
          </div>
          <div className="public-events-list">
            {publicEvents.map((event, index) => (
              <MotionArticle
                className="public-event-card"
                key={event.name}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <header>
                  <h3>{event.name}</h3>
                  <span>{event.status}</span>
                </header>
                <ul>
                  <li>
                    <strong>Modalidade:</strong> {event.modality}
                  </li>
                  <li>
                    <strong>Tipo:</strong> {event.type}
                  </li>
                  <li>
                    <strong>Criador:</strong> {event.owner}
                  </li>
                </ul>
                <button type="button" className="outline-btn">
                  Ver detalhes
                </button>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="event-gallery"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <div className="section-header">
            <h2>Exemplos que estão movimentando a comunidade</h2>
            <p>
              Inspire-se com eventos que usam a plataforma ArenaPlay para entregar experiências
              inesquecíveis em diferentes modalidades.
            </p>
          </div>
          <div className="event-grid">
            {sampleEvents.map((event, index) => (
              <MotionArticle
                className="event-card"
                key={event.title}
                style={{ backgroundImage: `url(${event.image})` }}
                variants={fadeInScale}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="event-overlay">
                  <span className="event-sport">{event.sport}</span>
                  <h3>{event.title}</h3>
                  <p>{event.participants}</p>
                  <span className="event-status">{event.status}</span>
                </div>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="public-games"
          id="jogos-publicados"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <div className="section-header">
            <h2>Jogos publicados</h2>
            <p>
              Visualize partidas abertas ao público, filtre por modalidade ou status e acompanhe
              placares em tempo real.
            </p>
          </div>
          <div className="games-filters">
            <label>
              <span>Modalidade</span>
              <select
                value={selectedModality}
                onChange={(event) => setSelectedModality(event.target.value)}
              >
                <option value="todas">Todas</option>
                {Array.from(new Set(publishedGames.map((game) => game.modality.toLowerCase()))).map(
                  (modality) => (
                    <option key={modality} value={modality}>
                      {modality.charAt(0).toUpperCase() + modality.slice(1)}
                    </option>
                  )
                )}
              </select>
            </label>
            <label>
              <span>Tipo</span>
              <select
                value={selectedType}
                onChange={(event) => setSelectedType(event.target.value)}
              >
                <option value="todos">Todos</option>
                {Array.from(new Set(publishedGames.map((game) => game.eventType.toLowerCase()))).map(
                  (type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  )
                )}
              </select>
            </label>
            <label>
              <span>Status</span>
              <select
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
              >
                <option value="todos">Todos</option>
                {Array.from(new Set(publishedGames.map((game) => game.status.toLowerCase()))).map(
                  (status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  )
                )}
              </select>
            </label>
            <label className="search-field">
              <span>Buscar</span>
              <input
                type="search"
                placeholder="Digite o nome do evento ou equipe"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
            <button
              type="button"
              className="ghost-btn"
              onClick={() => {
                setSelectedModality('todas')
                setSelectedType('todos')
                setSelectedStatus('todos')
                setSearchTerm('')
              }}
            >
              Limpar filtros
            </button>
          </div>

          <div className="games-list">
            {filteredGames.map((game) => (
              <MotionArticle
                className="game-card"
                key={game.id}
                variants={fadeInScale}
                transition={{ duration: 0.5 }}
              >
                <header>
                  <span className="game-tag">{game.modality}</span>
                  <span className={`status ${game.status.toLowerCase().replace(' ', '-')}`}>
                    {game.status}
                  </span>
                </header>
                <div className="game-core">
                  <div>
                    <h3>{game.eventName}</h3>
                    <p>{game.eventType}</p>
                  </div>
                  <div className="score-block">
                    <span>{game.teams[0]}</span>
                    <strong>{game.score}</strong>
                    <span>{game.teams[1]}</span>
                  </div>
                </div>
                <div className="game-meta">
                  <span>
                    {game.date} · {game.time}
                  </span>
                  {game.location ? <span>{game.location}</span> : null}
                </div>
                <details className="game-details">
                  <summary>Ver detalhes do jogo</summary>
                  <div className="game-details__content">
                    <div>
                      <strong>Estatísticas</strong>
                      <p>
                        Atualizações feitas pelo organizador com placar em tempo real via ArenaStream
                        (WebSocket).
                      </p>
                    </div>
                    <div>
                      <strong>Histórico de confrontos</strong>
                      <p>
                        Consulte jogos anteriores entre as equipes, desempenho recente e destaques.
                      </p>
                    </div>
                    <a href="#eventos-publicos" className="inline-link">
                      Ir para o evento completo
                    </a>
                  </div>
                </details>
              </MotionArticle>
            ))}
            {filteredGames.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum jogo encontrado com os filtros atuais.</p>
              </div>
            ) : null}
          </div>
          <p className="realtime-note">
            Apenas criadores autenticados podem inserir resultados e estatísticas. O feed público é
            atualizado automaticamente para todos os visitantes.
          </p>
        </MotionSection>

        <MotionSection
          className="carousel-section"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <div className="section-header">
            <h2>Esportes em destaque</h2>
            <p>
              Personalize formatos, regras e comunicações para qualquer modalidade com experiência
              visual hipnotizante.
            </p>
          </div>
          <div className="carousel">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {sportsSlides.map((slide) => (
                <MotionArticle
                  className="carousel-slide"
                  key={slide.title}
                  style={{ backgroundImage: `url(${slide.image})` }}
                  variants={fadeInScale}
                  transition={{ duration: 0.55 }}
                >
                  <div className="carousel-overlay">
                    <span className="carousel-tag">{slide.tag}</span>
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </MotionArticle>
              ))}
            </div>
            <div className="carousel-dots" role="tablist" aria-label="Esportes em destaque">
              {sportsSlides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={index === activeSlide ? 'active' : ''}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Ver destaque de ${slide.tag}`}
                  aria-selected={index === activeSlide}
                />
              ))}
            </div>
          </div>
        </MotionSection>

        <MotionSection
          className="social-proof"
          id="depoimentos"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="testimonials">
            {testimonials.map((testimonial, index) => (
              <MotionArticle
                className="testimonial-card"
                key={testimonial.name}
                variants={fadeInUp}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <span className="avatar" aria-hidden="true">
                  {testimonial.initials}
                </span>
                <p className="quote">"{testimonial.quote}"</p>
                <p className="author">
                  {testimonial.name} · <span>{testimonial.role}</span>
                </p>
              </MotionArticle>
            ))}
          </div>
          <MotionDiv className="stats-panel" variants={fadeInScale} transition={{ duration: 0.55 }}>
            <h2>Resultados que falam alto</h2>
            <div className="stats-grid">
              {stats.map((stat) => (
                <div className="stats-card" key={stat.label}>
                  <span className="stats-value">{stat.value}</span>
                  <span className="stats-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </MotionDiv>
        </MotionSection>

        <MotionSection
          className="cta"
          id="planos"
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
        >
          <MotionDiv className="cta-card" variants={fadeInScale} transition={{ duration: 0.55 }}>
            <h2>Pronto para lançar a próxima grande competição?</h2>
            <p>
              Comece grátis, convide sua equipe e evolua para planos profissionais quando estiver
              preparado. Seu torneio merece holofotes.
            </p>
            <div className="cta-actions">
              <button type="button" className="primary-btn" onClick={() => navigate('/cadastro')}>
                Começar agora
              </button>
              <button type="button" className="outline-btn" onClick={() => navigate('/#contato')}>
                Falar com especialista
              </button>
            </div>
          </MotionDiv>
        </MotionSection>
      </main>
    </>
  )
}

export default Home

