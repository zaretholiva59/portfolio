import { useEffect, useId, useRef } from 'react'

const R = 52
const C = 2 * Math.PI * R

export default function SoftSkillRing({ label, percent }) {
  const gid = useId().replace(/:/g, '')
  const wrapRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const circle = circleRef.current
    if (!wrap || !circle) return undefined

    circle.style.strokeDasharray = `${C}`
    circle.style.strokeDashoffset = `${C}`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const target = C * (1 - percent / 100)
          requestAnimationFrame(() => {
            circle.style.strokeDashoffset = `${target}`
          })
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [percent])

  return (
    <div
      ref={wrapRef}
      className="flex flex-col items-center gap-2 interactive-glow rounded-xl p-4"
    >
      <svg width="120" height="120" viewBox="0 0 120 120" className="soft-ring">
        <circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke="rgba(196,79,216,0.2)"
          strokeWidth="10"
        />
        <circle
          ref={circleRef}
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke={`url(#softGrad-${gid})`}
          strokeWidth="10"
          strokeLinecap="round"
          className="soft-ring-progress"
        />
        <defs>
          <linearGradient id={`softGrad-${gid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b30ff" />
            <stop offset="100%" stopColor="#e040fb" />
          </linearGradient>
        </defs>
      </svg>
      <span className="font-display text-lg text-white">{percent}%</span>
      <span className="font-mono-label text-center text-xs text-[#d4b8e0]">
        {label}
      </span>
    </div>
  )
}
