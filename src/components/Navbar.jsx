import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/profile', label: 'Perfil', end: false },
  { to: '/about', label: 'Sobre mí', end: false },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`nav-root ${scrolled ? 'nav-scrolled' : ''} relative`}
    >
      <Link to="/" className="nav-logo">
        &lt;Zareth /&gt;
      </Link>

      <button
        type="button"
        className="nav-burger"
        aria-label="Abrir menú"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-links-wrap ml-auto flex flex-1 items-center justify-end gap-3 ${open ? 'open' : ''}`}>
        <nav className="nav-links flex flex-wrap items-center justify-end gap-1">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav-link interactive-glow ${isActive ? 'nav-link-active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `nav-link interactive-glow ${isActive ? 'nav-link-active' : ''}`
            }
            isActive={(_, loc) => loc.pathname.startsWith('/projects')}
            onClick={() => setOpen(false)}
          >
            Proyectos
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
