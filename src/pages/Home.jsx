import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="relative z-10 flex min-h-[calc(100vh-56px)] flex-col px-4 pb-24 pt-8 md:px-8 lg:px-12">
      <div className="relative grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-8">
        <div className="max-w-xl">
          <p className="font-script hero-anim-left delay-1 mb-2 text-2xl text-[#d4b8e0] md:text-3xl">
            Hallo, i&apos;m
          </p>
          <h1 className="font-body hero-anim-left delay-2 mb-4 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            <span className="glitch-name">Zareth</span>
          </h1>
          <p className="font-body hero-anim-left delay-3 mb-6 text-[#d4b8e0]">
            Desarrollador full stack enfocado en experiencias web limpias, accesibles
            y con un toque visual memorable. Me gusta unir diseño y tecnología.
          </p>
          <div className="hero-anim-left delay-4 inline-flex flex-col gap-2">
            <span className="font-mono-label inline-flex w-fit items-center gap-2 rounded-lg border border-[rgba(196,79,216,0.5)] bg-[#1a0030] px-4 py-2 text-sm text-white interactive-glow">
              <span className="text-[#c44fd8]" aria-hidden>
                ◆
              </span>
              Full Stack Developer
            </span>
            <span className="font-mono-label text-xs text-[#d4b8e0]">
              React · Node · Diseño UI
            </span>
          </div>

          <div className="hero-nav-line">
            <div className="hero-nav-inner">
              <Link
                to="/"
                className="font-body rounded-md px-3 py-1 text-sm text-white interactive-glow"
              >
                Home
              </Link>
              <Link
                to="/profile"
                className="rounded-md px-3 py-1 text-sm text-[#d4b8e0] transition hover:text-white interactive-glow"
              >
                Profile
              </Link>
              <Link
                to="/about"
                className="rounded-md px-3 py-1 text-sm text-[#d4b8e0] transition hover:text-white interactive-glow"
              >
                About
              </Link>
              <Link
                to="/projects"
                className="font-mono-label ml-auto rounded-[8px] border border-[rgba(196,79,216,0.5)] px-3 py-1 text-sm text-[#c44fd8] interactive-glow hover:bg-[#c44fd8] hover:text-white"
              >
                See More &gt;&gt;
              </Link>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div
            className="hero-blob hero-anim-right"
            aria-hidden
          />
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden />
    </section>
  )
}
