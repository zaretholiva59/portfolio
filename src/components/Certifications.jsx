import ScrollReveal from './ScrollReveal'

const certs = [
  {
    id: 'pcap',
    title: 'Python Essentials (PCAP)',
    issuer: 'Cisco Networking Academy',
    date: 'Febrero 2023',
    focus:
      'Lógica de programación y fundamentos sólidos.',
    verifyHref: '/certificates/pcap-python-essentials-cisco.pdf',
    brand: 'cisco',
  },
  {
    id: 'mongo',
    title: 'NoSQL con MongoDB',
    issuer: 'Código Facilito',
    date: 'Marzo 2026',
    focus:
      'Manejo de bases de datos modernas y escalabilidad.',
    verifyHref: '/certificates/nosql-mongodb-codigo-facilito.pdf',
    brand: 'codigo-facilito',
  },
  {
    id: 'git',
    title: 'Curso profesional de Git',
    issuer: 'Código Facilito',
    date: 'Marzo 2026',
    focus:
      'Control de versiones y colaboración en flujos de trabajo profesionales.',
    verifyHref: '/certificates/git-profesional-codigo-facilito.pdf',
    brand: 'codigo-facilito',
  },
]

function LogoCisco({ className }) {
  const heights = [14, 22, 30, 18, 26, 16, 24, 12]
  return (
    <svg
      className={className}
      viewBox="0 0 100 40"
      aria-hidden
      focusable="false"
    >
      <g fill="currentColor">
        {heights.map((h, i) => (
          <rect
            key={i}
            x={4 + i * 12}
            y={36 - h}
            width="5"
            height={h}
            rx="1"
          />
        ))}
      </g>
    </svg>
  )
}

export default function Certifications() {
  return (
    <ScrollReveal className="mt-16">
      <h2 className="font-display mb-2 text-4xl text-white md:text-5xl">
        Certificaciones
      </h2>
      <p className="mb-8 max-w-2xl text-sm text-[#d4b8e0] md:text-base">
        Formación reciente que refuerza mi perfil técnico y mi enfoque en datos,
        backend y buenas prácticas de equipo.
      </p>
      <ul className="cert-grid">
        {certs.map((c) => (
          <li key={c.id}>
            <article className="cert-card">
              <div className="cert-card__top">
                {c.brand === 'cisco' ? (
                  <LogoCisco className="cert-logo cert-logo--cisco" />
                ) : (
                  <div className="cert-logo cert-logo--cf" aria-hidden>
                    CF
                  </div>
                )}
                <span className="cert-card__issuer">{c.issuer}</span>
              </div>
              <h3 className="cert-card__title">{c.title}</h3>
              <p className="cert-card__date">{c.date}</p>
              <p className="cert-card__focus">{c.focus}</p>
              <a
                className="cert-verify"
                href={c.verifyHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Verificar credencial
              </a>
            </article>
          </li>
        ))}
      </ul>
      <p className="cert-learning-note">
        Comprometida con el aprendizaje continuo y la actualización constante en
        las últimas tecnologías del sector.
      </p>
    </ScrollReveal>
  )
}
