import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

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
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('arena-theme', theme)
  }, [theme])

  const themeLabel = useMemo(
    () => (theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'),
    [theme]
  )

  // Verificar se estamos em uma página especial (login, cadastro, admin)
  const isSpecialPage = ['/login', '/cadastro', '/admin'].includes(location.pathname)

  return (
    <>
      <nav className="top-nav">
        <div className="brand">
          <Link to="/" className="brand-logo">
            Arena<span>Play</span>
          </Link>
          <span className="brand-badge">beta</span>
        </div>
        
        {!isSpecialPage && (
          <div className="nav-links">
            <a href="#como-funciona">Sobre</a>
            <a href="#depoimentos">Depoimentos</a>
            <a href="#classificacao">Classificação</a>
            <a href="#jogos-publicados">Jogos publicados</a>
            <Link to="/login">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </div>
        )}

        {isSpecialPage && (
          <div className="nav-links">
            <Link to="/">← Início</Link>
            {location.pathname === '/login' && <Link to="/cadastro">Cadastro</Link>}
            {location.pathname === '/cadastro' && <Link to="/login">Login</Link>}
            {location.pathname === '/admin' && <Link to="/">Sair</Link>}
          </div>
        )}

        <div className="nav-actions">
          {!isSpecialPage && (
            <>
              <Link to="/login" className="ghost-btn">
                Entrar
              </Link>
              <Link to="/cadastro" className="primary-btn">
                Criar conta
              </Link>
            </>
          )}
          <button
            type="button"
            className="theme-switch"
            onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
            aria-label={themeLabel}
            title={themeLabel}
          >
            <span className="theme-icon" aria-hidden="true">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
          </button>
        </div>
      </nav>

      {children}

      {!isSpecialPage && (
        <footer className="footer">
          <div className="footer-brand">
            <span className="brand-logo">
              Arena<span>Play</span>
            </span>
            <p>
              Plataforma completa para criar, organizar e viver campeonatos, torneios e copas com uma
              comunidade vibrante.
            </p>
          </div>
          <div className="footer-links">
            <a href="#sobre">Sobre</a>
            <a href="#contato">Contato</a>
            <a href="#termos">Termos e políticas</a>
          </div>
          <span className="footer-copy">
            © {new Date().getFullYear()} ArenaPlay. Todos os direitos reservados.
          </span>
        </footer>
      )}
    </>
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
