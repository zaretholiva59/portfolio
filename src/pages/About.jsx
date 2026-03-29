import ScrollReveal from '../components/ScrollReveal'
import SkillBar from '../components/SkillBar'
import SoftSkillRing from '../components/SoftSkillRing'

const tags = [
  'React',
  'TypeScript',
  'Node.js',
  'Vite',
  'Tailwind',
  'PostgreSQL',
  'Figma',
  'REST',
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

export default function About() {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 md:px-8">
      <ScrollReveal>
        <h2 className="font-display mb-6 text-4xl text-white md:text-5xl">
          About Me
        </h2>
        <p className="mb-8 max-w-3xl text-lg leading-relaxed text-[#d4b8e0]">
          Soy desarrollador full stack con pasión por interfaces cuidadas y código
          mantenible. Disfruto transformar ideas en productos web rápidos y
          accesibles, colaborando de forma cercana con diseño y negocio. Me mueve
          aprender herramientas nuevas, iterar con feedback real y dejar cada
          proyecto más claro y usable que el anterior.
        </p>
        <div className="mb-14 flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[rgba(196,79,216,0.5)] bg-[#1a0030] px-4 py-1.5 font-mono-label text-xs text-[#d4b8e0] transition duration-300 hover:shadow-[0_0_20px_rgba(196,79,216,0.5)]"
            >
              {t}
            </span>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <h2 className="font-display mb-8 text-4xl text-white md:text-5xl">
          Skills
        </h2>
        <div className="mb-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-mono-label mb-4 text-sm uppercase tracking-wider text-[#c44fd8]">
              Hard skills
            </h3>
            {hard.map((s) => (
              <SkillBar key={s.label} label={s.label} percent={s.p} />
            ))}
          </div>
          <div>
            <h3 className="font-mono-label mb-4 text-sm uppercase tracking-wider text-[#c44fd8]">
              Soft skills
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
