import { useState } from 'react'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui vai a lógica de autenticação
    navigate('/admin')
  }

  return (
    <div className="page auth-page">
      <MotionDiv
        className="auth-container"
        variants={fadeInScale}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.55 }}
      >
        <div className="auth-card-main">
          <div className="auth-header">
            <h1>Bem-vindo de volta</h1>
            <p>Entre na sua conta para gerenciar seus eventos</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Lembrar meu acesso</span>
              </label>
              <button type="button" className="link-btn" onClick={() => alert('Funcionalidade em breve')}>
                Esqueci a senha
              </button>
            </div>

            <button type="submit" className="primary-btn full">
              Entrar
            </button>

            <div className="auth-footer">
              <span>Não tem uma conta?</span>
              <button
                type="button"
                className="link-btn"
                onClick={() => navigate('/cadastro')}
              >
                Criar conta gratuita
              </button>
            </div>
          </form>
        </div>
      </MotionDiv>
    </div>
  )
}

export default Login
