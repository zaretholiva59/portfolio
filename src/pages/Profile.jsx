import { Link } from 'react-router-dom'
import { useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'

const EMAIL = 'zareth55@gmail.com'

const rows = [
  { label: 'Nombre', value: 'Zareth' },
  { label: 'Especialidad', value: 'Desarrollador full stack' },
  { label: 'Correo', value: EMAIL },
  { label: 'Ubicación', value: 'Remoto / LATAM' },
  { label: 'Disponibilidad', value: 'Abierto a proyectos' },
  { label: 'GitHub', value: 'github.com/zaretholiva59' },
]

const contacts = [
  { id: 'gh', icon: 'fa-brands fa-github', text: `GitHub: github.com/zaretholiva59` },
  { id: 'em', icon: 'fa-solid fa-envelope', text: `Correo: ${EMAIL}` },
]

const previews = [
  {
    title: 'Gestión de proyectos (Gantt)',
    desc: 'Diagrama de Gantt, CRUD y filtros.',
    to: '/projects/gantt',
  },
  {
    title: 'E-commerce agora fresh',
    desc: 'Catálogo, carrito y pago simulado.',
    to: '/projects/ecommerce',
  },
]

export default function Profile() {
  const scroller = useRef(null)

  const scrollByDir = (dir) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * 280, behavior: 'smooth' })
  }

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 md:px-10">
      <div className="grid gap-12 lg:grid-cols-2">
        <ScrollReveal>
          <h2 className="font-display mb-6 text-4xl text-white md:text-5xl">
            Mi perfil
          </h2>
          <div className="overflow-hidden rounded-xl border border-[rgba(196,79,216,0.45)] shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <table className="w-full border-collapse text-left">
              <tbody>
                {rows.map((row) => (
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

        <ScrollReveal>
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

      <ScrollReveal className="mt-16">
        <h3 className="font-display mb-5 inline-block rounded-t-xl bg-[#c44fd8] px-5 py-2.5 text-xl text-white">
          Proyectos
        </h3>
        <div className="relative">
          <button
            type="button"
            className="absolute left-0 top-1/2 z-[2] hidden -translate-y-1/2 rounded-full border border-[rgba(196,79,216,0.5)] bg-[#1a0030] p-2 text-[#c44fd8] shadow-[0_0_20px_rgba(196,79,216,0.5)] transition hover:bg-[#c44fd8] hover:text-white md:block"
            aria-label="Anterior"
            onClick={() => scrollByDir(-1)}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            type="button"
            className="absolute right-0 top-1/2 z-[2] hidden -translate-y-1/2 rounded-full border border-[rgba(196,79,216,0.5)] bg-[#1a0030] p-2 text-[#c44fd8] shadow-[0_0_20px_rgba(196,79,216,0.5)] transition hover:bg-[#c44fd8] hover:text-white md:block"
            aria-label="Siguiente"
            onClick={() => scrollByDir(1)}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
          <div
            ref={scroller}
            className="flex gap-4 overflow-x-auto pb-2 pt-1 [scrollbar-width:thin]"
          >
            {previews.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="group relative block min-w-[168px] max-w-[190px] flex-shrink-0 overflow-hidden rounded-xl border border-[rgba(196,79,216,0.45)] bg-[#1a0030] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(196,79,216,0.25)]"
              >
                <div
                  className="h-36 w-full bg-gradient-to-br from-[#9b30ff] via-[#b026d4] to-[#0d001a]"
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[rgba(13,0,26,0.92)] px-2 py-2.5">
                  <p className="text-center font-mono-label text-xs font-semibold text-white">
                    {card.title}
                  </p>
                  <p className="mt-1 text-center font-body text-[10px] leading-snug text-[#d4b8e0]">
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
