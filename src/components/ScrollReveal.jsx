import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ScrollReveal({ children, className = '' }) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`scroll-reveal ${className}`.trim()}>
      {children}
    </div>
  )
}
