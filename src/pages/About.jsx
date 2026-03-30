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

const CERT_LABORAL_EL = '/certificates/certificado-laboral-e-l-technology.pdf'

const careerElTechnology = {
  company: 'E&L Technology',
  roleTitle: 'Técnico TI / asistente de operaciones',
  period: '2024 – 2025',
  bullets: [
    'Implementación y configuración de equipos multimedia y despliegue técnico en campo.',
    'Creación y mantenimiento de mapas topológicos de redes (MINSA), documentando nodos y puntos críticos.',
    'Gestión de dossiers y documentación técnica bajo normativa para el proyecto Escuelas Bicentenario (MINEDU).',
  ],
  badges: ['MINSA', 'MINEDU', 'Redes', 'Documentación'],
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
          Resumen alineado a constancias laborales y certificaciones. Sin
          sobredimensionar cargos ni funciones.
        </p>
        <ul className="career-timeline mb-10 max-w-3xl">
          <li className="career-timeline__item">
            <div className="career-timeline__rail" aria-hidden>
              <span className="career-timeline__dot" />
              <span className="career-timeline__stem" />
            </div>
            <div className="portfolio-card-gradient-border career-card-wrap">
              <div className="portfolio-card-glass group career-card-glass">
                <h3 className="portfolio-card-title career-card-title career-card-company">
                  {careerElTechnology.company}
                </h3>
                <p className="career-card-role">{careerElTechnology.roleTitle}</p>
                <p className="career-card-period">{careerElTechnology.period}</p>
                <ul className="career-card-bullets">
                  {careerElTechnology.bullets.map((line, i) => (
                    <li key={`el-${i}`}>{line}</li>
                  ))}
                </ul>
                <div className="portfolio-card-tags career-card-tags">
                  {careerElTechnology.badges.map((b) => (
                    <span key={b} className="portfolio-card-tag career-skill-badge">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </li>
          <li className="career-timeline__item">
            <div className="career-timeline__rail" aria-hidden>
              <span className="career-timeline__dot" />
              <span className="career-timeline__stem" />
            </div>
            <div className="portfolio-card-gradient-border career-card-wrap">
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

        <div className="portfolio-card-gradient-border career-cert-block max-w-3xl">
          <div className="portfolio-card-glass career-cert-inner">
            <h3 className="career-cert-title">Certificado laboral (E&L Technology)</h3>
            <p className="career-cert-lead">
              Mismo documento que respalda el periodo 2024–2025 descrito arriba.
              Si no se visualiza en el navegador, usa el enlace para abrir el PDF.
            </p>
            <div className="career-cert-frame">
              <iframe
                title="Certificado laboral E&L Technology"
                src={`${CERT_LABORAL_EL}#view=FitH`}
              />
            </div>
            <a
              className="career-cert-pdf-link"
              href={CERT_LABORAL_EL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir certificado en PDF
            </a>
          </div>
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
