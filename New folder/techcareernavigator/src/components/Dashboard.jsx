import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen, Compass, Map, CheckSquare, TrendingUp, Zap } from 'lucide-react'
import * as api from '../services/api.js'

const QUICK_ACTIONS = [
  { label: 'Set up profile',     desc: 'Add your course & semester',  page: 'profile',  icon: '👤', color: 'var(--accent)' },
  { label: 'Add subjects',       desc: 'Enter your semester subjects', page: 'subjects', icon: '📚', color: 'var(--purple)' },
  { label: 'Choose career path', desc: 'Select your tech specialization', page: 'career', icon: '🎯', color: 'var(--teal)' },
  { label: 'View roadmap',       desc: 'See your learning roadmap',   page: 'roadmap',  icon: '🗺️', color: 'var(--success)' },
]

const TIPS = [
  '💡 Consistency beats intensity — 1 hour daily is better than 8 hours once a week.',
  '🔥 Focus on one career path deeply rather than spreading thin across multiple.',
  '📌 Complete your daily tasks first thing in the morning for best results.',
  '🚀 Every expert was once a beginner — trust the roadmap and stay the course.',
  '⚡ DSA + Projects + Communication = Placement-ready. Never ignore any pillar.',
]

export default function Dashboard({ user, setPage, showToast }) {
  const [stats, setStats]     = useState({ subjects: 0, tasks: 0, done: 0, career: null })
  const [loading, setLoading] = useState(true)
  const tip = TIPS[new Date().getDay() % TIPS.length]

  useEffect(() => {
    const load = async () => {
      try {
        const [subjects, tasks] = await Promise.allSettled([
          api.getSubjects(user.id, user.token),
          api.getTasks(user.id, user.token)
        ])
        const subList  = subjects.status === 'fulfilled' ? (subjects.value?.subjects || []) : []
        const taskList = tasks.status   === 'fulfilled' ? (tasks.value?.tasks || [])    : []
        const done     = taskList.filter(t => t.status === 'completed').length
        setStats({ subjects: subList.length, tasks: taskList.length, done, career: user.career || null })
      } catch (_) {}
      setLoading(false)
    }
    load()
  }, [user])

  const progress = stats.tasks > 0 ? Math.round((stats.done / stats.tasks) * 100) : 0
  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const name = user?.name?.split(' ')[0] || 'Student'

  return (
    <div className="animate-fade-up">
      {/* Hero greeting */}
      <div className="card mb-32" style={{ background: 'linear-gradient(135deg, rgba(56,139,253,0.08), rgba(123,97,255,0.08))', border: '1px solid var(--border-md)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, fontSize: 100, opacity: 0.06 }}>🚀</div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>{greet}</div>
        <div style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
          Welcome back, {name}! 👋
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 480 }}>
          Your career roadmap is ready. Keep completing daily tasks and stay consistent on your path to success.
        </div>
        <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => setPage('tasks')}>
          Today's Tasks <ArrowRight size={16} />
        </button>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat-card blue">
          <div className="stat-icon"><BookOpen size={22} color="var(--accent)" /></div>
          <div className="stat-value">{loading ? '—' : stats.subjects}</div>
          <div className="stat-label">Subjects Added</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><CheckSquare size={22} color="var(--purple)" /></div>
          <div className="stat-value">{loading ? '—' : stats.done}</div>
          <div className="stat-label">Tasks Completed</div>
        </div>
        <div className="stat-card teal">
          <div className="stat-icon"><TrendingUp size={22} color="var(--teal)" /></div>
          <div className="stat-value">{loading ? '—' : `${progress}%`}</div>
          <div className="stat-label">Progress</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon"><Zap size={22} color="var(--success)" /></div>
          <div className="stat-value">{loading ? '—' : stats.tasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
      </div>

      {/* Progress bar */}
      {stats.tasks > 0 && (
        <div className="card mb-24">
          <div className="flex justify-between items-center mb-8">
            <span style={{ fontFamily: 'var(--font-head)', fontWeight: 700 }}>Overall Progress</span>
            <span className="badge badge-blue">{progress}% complete</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
            {stats.done} of {stats.tasks} tasks completed
          </div>
        </div>
      )}

      {/* Quick actions */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, marginBottom: 16, fontSize: 18, color: 'var(--text)' }}>Quick Actions</div>
        <div className="career-grid">
          {QUICK_ACTIONS.map(a => (
            <div
              key={a.page}
              className="card"
              style={{ cursor: 'pointer', textAlign: 'center', padding: '20px 16px' }}
              onClick={() => setPage(a.page)}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{a.icon}</div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily tip */}
      <div className="card" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-md)' }}>
        <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Daily Tip</div>
        <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>{tip}</div>
      </div>
    </div>
  )
}
