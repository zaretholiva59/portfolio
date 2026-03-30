import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function CustomCursor() {
  const { pathname } = useLocation()
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef(0)
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setEnabled(!mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseOver = (e) => {
      const target = e.target
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[class*="interactive"]') ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(!!isInteractive)
    }

    const tick = () => {
      const dot = dotRef.current
      const ring = ringRef.current
      if (dot) {
        dot.style.left = `${pos.current.x}px`
        dot.style.top = `${pos.current.y}px`
      }
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12
      if (ring) {
        ring.style.left = `${ringPos.current.x}px`
        ring.style.top = `${ringPos.current.y}px`
      }
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onMouseOver)
    raf.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="cursor-shell" aria-hidden="true">
      <div
        ref={ringRef}
        className={`cursor-ring ${isHovering ? 'cursor-ring--hover' : ''}`}
      />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
