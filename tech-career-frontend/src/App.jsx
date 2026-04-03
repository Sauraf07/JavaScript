import { useState, useCallback } from 'react'
import Auth         from './components/Auth.jsx'
import Sidebar      from './components/Sidebar.jsx'
import Dashboard    from './components/Dashboard.jsx'
import ProfileSetup from './components/ProfileSetup.jsx'
import Subjects     from './components/Subjects.jsx'
import CareerSelector from './components/CareerSelector.jsx'
import Roadmap      from './components/Roadmap.jsx'
import Tasks        from './components/Tasks.jsx'
import Progress     from './components/Progress.jsx'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

function ToastContainer({ toasts, remove }) {
  const ICONS = { success: <CheckCircle size={16} />, error: <XCircle size={16} />, info: <Info size={16} /> }
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {ICONS[t.type]}
          <span style={{ flex: 1 }}>{t.message}</span>
          <span onClick={() => remove(t.id)} style={{ cursor: 'pointer', opacity: 0.7 }}><X size={14} /></span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [user, setUser]     = useState(() => {
    try { return JSON.parse(localStorage.getItem('tcn_user') || 'null') } catch { return null }
  })
  const [page, setPage]     = useState('dashboard')
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const handleAuth = (data) => {
    const userData = {
      id:     data.user?.id     || data.id,
      name:   data.user?.name   || data.name,
      email:  data.user?.email  || data.email,
      token:  data.token,
      career: null
    }
    setUser(userData)
    localStorage.setItem('tcn_user', JSON.stringify(userData))
    showToast(`Welcome, ${userData.name}! 🚀`, 'success')
  }

  const handleLogout = () => {
    setUser(null)
    setPage('dashboard')
    localStorage.removeItem('tcn_user')
    showToast('Logged out successfully', 'info')
  }

  const handleCareerSelect = (career) => {
    const updated = { ...user, career }
    setUser(updated)
    localStorage.setItem('tcn_user', JSON.stringify(updated))
  }

  const updateUser = (profileData) => {
    const updated = { ...user, ...profileData }
    setUser(updated)
    localStorage.setItem('tcn_user', JSON.stringify(updated))
  }


  if (!user) {
    return (
      <>
        <Auth onAuth={handleAuth} showToast={showToast} />
        <ToastContainer toasts={toasts} remove={removeToast} />
      </>
    )
  }


  const pageProps = { user, showToast, setPage }

  const PAGES = {
    dashboard: <Dashboard {...pageProps} />,
    profile:   <ProfileSetup {...pageProps} onUpdate={updateUser} />,
    subjects:  <Subjects {...pageProps} />,
    career:    <CareerSelector {...pageProps} onCareerSelect={handleCareerSelect} />,
    roadmap:   <Roadmap {...pageProps} />,
    tasks:     <Tasks {...pageProps} />,
    progress:  <Progress {...pageProps} />,
  }

  return (
    <div className="app-shell grid-bg">
      <Sidebar
        page={page}
        setPage={setPage}
        user={user}
        onLogout={handleLogout}
      />
      <main className="main-content">
        {PAGES[page] || PAGES.dashboard}
      </main>
      <ToastContainer toasts={toasts} remove={removeToast} />
    </div>
  )
}
