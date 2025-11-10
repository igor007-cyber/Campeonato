import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MotionSection = motion.section
const MotionArticle = motion.article
const MotionDiv = motion.div

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
}

const eventTypes = [
  {
    id: 'campeonato',
    title: 'Campeonato',
    description:
      'Rodadas completas com ida e volta, critérios de desempate sofisticados e destaque para regularidade.',
  },
  {
    id: 'torneio',
    title: 'Torneio',
    description: 'Fase de grupos curta + mata-mata dinâmico. Ideal para eventos concentrados em poucos dias.',
  },
  {
    id: 'copa',
    title: 'Copa',
    description: 'Eliminatória direta. Cada jogo é decisivo e permite experiências rápidas ou festivais temáticos.',
  },
]

const structureOptions = [
  {
    id: 'grupos',
    label: 'Fase de grupos',
    description: 'Monte chaves, defina quantas rodadas e envie critérios de desempate automáticos.',
  },
  {
    id: 'mata-mata',
    label: 'Mata-mata',
    description: 'Crie chaves eliminatórias simples ou ida e volta, com bolhas para terceiro lugar.',
  },
  {
    id: 'hibrido',
    label: 'Híbrido',
    description: 'Combine grupos e mata-mata na mesma jornada sem perder o controle das estatísticas.',
  },
]

const distributionOptions = [
  {
    id: 'manual',
    title: 'Distribuição manual',
    description: 'Arraste e solte equipes para cada grupo ou chave. Ideal quando você conhece as rivalidades.',
  },
  {
    id: 'aleatoria',
    title: 'Sorteio inteligente',
    description:
      'O sistema embaralha automaticamente considerando seeds, confederações ou níveis configurados.',
  },
]

const knockoutPaths = [
  { id: 'oitavas', label: 'Oitavas de final', teams: 16 },
  { id: 'quartas', label: 'Quartas de final', teams: 8 },
  { id: 'semis', label: 'Semifinais', teams: 4 },
  { id: 'final', label: 'Final', teams: 2 },
]

const scoringBlocks = [
  {
    id: 'tres-pontos',
    title: 'Modalidades 3 pontos por vitória',
    sports: ['Handebol', 'Videogame de futebol', 'Futsal', 'Futebol de campo'],
    rules: ['Vitória = 3 pts', 'Empate = 1 pt', 'Derrota = 0 pt', 'Saldo de gols define empate'],
    metrics: ['J', 'V', 'E', 'D', 'Gols pró', 'Gols contra', 'Saldo', 'Pontos'],
  },
  {
    id: 'dois-pontos',
    title: 'Modalidades 2 pontos por vitória',
    sports: ['Vôlei', 'Tênis de mesa', 'Basquete', 'Vôlei de praia'],
    rules: ['Vitória = 2 pts', 'Empate = 1 pt', 'Derrota = 0 pt', 'Saldo de pontos define empate'],
    metrics: ['J', 'V', 'E', 'D', 'Pontos pró', 'Pontos contra', 'Saldo', 'Pontos'],
  },
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
    <div className="bg-surface-light px-4 py-16 text-ink transition-colors duration-300 dark:bg-brand-secondary dark:text-ink-light">
      <MotionSection
        id="administrador"
        variants={fadeInScale}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.55 }}
        className="mx-auto w-full max-w-7xl space-y-12"
      >
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="space-y-4">
            <span className="inline-flex items-center justify-center rounded-full bg-brand-soft px-4 py-1 text-sm font-semibold uppercase tracking-wide text-brand-primary">
              Painel do organizador
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-ink dark:text-white">
              Área Administrativa – construa o evento do seu jeito
            </h2>
            <p className="max-w-3xl text-sm text-ink-subtle dark:text-ink-light/80">
              Defina estrutura, visibilidade, critérios de pontuação e deixe o sistema entregar tabelas, chaveamentos e
              rankings automaticamente.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full border border-brand-primary bg-brand-primary/10 px-5 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/20"
          >
            ← Voltar ao início
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <MotionArticle
            variants={fadeInUp}
            className="h-full rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <h3 className="text-xl font-semibold text-ink dark:text-white">Tipo de evento</h3>
            <div className="mt-4 grid gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setEventType(type.id)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                    eventType === type.id
                      ? 'border-brand-primary bg-brand-soft text-brand-primary shadow-glow'
                      : 'border-slate-200 bg-white/80 text-ink hover:border-brand-primary/40 hover:bg-brand-soft/30 dark:border-white/10 dark:bg-brand-secondary/60 dark:text-ink-light'
                  }`}
                >
                  <span className="text-sm font-semibold uppercase tracking-wide">{type.title}</span>
                  <p className="mt-2 text-sm text-ink-subtle dark:text-ink-light/70">{type.description}</p>
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-subtle dark:text-ink-light/70">
              O sistema solicita uma justificativa rápida para entender se você privilegia pontos corridos, jornadas
              curtas ou mata-mata puro.
            </p>
          </MotionArticle>

          <MotionArticle
            variants={fadeInUp}
            transition={{ delay: 0.08 }}
            className="h-full rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <h3 className="text-xl font-semibold text-ink dark:text-white">Visibilidade e publicação</h3>
            <div className="mt-4 inline-flex rounded-full bg-brand-soft p-1">
              <button
                type="button"
                onClick={() => setVisibility('publico')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  visibility === 'publico'
                    ? 'bg-brand-primary text-brand-secondary shadow-glow'
                    : 'text-ink-subtle hover:text-brand-primary dark:text-ink-light/70'
                }`}
              >
                Público
              </button>
              <button
                type="button"
                onClick={() => setVisibility('privado')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  visibility === 'privado'
                    ? 'bg-brand-primary text-brand-secondary shadow-glow'
                    : 'text-ink-subtle hover:text-brand-primary dark:text-ink-light/70'
                }`}
              >
                Privado
              </button>
            </div>
            <p className="mt-4 text-sm text-ink-subtle dark:text-ink-light/70">{visibilityLabel}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-full border border-brand-primary bg-transparent px-4 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/10"
              >
                Pré-visualizar vitrine
              </button>
              <button
                type="button"
                className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-ink-subtle transition hover:text-brand-primary dark:text-ink-light/70"
              >
                Alternar visibilidade
              </button>
            </div>
          </MotionArticle>

          <MotionArticle
            variants={fadeInUp}
            transition={{ delay: 0.16 }}
            className="h-full rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <h3 className="text-xl font-semibold text-ink dark:text-white">Estrutura técnica</h3>
            <div className="mt-4 grid gap-3">
              {structureOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setStructure(option.id as typeof structure)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                    structure === option.id
                      ? 'border-brand-primary bg-brand-soft text-brand-primary shadow-glow'
                      : 'border-slate-200 bg-white/80 text-ink hover:border-brand-primary/40 hover:bg-brand-soft/30 dark:border-white/10 dark:bg-brand-secondary/60 dark:text-ink-light'
                  }`}
                >
                  <span className="text-sm font-semibold uppercase tracking-wide">{option.label}</span>
                  <p className="mt-2 text-sm text-ink-subtle dark:text-ink-light/70">{option.description}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <span className="text-sm font-semibold text-ink dark:text-ink-light">
                Partidas por fase de grupos
              </span>
              <input
                type="range"
                min={1}
                max={6}
                value={groupMatches}
                onChange={(event) => setGroupMatches(Number(event.target.value))}
                className="w-full accent-brand-primary"
              />
              <p className="text-sm text-ink-subtle dark:text-ink-light/70">
                Cada equipe joga <span className="font-semibold text-brand-primary">{groupMatches}</span> vezes na fase
                classificatória antes de avançar.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {distributionOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDistribution(option.id as typeof distribution)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                    distribution === option.id
                      ? 'border-brand-primary bg-brand-soft text-brand-primary shadow-glow'
                      : 'border-slate-200 bg-white/80 text-ink hover:border-brand-primary/40 hover:bg-brand-soft/30 dark:border-white/10 dark:bg-brand-secondary/60 dark:text-ink-light'
                  }`}
                >
                  <span className="text-sm font-semibold uppercase tracking-wide">{option.title}</span>
                  <p className="mt-2 text-sm text-ink-subtle dark:text-ink-light/70">{option.description}</p>
                </button>
              ))}
            </div>
          </MotionArticle>

          <MotionArticle
            variants={fadeInUp}
            transition={{ delay: 0.24 }}
            className="h-full rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <h3 className="text-xl font-semibold text-ink dark:text-white">Chaveamento automático</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {knockoutPaths.map((path) => (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => setKnockoutBase(path.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    knockoutBase === path.id
                      ? 'border-brand-primary bg-brand-primary text-brand-secondary shadow-glow'
                      : 'border-slate-200 bg-white/80 text-ink hover:border-brand-primary/40 hover:bg-brand-soft/30 dark:border-white/10 dark:bg-brand-secondary/60 dark:text-ink-light'
                  }`}
                >
                  {path.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-subtle dark:text-ink-light/70">{knockoutDescription}</p>
            <div className="mt-6 grid gap-3 rounded-2xl bg-brand-soft/40 p-4 text-sm font-semibold text-ink dark:bg-brand-secondary/60 dark:text-ink-light">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1 rounded-2xl bg-white/70 px-3 py-2 text-center dark:bg-brand-secondary/70">
                  <span>Grupos</span>
                  <span className="block text-xs text-ink-subtle dark:text-ink-light/60">1º &amp; 2º</span>
                </div>
                <div className="space-y-1 rounded-2xl bg-white/70 px-3 py-2 text-center dark:bg-brand-secondary/70">
                  <span>Quartas</span>
                  <span className="block text-xs text-ink-subtle dark:text-ink-light/60">Semis</span>
                  <span className="block text-xs text-ink-subtle dark:text-ink-light/60">Final</span>
                </div>
                <div className="space-y-1 rounded-2xl bg-brand-primary/15 px-3 py-2 text-center text-brand-primary">
                  <span>🥇 Campeão</span>
                  <span className="block text-brand-primary/80">🥈 Vice</span>
                  <span className="block text-brand-primary/80">🥉 Terceiro</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink-subtle dark:text-ink-light/70">
              Você pode definir manualmente os confrontos ou deixar a inteligência do ArenaPlay sortear em segundos.
            </p>
          </MotionArticle>

          <MotionDiv
            variants={fadeInUp}
            transition={{ delay: 0.32 }}
            className="rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <h3 className="text-xl font-semibold text-ink dark:text-white">Regras de pontuação e classificação</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {scoringBlocks.map((block) => (
                <article
                  key={block.id}
                  className="rounded-2xl border border-brand-primary/25 bg-brand-soft/50 p-4 text-sm text-ink dark:border-brand-primary/35 dark:text-ink-light"
                >
                  <h4 className="text-base font-semibold text-brand-primary">{block.title}</h4>
                  <p className="mt-1 text-xs uppercase tracking-wide text-brand-primary/80">
                    {block.sports.join(' · ')}
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {block.rules.map((rule) => (
                      <li key={rule} className="flex items-start gap-2">
                        <span className="mt-1 text-brand-primary">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {block.metrics.map((metric) => (
                      <span
                        key={metric}
                        className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary dark:bg-brand-secondary/60"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-4 text-sm text-ink-subtle dark:text-ink-light/70">
              Empates na pontuação usam saldo (gols ou pontos), depois confronto direto e fair play – tudo configurável
              no painel avançado.
            </p>
          </MotionDiv>

          <MotionDiv
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70"
          >
            <h3 className="text-xl font-semibold text-ink dark:text-white">Publicação e manutenção</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-brand-secondary shadow-glow transition hover:bg-brand-primaryAccent"
              >
                Salvar rascunho
              </button>
              <button
                type="button"
                className="rounded-full border border-brand-primary bg-transparent px-5 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/10"
              >
                Publicar agora
              </button>
              <button
                type="button"
                className="rounded-full border border-transparent px-5 py-2 text-sm font-semibold text-red-500 transition hover:text-red-600"
              >
                Excluir evento
              </button>
            </div>
            <p className="mt-4 text-sm text-ink-subtle dark:text-ink-light/70">
              Eventos podem ser excluídos ou reabertos a qualquer momento. O histórico permanece disponível para
              relatórios e estatísticas.
            </p>
          </MotionDiv>
        </div>
      </MotionSection>
    </div>
  )
}

export default Admin

