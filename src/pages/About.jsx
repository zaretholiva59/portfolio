import ScrollReveal from '../components/ScrollReveal'
import SkillBar from '../components/SkillBar'
import SoftSkillRing from '../components/SoftSkillRing'
import { CERTIFICADO_LABORAL_EL_URL } from '../constants/staticDocs'

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

const careerElConsultores = {
  company: 'E&L Consultores',
  period: '2024 – 2025',
  roleVerbatim:
    'Técnico TI e Implementadora, encargada de la configuración de equipos multimedia y elaboración de mapas topológicos de redes para MINSA.',
  bullets: [
    'Gestión de dossiers y documentación técnica bajo normativa para el proyecto Escuelas Bicentenario (MINEDU).',
  ],
  badges: ['MINSA', 'MINEDU', 'Redes', 'Documentación'],
  certHref: CERTIFICADO_LABORAL_EL_URL,
}

const careerSodimac = {
  company: 'Sodimac Perú',
  period: '2018 – 2024',
  summary:
    '6 años liderando la gestión de inventarios críticos y resolución de incidencias mediante Salesforce CRM, optimizando el flujo de datos entre almacén y cliente final.',
  badges: ['Salesforce', 'Inventario', 'CRM'],
}

export default function About() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:px-10">
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

      <ScrollReveal delay={0.06}>
        <h2 className="font-display mb-3 text-4xl text-white md:text-5xl">
          Trayectoria profesional
        </h2>
        <p className="mb-2 max-w-3xl text-base leading-relaxed text-[#d4b8e0] md:text-lg">
          Resumen basado en constancias laborales y certificaciones.
        </p>
        <ul className="career-timeline mb-10 max-w-3xl">
          <li className="career-timeline__item">
            <div className="career-timeline__rail" aria-hidden>
              <span className="career-timeline__dot" />
              <span className="career-timeline__stem" />
            </div>
            <div className="portfolio-card-gradient-border career-card-wrap career-card-wrap--el">
              <div className="portfolio-card-glass group career-card-glass career-card-el">
                <h3 className="portfolio-card-title career-card-title career-card-company">
                  {careerElConsultores.company}
                </h3>
                <p className="career-card-period">{careerElConsultores.period}</p>
                <p className="career-card-role career-card-role--verbatim">
                  {careerElConsultores.roleVerbatim}
                </p>
                <ul className="career-card-bullets">
                  {careerElConsultores.bullets.map((line, i) => (
                    <li key={`el-${i}`}>{line}</li>
                  ))}
                </ul>
                <div className="portfolio-card-tags career-card-tags">
                  {careerElConsultores.badges.map((b) => (
                    <span key={b} className="portfolio-card-tag career-skill-badge">
                      {b}
                    </span>
                  ))}
                </div>
                <a
                  className="career-cert-official-btn"
                  href={careerElConsultores.certHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-regular fa-eye" aria-hidden />
                  Ver Certificado Oficial
                </a>
              </div>
            </div>
          </li>
          <li className="career-timeline__item">
            <div className="career-timeline__rail" aria-hidden>
              <span className="career-timeline__dot" />
              <span className="career-timeline__stem" />
            </div>
            <div className="portfolio-card-gradient-border career-card-wrap career-card-wrap--sodimac">
              <div className="portfolio-card-glass group career-card-glass">
                <h3 className="portfolio-card-title career-card-title career-card-company">
                  {careerSodimac.company}
                </h3>
                <p className="career-card-period career-card-period--solo">
                  {careerSodimac.period}
                </p>
                <p className="career-summary">{careerSodimac.summary}</p>
                <div className="portfolio-card-tags career-card-tags">
                  {careerSodimac.badges.map((b) => (
                    <span key={b} className="portfolio-card-tag career-skill-badge">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </ScrollReveal>

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
    </div>
  )
}
