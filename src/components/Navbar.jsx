import { useEffect, useState } from 'react'

const links = [
  { to: '#home', label: 'Inicio' },
  { to: '#profile', label: 'Perfil' },
  { to: '#about', label: 'Sobre mí' },
  { to: '#projects', label: 'Proyectos' },
]

function smoothScroll(targetId) {
  const target = document.querySelector(targetId)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar({ activeLink }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const activeEl = document.querySelector(`.nav-link[href="${activeLink}"]`)
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      })
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [activeLink])

  const handleLinkClick = (e, to) => {
    e.preventDefault()
    smoothScroll(to)
    setOpen(false)
  }

  return (
    <header
      className={`nav-root ${scrolled ? 'nav-scrolled' : ''} fixed top-0 left-0 right-0 z-50 w-full`}
    >
      <a href="#home" className="nav-logo" onClick={(e) => handleLinkClick(e, '#home')}>
        &lt;Zareth /&gt;
      </a>

      <button
        type="button"
        className={`nav-burger ${open ? 'nav-burger--open' : ''}`}
        aria-label="Abrir menú"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-links-wrap ml-auto flex flex-1 items-center justify-end gap-3 ${open ? 'open' : ''}`}>
        <nav className="nav-links relative flex flex-wrap items-center justify-end gap-1">
          {links.map(({ to, label }) => (
            <a
              key={to}
              href={to}
              className="nav-link interactive-glow"
              onClick={(e) => handleLinkClick(e, to)}
            >
              {label}
            </a>
          ))}
          <div
            className="nav-indicator"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
        </nav>
      </div>
    </header>
  )
}
