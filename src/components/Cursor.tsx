import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px'
        dotRef.current.style.top = pos.current.y + 'px'
      }

      // Ring follows with lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.13
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.13

      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top = ringPos.current.y + 'px'
      }

      raf.current = requestAnimationFrame(loop)
    }

    const interactiveEls = document.querySelectorAll('a, button, [data-hover]')
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ position: 'fixed', zIndex: 99999 }} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} style={{ position: 'fixed', zIndex: 99998 }} />
    </>
  )
}
