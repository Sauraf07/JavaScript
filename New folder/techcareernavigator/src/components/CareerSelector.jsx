import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import * as api from '../services/api.js'

const CAREERS = [
  {
    id: 'Web Development',
    icon: '🌐',
    title: 'Web Development',
    desc: 'Build websites and web apps using HTML, CSS, JavaScript, React, Node.js',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'REST APIs'],
    badge: 'badge-blue',
    color: 'var(--accent)'
  },
  {
    id: 'Artificial Intelligence / Machine Learning',
    icon: '🤖',
    title: 'AI / Machine Learning',
    desc: 'Create intelligent systems using Python, TensorFlow, and data science',
    skills: ['Python', 'TensorFlow', 'Statistics', 'NumPy', 'Pandas'],
    badge: 'badge-purple',
    color: 'var(--purple)'
  },
  {
    id: 'Data Science',
    icon: '📊',
    title: 'Data Science',
    desc: 'Analyze data, build visualizations, and derive meaningful insights',
    skills: ['Python', 'SQL', 'Tableau', 'Statistics', 'Machine Learning'],
    badge: 'badge-teal',
    color: 'var(--teal)'
  },
  {
    id: 'Cyber Security',
    icon: '🔐',
    title: 'Cyber Security',
    desc: 'Protect systems and networks from digital attacks and breaches',
    skills: ['Networking', 'Linux', 'Ethical Hacking', 'Cryptography', 'Python'],
    badge: 'badge-danger',
    color: 'var(--danger)'
  },
  {
    id: 'Mobile App Development',
    icon: '📱',
    title: 'Mobile Development',
    desc: 'Build Android and iOS apps using Flutter, React Native, or Kotlin',
    skills: ['Flutter', 'Dart', 'React Native', 'Android SDK', 'UI/UX'],
    badge: 'badge-success',
    color: 'var(--success)'
  },
  {
    id: 'Cloud Computing',
    icon: '☁️',
    title: 'Cloud Computing',
    desc: 'Design and deploy scalable infrastructure on AWS, Azure, or GCP',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD'],
    badge: 'badge-warning',
    color: 'var(--warning)'
  },
]

export default function CareerSelector({ user, showToast, onCareerSelect, setPage }) {
  const [selected, setSelected] = useState(user?.career || '')
  const [loading, setLoading]   = useState(false)

  const handleConfirm = async () => {
    if (!selected) { showToast('Please select a career path first', 'error'); return }
    setLoading(true)
    try {
      await api.selectCareer(user.id, selected, user.token)
      showToast(`Career path set: ${selected} 🎯`, 'success')
      onCareerSelect && onCareerSelect(selected)
      // Generate roadmap automatically
      await api.generateRoadmap(user.id, selected, user.token)
      showToast('Roadmap generated! Check the Roadmap section 🗺️', 'success')
      setTimeout(() => setPage('roadmap'), 1500)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <div className="page-title">Choose Your Career Path</div>
        <div className="page-sub">Select the technology domain you want to specialize in</div>
      </div>

      <div className="career-grid" style={{ marginBottom: 24 }}>
        {CAREERS.map(c => (
          <div
            key={c.id}
            className={`career-card ${selected === c.id ? 'selected' : ''}`}
            onClick={() => setSelected(c.id)}
          >
            {selected === c.id && (
              <div style={{ position: 'absolute', top: 12, right: 12, width: 22, height: 22, background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={12} color="#fff" />
              </div>
            )}
            <span className="career-card-icon">{c.icon}</span>
            <div className="career-card-title">{c.title}</div>
            <div className="career-card-desc">{c.desc}</div>
            <div className="tag-wrap" style={{ marginTop: 12, justifyContent: 'center' }}>
              {c.skills.slice(0, 3).map(s => (
                <span key={s} className={`badge ${c.badge}`} style={{ fontSize: 11 }}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="card animate-fade-up" style={{ background: 'var(--accent-dim)', border: '1px solid var(--border-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
                Selected: {CAREERS.find(c => c.id === selected)?.title}
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Click confirm to generate your personalized roadmap
              </div>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleConfirm} disabled={loading}>
              {loading
                ? <><div className="spinner" /> Generating...</>
                : <>Confirm & Generate Roadmap <ArrowRight size={18} /></>}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
