import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import profileImg from '../img.jpeg'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  purple: boolean
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -999, y: -999 })
  const heroSectionRef = useRef<HTMLElement>(null)
  const heroPhotoRef = useRef<HTMLDivElement>(null)
  const heroPhotoInnerRef = useRef<HTMLDivElement>(null)
  const heroPhotoSlotRef = useRef<HTMLDivElement>(null)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 900px)').matches
  )

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 900px)')
    const onChange = () => setIsDesktop(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const init = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      particlesRef.current = Array.from({ length: 130 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.55 + 0.2,
        purple: Math.random() > 0.35,
      }))
    }

    const draw = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const ps = particlesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]

        // Mouse repulsion
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 130 && dist > 0) {
          p.vx -= (dx / dist) * 0.015
          p.vy -= (dy / dist) * 0.015
        }

        p.vx *= 0.992
        p.vy *= 0.992
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const alpha = Math.round(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.purple ? `#9D5FFF${alpha}` : `#7B2EFF${alpha}`
        ctx.fill()

        // Connect nearby particles
        for (let j = i + 1; j < ps.length; j++) {
          const p2 = ps[j]
          const dx2 = p.x - p2.x
          const dy2 = p.y - p2.y
          const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          if (d2 < 110) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(123,46,255,${(1 - d2 / 110) * 0.22})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => init()
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)
    init()
    draw()

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useLayoutEffect(() => {
    if (!isDesktop) return

    gsap.registerPlugin(ScrollTrigger)

    const heroSection = heroSectionRef.current
    const heroPhoto = heroPhotoRef.current
    const slot = heroPhotoSlotRef.current
    const navBrand = document.querySelector('.brand-text') as HTMLElement | null

    if (!heroSection || !heroPhoto || !slot || !navBrand) return

    const TARGET_HEIGHT = 38 // docked avatar height, px
    const GAP = 12 // gap between avatar and logo text, px

    const ctx = gsap.context(() => {
      // The invisible slot lives in the real two-column flex layout, so its
      // rect is always exactly where the photo should rest — no guessed
      // coordinates, and it can never overlap the heading text next to it.
      let fromRect = { left: 0, top: 0, width: 0, height: 0 }

      const syncRest = () => {
        const r = slot.getBoundingClientRect()
        // left/top/width/height are set once here (not part of the scrubbed
        // animation), so the scroll-driven part below stays transform-only —
        // that's what keeps it stutter-free.
        gsap.set(heroPhoto, {
          left: r.left, top: r.top, width: r.width, height: r.height,
          x: 0, y: 0, scale: 1, transformOrigin: '0% 0%',
        })
        fromRect = r
      }
      syncRest()

      const applyProgress = (progress: number) => {
        const brandRect = navBrand.getBoundingClientRect()
        const targetScale = TARGET_HEIGHT / fromRect.height
        const targetWidth = fromRect.width * targetScale
        const targetLeft = brandRect.left - GAP - targetWidth
        const targetTop = brandRect.top + (brandRect.height - TARGET_HEIGHT) / 2

        gsap.set(heroPhoto, {
          x: gsap.utils.interpolate(0, targetLeft - fromRect.left, progress),
          y: gsap.utils.interpolate(0, targetTop - fromRect.top, progress),
          scale: gsap.utils.interpolate(1, targetScale, progress),
        })
      }

      const st = ScrollTrigger.create({
        trigger: heroSection,
        start: 'top top',
        end: '+=420',
        scrub: 0.5,
        onUpdate: (self) => applyProgress(self.progress),
        onRefresh: (self) => applyProgress(self.progress),
      })

      const onResize = () => {
        syncRest()
        st.refresh()
      }
      window.addEventListener('resize', onResize)

      return () => window.removeEventListener('resize', onResize)
    }, heroSection)

    return () => ctx.revert()
  }, [isDesktop])

  useEffect(() => {
    if (!isDesktop) return
    const inner = heroPhotoInnerRef.current
    if (!inner) return

    const idleFloat = gsap.to(inner, {
      y: -8,
      duration: 3.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => {
      idleFloat.kill()
    }
  }, [isDesktop])

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 28
    setParallax({ x, y })
  }

  return (
    <section
      id="home"
      ref={heroSectionRef}
      onMouseMove={onMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,46,255,0.14) 0%, transparent 70%)',
      }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        backgroundImage: `
          linear-gradient(rgba(123,46,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,46,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(11,11,11,0.7) 100%)',
      }} />

      {/* Floating orb left */}
      <div
        className="animate-float-slow"
        style={{
          position: 'absolute', zIndex: 2,
          top: '18%', left: '8%',
          width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(123,46,255,0.22) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`,
          transition: 'transform 0.12s ease',
        }}
      />

      {/* Floating orb right */}
      <div
        className="animate-float"
        style={{
          position: 'absolute', zIndex: 2,
          bottom: '15%', right: '8%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(157,95,255,0.15) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animationDelay: '-2.5s',
          transform: `translate(${-parallax.x * 0.3}px, ${-parallax.y * 0.3}px)`,
          transition: 'transform 0.12s ease',
        }}
      />

      {/* Rotating ring */}
      <div
        className="animate-rotate-slow"
        style={{
          position: 'absolute', zIndex: 3,
          top: '14%', right: '12%',
          width: 220, height: 220,
          border: '1px solid rgba(123,46,255,0.28)',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(123,46,255,0.12)',
          transform: `translate(${parallax.x * 0.15}px, ${parallax.y * 0.15}px)`,
        }}
      />

      {/* Square */}
      <div
        className="animate-float-x"
        style={{
          position: 'absolute', zIndex: 3,
          bottom: '22%', left: '9%',
          width: 80, height: 80,
          border: '1px solid rgba(123,46,255,0.35)',
          transform: `rotate(45deg) translate(${parallax.x * 0.2}px, ${parallax.y * 0.2}px)`,
          boxShadow: '0 0 15px rgba(123,46,255,0.15)',
        }}
      />

      {/* Inner rotating ring */}
      <div
        className="animate-rotate-slow-r"
        style={{
          position: 'absolute', zIndex: 3,
          top: '14%', right: '12%',
          width: 160, height: 160,
          border: '1px dashed rgba(123,46,255,0.18)',
          borderRadius: '50%',
        }}
      />

      {/* Main content — real two-column flex layout on desktop (photo | text) so
          the photo occupies its own column and can never sit on top of the
          heading; collapses to a centered single column on tablet/mobile. */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
        alignItems: 'center',
        gap: isDesktop ? 'clamp(40px, 6vw, 90px)' : '40px',
        padding: '0 24px',
        maxWidth: isDesktop ? 1200 : 640,
        width: '100%',
      }}>
        {/* Photo column — reserves the real layout space. On desktop it stays
            invisible (visibility:hidden keeps the space but hides the box);
            the visible photo is the position:fixed overlay below, kept in
            sync with this slot's rect. On mobile/tablet it just renders the
            photo directly, in flow, no scroll animation. */}
        <div
          ref={heroPhotoSlotRef}
          style={{
            flexShrink: 0,
            width: isDesktop ? 'min(300px, 26vw)' : 'min(240px, 62vw)',
            aspectRatio: '4 / 5',
            position: 'relative',
            visibility: isDesktop ? 'hidden' : 'visible',
          }}
        >
          {!isDesktop && (
            <div
              className="animate-float-slow"
              style={{
                position: 'relative', width: '100%', height: '100%',
                borderRadius: 26,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.32)',
                border: '1px solid rgba(123,46,255,0.18)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <img
                src={profileImg}
                alt="Rajadhileepan"
                className="hero-photo-image"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, rgba(11,11,11,0.02), rgba(11,11,11,0.45))',
                pointerEvents: 'none',
              }} />
            </div>
          )}
        </div>

        {/* Text column */}
        <div style={{ flex: 1, width: '100%', textAlign: isDesktop ? 'left' : 'center' }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 6.5vw, 5.6rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            marginBottom: 28,
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.4s forwards',
          }}>
            <span style={{ color: '#fff', display: 'block' }}>Professional</span>
            <span className="purple-gradient-text" style={{ display: 'block' }}>Video Editor</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 580,
            margin: isDesktop ? '0 0 52px' : '0 auto 52px',
            lineHeight: 1.75,
            fontStyle: 'italic',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.6s forwards',
          }}>
            "I turn ordinary footage into cinematic stories."
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex', gap: 20, justifyContent: isDesktop ? 'flex-start' : 'center', flexWrap: 'wrap',
            opacity: 0, animation: 'fadeInUp 0.8s ease-out 0.8s forwards',
          }}>
            <a
              href="#portfolio"
              data-hover
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 40px',
                background: 'linear-gradient(135deg, #7B2EFF, #4A1B99)',
                color: '#fff', borderRadius: 50,
                fontFamily: 'var(--font-sub)', fontWeight: 600,
                fontSize: '0.95rem', letterSpacing: '0.06em',
                textDecoration: 'none',
                boxShadow: '0 0 30px rgba(123,46,255,0.5), 0 6px 24px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 55px rgba(123,46,255,0.8), 0 6px 30px rgba(0,0,0,0.4)'
                el.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 30px rgba(123,46,255,0.5), 0 6px 24px rgba(0,0,0,0.3)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <span>▶</span> View Portfolio
            </a>

            <a
              href="#contact"
              data-hover
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 40px',
                background: 'transparent', color: '#fff', borderRadius: 50,
                fontFamily: 'var(--font-sub)', fontWeight: 600,
                fontSize: '0.95rem', letterSpacing: '0.06em',
                textDecoration: 'none',
                border: '1.5px solid rgba(123,46,255,0.5)',
                boxShadow: '0 0 18px rgba(123,46,255,0.18)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--purple)'
                el.style.boxShadow = '0 0 32px rgba(123,46,255,0.42)'
                el.style.transform = 'translateY(-4px)'
                el.style.background = 'rgba(123,46,255,0.08)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(123,46,255,0.5)'
                el.style.boxShadow = '0 0 18px rgba(123,46,255,0.18)'
                el.style.transform = 'translateY(0)'
                el.style.background = 'transparent'
              }}
            >
              Contact Me
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: 'clamp(30px, 6vw, 70px)',
            justifyContent: isDesktop ? 'flex-start' : 'center',
            marginTop: isDesktop ? 60 : 90, flexWrap: 'wrap',
            opacity: 0, animation: 'fadeInUp 0.8s ease-out 1.1s forwards',
          }}>
            {[
              { num: '150+', label: 'Projects Delivered' },
              { num: '5+', label: 'Years Experience' },
              { num: '50+', label: 'Happy Clients' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  fontWeight: 800,
                  color: 'var(--purple-light)',
                  textShadow: '0 0 25px rgba(123,46,255,0.7)',
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-sub)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginTop: 6,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile photo (desktop only) — position:fixed, kept in sync with the
          slot column above at rest, docks beside the logo on scroll.
          GSAP-only transform (see useLayoutEffect above) so it never fights
          a CSS animation for the transform property. */}
      {isDesktop && (
        <div
          ref={heroPhotoRef}
          className="hero-photo-wrapper"
          style={{
            position: 'fixed', zIndex: 1001,
            borderRadius: 30,
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(0,0,0,0.32)',
            border: '1px solid rgba(123,46,255,0.18)',
            background: 'rgba(255,255,255,0.04)',
            willChange: 'transform',
          }}
        >
          <div
            ref={heroPhotoInnerRef}
            className="hero-photo-inner"
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <img
              src={profileImg}
              alt="Rajadhileepan"
              className="hero-photo-image"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(11,11,11,0.02), rgba(11,11,11,0.45))',
              pointerEvents: 'none',
            }} />
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 44, left: '50%',
        transform: 'translateX(-50%)', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        opacity: 0, animation: 'fadeIn 1s ease-out 1.6s forwards',
      }}>
        <span style={{
          fontFamily: 'var(--font-sub)', fontSize: '0.65rem',
          letterSpacing: '0.35em', color: 'rgba(255,255,255,0.35)',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 55,
          background: 'linear-gradient(to bottom, var(--purple), transparent)',
          animation: 'float 1.8s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}
