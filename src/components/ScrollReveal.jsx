import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
}) {
  const ref = useScrollReveal(delay)
  const variantClass = variant !== 'up' ? `scroll-reveal--${variant}` : ''

  return (
    <div ref={ref} className={`scroll-reveal ${variantClass} ${className}`}>
      {children}
    </div>
  )
}
