import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const ref = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`.trim()}
      style={delay > 0 ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
