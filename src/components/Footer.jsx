const GITHUB = 'https://github.com/zaretholiva59'
const WHATSAPP = 'https://wa.me/51924021041'

export default function Footer() {
  return (
    <footer className="footer-root">
      <p className="footer-copy">
        © 2026 Zareth Oliva — Callao, Lima, Perú
      </p>
      <nav className="footer-links" aria-label="Enlaces de contacto">
        <a className="footer-link" href={GITHUB} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span className="footer-sep" aria-hidden>
          ·
        </span>
        <a className="footer-link" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
      </nav>
    </footer>
  )
}
