import { LayoutDashboard, User, BookOpen, Compass, Map, CheckSquare, TrendingUp, LogOut } from 'lucide-react'

const NAV = [
  { key: 'dashboard', label: 'Dashboard',   icon: <LayoutDashboard size={18} /> },
  { key: 'profile',   label: 'My Profile',  icon: <User size={18} /> },
  { key: 'subjects',  label: 'Subjects',    icon: <BookOpen size={18} /> },
  { key: 'career',    label: 'Career Path', icon: <Compass size={18} /> },
  { key: 'roadmap',   label: 'Roadmap',     icon: <Map size={18} /> },
  { key: 'tasks',     label: 'Daily Tasks', icon: <CheckSquare size={18} /> },
  { key: 'progress',  label: 'Progress',    icon: <TrendingUp size={18} /> },
]

export default function Sidebar({ page, setPage, user, onLogout }) {
  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🚀</div>
        <div>
          <div className="sidebar-logo-text">Tech Career</div>
          <div className="sidebar-logo-sub">Navigator</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        <div className="nav-section">Navigation</div>
        {NAV.map(item => (
          <div
            key={item.key}
            className={`nav-item ${page === item.key ? 'active' : ''}`}
            onClick={() => setPage(item.key)}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="avatar">{initials}</div>
          <div className="user-info">
            <div className="user-name">{user?.name || 'Student'}</div>
            <div className="user-email">{user?.email || ''}</div>
          </div>
          <span
            title="Logout"
            onClick={onLogout}
            style={{ color: 'var(--text-muted)', cursor: 'pointer', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <LogOut size={16} />
          </span>
        </div>
      </div>
    </aside>
  )
}
