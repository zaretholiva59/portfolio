import { Link } from 'react-router-dom'
import { useRef, useCallback, useState } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import Certifications from '../components/Certifications'
import SkillBar from '../components/SkillBar'
import SoftSkillRing from '../components/SoftSkillRing'
import { CERTIFICADO_LABORAL_EL_URL } from '../constants/staticDocs'

const EMAIL = 'zareth55@gmail.com'

const profileRows = [
  { label: 'Nombre', value: 'Zareth Oliva' },
  { label: 'Especialidad', value: 'Desarrolladora de sistemas · Operaciones TI' },
  { label: 'Correo', value: EMAIL },
  { label: 'Ubicación', value: 'Callao, Lima, Perú' },
  { label: 'Disponibilidad', value: 'Abierta a proyectos' },
  { label: 'GitHub', value: 'github.com/zaretholiva59' },
]

const contacts = [
  { id: 'gh', icon: 'fa-brands fa-github', text: `GitHub: github.com/zaretholiva59` },
  { id: 'em', icon: 'fa-solid fa-envelope', text: `Correo: ${EMAIL}` },
]

const languages = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'Django',
  'Node',
  'Next.js',
]

const tools = [
  'Vite',
  'Tailwind CSS',
  'Git',
  'Figma',
  'PostgreSQL',
  'APIs REST',
  'VS Code',
]

const hard = [
  { label: 'JavaScript / TypeScript', p: 88 },
  { label: 'React & ecosistema', p: 90 },
  { label: 'Node.js / APIs', p: 82 },
  { label: 'CSS & diseño UI', p: 85 },
  { label: 'Bases de datos', p: 78 },
]

const soft = [
  { label: 'Comunicación', p: 85 },
  { label: 'Trabajo en equipo', p: 90 },
  { label: 'Resolución de problemas', p: 88 },
  { label: 'Gestión del tiempo', p: 80 },
]

const tagClass =
  'rounded-full border border-[rgba(196,79,216,0.5)] bg-[#1a0030] px-4 py-1.5 font-mono-label text-xs text-[#d4b8e0] transition duration-300 hover:shadow-[0_0_20px_rgba(196,79,216,0.5)]'

const perfilProfesionalVision =
  'Profesional con más de 6 años de trayectoria integrando la gestión operativa, el análisis de datos y la infraestructura técnica. Mi experiencia en el sector retail (Sodimac) me permitió dominar la resolución de incidencias críticas y la lógica de inventarios en plataformas corporativas, desarrollando una visión estratégica sobre la eficiencia de procesos. Esta base se complementa con mi desempeño en proyectos de infraestructura nacional (E&L), donde gestioné documentación técnica y despliegue TI bajo normativas gubernamentales. Mi enfoque está en diseñar soluciones que optimicen la rentabilidad y la operatividad de sistemas complejos.'

const careerEL = {
  company: 'E&L Technology',
  roleTitle: 'Técnico TI / Asistente de Operaciones',
  period: '2024 – 2025',
  bullets: [
    'Implementación y configuración de equipos multimedia en campo y coordinación del despliegue técnico para el PEIP Escuelas Bicentenario (MINEDU).',
    'Gestión de documentación técnica y dossiers para el área de SSOMA del proyecto Escuelas Bicentenario, garantizando el cumplimiento de normativas y el cierre de observaciones.',
    'Elaboración de mapas topológicos de redes para proyectos de infraestructura del Ministerio de Salud (MINSA), documentando nodos y puntos críticos de conexión.',
  ],
  badges: ['MINEDU', 'MINSA', 'PEIP', 'SSOMA', 'Infraestructura TI'],
  certHref: CERTIFICADO_LABORAL_EL_URL,
}

const careerSodimac = {
  company: 'Sodimac Perú',
  roleTitle: 'Especialista en Operaciones e Inventarios',
  period: '2018 – 2024',
  bullets: [
    '6 años liderando la gestión de stock de productos estratégicos (Top 10/30) y la integridad de datos en sistemas de inventario.',
    'Gestión de tickets y resolución de reclamos críticos mediante Salesforce CRM (8 meses en área especializada de Call Center), asegurando la continuidad del servicio.',
    'Análisis operativo y coordinación logística para la optimización de procesos entre almacén y cliente final.',
  ],
  badges: ['Salesforce', 'Inventario', 'Retail', 'CRM', 'Logística'],
}

const GANTT_PREVIEW_IMG =
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85'

const portfolio = [
  {
    id: 'gantt',
    title: 'Gestión de proyectos (Gantt)',
    roleBadge: 'React + Vite',
    desc:
      'Diagrama Gantt y Kanban con drag & drop, prioridades, fechas límite y persistencia en el navegador.',
    stack: ['React', 'Vite', 'localStorage', 'CSS'],
    link: 'https://github.com/zaretholiva59/gantt-manager',
  },
  {
    id: 'ecom',
    title: 'Comercio electrónico integral',
    roleBadge: 'React + Vite',
    desc:
      'Catálogo, carrito, wishlist, búsqueda y flujo de pago simulado con persistencia en el navegador.',
    stack: ['React', 'Vite', 'localStorage', 'CSS'],
    link: 'https://github.com/zaretholiva59/ecommerce-app',
  },
  {
    id: 'preschool',
    title: 'Sistema de Gestión Preescolar',
    roleBadge: 'React + Vite',
    desc:
      'Actividades, galería, calendario y anuncios para gestión de aulas preescolares.',
    stack: ['React', 'Vite', 'localStorage', 'CSS'],
    link: 'https://github.com/zaretholiva59/preschool-app',
  },
]

function CareerExperienceCard({ children, variant }) {
  return (
    <div
      className={`portfolio-card-gradient-border career-card-wrap career-card-wrap--${variant}`}
    >
      {children}
    </div>
  )
}

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

function MockupPreschool() {
  return (
    <div className="portfolio-mockup portfolio-mockup--preschool" aria-hidden>
      <img
        className="portfolio-mockup__preschool-photo"
        src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=900&q=85"
        alt=""
        loading="lazy"
      />
      <div className="portfolio-mockup__preschool-overlay" />
      <div className="portfolio-mockup__preschool-content">
        <div className="portfolio-mockup__preschool-block" />
        <div className="portfolio-mockup__preschool-block" />
        <div className="portfolio-mockup__preschool-block" />
      </div>
    </div>
  )
}

function PortfolioCard({ item }) {
  const ref = useRef(null)
  const [isTilting, setIsTilting] = useState(false)
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
    
    setIsTilting(true)
    setTilt({
      transform: `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.018,1.018,1.018)`,
    })
  }, [])

  const onLeave = useCallback(() => {
    setIsTilting(false)
    setTilt({
      transform:
        'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
    })
  }, [])

  const renderMockup = () => {
    switch (item.id) {
      case 'gantt':
        return <MockupGantt />
      case 'ecom':
        return <MockupEcom />
      case 'preschool':
        return <MockupPreschool />
      default:
        return null
    }
  }

  return (
    <div className="portfolio-card-root">
      <div
        ref={ref}
        className={`portfolio-card-tilt ${isTilting ? 'portfolio-card-tilt--tilting' : ''}`}
        style={tilt}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="portfolio-card-gradient-border">
          <div className="portfolio-card-glass group">
            {renderMockup()}
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

export default function LandingPage() {
  return (
    <>
      <section id="home" className="relative z-10 flex min-h-[calc(100vh-56px)] flex-col px-4 pb-28 pt-10 md:px-8 md:pt-12 lg:px-12">
        <div className="relative flex flex-1 flex-col items-center justify-center text-center">
          <div className="mx-auto w-full max-w-2xl">
            <p className="font-script hero-anim-left delay-1 mb-3 text-3xl text-[#d4b8e0] md:text-4xl lg:text-5xl">
              Hola, soy
            </p>
            <h1 className="font-body hero-anim-left delay-2 mb-5 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              <span className="glitch-name">Zareth</span>
            </h1>
            <p className="font-mono-label hero-anim-left delay-3 mx-auto mb-3 max-w-lg text-sm leading-relaxed text-[#e9d5ff] md:text-base shimmer-text">
              Desarrolladora de sistemas | Especialista en operaciones TI
            </p>
            <p className="font-body hero-anim-left delay-3 mx-auto mb-10 max-w-xl text-sm leading-relaxed text-[#d4b8e0] md:text-base">
              Productos web claros y código mantenible.
            </p>
          </div>
        </div>
        <div className="scroll-indicator" aria-hidden />
      </section>

      <section id="profile" className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <ScrollReveal variant="left">
            <h2 className="font-display mb-6 text-4xl text-white md:text-5xl">
              Mi perfil
            </h2>
            <div className="overflow-hidden rounded-xl border border-[rgba(196,79,216,0.45)] shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              <table className="w-full border-collapse text-left">
                <tbody>
                  {profileRows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-[rgba(196,79,216,0.3)] last:border-b-0"
                    >
                      <td
                        className="w-[38%] px-4 py-3.5 font-mono-label text-sm text-[#d4b8e0]"
                        style={{ background: '#2d0050' }}
                      >
                        {row.label}
                      </td>
                      <td className="break-all px-4 py-3.5 font-semibold text-white">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right">
            <h2 className="font-display mb-6 text-4xl text-white md:text-5xl">
              Contacto
            </h2>
            <ul className="flex flex-col gap-4">
              {contacts.map((c) => (
                <li
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl border border-[rgba(196,79,216,0.45)] bg-[#1a0030] px-4 py-3.5 interactive-glow"
                >
                  <span
                    className={`${c.icon} text-xl text-[#e040fb]`}
                    aria-hidden
                  />
                  <span className="font-mono-label break-all text-sm text-[#d4b8e0]">
                    {c.text}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
        <Certifications />
      </section>

      <section id="about" className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:px-10">
        <ScrollReveal delay={0}>
          <h2 className="font-display mb-6 text-4xl text-white md:text-5xl">
            Sobre mí
          </h2>
          <p className="mb-8 max-w-3xl text-lg leading-relaxed text-[#d4b8e0]">
            Desarrolladora de sistemas con experiencia previa en operaciones TI y
            gestión de datos. Trabajo con código y interfaces con criterio técnico y
            cercanía a las necesidades reales de uso.
          </p>
          <div className="mb-6">
            <h3 className="font-mono-label mb-3 text-sm uppercase tracking-wider text-[#c44fd8]">
              Lenguajes
            </h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((t) => (
                <span key={t} className={tagClass}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-14">
            <h3 className="font-mono-label mb-3 text-sm uppercase tracking-wider text-[#c44fd8]">
              Herramientas
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((t) => (
                <span key={t} className={tagClass}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <h2 className="font-display mb-3 text-4xl text-white md:text-5xl">
            Trayectoria profesional
          </h2>
          <div className="portfolio-card-gradient-border career-vision-wrap mb-10 max-w-3xl">
            <div className="portfolio-card-glass career-vision-inner">
              <h3 className="font-mono-label mb-3 text-sm uppercase tracking-wider text-[#c44fd8]">
                Perfil profesional · Visión de negocio
              </h3>
              <p className="career-vision-text">{perfilProfesionalVision}</p>
            </div>
          </div>
          <h3 className="font-mono-label mb-4 text-sm uppercase tracking-wider text-[#c44fd8]">
            Experiencia laboral
          </h3>
        </ScrollReveal>

        <ul className="career-timeline mb-10 max-w-3xl">
          <li className="career-timeline__row">
            <ScrollReveal delay={0.08} className="career-timeline-reveal">
              <div className="career-timeline__item">
                <div className="career-timeline__rail" aria-hidden>
                  <span className="career-timeline__dot" />
                  <span className="career-timeline__stem" />
                </div>
                <CareerExperienceCard variant="el">
                  <div className="portfolio-card-glass group career-card-glass career-card-el">
                    <h3 className="portfolio-card-title career-card-title career-card-company">
                      {careerEL.company}
                    </h3>
                    <p className="career-card-jobtitle">{careerEL.roleTitle}</p>
                    <p className="career-card-period career-card-period--after-role">
                      {careerEL.period}
                    </p>
                    <ul className="career-card-bullets">
                      {careerEL.bullets.map((line, i) => (
                        <li key={`el-${i}`}>{line}</li>
                      ))}
                    </ul>
                    <div className="portfolio-card-tags career-card-tags">
                      {careerEL.badges.map((b) => (
                        <span key={b} className="portfolio-card-tag career-skill-badge">
                          {b}
                        </span>
                      ))}
                    </div>
                    <a
                      className="career-cert-official-btn career-constancia-btn"
                      href={careerEL.certHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-regular fa-file-lines" aria-hidden />
                      Ver Constancia Oficial TI
                    </a>
                  </div>
                </CareerExperienceCard>
              </div>
            </ScrollReveal>
          </li>
          <li className="career-timeline__row">
            <ScrollReveal delay={0.2} className="career-timeline-reveal">
              <div className="career-timeline__item">
                <div className="career-timeline__rail" aria-hidden>
                  <span className="career-timeline__dot" />
                  <span className="career-timeline__stem" />
                </div>
                <CareerExperienceCard variant="sodimac">
                  <div className="portfolio-card-glass group career-card-glass">
                    <h3 className="portfolio-card-title career-card-title career-card-company">
                      {careerSodimac.company}
                    </h3>
                    <p className="career-card-jobtitle">{careerSodimac.roleTitle}</p>
                    <p className="career-card-period career-card-period--after-role">
                      {careerSodimac.period}
                    </p>
                    <ul className="career-card-bullets">
                      {careerSodimac.bullets.map((line, i) => (
                        <li key={`so-${i}`}>{line}</li>
                      ))}
                    </ul>
                    <div className="portfolio-card-tags career-card-tags">
                      {careerSodimac.badges.map((b) => (
                        <span key={b} className="portfolio-card-tag career-skill-badge">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </CareerExperienceCard>
              </div>
            </ScrollReveal>
          </li>
        </ul>

        <ScrollReveal delay={0.1} className="about-skills-section">
          <div className="about-skills-section__inner">
            <h2 className="font-display mb-10 text-center text-4xl text-white md:mb-12 md:text-5xl">
              Habilidades
            </h2>
            <div className="about-skills-grid mb-12">
              <div className="about-skills-col">
                <h3 className="font-mono-label mb-4 text-center text-sm uppercase tracking-wider text-[#c44fd8] lg:text-left">
                  Habilidades técnicas
                </h3>
                {hard.map((s) => (
                  <SkillBar key={s.label} label={s.label} percent={s.p} />
                ))}
              </div>
              <div className="about-skills-col">
                <h3 className="font-mono-label mb-4 text-center text-sm uppercase tracking-wider text-[#c44fd8] lg:text-left">
                  Habilidades blandas
                </h3>
                <div className="about-skills-rings grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-4 lg:grid-cols-2 lg:gap-5 xl:grid-cols-4">
                  {soft.map((s) => (
                    <SoftSkillRing key={s.label} label={s.label} percent={s.p} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section id="projects" className="relative z-10 mx-auto max-w-[1320px] px-4 py-16 md:px-10 md:py-20">
        <ScrollReveal delay={0}>
          <h1 className="projects-page-title font-display mb-14 text-4xl text-white md:text-6xl">
            Proyectos
          </h1>
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
      </section>
    </>
  )
}
