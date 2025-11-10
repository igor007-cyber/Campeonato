import { useMemo, useState } from 'react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { motion } from 'framer-motion'

const MotionSection = motion.section
const MotionArticle = motion.article
const MotionDiv = motion.div

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

type LoginSectionProps = {
  onNavigate?: (path: string) => void
}

const availableCompetitions = [
  {
    id: 'liga-urbana',
    name: 'Liga Urbana de Futsal',
    type: 'Campeonato',
    reason:
      'Formato pontos corridos com retorno. Ideal para acompanhar evolução e premiar consistência.'
  },
  {
    id: 'arena-open',
    name: 'Arena Open de Basquete 3x3',
    type: 'Torneio',
    reason:
      'Mistura fase de grupos curta com mata-mata explosivo. Perfeito para jornadas intensas em um fim de semana.'
  },
  {
    id: 'copa-dunas',
    name: 'Copa Dunas de Vôlei de Praia',
    type: 'Copa',
    reason:
      'Eliminatória direta, cheio de viradas dramáticas. Cada jogo vale vaga no pódio.'
  }
]

const socialProviders = [
  { id: 'google', label: 'Continuar com Google' },
  { id: 'facebook', label: 'Entrar com Facebook' },
  { id: 'apple', label: 'Usar conta Apple' }
]

const fastTips = [
  {
    title: 'Por que “campeonato” é diferente?',
    description:
      'Campeonato garante rodadas completas, pontuação cumulativa, desempate por saldo e justiça esportiva. Ideal quando a regularidade importa.'
  },
  {
    title: 'Quando escolher “torneio”?',
    description:
      'Torneios combinam fase classificatória curta com mata-mata eletrizante. Ótimos para eventos com tempo limitado.'
  },
  {
    title: 'E a “copa”?',
    description:
      'Copa é mata-mata puro. Cada partida decide quem avança, perfeito para festivais e eventos promocionais.'
  }
]

function LoginSection({ onNavigate }: LoginSectionProps) {
  const [selectedCompetitions, setSelectedCompetitions] = useState<string[]>(['liga-urbana'])

  const toggleSelection = (id: string) => {
    setSelectedCompetitions((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const selectedDetails = useMemo(
    () => availableCompetitions.filter((competition) => selectedCompetitions.includes(competition.id)),
    [selectedCompetitions],
  )

  return (
    <MotionSection
      id="login"
      className="login-section"
      variants={fadeInScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
    >
      <div className="section-header">
        <h2>Entre e ative sua arena pessoal</h2>
        <p>
          Escolha como acessar, indique quais formatos deseja acompanhar e receba recomendações
          inteligentes logo ao fazer login.
        </p>
      </div>
      <div className="login-grid">
        <MotionArticle className="login-card" variants={fadeInUp}>
          <div className="login-tabs">
            <button type="button" className="active">
              Login
            </button>
            <button type="button" className="ghost">
              Esqueci minha senha
            </button>
          </div>
          <form className="login-form">
            <label>
              <span>E-mail</span>
              <input type="email" placeholder="voce@arenaplay.com" />
            </label>
            <label>
              <span>Senha</span>
              <input type="password" placeholder="••••••••" />
            </label>
            <div className="remember-row">
              <label>
                <input type="checkbox" defaultChecked />
                <span>Lembrar meu acesso</span>
              </label>
              <a
                href="/cadastro"
                onClick={(event: ReactMouseEvent<HTMLAnchorElement>) => {
                  event.preventDefault()
                  onNavigate?.('/cadastro')
                }}
              >
                Criar conta
              </a>
            </div>
            <button type="button" className="primary-btn full">
              Entrar na ArenaPlay
            </button>
          </form>
          <div className="divider">
            <span>ou continue com</span>
          </div>
          <div className="social-buttons">
            {socialProviders.map((provider) => (
              <button key={provider.id} type="button" className="outline-btn">
                {provider.label}
              </button>
            ))}
          </div>
          <div className="inline-actions">
            <span>Acesso rápido:</span>
            <button
              type="button"
              className="ghost-btn"
              onClick={() => onNavigate?.('/dashboard')}
            >
              Abrir painel do organizador
            </button>
          </div>
          <p className="hint">
            Somente usuários autenticados podem criar, editar ou publicar campeonatos, torneios e copas.
          </p>
        </MotionArticle>

        <MotionArticle className="login-card competitions" variants={fadeInUp} transition={{ delay: 0.08 }}>
          <h3>Escolha seus eventos favoritos</h3>
          <p>
            Selecione um ou mais formatos para habilitar alertas e relatórios sob medida. Você pode alterar
            essas preferências a qualquer momento.
          </p>
          <div className="selection-grid">
            {availableCompetitions.map((competition) => {
              const active = selectedCompetitions.includes(competition.id)
              return (
                <button
                  key={competition.id}
                  type="button"
                  className={active ? 'selection-pill active' : 'selection-pill'}
                  onClick={() => toggleSelection(competition.id)}
                >
                  <span className="pill-label">{competition.name}</span>
                  <span className="pill-type">{competition.type}</span>
                </button>
              )
            })}
          </div>
          <div className="selection-summary">
            <h4>Por que esses formatos contam tanto?</h4>
            <ul>
              {selectedDetails.map((item) => (
                <li key={item.id}>
                  <strong>{item.name}</strong>
                  <span>{item.reason}</span>
                </li>
              ))}
            </ul>
            {selectedDetails.length === 0 ? (
              <p className="empty-selection">
                Selecione ao menos um formato para receber comparativos e dashboards personalizados.
              </p>
            ) : null}
          </div>
        </MotionArticle>

        <MotionDiv className="login-card differences" variants={fadeInUp} transition={{ delay: 0.16 }}>
          <h3>Entenda as diferenças rapidamente</h3>
          <div className="difference-grid">
            {fastTips.map((tip) => (
              <article key={tip.title}>
                <h4>{tip.title}</h4>
                <p>{tip.description}</p>
              </article>
            ))}
          </div>
          <p className="hint">
            Ao fazer login, você pode alternar entre formatos em tempo real para entender métricas, logística e
            engajamento que cada estrutura oferece.
          </p>
        </MotionDiv>
      </div>
    </MotionSection>
  )
}

export default LoginSection

