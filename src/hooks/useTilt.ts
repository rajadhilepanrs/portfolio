import { useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'

export function useTilt(maxTilt = 12) {
  const ref = useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({})
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 })

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const tiltX = (y - 0.5) * maxTilt * -1
    const tiltY = (x - 0.5) * maxTilt
    setTiltStyle({
      transform: `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'none',
    })
    setShinePos({ x: x * 100, y: y * 100 })
  }

  const onMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
    })
  }

  return { ref, tiltStyle, shinePos, onMouseMove, onMouseLeave }
}
