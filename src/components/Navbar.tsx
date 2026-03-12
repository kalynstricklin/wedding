import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/photos', label: 'Photos' },
  { path: '/registry', label: 'Registry' },
  { path: '/rsvp', label: 'RSVP' },
  { path: '/faq', label: 'FAQ' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      {/* Desktop nav */}
      <ul className="nav-desktop">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink to={path} end={path === '/'}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Mobile nav */}
      <div className="nav-mobile-header">
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="page-title">K & J</h1>
      </div>

      {menuOpen && (
        <ul className="nav-mobile-menu">
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
