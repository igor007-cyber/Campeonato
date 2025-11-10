import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'

// Importar páginas
import Home from './pages/Home'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Admin from './pages/Admin'

type Theme = 'light' | 'dark'

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem('arena-theme') as Theme | null
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const location = useLocation()

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.setAttribute('data-theme', theme)
    window.localStorage.setItem('arena-theme', theme)
  }, [theme])

  const themeLabel = useMemo(
    () => (theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'),
    [theme]
  )

  // Verificar se estamos em uma página especial (login, cadastro, admin)
  const isSpecialPage = ['/login', '/cadastro', '/admin'].includes(location.pathname)

  return (
    <div className="flex min-h-screen flex-col bg-surface-light text-ink transition-colors duration-300 dark:bg-brand-secondary dark:text-ink-light">
      <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md transition-colors dark:border-white/10 dark:bg-brand-secondary/80">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-4 px-4 py-4 md:flex-nowrap md:justify-between md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-2xl font-semibold tracking-tight text-ink dark:text-white">
              Arena<span className="text-brand-primary">Play</span>
            </Link>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary shadow-glow">
              beta
            </span>
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-center gap-3 text-sm font-medium text-ink-subtle md:justify-center">
            {!isSpecialPage && (
              <>
                <a className="transition hover:text-brand-primary" href="#como-funciona">
                  Sobre
                </a>
                <a className="transition hover:text-brand-primary" href="#depoimentos">
                  Depoimentos
                </a>
                <a className="transition hover:text-brand-primary" href="#classificacao">
                  Classificação
                </a>
                <a className="transition hover:text-brand-primary" href="#jogos-publicados">
                  Jogos publicados
                </a>
                <Link className="transition hover:text-brand-primary" to="/login">
                  Login
                </Link>
                <Link className="transition hover:text-brand-primary" to="/cadastro">
                  Cadastro
                </Link>
              </>
            )}

            {isSpecialPage && (
              <>
                <Link className="transition hover:text-brand-primary" to="/">
                  ← Início
                </Link>
                {location.pathname === '/login' && (
                  <Link className="transition hover:text-brand-primary" to="/cadastro">
                    Cadastro
                  </Link>
                )}
                {location.pathname === '/cadastro' && (
                  <Link className="transition hover:text-brand-primary" to="/login">
                    Login
                  </Link>
                )}
                {location.pathname === '/admin' && (
                  <Link className="transition hover:text-brand-primary" to="/">
                    Sair
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {!isSpecialPage && (
              <>
                <Link
                  to="/login"
                  className="hidden rounded-full border border-transparent px-5 py-2 text-sm font-semibold text-ink-subtle transition hover:text-brand-primary md:inline-flex"
                >
                  Entrar
                </Link>
                <Link
                  to="/cadastro"
                  className="hidden rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-brand-secondary shadow-glow transition hover:bg-brand-primaryAccent md:inline-flex"
                >
                  Criar conta
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
              aria-label={themeLabel}
              title={themeLabel}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-lg text-ink transition hover:border-brand-primary hover:text-brand-primary dark:border-white/10 dark:bg-brand-secondary/80 dark:text-ink-light"
            >
              <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      {!isSpecialPage && (
        <footer className="border-t border-slate-200/60 bg-white/80 py-12 text-sm transition-colors dark:border-white/10 dark:bg-brand-secondary/80">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
            <div className="max-w-xl space-y-3">
              <span className="text-2xl font-semibold tracking-tight text-ink dark:text-white">
                Arena<span className="text-brand-primary">Play</span>
              </span>
              <p className="text-ink-subtle dark:text-ink-light/80">
                Plataforma completa para criar, organizar e viver campeonatos, torneios e copas com uma
                comunidade vibrante.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-ink-subtle dark:text-ink-light/80">
              <a className="transition hover:text-brand-primary" href="#sobre">
                Sobre
              </a>
              <a className="transition hover:text-brand-primary" href="#contato">
                Contato
              </a>
              <a className="transition hover:text-brand-primary" href="#termos">
                Termos e políticas
              </a>
            </div>
            <span className="text-ink-subtle/80 dark:text-ink-light/60">
              © {new Date().getFullYear()} ArenaPlay. Todos os direitos reservados.
            </span>
          </div>
        </footer>
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
