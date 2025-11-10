import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MotionDiv = motion.div

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

function Cadastro() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }

    // Aqui vai a lógica de cadastro
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-light px-4 py-16 text-ink transition-colors duration-300 dark:bg-brand-secondary dark:text-ink-light">
      <MotionDiv
        className="w-full max-w-lg"
        variants={fadeInScale}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-8 rounded-3xl border border-slate-200/60 bg-white/90 p-8 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70">
          <div className="space-y-3 text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-brand-soft px-4 py-1 text-sm font-semibold uppercase tracking-wide text-brand-primary">
              Cadastro
            </span>
            <h1 className="text-2xl font-semibold text-ink dark:text-white">Crie sua conta</h1>
            <p className="text-sm text-ink-subtle dark:text-ink-light/80">
              Desbloqueie o painel administrativo e comece a organizar seus eventos em minutos.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-ink dark:text-ink-light" htmlFor="name">
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-white/10 dark:bg-brand-secondary/70"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ink dark:text-ink-light" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-white/10 dark:bg-brand-secondary/70"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ink dark:text-ink-light" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Crie uma senha forte"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-white/10 dark:bg-brand-secondary/70"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-ink dark:text-ink-light" htmlFor="confirmPassword">
                Confirme a senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repita a sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-white/10 dark:bg-brand-secondary/70"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-secondary shadow-glow transition hover:bg-brand-primaryAccent"
            >
              Criar conta
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-sm text-ink-subtle dark:text-ink-light/70">
            <span>Já possui uma conta?</span>
            <button
              type="button"
              className="font-semibold text-brand-primary underline transition hover:text-brand-primaryAccent"
              onClick={() => navigate('/login')}
            >
              Fazer login
            </button>
          </div>
        </div>
      </MotionDiv>
    </div>
  )
}

export default Cadastro
