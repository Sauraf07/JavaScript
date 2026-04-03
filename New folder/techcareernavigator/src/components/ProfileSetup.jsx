import { useState, useEffect } from 'react'
import { Save, User, GraduationCap, Hash } from 'lucide-react'
import * as api from '../services/api.js'

const COURSES = ['BCA', 'B.Tech', 'BSc Computer Science', 'MCA', 'Diploma IT', 'Other']
const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8]

export default function ProfileSetup({ user, showToast, onUpdate }) {
  const [form, setForm]       = useState({ course: '', semester: '' })
  const [existing, setExist]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetch]  = useState(true)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  useEffect(() => {
    api.getProfile(user.id, user.token)
      .then(d => {
        if (d?.profile) {
          setExist(d.profile)
          setForm({ course: d.profile.course, semester: String(d.profile.semester) })
        }
      })
      .catch(() => {})
      .finally(() => setFetch(false))
  }, [user])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.course || !form.semester) { showToast('Please fill all fields', 'error'); return }
    setLoading(true)
    try {
      const data = await api.createProfile(user.id, form.course, Number(form.semester), user.token)
      setExist(data.profile)
      showToast('Profile saved successfully!', 'success')
      onUpdate && onUpdate(data.profile)
    } catch (err) {
      showToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U'

  return (
    <div className="animate-fade-up">
      <div className="page-header">
        <div className="page-title">My Profile</div>
        <div className="page-sub">Manage your academic information</div>
      </div>

      <div className="grid-2">
        {/* Account info card */}
        <div className="card">
          <div className="card-title">Account Details</div>
          <div className="card-sub">Your registered information</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
            <div className="avatar" style={{ width: 72, height: 72, fontSize: 26, marginBottom: 16 }}>{initials}</div>
            <div style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>
              {user.name}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>{user.email}</div>
            <span className="badge badge-blue">
              <GraduationCap size={12} /> Student
            </span>
          </div>
          {existing && (
            <>
              <div className="divider" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Course', value: existing.course, icon: <GraduationCap size={14} /> },
                  { label: 'Semester', value: `Semester ${existing.semester}`, icon: <Hash size={14} /> },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      {row.icon} {row.label}
                    </span>
                    <span className="badge badge-teal">{row.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Edit form */}
        <div className="card">
          <div className="card-title">{existing ? 'Update Profile' : 'Setup Profile'}</div>
          <div className="card-sub">
            {existing ? 'Update your academic information' : 'Complete your profile to get started'}
          </div>

          {fetching ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
              <div className="spinner dark" style={{ width: 32, height: 32 }} />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Course / Program</label>
                <select className="form-select" value={form.course} onChange={set('course')}>
                  <option value="">Select your course</option>
                  {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Current Semester</label>
                <select className="form-select" value={form.semester} onChange={set('semester')}>
                  <option value="">Select semester</option>
                  {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </div>

              <div className="divider" />

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading
                  ? <><div className="spinner" /> Saving...</>
                  : <><Save size={16} /> {existing ? 'Update Profile' : 'Save Profile'}</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
