import { useEffect, useState } from 'react'
import { RefreshCw, Map, ArrowRight } from 'lucide-react'
import * as api from '../services/api.js'

export default function Roadmap({ user, showToast, setPage }) {
  const [steps, setSteps]     = useState([])
  const [loading, setLoading] = useState(true)
  const [generating, setGen]  = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getRoadmap(user.id, user.token)
      setSteps(data?.roadmap || data?.steps || [])
    } catch (err) {
      setSteps([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [user])

  const regenerate = async () => {
    if (!user.career) { showToast('Please select a career path first', 'error'); setPage('career'); return }
    setGen(true)
    try {
      await api.generateRoadmap(user.id, user.career, user.token)
      showToast('Roadmap regenerated!', 'success')
      await load()
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setGen(false)
    }
  }

  const generateTasks = async () => {
    try {
      await api.generateTasks(user.id, user.token)
      showToast('Daily tasks generated from roadmap! ✅', 'success')
      setTimeout(() => setPage('tasks'), 1200)
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  return (
    <div className="animate-fade-up">
      <div className="flex justify-between items-center mb-32" style={{ gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div className="page-title">Learning Roadmap</div>
          <div className="page-sub">Your personalized step-by-step career plan</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={regenerate} disabled={generating}>
            {generating ? <div className="spinner dark" /> : <RefreshCw size={14} />}
            Regenerate
          </button>
          {steps.length > 0 && (
            <button className="btn btn-primary btn-sm" onClick={generateTasks}>
              Generate Tasks <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div className="spinner dark" style={{ width: 40, height: 40, margin: '0 auto 16px' }} />
          <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading your roadmap...</div>
        </div>
      ) : steps.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon"><Map size={48} /></div>
            <div className="empty-title">No roadmap yet</div>
            <div className="empty-desc">Select a career path to generate your personalized roadmap</div>
            <button className="btn btn-primary" onClick={() => setPage('career')}>
              Choose Career Path <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          {user.career && (
            <div className="card mb-24" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-md)', padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>🎯</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>Career Path</div>
                  <div style={{ color: 'var(--accent)', fontSize: 13 }}>{user.career}</div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <span className="badge badge-blue">{steps.length} Steps</span>
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-title">Your Learning Path</div>
            <div className="card-sub">{steps.length} steps to master {user.career || 'your chosen field'}</div>
            <div className="divider" />
            <div className="roadmap-list">
              {steps.map((step, i) => (
                <div key={step.id || i} className="roadmap-item" style={{ animationDelay: `${i * 0.06}s` }}>
                  <div className="roadmap-step-dot">{step.step_number || i + 1}</div>
                  <div className="roadmap-step-body">
                    <div className="roadmap-step-title">Step {step.step_number || i + 1}</div>
                    <div className="roadmap-step-desc">{step.step_description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
