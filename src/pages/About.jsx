import ScrollReveal from '../components/ScrollReveal'
import SkillBar from '../components/SkillBar'
import SoftSkillRing from '../components/SoftSkillRing'

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

const careerRoles = [
  {
    company: 'E&L Consultores S.A.C.',
    roleTitle: 'Implementadora TI / asistente de operaciones',
    period: 'Nov 2024 – Dic 2025',
    bullets: [
      'Configuración de equipos TI en campo y elaboración de mapas topológicos de redes (MINSA).',
      'Gestión de documentación técnica y dossiers — proyecto Escuelas del Bicentenario (MINEDU).',
      'Coordinación entre áreas de operaciones, producción y telecomunicaciones.',
    ],
    badges: ['MINSA', 'MINEDU', 'Redes', 'Telecomunicaciones', 'Documentación'],
  },
  {
    company: 'Sodimac Perú',
    roleTitle: 'Gestión de datos y atención (call center)',
    period: '2018 – 2024',
    bullets: [
      'Gestión de tickets y reclamos en Salesforce CRM con seguimiento hasta cierre.',
      'Control de inventario y stock de productos top 10/30 en sistema.',
      'Coordinación de envíos con almacén y registro de datos de productos.',
    ],
    badges: ['Salesforce', 'CRM', 'Inventario', 'Atención al cliente'],
  },
]

const careerInsight =
  'Mi experiencia previa me ha dotado de una capacidad excepcional para entender los procesos de negocio y las necesidades del usuario final, lo que me permite construir software que no solo funciona, sino que resuelve problemas reales.'

export default function About() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:px-10">
      <ScrollReveal delay={0}>
        <h2 className="font-display mb-6 text-4xl text-white md:text-5xl">
          Sobre mí
        </h2>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-[#d4b8e0]">
          Soy desarrolladora full stack con pasión por interfaces cuidadas y código
          mantenible. Disfruto transformar ideas en productos web rápidos y
          accesibles, colaborando de forma cercana con diseño y negocio. Me mueve
          aprender herramientas nuevas, iterar con feedback real y dejar cada
          proyecto más claro y usable que el anterior.
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

      <ScrollReveal delay={0.06}>
        <h2 className="font-display mb-3 text-4xl text-white md:text-5xl">
          Trayectoria profesional
        </h2>
        <p className="mb-2 max-w-3xl text-base leading-relaxed text-[#d4b8e0] md:text-lg">
          Trayectoria en{' '}
          <span className="text-white/95">operaciones, datos y TI en campo</span>
          : experiencia que hoy orienta mi{' '}
          <span className="text-[#eab308]/90">desarrollo de software</span>
          —procesos de negocio, sistemas y foco en quien usa la herramienta.
        </p>
        <ul className="career-timeline mb-10 max-w-3xl">
          {careerRoles.map((role) => (
            <li key={role.company} className="career-timeline__item">
              <div className="career-timeline__rail" aria-hidden>
                <span className="career-timeline__dot" />
                <span className="career-timeline__stem" />
              </div>
              <div className="portfolio-card-gradient-border career-card-wrap">
                <div className="portfolio-card-glass group career-card-glass">
                  <h3 className="portfolio-card-title career-card-title career-card-company">
                    {role.company}
                  </h3>
                  <p className="career-card-role">{role.roleTitle}</p>
                  <p className="career-card-period">{role.period}</p>
                  <ul className="career-card-bullets">
                    {role.bullets.map((line, i) => (
                      <li key={`${role.company}-${i}`}>{line}</li>
                    ))}
                  </ul>
                  <div className="portfolio-card-tags career-card-tags">
                    {role.badges.map((b) => (
                      <span key={b} className="portfolio-card-tag career-skill-badge">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="portfolio-card-gradient-border career-insight-wrap max-w-3xl">
          <aside
            className="portfolio-card-glass career-insight-glass"
            aria-labelledby="career-insight-heading"
          >
            <div className="career-insight-head">
              <span className="career-insight-icon" aria-hidden>
                ◈
              </span>
              <h3 id="career-insight-heading" className="career-insight-heading">
                Por qué esto me hace mejor desarrolladora
              </h3>
              <span
                className="career-insight-hint"
                title={careerInsight}
                tabIndex={0}
              >
                i
              </span>
            </div>
            <p className="career-insight-text">{careerInsight}</p>
          </aside>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <h2 className="font-display mb-8 text-4xl text-white md:text-5xl">
          Habilidades
        </h2>
        <div className="mb-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-mono-label mb-4 text-sm uppercase tracking-wider text-[#c44fd8]">
              Habilidades técnicas
            </h3>
            {hard.map((s) => (
              <SkillBar key={s.label} label={s.label} percent={s.p} />
            ))}
          </div>
          <div>
            <h3 className="font-mono-label mb-4 text-sm uppercase tracking-wider text-[#c44fd8]">
              Habilidades blandas
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {soft.map((s) => (
                <SoftSkillRing key={s.label} label={s.label} percent={s.p} />
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
