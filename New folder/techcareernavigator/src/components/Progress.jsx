import { useEffect, useState } from 'react'
import { TrendingUp, Target, Award, Flame } from 'lucide-react'
import * as api from '../services/api.js'

const MILESTONES = [
  { pct: 10, label: 'Getting Started',   icon: '🌱', color: 'var(--success)' },
  { pct: 25, label: 'Building Momentum', icon: '⚡', color: 'var(--accent)' },
  { pct: 50, label: 'Halfway There',     icon: '🎯', color: 'var(--teal)' },
  { pct: 75, label: 'Almost Expert',     icon: '🔥', color: 'var(--warning)' },
  { pct: 100, label: 'Career Ready!',    icon: '🏆', color: 'var(--purple)' },
]

export default function Progress({ user, showToast }) {
  const [data, setData]     = useState({ tasks: [], subjects: [], roadmap: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [tasks, subjects, roadmap] = await Promise.allSettled([
        api.getTasks(user.id, user.token),
        api.getSubjects(user.id, user.token),
        api.getRoadmap(user.id, user.token)
      ])
      setData({
        tasks:    tasks.status    === 'fulfilled' ? (tasks.value?.tasks || [])    : [],
        subjects: subjects.status === 'fulfilled' ? (subjects.value?.subjects || []) : [],
        roadmap:  roadmap.status  === 'fulfilled' ? (roadmap.value?.roadmap || roadmap.value?.steps || []) : []
      })
      setLoading(false)
    }
    load()
  }, [user])

  const done     = data.tasks.filter(t => t.status === 'completed').length
  const total    = data.tasks.length
  const progress = total > 0 ? Math.round((done / total) * 100) : 0
  const impSubs  = data.subjects.filter(s => s.is_important).length
  const nextMile = MILESTONES.find(m => m.pct > progress) || MILESTONES[MILESTONES.length - 1]

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <div className="spinner dark" style={{ width: 40, height: 40, margin: '0 auto 16px' }} />
      <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading progress...</div>
    </div>
  )

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <div className="page-title">My Progress</div>
        <div className="page-sub">Track your career preparation journey</div>
      </div>

      {/* Hero progress */}
      <div className="card mb-24" style={{ background: 'linear-gradient(135deg, rgba(56,139,253,0.08), rgba(123,97,255,0.08))', border: '1px solid var(--border-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
            <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', width: 120, height: 120 }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--surface)" strokeWidth="10" />
              <circle
                cx="60" cy="60" r="50" fill="none"
                stroke="url(#grad)" strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--purple)" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{progress}%</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>done</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>
              {progress === 0 ? "Let's get started!" : progress === 100 ? 'You did it! 🏆' : 'Keep going, you got this!'}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 16 }}>
              {done} of {total} tasks completed
              {user?.career ? ` • ${user.career}` : ''}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>{nextMile.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Next milestone</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: nextMile.color }}>{nextMile.label} at {nextMile.pct}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid mb-24">
        <div className="stat-card blue">
          <div className="stat-icon"><Target size={20} color="var(--accent)" /></div>
          <div className="stat-value">{data.roadmap.length}</div>
          <div className="stat-label">Roadmap Steps</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon"><Award size={20} color="var(--success)" /></div>
          <div className="stat-value">{impSubs}</div>
          <div className="stat-label">Key Subjects</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><TrendingUp size={20} color="var(--purple)" /></div>
          <div className="stat-value">{done}</div>
          <div className="stat-label">Tasks Done</div>
        </div>
        <div className="stat-card teal">
          <div className="stat-icon"><Flame size={20} color="var(--teal)" /></div>
          <div className="stat-value">{total - done}</div>
          <div className="stat-label">Remaining</div>
        </div>
      </div>

      {/* Milestones */}
      <div className="card">
        <div className="card-title">Milestones</div>
        <div className="card-sub">Your career readiness journey</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
          {MILESTONES.map(m => {
            const reached = progress >= m.pct
            return (
              <div key={m.pct} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20,
                  background: reached ? `${m.color}22` : 'var(--surface)',
                  border: `2px solid ${reached ? m.color : 'var(--border)'}`,
                  transition: 'all 0.3s ease'
                }}>
                  {reached ? m.icon : '🔒'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: reached ? 'var(--text)' : 'var(--text-muted)' }}>{m.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: reached ? m.color : 'var(--text-faint)' }}>{m.pct}%</span>
                  </div>
                  <div className="progress-bar-wrap" style={{ height: 6 }}>
                    <div className="progress-bar-fill" style={{
                      width: reached ? '100%' : progress > 0 && m.pct - 25 <= progress ? `${((progress % 25) / 25) * 100}%` : '0%',
                      background: reached ? m.color : 'var(--accent)'
                    }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
