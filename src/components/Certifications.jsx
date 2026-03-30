import ScrollReveal from './ScrollReveal'

const CERT_LABORAL = '/certificates/certificado-laboral-e-l-technology.pdf'

const certs = [
  {
    id: 'laboral-el',
    title: 'Certificado laboral TI',
    issuer: 'E&L Technology',
    year: '2024–2025',
    verifyHref: CERT_LABORAL,
    brand: 'company',
  },
  {
    id: 'pcap',
    title: 'Python Essentials (PCAP)',
    issuer: 'Cisco Networking Academy',
    year: 'Feb. 2023',
    verifyHref: '/certificates/pcap-python-essentials-cisco.pdf',
    brand: 'cisco',
  },
  {
    id: 'mongo',
    title: 'NoSQL con MongoDB',
    issuer: 'Código Facilito',
    year: 'Mar. 2026',
    verifyHref: '/certificates/nosql-mongodb-codigo-facilito.pdf',
    brand: 'codigo-facilito',
  },
  {
    id: 'git',
    title: 'Git profesional',
    issuer: 'Código Facilito',
    year: 'Mar. 2026',
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

function CertLogo({ brand }) {
  if (brand === 'cisco') {
    return <LogoCisco className="cert-logo cert-logo--cisco" />
  }
  if (brand === 'company') {
    return (
      <span
        className="cert-logo cert-logo--company fa-solid fa-building"
        aria-hidden
      />
    )
  }
  return (
    <div className="cert-logo cert-logo--cf" aria-hidden>
      CF
    </div>
  )
}

export default function Certifications() {
  return (
    <ScrollReveal className="mt-16" delay={0.06}>
      <h2 className="font-display mb-2 text-4xl text-white md:text-5xl">
        Certificaciones
      </h2>
      <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[#d4b8e0] md:text-base">
        Credenciales y constancias que respaldan la formación y la experiencia
        registrada.
      </p>
      <ul className="cert-grid cert-grid--4">
        {certs.map((c) => (
          <li key={c.id}>
            <article className="cert-card">
              <div className="cert-card__top">
                <CertLogo brand={c.brand} />
                <span className="cert-year-badge">{c.year}</span>
              </div>
              <h3 className="cert-card__title">{c.title}</h3>
              <p className="cert-card__issuer-line">{c.issuer}</p>
              {c.verifyHref ? (
                <a
                  className="cert-verify"
                  href={c.verifyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Verificar credencial
                </a>
              ) : null}
            </article>
          </li>
        ))}
      </ul>
      <p className="cert-learning-note">
        Actualización continua en herramientas y buenas prácticas del sector.
      </p>
    </ScrollReveal>
  )
}
