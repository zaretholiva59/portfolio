import { Link } from 'react-router-dom'
import { useRef } from 'react'
import ScrollReveal from '../components/ScrollReveal'
import Certifications from '../components/Certifications'

const EMAIL = 'zareth55@gmail.com'

const rows = [
  { label: 'Nombre', value: 'Zareth Oliva' },
  { label: 'Especialidad', value: 'Desarrolladora full stack' },
  { label: 'Correo', value: EMAIL },
  { label: 'Ubicación', value: 'Callao, Lima, Perú' },
  { label: 'Disponibilidad', value: 'Abierta a proyectos' },
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
    variant: 'default',
  },
  {
    title: 'Comercio electrónico integral',
    desc: 'Catálogo, carrito y pago simulado.',
    to: '/projects/ecommerce',
    variant: 'ecom',
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

      <Certifications />

      <ScrollReveal className="mt-16">
        <h3 className="font-display mb-5 inline-block rounded-t-xl bg-[#c44fd8] px-5 py-2.5 text-xl text-white">
          Proyectos
        </h3>
        <div className="profile-carousel">
          <button
            type="button"
            className="profile-carousel__btn profile-carousel__btn--prev"
            aria-label="Anterior"
            onClick={() => scrollByDir(-1)}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <div
            ref={scroller}
            className="profile-carousel__track"
          >
            {previews.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className={`profile-preview-card ${card.variant === 'ecom' ? 'profile-preview-card--ecom' : ''}`}
              >
                <div
                  className="profile-preview-card__visual"
                  aria-hidden
                />
                <div className="profile-preview-card__caption">
                  <p className="profile-preview-card__title">
                    {card.title}
                  </p>
                  <p className="profile-preview-card__desc">
                    {card.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <button
            type="button"
            className="profile-carousel__btn profile-carousel__btn--next"
            aria-label="Siguiente"
            onClick={() => scrollByDir(1)}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      </ScrollReveal>
    </div>
  )
}
