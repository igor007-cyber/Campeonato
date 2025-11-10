import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const featureHighlights = [
  {
    icon: '📊',
    title: 'Painel inteligente',
    description:
      'Visualize resultados, tabelas, rankings e estatísticas em tempo real em um dashboard vivo e personalizável.',
  },
  {
    icon: '🧭',
    title: 'Fluxo organizado',
    description:
      'Automatize fases, sorteios e chaves eliminatórias com poucos cliques – o sistema cuida das regras por você.',
  },
  {
    icon: '🤝',
    title: 'Engaje a comunidade',
    description:
      'Gerencie inscrições, convites e comunicação em um só lugar, com notificações e agenda integrada.',
  },
  {
    icon: '📱',
    title: 'Experiência mobile-first',
    description:
      'Acompanhe tudo do celular: resultados ao vivo, transmissões integradas e zonas interativas para torcedores.',
  },
]

const sampleEvents = [
  {
    title: 'Copa Elite de Futebol 7',
    sport: 'Futebol',
    status: 'Inscrições abertas',
    participants: '32 equipes',
    image:
      'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Arena Masters de E-sports',
    sport: 'E-sports',
    status: 'Top 16 definidos',
    participants: '8 finalistas',
    image:
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Circuito Nacional de Vôlei de Praia',
    sport: 'Vôlei',
    status: 'Etapa 5 em andamento',
    participants: '24 duplas',
    image:
      'https://images.unsplash.com/photo-1505842465776-3acb7e612d96?auto=format&fit=crop&w=1200&q=80',
  },
]

const sportsSlides = [
  {
    title: 'Liga Universitária de Basquete',
    description:
      'Temporada completa com calendário inteligente, estatísticas avançadas e rankings semanais.',
    image:
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1600&q=80',
    tag: 'Basquete',
  },
  {
    title: 'Champions Cup de Futebol Digital',
    description:
      'Torneio híbrido com fases online e presencial, transmissão integrada e experiência gamificada.',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1600&q=80',
    tag: 'FIFA 25',
  },
  {
    title: 'Battle Race Series',
    description:
      'Organize corridas de kart, ciclismo ou corrida de rua com checkpoints, rankings por ritmo e kit do atleta.',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80',
    tag: 'Corridas',
  },
]

const testimonials = [
  {
    quote:
      'Centralizamos toda a organização da liga em um só painel. Inscrições, calendário e comunicação ficaram impecáveis.',
    name: 'Mariana Duarte',
    role: 'Diretora da Liga Metropolitana',
    initials: 'MD',
  },
  {
    quote:
      'O engajamento da comunidade triplicou. Os atletas adoram votar nos destaques e receber alertas instantâneos.',
    name: 'Thiago Lopes',
    role: 'Fundador da Arena Vision',
    initials: 'TL',
  },
]

const stats = [
  { label: 'eventos criados', value: '+1000' },
  { label: 'organizadores ativos', value: '+260' },
  { label: 'participantes satisfeitos', value: '97%' },
  { label: 'esportes suportados', value: '40+' },
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
    form: ['W', 'W', 'W', 'D', 'W'],
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
    form: ['W', 'D', 'W', 'W', 'D'],
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
    form: ['L', 'W', 'W', 'L', 'W'],
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
    form: ['W', 'L', 'W', 'L', 'L'],
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
    form: ['D', 'L', 'W', 'L', 'W'],
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
    form: ['L', 'D', 'L', 'W', 'D'],
  },
]

const formIcons: Record<string, string> = {
  W: '🏆',
  D: '🤝',
  L: '⚔️',
}

const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

const fadeInFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const competitionTypes = [
  {
    name: 'Campeonato',
    structure: 'Fase de grupos com pontuação acumulada',
    justification:
      'Ideal para temporadas longas, garante equilíbrio com jogos de ida e volta e critérios detalhados de classificação.',
  },
  {
    name: 'Torneio',
    structure: 'Grupos + mata-mata',
    justification:
      'Perfeito para experiências intensas: fase classificatória garante rodagem e mata-mata entrega emoção na reta final.',
  },
  {
    name: 'Copa',
    structure: 'Eliminatória direta (mata-mata)',
    justification:
      'Formato clássico e ágil, excelente para eventos especiais e festivais com foco em partidas decisivas.',
  },
]

const creationFlow = [
  {
    title: 'Informações essenciais',
    items: [
      'Defina nome do evento, modalidade(s) e tipo de disputa',
      'Escolha a visibilidade: público para exposição ou privado para eventos fechados',
    ],
  },
  {
    title: 'Estrutura da competição',
    items: [
      'Selecione se haverá fase de grupos, mata-mata ou a combinação de ambos',
      'Determine partidas por grupo, critérios de distribuição e quantos avançam por chave',
    ],
  },
  {
    title: 'Organização dos participantes',
    items: [
      'Cadastre equipes manualmente ou importe listas em massa',
      'Use sorteio automatizado ou distribua times manualmente, com pré-visualização das chaves',
    ],
  },
]

const phaseBlueprint = {
  groupStage: {
    title: 'Fase de grupos',
    highlights: [
      'Cadastro de clubes manual ou por sorteio automático',
      'Tabela dinâmica com jogos, resultados, classificação e atualização automática',
      'Critérios de desempate configuráveis: saldo de gols/pontos, confronto direto, fair play',
    ],
  },
  knockoutStage: {
    title: 'Mata-mata',
    highlights: [
      'Chaves geradas automaticamente com base na classificação dos grupos',
      'Atualização em tempo real conforme vencedores avançam',
      'Opções para jogo único, ida e volta e disputa de terceiro lugar',
    ],
  },
}

const publicEvents = [
  {
    name: 'Liga Metropolitana de Futsal',
    modality: 'Futsal',
    type: 'Campeonato',
    status: 'Em andamento',
    owner: 'Academia Urban Sports',
  },
  {
    name: 'Arena Cup de Basquete 3x3',
    modality: 'Basquete',
    type: 'Copa',
    status: 'Inscrições abertas',
    owner: 'ArenaPlay Originals',
  },
  {
    name: 'Circuito Nacional de Vôlei de Praia',
    modality: 'Vôlei de praia',
    type: 'Torneio',
    status: 'Finalizado',
    owner: 'Federação Brasileira de Praia',
  },
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
    location: 'Arena Centro',
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
    location: 'Quadra Leste',
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
    location: 'Sala Streaming ArenaPlay',
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
    location: 'Arena Copacabana',
  },
]

const scoringBlocks = [
  {
    title: 'Modalidades com 3 pontos por vitória',
    sports: ['Handebol', 'Videogame de futebol', 'Futsal', 'Futebol de campo'],
    bullet: 'Vitória = 3 pts · Empate = 1 pt · Derrota = 0 pt · Desempate por saldo de gols',
  },
  {
    title: 'Modalidades com 2 pontos por vitória',
    sports: ['Vôlei', 'Tênis de mesa', 'Basquete', 'Vôlei de praia'],
    bullet: 'Vitória = 2 pts · Empate = 1 pt · Derrota = 0 pt · Desempate por saldo de pontos',
  },
]

type SectionTitleProps = {
  eyebrow?: string
  title: string
  description: string
  align?: 'left' | 'center'
}

const SectionTitle = ({ eyebrow, title, description, align = 'center' }: SectionTitleProps) => (
  <div className={`space-y-4 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
    {eyebrow ? (
      <span className="inline-flex items-center justify-center rounded-full bg-brand-soft px-4 py-1 text-sm font-semibold uppercase tracking-wide text-brand-primary">
        {eyebrow}
      </span>
    ) : null}
    <h2 className="text-3xl font-semibold tracking-tight text-ink dark:text-white sm:text-4xl">{title}</h2>
    <p className="text-base text-ink-subtle dark:text-ink-light/75">{description}</p>
  </div>
)

const MotionSection = motion.section
const MotionDiv = motion.div
const MotionArticle = motion.article

const modalityFilters = [
  { value: 'todas', label: 'Todas as modalidades' },
  { value: 'futsal', label: 'Futsal' },
  { value: 'basquete', label: 'Basquete' },
  { value: 'videogame de futebol', label: 'Videogame de futebol' },
  { value: 'vôlei de praia', label: 'Vôlei de praia' },
]

const typeFilters = [
  { value: 'todos', label: 'Todos os tipos' },
  { value: 'campeonato', label: 'Campeonato' },
  { value: 'torneio', label: 'Torneio' },
  { value: 'copa', label: 'Copa' },
]

const statusFilters = [
  { value: 'todos', label: 'Todos os status' },
  { value: 'em andamento', label: 'Em andamento' },
  { value: 'finalizado', label: 'Finalizado' },
  { value: 'aguardando', label: 'Aguardando' },
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

  const currentSlide = sportsSlides[activeSlide] ?? sportsSlides[0]

  return (
    <>
      <header
        id="como-funciona"
        className="relative overflow-hidden bg-brand-secondary text-white"
      >
        <div className="absolute inset-0 bg-hero-gradient" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28 lg:px-8">
          <MotionDiv
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-brand-primary">
              <span className="text-lg">⚡</span>
              O palco dos seus campeonatos
            </span>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Crie, organize e viva cada fase dos seus torneios em uma única plataforma.
              </h1>
              <p className="max-w-xl text-base text-white/80 sm:text-lg">
                Do planejamento à final, transforme campeonatos em experiências inesquecíveis. Simplifique
                inscrições, automatize tabelas e entregue diversão para atletas, staffs e torcedores.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate('/cadastro')}
                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-7 py-3 text-sm font-semibold text-brand-secondary shadow-glow transition hover:bg-brand-primaryAccent"
              >
                Crie seu campeonato agora!
              </button>
              <button
                type="button"
                onClick={() => navigate('/cadastro')}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/20"
              >
                Participe de torneios incríveis!
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/15 bg-white/5 p-4 text-left backdrop-blur-md"
                >
                  <span className="text-3xl font-semibold text-brand-primary">{stat.value}</span>
                  <p className="mt-2 text-xs uppercase tracking-wide text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </MotionDiv>

          <MotionDiv
            variants={fadeInFromRight}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span>Final ao vivo</span>
                <span className="rounded-full bg-brand-primary/20 px-3 py-1 text-xs font-semibold text-brand-primary">
                  Streaming
                </span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-center text-white">
                <div className="space-y-2">
                  <span className="block text-sm text-white/70">Falcons</span>
                  <span className="text-3xl font-semibold">78</span>
                </div>
                <div className="space-y-2">
                  <span className="block text-sm text-white/70">Tigers</span>
                  <span className="text-3xl font-semibold">74</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <span className="text-xs uppercase tracking-wide text-white/70">4º quarto</span>
                <div className="h-2 w-full rounded-full bg-white/10">
                  <span className="block h-full w-3/4 rounded-full bg-brand-primary" />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <span className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
                Inscrições em destaque
              </span>
              <ul className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  Copa Elite de Futebol 7
                  <span className="rounded-full bg-brand-primary/20 px-3 py-1 text-xs font-semibold text-brand-primary">
                    +128 espectadores
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  Battle Race Series
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                    Novo
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  Arena Masters de E-sports
                  <span className="rounded-full bg-brand-primary/20 px-3 py-1 text-xs font-semibold text-brand-primary">
                    8 vagas
                  </span>
                </li>
              </ul>
            </div>
          </MotionDiv>
        </div>
      </header>

      <nav className="border-y border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-brand-secondary/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
              Jogos publicados
            </span>
            <p className="text-sm text-ink-subtle dark:text-ink-light/70">
              Acompanhe partidas públicas em tempo real, mesmo sem login.
            </p>
          </div>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/20"
            href="#jogos-publicados"
          >
            Ver lista de jogos
          </a>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-7xl space-y-24 px-4 py-16 sm:px-6 lg:px-8">
        <MotionSection
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-12"
        >
          <SectionTitle
            eyebrow="Destaques"
            title="Como sua organização ganha ritmo"
            description="Fluxos visuais, automações inteligentes e ferramentas que elevam o padrão dos seus eventos — tudo pensado para encantar atletas e torcedores."
          />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featureHighlights.map((feature, index) => (
              <MotionArticle
                key={feature.title}
                variants={fadeInUp}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg transition hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-brand-secondary/70"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-4 text-lg font-semibold text-ink dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-ink-subtle dark:text-ink-light/80">{feature.description}</p>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="space-y-8">
            <SectionTitle
              eyebrow="Vitrine ArenaPlay"
              title="Eventos com experiência premium"
              description="Galeria dinâmica preparada para inspirar organizadores e equipes com formatos híbridos, streams integrados e destaque para inscritos."
              align="left"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {sampleEvents.map((event) => (
                <div
                  key={event.title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-100 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/85 via-brand-secondary/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 space-y-2 p-6 text-white">
                    <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                      {event.status}
                    </span>
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-sm text-white/80">
                      {event.sport} · {event.participants}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <MotionDiv
            variants={fadeInScale}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-slate-100 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${currentSlide.image})` }}
            />
            <div className="relative flex h-full flex-col justify-between bg-gradient-to-br from-brand-secondary/80 via-brand-secondary/60 to-brand-secondary/40 p-8 text-white">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  {currentSlide.tag}
                </span>
                <h3 className="text-2xl font-semibold">{currentSlide.title}</h3>
                <p className="text-sm text-white/80">{currentSlide.description}</p>
              </div>
              <div className="mt-8 flex items-center gap-2">
                {sportsSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 w-10 rounded-full transition ${
                      index === activeSlide
                        ? 'bg-brand-primary'
                        : 'bg-white/40 hover:bg-white/70 focus-visible:bg-white/70'
                    }`}
                    aria-label={`Mostrar destaque ${slide.title}`}
                  />
                ))}
              </div>
            </div>
          </MotionDiv>
        </MotionSection>

        <MotionSection
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10"
        >
          <SectionTitle
            eyebrow="Formatos oficiais"
            title="Escolha o formato perfeito"
            description="Cada tipo de evento vem com fluxos guiados, justificativas pré-configuradas e ajustes para análise esportiva personalizada."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {competitionTypes.map((type, index) => (
              <MotionArticle
                key={type.name}
                variants={fadeInScale}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg transition hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-brand-secondary/70"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-ink dark:text-white">{type.name}</h3>
                  <p className="text-sm font-medium uppercase tracking-wide text-brand-primary">{type.structure}</p>
                  <p className="text-sm text-ink-subtle dark:text-ink-light/80">{type.justification}</p>
                </div>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-brand-primary bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/20"
                >
                  Justificar escolha
                </button>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10"
        >
          <SectionTitle
            eyebrow="Fluxo guiado"
            title="Crie seu evento em etapas claras"
            description="A ArenaPlay oferece assistentes visuais e recomendações automáticas para acelerar a configuração de campeonatos, torneios e copas."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {creationFlow.map((step, index) => (
              <MotionArticle
                key={step.title}
                variants={fadeInUp}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-sm font-semibold text-brand-primary">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink dark:text-white">{step.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-ink-subtle dark:text-ink-light/80">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 text-brand-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-6 lg:grid-cols-2"
        >
          {Object.values(phaseBlueprint).map((phase) => (
            <article
              key={phase.title}
              className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
            >
              <h3 className="text-xl font-semibold text-ink dark:text-white">{phase.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-ink-subtle dark:text-ink-light/80">
                {phase.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span className="mt-1 text-brand-primary">✓</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </MotionSection>

        <MotionSection
          id="classificacao"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10"
        >
          <SectionTitle
            eyebrow="Classificação em tempo real"
            title="Ranking atualizado com métricas avançadas"
            description="Automatize cálculos de pontos, saldo e histórico de forma. Tabelas responsivas exibem estatísticas completas para comissão técnica e torcedores."
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/90 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200/60 text-left text-sm dark:divide-white/10">
                  <thead className="bg-slate-100/80 text-xs uppercase tracking-wide text-ink-subtle dark:bg-brand-secondary/60 dark:text-ink-light/70">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Pos</th>
                      <th className="px-4 py-3 font-semibold">Equipe</th>
                      <th className="px-4 py-3 font-semibold">J</th>
                      <th className="px-4 py-3 font-semibold">V</th>
                      <th className="px-4 py-3 font-semibold">E</th>
                      <th className="px-4 py-3 font-semibold">D</th>
                      <th className="px-4 py-3 font-semibold">GP</th>
                      <th className="px-4 py-3 font-semibold">GC</th>
                      <th className="px-4 py-3 font-semibold">Pts</th>
                      <th className="px-4 py-3 font-semibold">Form</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
                    {standingsData.map((team) => (
                      <tr
                        key={team.team}
                        className={`transition hover:bg-brand-soft/40 dark:hover:bg-brand-secondary/60 ${
                          team.position <= 3 ? 'bg-brand-soft/20 dark:bg-brand-secondary/50' : ''
                        }`}
                      >
                        <td className="px-4 py-3 font-semibold text-ink dark:text-ink-light">{team.position}</td>
                        <td className="flex items-center gap-3 px-4 py-3">
                          <span className="text-xl">{team.badge}</span>
                          <span className="font-semibold text-ink dark:text-ink-light">{team.team}</span>
                        </td>
                        <td className="px-4 py-3">{team.wins + team.draws + team.losses}</td>
                        <td className="px-4 py-3 font-semibold text-brand-primary">{team.wins}</td>
                        <td className="px-4 py-3">{team.draws}</td>
                        <td className="px-4 py-3">{team.losses}</td>
                        <td className="px-4 py-3">{team.goalsFor}</td>
                        <td className="px-4 py-3">{team.goalsAgainst}</td>
                        <td className="px-4 py-3 font-semibold text-brand-primary">{team.points}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {team.form.map((result, index) => (
                              <span
                                key={`${team.team}-form-${result}-${index}`}
                                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-sm"
                              >
                                {formIcons[result]}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70">
              <h3 className="text-lg font-semibold text-ink dark:text-white">Regras de pontuação</h3>
              <p className="text-sm text-ink-subtle dark:text-ink-light/75">
                Configure critérios de desempate como saldo, confronto direto ou fair play. Ajustes ficam disponíveis
                para cada modalidade do painel administrativo.
              </p>
              <div className="space-y-4">
                {scoringBlocks.map((block) => (
                  <div
                    key={block.title}
                    className="rounded-2xl border border-brand-primary/20 bg-brand-soft/40 p-4 text-sm text-ink dark:border-brand-primary/30 dark:text-ink-light"
                  >
                    <h4 className="font-semibold text-brand-primary">{block.title}</h4>
                    <p className="mt-1 text-xs uppercase tracking-wide text-brand-primary/80">{block.sports.join(' · ')}</p>
                    <p className="mt-3 text-sm">{block.bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionSection>

        <MotionSection
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10"
        >
          <SectionTitle
            eyebrow="Eventos públicos"
            title="Vitrine aberta para torcedores"
            description="Eventos publicados aparecem com status, modalidade e responsáveis. Os privados permanecem ocultos até que você altere a visibilidade."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {publicEvents.map((event) => (
              <article
                key={event.name}
                className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
                    {event.status}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-subtle dark:text-ink-light/70">
                    {event.type}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-ink dark:text-white">{event.name}</h3>
                <p className="text-sm text-ink-subtle dark:text-ink-light/80">{event.modality}</p>
                <p className="mt-6 text-xs uppercase tracking-wide text-ink-subtle dark:text-ink-light/60">
                  Criado por {event.owner}
                </p>
              </article>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          id="jogos-publicados"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10"
        >
          <SectionTitle
            eyebrow="Jogos publicados"
            title="Atualizações em tempo real"
            description="Somente o criador pode atualizar placares, mas todos acompanham instantes depois via WebSocket integrado."
          />
          <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
            <div className="space-y-4 rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70">
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <select
                  value={selectedModality}
                  onChange={(event) => setSelectedModality(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-white/10 dark:bg-brand-secondary/70"
                >
                  {modalityFilters.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-white/10 dark:bg-brand-secondary/70"
                >
                  {typeFilters.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-white/10 dark:bg-brand-secondary/70"
                >
                  {statusFilters.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar evento ou equipe"
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 dark:border-white/10 dark:bg-brand-secondary/70"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedModality('todas')
                  setSelectedType('todos')
                  setSelectedStatus('todos')
                  setSearchTerm('')
                }}
                className="inline-flex items-center justify-center rounded-full border border-brand-primary bg-brand-primary/10 px-4 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/20"
              >
                Limpar filtros
              </button>
            </div>

            <div className="space-y-3 rounded-3xl border border-brand-primary/30 bg-brand-soft/50 p-6 shadow-soft-lg dark:border-brand-primary/40 dark:bg-brand-secondary/70">
              <h3 className="text-lg font-semibold text-brand-primary">
                Filtre por modalidade, tipo, status e nome
              </h3>
              <p className="text-sm text-ink-subtle dark:text-ink-light/80">
                O feed reflete o que os organizadores publicam. Cada atualização aparece na íntegra para
                torcedores, com histórico de confrontos e link para o evento completo.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredGames.map((game) => (
              <button
                key={game.id}
                type="button"
                className="flex flex-col items-start gap-4 rounded-3xl border border-slate-200/70 bg-white/80 p-6 text-left shadow-soft-lg transition hover:-translate-y-1 hover:shadow-glow dark:border-white/10 dark:bg-brand-secondary/70"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
                    {game.modality}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-subtle dark:text-ink-light/70">
                    {game.eventType}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ink dark:text-white">{game.eventName}</h3>
                <div className="flex items-center gap-2 text-sm text-ink-subtle dark:text-ink-light/80">
                  <span>{game.teams[0]}</span>
                  <span className="text-brand-primary">vs</span>
                  <span>{game.teams[1]}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-ink-subtle dark:text-ink-light/60">
                  <span>{game.date}</span>
                  <span>•</span>
                  <span>{game.time}</span>
                  <span>•</span>
                  <span>{game.location}</span>
                </div>
                <div className="flex w-full items-center justify-between text-sm">
                  <span className="font-semibold text-brand-primary">{game.score}</span>
                  <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-primary">
                    {game.status}
                  </span>
                </div>
              </button>
            ))}
            {filteredGames.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200/70 bg-white/80 p-10 text-center text-sm text-ink-subtle dark:border-white/15 dark:bg-brand-secondary/70 dark:text-ink-light/70">
                Nenhum jogo corresponde aos filtros aplicados. Ajuste os critérios para visualizar mais partidas.
              </div>
            ) : null}
          </div>
        </MotionSection>

        <MotionSection
          id="depoimentos"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10"
        >
          <SectionTitle
            eyebrow="Depoimentos"
            title="Quem usa ArenaPlay recomenda"
            description="Organizadores e ligas profissionais destacam autonomia, engajamento e desempenho das equipes ao migrar para a ArenaPlay."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <MotionArticle
                key={testimonial.name}
                variants={fadeInUp}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/15 text-base font-semibold text-brand-primary">
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink dark:text-white">{testimonial.name}</p>
                    <p className="text-xs uppercase tracking-wide text-ink-subtle dark:text-ink-light/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-ink-subtle dark:text-ink-light/80">“{testimonial.quote}”</p>
              </MotionArticle>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-3xl border border-brand-primary/25 bg-brand-soft/50 p-10 text-center shadow-soft-lg dark:border-brand-primary/35 dark:bg-brand-secondary/70"
        >
          <h3 className="text-2xl font-semibold text-ink dark:text-white">
            Pronto para lançar seu próximo campeonato?
          </h3>
          <p className="mt-4 text-sm text-ink-subtle dark:text-ink-light/80">
            Cadastre-se gratuitamente, configure modalidades e convide equipes em minutos. A plataforma cuida do resto.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/cadastro')}
              className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-secondary shadow-glow transition hover:bg-brand-primaryAccent"
            >
              Criar conta
            </button>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center rounded-full border border-brand-primary bg-transparent px-6 py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/10"
            >
              Já tenho login
            </button>
          </div>
        </MotionSection>

        <section className="grid gap-6 md:grid-cols-3">
          <div
            id="sobre"
            className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <h4 className="text-lg font-semibold text-ink dark:text-white">Sobre</h4>
            <p className="mt-3 text-sm text-ink-subtle dark:text-ink-light/80">
              A ArenaPlay nasceu para simplificar a gestão de campeonatos, torneios e copas em qualquer modalidade,
              oferecendo ferramentas modernas de organização, comunicação e transmissão.
            </p>
          </div>
          <div
            id="contato"
            className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <h4 className="text-lg font-semibold text-ink dark:text-white">Contato</h4>
            <p className="mt-3 text-sm text-ink-subtle dark:text-ink-light/80">
              Fale com nossa equipe pelo e-mail{' '}
              <a href="mailto:contato@arenaplay.com" className="text-brand-primary underline">
                contato@arenaplay.com
              </a>{' '}
              ou envie uma mensagem pelo WhatsApp (11) 90000-0000. Atendimento em horário comercial.
            </p>
          </div>
          <div
            id="termos"
            className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <h4 className="text-lg font-semibold text-ink dark:text-white">Termos e políticas</h4>
            <p className="mt-3 text-sm text-ink-subtle dark:text-ink-light/80">
              Transparência total sobre privacidade, publicação de eventos e direitos de transmissão. Consulte nossa
              política completa diretamente no painel administrativo.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
