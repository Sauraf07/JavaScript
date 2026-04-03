import { useState, useEffect } from 'react'
import { Plus, Trash2, Zap, Star } from 'lucide-react'
import * as api from '../services/api.js'

const SUGGESTIONS = [
  'Data Structures', 'Algorithms', 'DBMS', 'Computer Networks',
  'Operating Systems', 'Web Technologies', 'Python Programming',
  'Java', 'Mathematics', 'Software Engineering', 'IoT', 'Cloud Computing'
]

export default function Subjects({ user, showToast }) {
  const [subjects, setSubjects] = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [analyzing, setAnalyze] = useState(false)
  const [fetching, setFetch]    = useState(true)

  useEffect(() => {
    api.getSubjects(user.id, user.token)
      .then(d => setSubjects(d?.subjects || []))
      .catch(() => {})
      .finally(() => setFetch(false))
  }, [user])

  const addSubject = async (name) => {
    const subName = (name || input).trim()
    if (!subName) { showToast('Enter a subject name', 'error'); return }
    if (subjects.some(s => s.subject_name?.toLowerCase() === subName.toLowerCase())) {
      showToast('Subject already added', 'error'); return
    }
    setLoading(true)
    try {
      const data = await api.addSubject(user.id, subName, user.token)
      setSubjects(prev => [...prev, data.subject || { subject_name: subName, is_important: false }])
      setInput('')
      showToast('Subject added!', 'success')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const analyze = async () => {
    if (subjects.length === 0) { showToast('Add some subjects first', 'error'); return }
    setAnalyze(true)
    try {
      const data = await api.filterImportantSubjects(user.id, user.token)
      const updated = data?.subjects || []
      setSubjects(updated)
      const imp = updated.filter(s => s.is_important).length
      showToast(`Analysis done! ${imp} important subjects found 🎯`, 'success')
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setAnalyze(false)
    }
  }

  const important = subjects.filter(s => s.is_important)
  const regular   = subjects.filter(s => !s.is_important)

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <div className="page-title">My Subjects</div>
        <div className="page-sub">Add your semester subjects and analyze importance for IT careers</div>
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        {/* Add subject */}
        <div className="card">
          <div className="card-title">Add Subject</div>
          <div className="card-sub">Type your subject name manually</div>

          <div style={{ display: 'flex', gap: 10 }}>
            <input
              className="form-input"
              placeholder="e.g. Data Structures"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSubject()}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={() => addSubject()} disabled={loading}>
              {loading ? <div className="spinner" /> : <Plus size={16} />}
            </button>
          </div>

          <div className="divider" />
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Quick Add
          </div>
          <div className="tag-wrap">
            {SUGGESTIONS.filter(s => !subjects.some(sub => sub.subject_name === s)).slice(0, 8).map(s => (
              <div
                key={s}
                className="tag"
                style={{ cursor: 'pointer' }}
                onClick={() => addSubject(s)}
              >
                <Plus size={12} /> {s}
              </div>
            ))}
          </div>
        </div>

        {/* Stats + Analyze */}
        <div className="card">
          <div className="card-title">Subject Analysis</div>
          <div className="card-sub">Find which subjects matter most for IT careers</div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, background: 'var(--surface)', borderRadius: 'var(--radius-md)', padding: 16, textAlign: 'center', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>{subjects.length}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Total Subjects</div>
            </div>
            <div style={{ flex: 1, background: 'var(--teal-dim)', borderRadius: 'var(--radius-md)', padding: 16, textAlign: 'center', border: '1px solid rgba(0,212,180,0.2)' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontSize: 28, fontWeight: 800, color: 'var(--teal)' }}>{important.length}</div>
              <div style={{ fontSize: 12, color: 'var(--teal)', marginTop: 4, opacity: 0.8 }}>Important</div>
            </div>
          </div>

          <button className="btn btn-full" style={{ background: 'var(--purple-dim)', color: 'var(--purple)', border: '1px solid rgba(123,97,255,0.3)' }}
            onClick={analyze} disabled={analyzing}>
            {analyzing
              ? <><div className="spinner" style={{ borderColor: 'rgba(123,97,255,0.3)', borderTopColor: 'var(--purple)' }} /> Analyzing...</>
              : <><Zap size={16} /> Analyze Important Subjects</>}
          </button>
        </div>
      </div>

      {/* Subjects list */}
      {fetching ? (
        <div style={{ textAlign: 'center', padding: 40 }}><div className="spinner dark" style={{ width: 32, height: 32, margin: '0 auto' }} /></div>
      ) : subjects.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <div className="empty-title">No subjects yet</div>
            <div className="empty-desc">Add your semester subjects to get started</div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-title">All Subjects</div>
          <div className="card-sub">{subjects.length} subjects total • {important.length} important for IT</div>

          {important.length > 0 && (
            <>
              <div style={{ fontSize: 12, color: 'var(--teal)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Star size={12} /> Important for IT Career
              </div>
              <div className="tag-wrap" style={{ marginBottom: 20 }}>
                {important.map((s, i) => (
                  <div key={i} className="tag important">
                    ⭐ {s.subject_name}
                  </div>
                ))}
              </div>
            </>
          )}

          {regular.length > 0 && (
            <>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                Other Subjects
              </div>
              <div className="tag-wrap">
                {regular.map((s, i) => (
                  <div key={i} className="tag">
                    {s.subject_name}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
