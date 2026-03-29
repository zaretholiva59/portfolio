import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const portfolio = [
  {
    title: 'Task Manager — Gantt',
    desc: 'Gestión de proyectos con diagrama de Gantt interactivo',
    stack: ['React', 'CSS', 'LocalStorage'],
  },
]

export default function Projects() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:px-8">
      <ScrollReveal>
        <h1 className="font-display mb-2 text-4xl text-white md:text-6xl">
          My Projects
        </h1>
        <p className="font-mono-label mb-10 text-sm text-[#d4b8e0]">
          Portfolio selection
        </p>
      </ScrollReveal>

      <div className="mb-6 columns-1 gap-6 md:columns-2 lg:columns-3">
        {portfolio.map((p, i) => (
          <div
            key={p.title}
            className="project-card-stagger mb-6 break-inside-avoid rounded-xl border border-[rgba(196,79,216,0.5)] bg-[#1a0030] p-5 interactive-glow"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div
              className="mb-4 h-28 w-full rounded-lg bg-gradient-to-br from-[#7b1fa2] via-[#b026d4] to-[#0d001a]"
              aria-hidden
            />
            <h2 className="font-display text-xl text-white">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#d4b8e0]">
              {p.desc}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-[rgba(196,79,216,0.45)] bg-[#0d001a] px-2 py-0.5 font-mono-label text-[10px] text-[#e040fb]"
                >
                  {s}
                </span>
              ))}
            </div>
            <Link
              to="/projects/gantt"
              className="font-mono-label mt-4 flex w-full items-center justify-center rounded-lg border border-[rgba(196,79,216,0.5)] py-2 text-sm text-[#c44fd8] transition hover:bg-[#c44fd8] hover:text-white hover:shadow-[0_0_20px_rgba(196,79,216,0.5)]"
            >
              Ver más
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
