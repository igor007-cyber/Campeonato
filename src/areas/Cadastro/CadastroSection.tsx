import { useMemo, useState } from 'react'
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

type CadastroSectionProps = {
  onNavigate?: (path: string) => void
}

const onboardingSteps = [
  {
    id: 'perfil',
    title: '1. Configure seu perfil organizador',
    description:
      'Informe dados pessoais, verifique o e-mail e defina as modalidades que pretende administrar.'
  },
  {
    id: 'equipes',
    title: '2. Adicione equipes e staff',
    description:
      'Importe planilhas, convide responsáveis técnicos e conecte árbitros e narradores com permissões limitadas.'
  },
  {
    id: 'estrutura',
    title: '3. Defina estruturas favoritas',
    description:
      'Escolha templates para campeonatos, torneios ou copas que poderão ser reutilizados em segundos.'
  }
]

const preferedSports = [
  'Handebol',
  'Futebol de campo',
  'Futsal',
  'Videogame de futebol',
  'Basquete',
  'Vôlei',
  'Vôlei de praia',
  'Tênis de mesa'
]

const verificationChecklist = [
  'Documento de identificação do organizador',
  'Comprovante de endereço do clube ou organização',
  'Logotipo ou imagem do evento para vitrine pública',
  'Termos de responsabilidade aceitos digitalmente'
]

function CadastroSection({ onNavigate }: CadastroSectionProps) {
  const [selectedSports, setSelectedSports] = useState<string[]>(['Futebol de campo', 'Futsal'])

  const toggleSport = (name: string) => {
    setSelectedSports((current) =>
      current.includes(name) ? current.filter((sport) => sport !== name) : [...current, name],
    )
  }

  const summary = useMemo(
    () =>
      selectedSports.length === 0
        ? 'Selecione ao menos uma modalidade para habilitar recomendações automáticas.'
        : `Você receberá agendas, templates e métricas específicas para ${selectedSports.join(', ')}.`,
    [selectedSports],
  )

  return (
    <MotionSection
      id="cadastro"
      className="cadastro-section"
      variants={fadeInScale}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55 }}
    >
      <div className="section-header">
        <h2>Cadastre-se para liberar o estúdio competitivo</h2>
        <p>
          Em poucos passos você desbloqueia o painel administrativo, assume controle de inscrições e
          pode criar eventos com visual profissional.
        </p>
      </div>

      <div className="cadastro-grid">
        <MotionArticle className="cadastro-card" variants={fadeInUp}>
          <h3>Dados principais</h3>
          <form className="cadastro-form">
            <label>
              <span>Nome completo</span>
              <input type="text" placeholder="Nome do organizador" />
            </label>
            <label>
              <span>E-mail</span>
              <input type="email" placeholder="contato@clubearena.com" />
            </label>
            <label>
              <span>Senha</span>
              <input type="password" placeholder="Crie uma senha forte" />
            </label>
            <label>
              <span>Confirme a senha</span>
              <input type="password" placeholder="Repita a senha" />
            </label>
            <label>
              <span>Função</span>
              <select defaultValue="organizador">
                <option value="organizador">Organizador principal</option>
                <option value="staff">Staff / produção</option>
                <option value="arbitro">Árbitro</option>
                <option value="mídia">Narrador ou mídia</option>
              </select>
            </label>
            <button type="button" className="primary-btn full">
              Criar minha conta gratuita
            </button>
          </form>
          <p className="hint">
            O cadastro é obrigatório para publicar eventos ou acessar dashboards. Visitantes só podem visualizar
            competições públicas.
          </p>
        </MotionArticle>

        <MotionArticle className="cadastro-card" variants={fadeInUp} transition={{ delay: 0.08 }}>
          <h3>Modalidades que você deseja administrar</h3>
          <div className="selection-grid">
            {preferedSports.map((sport) => {
              const active = selectedSports.includes(sport)
              return (
                <button
                  key={sport}
                  type="button"
                  className={active ? 'selection-pill active' : 'selection-pill'}
                  onClick={() => toggleSport(sport)}
                >
                  {sport}
                </button>
              )
            })}
          </div>
          <p className="hint">{summary}</p>
          <div className="divider small">
            <span>Checklist de verificação</span>
          </div>
          <ul className="checklist">
            {verificationChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="inline-actions">
            <span>Já possui conta?</span>
            <button
              type="button"
              className="ghost-btn"
              onClick={() => onNavigate?.('/login')}
            >
              Ir para login
            </button>
          </div>
        </MotionArticle>

        <MotionDiv className="cadastro-card steps" variants={fadeInUp} transition={{ delay: 0.16 }}>
          <h3>Trilha de onboarding simplificada</h3>
          <div className="steps-grid">
            {onboardingSteps.map((step) => (
              <article key={step.id}>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
          <p className="hint">
            Após completar o cadastro, você é direcionado ao estúdio administrativo para criar estruturas de
            campeonatos, torneios ou copas em minutos.
          </p>
        </MotionDiv>
      </div>
    </MotionSection>
  )
}

export default CadastroSection

