import { useEffect, useState } from 'react'
import { Check, RefreshCw, CheckSquare, Clock, TrendingUp, Zap } from 'lucide-react'
import * as api from '../services/api.js'

export default function Tasks({ user, showToast, setPage }) {
  const [tasks, setTasks]     = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('all')
  const [completing, setComp] = useState(null)
  const [generating, setGen]  = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.getTasks(user.id, user.token)
      setTasks(data?.tasks || [])
    } catch (_) { setTasks([]) }
    setLoading(false)
  }

  useEffect(() => { load() }, [user])

  const complete = async (task) => {
    if (task.status === 'completed') return
    setComp(task.id)
    try {
      await api.completeTask(task.id, user.id, user.token)
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: 'completed' } : t))
      showToast('Task completed! Keep going! 🔥', 'success')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setComp(null)
    }
  }

  const generateTasks = async () => {
    setGen(true)
    try {
      await api.generateTasks(user.id, user.token)
      showToast('New tasks generated!', 'success')
      await load()
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setGen(false)
    }
  }

  const done      = tasks.filter(t => t.status === 'completed')
  const pending   = tasks.filter(t => t.status !== 'completed')
  const progress  = tasks.length > 0 ? Math.round((done.length / tasks.length) * 100) : 0

  const filtered = filter === 'all'
    ? tasks
    : filter === 'pending'
    ? pending
    : done

  return (
    <div className="animate-fade-up">
      <div className="flex justify-between items-center mb-24" style={{ gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div className="page-title">Daily Tasks</div>
          <div className="page-sub">Complete your tasks to progress through the roadmap</div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={generateTasks} disabled={generating}>
          {generating ? <><div className="spinner" /> Generating...</> : <><Zap size={14} /> Generate Tasks</>}
        </button>
      </div>

      {/* Stats row */}
      <div className="stat-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card blue">
          <div className="stat-icon"><CheckSquare size={20} color="var(--accent)" /></div>
          <div className="stat-value">{tasks.length}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon"><Check size={20} color="var(--success)" /></div>
          <div className="stat-value">{done.length}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon"><Clock size={20} color="var(--purple)" /></div>
          <div className="stat-value">{pending.length}</div>
          <div className="stat-label">Remaining</div>
        </div>
        <div className="stat-card teal">
          <div className="stat-icon"><TrendingUp size={20} color="var(--teal)" /></div>
          <div className="stat-value">{progress}%</div>
          <div className="stat-label">Progress</div>
        </div>
      </div>

      {/* Progress bar */}
      {tasks.length > 0 && (
        <div className="card mb-24">
          <div className="flex justify-between items-center mb-8">
            <span style={{ fontWeight: 700, fontFamily: 'var(--font-head)' }}>Task Completion</span>
            <span className="badge badge-success">{progress}%</span>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill teal" style={{ width: `${progress}%` }} />
          </div>
          {progress === 100 && (
            <div style={{ marginTop: 12, textAlign: 'center', color: 'var(--success)', fontWeight: 700, fontSize: 14 }}>
              🎉 All tasks completed! You are amazing!
            </div>
          )}
        </div>
      )}

      {/* Filter tabs */}
      <div className="tabs">
        {[['all', 'All Tasks'], ['pending', 'Pending'], ['done', 'Completed']].map(([k, l]) => (
          <button key={k} className={`tab-btn ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>
            {l} {k === 'all' ? `(${tasks.length})` : k === 'pending' ? `(${pending.length})` : `(${done.length})`}
          </button>
        ))}
      </div>

      {/* Task list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <div className="spinner dark" style={{ width: 40, height: 40, margin: '0 auto 16px' }} />
          <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading tasks...</div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <div className="empty-title">
              {tasks.length === 0 ? 'No tasks yet' : `No ${filter} tasks`}
            </div>
            <div className="empty-desc">
              {tasks.length === 0
                ? 'Generate tasks from your roadmap to get started'
                : filter === 'done' ? 'Complete some tasks first!' : 'All tasks completed!'}
            </div>
            {tasks.length === 0 && (
              <button className="btn btn-primary" onClick={generateTasks}>
                <Zap size={16} /> Generate Tasks
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          {filtered.map((task, i) => {
            const isDone = task.status === 'completed'
            return (
              <div
                key={task.id || i}
                className={`task-item ${isDone ? 'done' : ''}`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div
                  className={`task-checkbox ${isDone ? 'checked' : ''}`}
                  onClick={() => complete(task)}
                >
                  {completing === task.id
                    ? <div className="spinner" style={{ width: 12, height: 12, borderColor: 'rgba(255,255,255,0.4)', borderTopColor: '#fff' }} />
                    : isDone && <Check size={12} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="task-text">{task.task_description}</div>
                  <div style={{ marginTop: 6 }}>
                    <span className={`badge ${isDone ? 'badge-success' : 'badge-warning'}`}>
                      {isDone ? '✓ Completed' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
