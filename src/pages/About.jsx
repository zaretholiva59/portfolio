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

function CareerExperienceCard({ children, variant }) {
  return (
    <div
      className={`portfolio-card-gradient-border career-card-wrap career-card-wrap--${variant}`}
    >
      {children}
    </div>
  )
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

      <ScrollReveal delay={0.05}>
        <h2 className="font-display mb-3 text-4xl text-white md:text-5xl">
          Trayectoria profesional
        </h2>
        <p className="mb-6 max-w-3xl text-base leading-relaxed text-[#d4b8e0] md:text-lg">
          
        </p>
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
    </div>
  )
}
