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
      // transform (not left/top) so the browser can composite this on the
      // GPU instead of forcing a layout reflow every frame — that reflow
      // was the main source of the laggy/stuttery feel.
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }

      // Ring follows with a light trailing lag (by design), just snappier
      // than before so it doesn't feel like it's dragging behind.
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.22
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.22

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
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
