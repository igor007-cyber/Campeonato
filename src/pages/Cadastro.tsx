import { useState } from 'react'
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!')
      return
    }

    // Aqui vai a lógica de cadastro
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
            <h1>Crie sua conta</h1>
            <p>Comece a criar e gerenciar seus campeonatos agora</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nome completo</label>
              <input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="Crie uma senha forte"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirme a senha</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="primary-btn full">
              Criar conta
            </button>

            <div className="auth-footer">
              <span>Já possui uma conta?</span>
              <button
                type="button"
                className="link-btn"
                onClick={() => navigate('/login')}
              >
                Fazer login
              </button>
            </div>
          </form>
        </div>
      </MotionDiv>
    </div>
  )
}

export default Cadastro
