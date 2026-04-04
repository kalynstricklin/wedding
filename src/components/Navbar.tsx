import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="page-title">K & J</h1>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="nav-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {navItems.map(({ path, label }, i) => (
              <motion.li
                key={path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <NavLink
                  to={path}
                  end={path === '/'}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
