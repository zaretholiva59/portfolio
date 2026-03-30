import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="relative z-10 flex min-h-[calc(100vh-56px)] flex-col px-4 pb-28 pt-10 md:px-8 md:pt-12 lg:px-12">
      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <div className="mx-auto w-full max-w-2xl">
          <p className="font-script hero-anim-left delay-1 mb-3 text-3xl text-[#d4b8e0] md:text-4xl lg:text-5xl">
            Hola, soy
          </p>
          <h1 className="font-body hero-anim-left delay-2 mb-5 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            <span className="glitch-name">Zareth</span>
          </h1>
          <p className="font-mono-label hero-anim-left delay-3 mx-auto mb-3 max-w-lg text-sm leading-relaxed text-[#e9d5ff] md:text-base">
            Desarrolladora de sistemas | Especialista en operaciones TI
          </p>
          <p className="font-body hero-anim-left delay-3 mx-auto mb-10 max-w-xl text-sm leading-relaxed text-[#d4b8e0] md:text-base">
            Productos web claros y código mantenible.
          </p>

          <div className="hero-anim-left delay-4 hero-nav-line mt-2">
            <div className="hero-nav-inner justify-center">
              <Link
                to="/"
                className="font-body rounded-lg px-3 py-1.5 text-sm text-white interactive-glow"
              >
                Inicio
              </Link>
              <Link
                to="/profile"
                className="rounded-lg px-3 py-1.5 text-sm text-[#d4b8e0] transition hover:text-white interactive-glow"
              >
                Perfil
              </Link>
              <Link
                to="/about"
                className="rounded-lg px-3 py-1.5 text-sm text-[#d4b8e0] transition hover:text-white interactive-glow"
              >
                Sobre mí
              </Link>
              <Link
                to="/projects"
                className="font-mono-label rounded-lg border border-[rgba(196,79,216,0.5)] px-3 py-1.5 text-sm text-[#c44fd8] interactive-glow hover:bg-[#c44fd8] hover:text-white"
              >
                Ver proyectos
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden />
    </section>
  )
}
