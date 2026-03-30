import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const GANTT_PREVIEW_IMG =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85'

const portfolio = [
  {
    id: 'gantt',
    title: 'Gestión de proyectos (Gantt)',
    roleBadge: 'Full stack',
    desc:
      'Vista tipo diagrama de Gantt con tareas, fechas y estados. Datos en el navegador.',
    stack: ['React', 'CSS', 'Almacenamiento local'],
    link: '/projects/gantt',
  },
  {
    id: 'ecom',
    title: 'Comercio electrónico integral',
    roleBadge: 'Full stack',
    desc:
      'Catálogo, carrito y flujo de pago simulado. Administración básica de productos.',
    stack: ['React', 'Almacenamiento local', 'Imágenes de referencia'],
    link: '/projects/ecommerce',
  },
]

function MockupGantt() {
  return (
    <div className="portfolio-mockup portfolio-mockup--gantt" aria-hidden>
      <img
        className="portfolio-mockup__gantt-photo"
        src={GANTT_PREVIEW_IMG}
        alt=""
        loading="lazy"
      />
      <div className="portfolio-mockup__gantt-scrim" />
      <div className="portfolio-mockup__gantt-ui">
        <div className="portfolio-mockup__gantt-header" />
        <div className="portfolio-mockup__gantt-row">
          <div className="portfolio-mockup__gantt-label" />
          <div className="portfolio-mockup__gantt-track">
            <div className="portfolio-mockup__gantt-bar" />
          </div>
        </div>
        <div className="portfolio-mockup__gantt-row">
          <div className="portfolio-mockup__gantt-label" />
          <div className="portfolio-mockup__gantt-track">
            <div className="portfolio-mockup__gantt-bar portfolio-mockup__gantt-bar--2" />
          </div>
        </div>
        <div className="portfolio-mockup__gantt-row">
          <div className="portfolio-mockup__gantt-label" />
          <div className="portfolio-mockup__gantt-track">
            <div className="portfolio-mockup__gantt-bar portfolio-mockup__gantt-bar--3" />
          </div>
        </div>
      </div>
    </div>
  )
}

function MockupEcom() {
  return (
    <div className="portfolio-mockup portfolio-mockup--ecom" aria-hidden>
      <img
        className="portfolio-mockup__ecom-photo"
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85"
        alt=""
        loading="lazy"
      />
      <div className="portfolio-mockup__ecom-overlay" />
      <div className="portfolio-mockup__ecom-chrome">
        <span className="portfolio-mockup__ecom-dot" />
        <span className="portfolio-mockup__ecom-dot" />
        <span className="portfolio-mockup__ecom-dot" />
      </div>
      <div className="portfolio-mockup__ecom-body">
        <div className="portfolio-mockup__ecom-cell" />
        <div className="portfolio-mockup__ecom-cell" />
        <div className="portfolio-mockup__ecom-cell" />
        <div className="portfolio-mockup__ecom-cell" />
        <div className="portfolio-mockup__ecom-cell" />
        <div className="portfolio-mockup__ecom-cell" />
      </div>
    </div>
  )
}

function PortfolioCard({ item }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({
    transform:
      'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
    transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
  })

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const px = (x / r.width - 0.5) * 2
    const py = (y / r.height - 0.5) * 2
    const max = 4
    const rotateY = px * max
    const rotateX = -py * max
    setTilt({
      transform: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.018,1.018,1.018)`,
      transition: 'transform 0.08s linear',
    })
  }, [])

  const onLeave = useCallback(() => {
    setTilt({
      transform:
        'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
    })
  }, [])

  return (
    <div className="portfolio-card-root">
      <div
        ref={ref}
        className="portfolio-card-tilt"
        style={tilt}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="portfolio-card-gradient-border">
          <div className="portfolio-card-glass group">
            {item.id === 'gantt' ? <MockupGantt /> : <MockupEcom />}
            <span className="portfolio-card-pill">{item.roleBadge}</span>
            <h2 className="portfolio-card-title">{item.title}</h2>
            <p className="portfolio-card-desc">{item.desc}</p>
            <div className="portfolio-card-tags">
              {item.stack.map((s) => (
                <span key={s} className="portfolio-card-tag">
                  {s}
                </span>
              ))}
            </div>
            <Link to={item.link} className="portfolio-cta">
              Ver proyecto
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <div className="relative z-10 mx-auto max-w-[1320px] px-4 py-16 md:px-10 md:py-20">
      <ScrollReveal delay={0}>
        <h1 className="projects-page-title font-display mb-4 text-4xl text-white md:text-6xl">
          Proyectos
        </h1>
        <p className="font-mono-label mb-14 max-w-2xl text-sm leading-relaxed text-[#d4b8e0] md:text-base">
          Demos técnicas enlazadas a este portafolio. Cada una abre la experiencia
          completa en una vista aparte.
        </p>
      </ScrollReveal>

      <div className="projects-page-grid">
        {portfolio.map((p, i) => (
          <ScrollReveal
            key={p.id}
            className="projects-grid-reveal"
            delay={0.08 + i * 0.1}
          >
            <PortfolioCard item={p} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
