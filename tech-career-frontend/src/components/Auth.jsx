import { useState } from 'react'
import { User, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import * as api from '../services/api.js'

export default function Auth({ onAuth, showToast }) {
  const [tab, setTab]         = useState('login')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw]   = useState(false)

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { showToast('Please fill all fields', 'error'); return }
    if (tab === 'register' && !form.name)  { showToast('Name is required', 'error'); return }
    setLoading(true)
    try {
      let data
      if (tab === 'login') {
        data = await api.login(form.email, form.password)
      } else {
        data = await api.register(form.name, form.email, form.password)
        showToast('Account created!', 'success')
        if (!data.token) {
          // Auto-login after register
          data = await api.login(form.email, form.password)
        }
      }
      onAuth(data)
    } catch (err) {
      showToast(err.message || 'Something went wrong', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left grid-bg">
        <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🚀</div>
          <div>
            <div className="auth-logo-text">Tech Career</div>
            <div className="auth-logo-sub">Navigator Platform</div>
          </div>
        </div>

        <div className="auth-tab-wrap">
          <div className={`auth-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Sign In</div>
          <div className={`auth-tab ${tab === 'register' ? 'active' : ''}`} onClick={() => setTab('register')}>Register</div>
        </div>

        <div className="auth-title">{tab === 'login' ? 'Welcome back' : 'Create account'}</div>
        <div className="auth-sub">
          {tab === 'login'
            ? 'Sign in to continue your learning journey'
            : 'Start planning your tech career today'}
        </div>

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div className="form-group animate-fade-up">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                  <User size={16} />
                </span>
                <input
                  className="form-input"
                  style={{ paddingLeft: 42 }}
                  placeholder="Saurav Sharma"
                  value={form.name}
                  onChange={set('name')}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Mail size={16} />
              </span>
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: 42 }}
                placeholder="you@example.com"
                value={form.email}
                onChange={set('email')}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={16} />
              </span>
              <input
                type={showPw ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: 42, paddingRight: 42 }}
                placeholder="Min 6 characters"
                value={form.password}
                onChange={set('password')}
              />
              <span
                onClick={() => setShowPw(s => !s)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </span>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading
                ? <><div className="spinner" /> Processing...</>
                : <>{tab === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>}
            </button>
          </div>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
          {tab === 'login'
            ? <>No account? <span onClick={() => setTab('register')} style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>Register free</span></>
            : <>Already have one? <span onClick={() => setTab('login')} style={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>Sign in</span></>}
        </div>
      </div>
      </div>
      <div className="auth-right">
        <div className="auth-image-overlay">
          <h2>Shape Your Tech Future</h2>
          <p>Join the next generation of top developers and map out your perfect career path with AI-driven insights.</p>
        </div>
      </div>
    </div>
  )
}
