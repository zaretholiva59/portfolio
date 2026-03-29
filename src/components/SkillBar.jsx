import { useEffect, useRef } from 'react'

export default function SkillBar({ label, percent }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return undefined
    const fill = wrap.querySelector('.skill-fill')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && fill) {
          fill.classList.add('animate-in')
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [percent])

  return (
    <div ref={wrapRef} className="mb-5">
      <div className="mb-2 flex justify-between font-mono-label text-xs text-[#d4b8e0]">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ ['--target']: `${percent}%` }}
        />
      </div>
    </div>
  )
}
