import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const portfolio = [
  {
    title: 'Gestión de proyectos (Gantt)',
    desc:
      'Sistema de gestión de proyectos con visualización dinámica de tiempos, hitos y dependencias. Optimizado para la toma de decisiones en equipos técnicos.',
    stack: ['React', 'CSS', 'localStorage'],
    link: '/projects/gantt',
    gradient: 'from-[#57534e] via-[#ca8a04] to-[#1a0030]',
  },
  {
    title: 'E-commerce full stack (simulado)',
    desc:
      'Tienda con catálogo filtrable, administración de productos (CRUD), carrito persistente y pasarela de pago con validación. Estilo retail limpio e imágenes de calidad.',
    stack: ['React', 'localStorage', 'Unsplash'],
    link: '/projects/ecommerce',
    gradient: 'from-[#fef9c3] via-[#ca8a04] to-[#1a0030]',
  },
]

export default function Projects() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:px-10 md:py-16">
      <ScrollReveal>
        <h1 className="font-display mb-3 text-4xl text-white md:text-6xl">
          Proyectos
        </h1>
        <p className="font-mono-label mb-12 max-w-2xl text-sm leading-relaxed text-[#d4b8e0] md:text-base">
          Selección de trabajos y demos interactivas. Cada tarjeta enlaza a una
          experiencia completa dentro del portafolio.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {portfolio.map((p, i) => (
          <div
            key={p.title}
            className="project-card-stagger rounded-2xl bg-[#1a0030] p-6 md:p-7"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div
              className={`mb-5 h-32 w-full rounded-xl bg-gradient-to-br ${p.gradient} shadow-inner`}
              aria-hidden
            />
            <h2 className="font-display text-xl leading-snug text-white md:text-2xl">
              {p.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#d4b8e0] md:text-[0.95rem]">
              {p.desc}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-[rgba(196,79,216,0.4)] bg-[#0d001a] px-2.5 py-1 font-mono-label text-[10px] uppercase tracking-wide text-[#e040fb]"
                >
                  {s}
                </span>
              ))}
            </div>
            <Link
              to={p.link}
              className="font-mono-label mt-6 flex w-full items-center justify-center rounded-xl border border-[rgba(196,79,216,0.45)] py-3 text-sm font-semibold text-[#c44fd8] transition duration-200 hover:border-[#c44fd8] hover:bg-[#c44fd8] hover:text-white hover:shadow-[0_0_24px_rgba(196,79,216,0.35)]"
            >
              Ver proyecto
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
