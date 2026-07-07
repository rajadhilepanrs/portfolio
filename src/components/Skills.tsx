import { useScrollReveal } from '../hooks/useScrollReveal'

const skills = [
  { name: 'Adobe Premiere Pro', pct: 96, icon: '🎞' },
  { name: 'Adobe After Effects', pct: 92, icon: '✨' },
  { name: 'DaVinci Resolve', pct: 90, icon: '🎨' },
  { name: 'Adobe Photoshop', pct: 85, icon: '🖼' },
  { name: 'Adobe Lightroom', pct: 88, icon: '📸' },
]

function SkillBar({ skill, visible, delay }: {
  skill: (typeof skills)[0]; visible: boolean; delay: number
}) {
  return (
    <div style={{
      opacity: 0,
      animation: visible ? `fadeInUp 0.7s ease-out ${delay}s forwards` : 'none',
    }}>
      {/* Label row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
          <span style={{
            fontFamily: 'var(--font-sub)', fontSize: '0.9rem',
            fontWeight: 600, color: '#fff', letterSpacing: '0.04em',
          }}>
            {skill.name}
          </span>
        </div>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '0.85rem',
          fontWeight: 700, color: 'var(--purple-light)',
          textShadow: '0 0 15px rgba(123,46,255,0.6)',
        }}>
          {skill.pct}%
        </span>
      </div>

      {/* Bar track */}
      <div style={{
        height: 6, background: 'rgba(255,255,255,0.07)',
        borderRadius: 10, overflow: 'hidden',
        border: '1px solid rgba(123,46,255,0.15)',
        position: 'relative',
      }}>
        {/* Fill */}
        <div
          style={{
            height: '100%',
            width: visible ? `${skill.pct}%` : '0%',
            background: 'linear-gradient(90deg, #4A1B99, #7B2EFF, #C77DFF)',
            borderRadius: 10,
            transition: `width 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay + 0.1}s`,
            boxShadow: '0 0 12px rgba(123,46,255,0.6)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Shimmer */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            animation: visible ? 'streakMove 2s ease-out 0.5s both' : 'none',
          }} />
        </div>

        {/* Glow dot at tip */}
        <div style={{
          position: 'absolute', top: '50%',
          left: visible ? `calc(${skill.pct}% - 4px)` : '0%',
          transform: 'translateY(-50%)',
          width: 8, height: 8, borderRadius: '50%',
          background: '#C77DFF',
          boxShadow: '0 0 12px rgba(199,125,255,0.9)',
          transition: `left 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay + 0.1}s`,
        }} />
      </div>
    </div>
  )
}

export default function Skills() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.2)

  return (
    <section
      id="skills"
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 6vw, 80px)',
        background: 'var(--bg)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* BG glow */}
      <div style={{
        position: 'absolute', bottom: '10%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,46,255,0.08) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
          gap: 'clamp(40px, 6vw, 90px)',
          alignItems: 'center',
        }}>
          {/* Left: heading */}
          <div
            ref={ref}
            className={`reveal-left ${visible ? 'visible' : ''}`}
          >
            <span className="section-tag" style={{ textAlign: 'left', display: 'block' }}>Expertise</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 700, color: '#fff', lineHeight: 1.2,
              marginBottom: 24,
            }}>
              Tools I<br />
              <span className="purple-gradient-text">Master Daily</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem', lineHeight: 1.8,
              color: 'rgba(255,255,255,0.58)',
              marginBottom: 36,
            }}>
              Equipped with industry-leading software and a deep understanding of each tool's capabilities, I push every project to its technical and creative maximum.
            </p>

            {/* Tool logos row */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {['Pr', 'Ae', 'Ps', 'Lr', 'Da'].map((abbr, i) => (
                <div
                  key={abbr}
                  data-hover
                  style={{
                    width: 52, height: 52, borderRadius: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(123,46,255,0.12)',
                    border: '1px solid rgba(123,46,255,0.3)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem', fontWeight: 700,
                    color: 'var(--purple-light)',
                    boxShadow: '0 0 14px rgba(123,46,255,0.15)',
                    transition: 'all 0.3s ease',
                    animationDelay: `${i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(123,46,255,0.25)'
                    el.style.borderColor = 'var(--purple)'
                    el.style.boxShadow = '0 0 22px rgba(123,46,255,0.4)'
                    el.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(123,46,255,0.12)'
                    el.style.borderColor = 'rgba(123,46,255,0.3)'
                    el.style.boxShadow = '0 0 14px rgba(123,46,255,0.15)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  {abbr}
                </div>
              ))}
            </div>
          </div>

          {/* Right: skill bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            {skills.map((s, i) => (
              <SkillBar key={s.name} skill={s} visible={visible} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
