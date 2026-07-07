const services = [
  {
    icon: '🎬',
    title: 'Video Editing',
    desc: 'Professional post-production editing with precise cuts, seamless transitions, and polished pacing for any type of content.',
    delay: 0,
  },
  {
    icon: '🎨',
    title: 'Cinematic Color Grading',
    desc: 'Film-look color grading using DaVinci Resolve to craft the exact mood and visual tone your project demands.',
    delay: 0.1,
  },
  {
    icon: '⚡',
    title: 'Motion Graphics',
    desc: 'Dynamic animated title sequences, lower thirds, transitions, and visual effects built in After Effects.',
    delay: 0.2,
  },
  {
    icon: '📱',
    title: 'Social Media Reels',
    desc: 'Punchy, viral-ready short-form content engineered for maximum engagement on Instagram, TikTok & YouTube Shorts.',
    delay: 0.3,
  },
  {
    icon: '▶',
    title: 'YouTube Editing',
    desc: 'Long-form YouTube videos with strategic editing, storytelling flow, and audience retention optimized pacing.',
    delay: 0.4,
  },
  {
    icon: '📺',
    title: 'Commercial Ads',
    desc: 'High-conversion commercial videos for brands — broadcast quality production for TV and digital campaigns.',
    delay: 0.5,
  },
  {
    icon: '🎭',
    title: 'Short Films',
    desc: 'Narrative short film editing with emotional arc, genre tone, and festival-ready finishing and sound design.',
    delay: 0.6,
  },
]

function ServiceCard({ svc, index }: { svc: (typeof services)[0]; index: number }) {
  return (
    <div
      data-hover
      className="animate-float"
      style={{
        animationDelay: `${-index * 0.7}s`,
        animationDuration: `${4 + index * 0.5}s`,
      }}
    >
      <div
        className="glass-card"
        data-aos="fade-up"
        data-aos-delay={Math.round(svc.delay * 1000)}
        style={{
          padding: 'clamp(24px, 3vw, 36px)',
          height: '100%',
          display: 'flex', flexDirection: 'column', gap: 18,
          borderRadius: 20,
          position: 'relative', overflow: 'hidden',
          cursor: 'none',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'rgba(123,46,255,0.09)'
          el.style.borderColor = 'rgba(123,46,255,0.5)'
          el.style.boxShadow = '0 0 40px rgba(123,46,255,0.22), 0 20px 60px rgba(0,0,0,0.5)'
          el.style.transform = 'translateY(-8px)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'var(--glass)'
          el.style.borderColor = 'var(--glass-border)'
          el.style.boxShadow = 'none'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Subtle inner glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at top left, rgba(123,46,255,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Icon */}
        <div style={{
          width: 58, height: 58, borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.7rem',
          background: 'rgba(123,46,255,0.14)',
          border: '1px solid rgba(123,46,255,0.3)',
          boxShadow: '0 0 20px rgba(123,46,255,0.2)',
          transition: 'all 0.3s ease',
          flexShrink: 0,
        }}>
          {svc.icon}
        </div>

        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.05rem', fontWeight: 700,
            color: '#fff', marginBottom: 10,
          }}>
            {svc.title}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem', lineHeight: 1.72,
            color: 'rgba(255,255,255,0.55)',
          }}>
            {svc.desc}
          </p>
        </div>

        {/* Arrow */}
        <div style={{
          marginTop: 'auto',
          fontFamily: 'var(--font-sub)',
          fontSize: '0.78rem',
          color: 'var(--purple-light)',
          letterSpacing: '0.08em',
          opacity: 0.7,
        }}>
          Learn More →
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 6vw, 80px)',
        background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,46,255,0.07) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <div
          data-aos="fade-up"
          style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 90px)' }}
        >
          <span className="section-tag">What I Offer</span>
          <h2 className="section-header">
            <span style={{ color: '#fff' }}>My </span>
            <span className="purple-gradient-text">Services</span>
          </h2>
          <p className="section-desc" style={{ marginTop: 14 }}>
            End-to-end video production and post-production services tailored to your vision and brand.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 24,
        }}>
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
