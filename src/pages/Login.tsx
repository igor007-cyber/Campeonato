import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const MotionDiv = motion.div

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aqui vai a lógica de autenticação
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-light px-4 py-16 text-ink transition-colors duration-300 dark:bg-brand-secondary dark:text-ink-light">
      <MotionDiv
        className="w-full max-w-md"
        variants={fadeInScale}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-8 rounded-3xl border border-slate-200/60 bg-white/90 p-8 shadow-soft-lg dark:border-white/10 dark:bg-brand-secondary/70">
          <div className="space-y-3 text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-brand-soft px-4 py-1 text-sm font-semibold uppercase tracking-wide text-brand-primary">
              Login
            </span>
            <h1 className="text-2xl font-semibold text-ink dark:text-white">Bem-vindo de volta</h1>
            <p className="text-sm text-ink-subtle dark:text-ink-light/80">
              Entre na sua conta para gerenciar seus campeonatos, torneios e copas.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30 dark:border-white/10 dark:bg-brand-secondary/70"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-ink-subtle dark:text-ink-light/80">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                />
                <span>Lembrar meu acesso</span>
              </label>
              <button
                type="button"
                className="text-brand-primary underline transition hover:text-brand-primaryAccent"
                onClick={() => alert('Funcionalidade em breve')}
              >
                Esqueci a senha
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-secondary shadow-glow transition hover:bg-brand-primaryAccent"
            >
              Entrar
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 text-sm text-ink-subtle dark:text-ink-light/70">
            <span>Não tem uma conta?</span>
            <button
              type="button"
              className="font-semibold text-brand-primary underline transition hover:text-brand-primaryAccent"
              onClick={() => navigate('/cadastro')}
            >
              Criar conta gratuita
            </button>
          </div>
        </div>
      </MotionDiv>
    </div>
  )
}

export default Login
