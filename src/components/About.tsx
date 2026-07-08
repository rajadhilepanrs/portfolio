import { useScrollReveal } from '../hooks/useScrollReveal'
import aboutReel from '../about-reel.mp4'

const specializations = [
  'Cinematic Editing',
  'Reels Editing',
  'Commercial Ads',
  'YouTube Videos',
  'Color Grading',
  'Motion Graphics',
  'Visual Storytelling',
]

export default function About() {
  // Lazy-mount the video so its ~5MB file only downloads once this card is
  // actually about to scroll into view, not on initial page load.
  const { ref: reelRef, visible: reelVisible } = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section
      id="about"
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 6vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
      }}
    >
      {/* Section glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '-10%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,46,255,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 90px)' }}>
          <span className="section-tag">Who I Am</span>
          <h2 className="section-header">
            <span style={{ color: '#fff' }}>About </span>
            <span className="purple-gradient-text">Me</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}>
          {/* Left: Text */}
          <div data-aos="fade-right">
            <p style={{
              fontFamily: 'var(--font-sub)',
              fontSize: '0.78rem', letterSpacing: '0.38em',
              textTransform: 'uppercase', color: 'var(--purple-light)',
              marginBottom: 18,
            }}>
              Passionate Creator
            </p>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
              fontWeight: 700, color: '#fff',
              lineHeight: 1.25, marginBottom: 28,
            }}>
              Crafting Cinematic<br />
              <span className="purple-gradient-text">Visual Experiences</span>
            </h3>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem', lineHeight: 1.85,
              color: 'rgba(255,255,255,0.62)', marginBottom: 20,
            }}>
              I'm Rajadhileepan, a professional video editor with over 5 years of experience transforming raw footage into compelling cinematic narratives. My work spans commercials, short films, YouTube content, and social media reels.
            </p>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem', lineHeight: 1.85,
              color: 'rgba(255,255,255,0.62)', marginBottom: 40,
            }}>
              With a deep understanding of storytelling, rhythm, and visual language, I bring a director's eye to every cut — ensuring each frame serves the story and every transition feels intentional.
            </p>

            {/* Spec tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 44 }}>
              {specializations.map((s, i) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-sub)',
                    fontSize: '0.78rem', fontWeight: 500,
                    letterSpacing: '0.08em',
                    padding: '7px 16px',
                    border: '1px solid rgba(123,46,255,0.3)',
                    borderRadius: 40,
                    color: i % 2 === 0 ? 'var(--purple-light)' : 'rgba(255,255,255,0.7)',
                    background: 'rgba(123,46,255,0.07)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--purple)'
                    el.style.background = 'rgba(123,46,255,0.18)'
                    el.style.boxShadow = '0 0 15px rgba(123,46,255,0.25)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(123,46,255,0.3)'
                    el.style.background = 'rgba(123,46,255,0.07)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              data-hover
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 34px',
                background: 'linear-gradient(135deg, #7B2EFF, #4A1B99)',
                color: '#fff', borderRadius: 50,
                fontFamily: 'var(--font-sub)', fontWeight: 600,
                fontSize: '0.9rem', letterSpacing: '0.06em',
                textDecoration: 'none',
                boxShadow: '0 0 28px rgba(123,46,255,0.45)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 50px rgba(123,46,255,0.7)'
                el.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 28px rgba(123,46,255,0.45)'
                el.style.transform = 'translateY(0)'
              }}
            >
              Let's Collaborate →
            </a>
          </div>

          {/* Right: Visual card */}
          <div
            data-aos="fade-left"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: 460 }}>
              {/* Main video card */}
              <div
                ref={reelRef}
                className="glass-card animate-glow-pulse"
                style={{
                  overflow: 'hidden',
                  borderRadius: 24,
                  aspectRatio: '4/5',
                  position: 'relative',
                  background: '#0d0d10',
                }}
              >
                {reelVisible && (
                  <video
                    src={aboutReel}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
                {/* Color overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(123,46,255,0.35) 0%, transparent 60%, rgba(0,0,0,0.5) 100%)',
                }} />

                {/* Experience badge */}
                <div
                  className="glass-card"
                  style={{
                    position: 'absolute', bottom: 24, left: 24, right: 24,
                    padding: '16px 20px',
                    borderRadius: 14,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                      fontWeight: 800, color: 'var(--purple-light)',
                      textShadow: '0 0 20px rgba(123,46,255,0.7)',
                    }}>5+</div>
                    <div style={{
                      fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.6)',
                    }}>Years Exp.</div>
                  </div>
                  <div style={{
                    width: 1, height: 44,
                    background: 'rgba(123,46,255,0.4)',
                  }} />
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                      fontWeight: 800, color: 'var(--purple-light)',
                      textShadow: '0 0 20px rgba(123,46,255,0.7)',
                    }}>150+</div>
                    <div style={{
                      fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.6)',
                    }}>Projects</div>
                  </div>
                  <div style={{
                    width: 1, height: 44,
                    background: 'rgba(123,46,255,0.4)',
                  }} />
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontSize: '1.6rem',
                      fontWeight: 800, color: 'var(--purple-light)',
                      textShadow: '0 0 20px rgba(123,46,255,0.7)',
                    }}>50+</div>
                    <div style={{
                      fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.6)',
                    }}>Clients</div>
                  </div>
                </div>
              </div>

              {/* Floating accent shapes */}
              <div
                className="animate-float glass-card"
                style={{
                  position: 'absolute', top: -24, right: -24,
                  width: 90, height: 90, borderRadius: 18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2.2rem',
                  boxShadow: '0 0 30px rgba(123,46,255,0.35)',
                }}
              >
                🎬
              </div>

              <div
                className="animate-float"
                style={{
                  animationDelay: '-1.8s',
                  position: 'absolute', top: '35%', left: -28,
                  padding: '10px 16px', borderRadius: 12,
                  background: 'rgba(123,46,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(123,46,255,0.4)',
                  fontFamily: 'var(--font-sub)', fontSize: '0.78rem',
                  color: 'var(--purple-light)', fontWeight: 600,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 0 20px rgba(123,46,255,0.25)',
                }}
              >
                ✦ Award Winning
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
