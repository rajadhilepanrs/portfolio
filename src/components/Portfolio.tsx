import { useState } from 'react'
import { useTilt } from '../hooks/useTilt'

const projects = [
  {
    title: 'Mountain Chronicles',
    category: 'Documentary',
    desc: 'A sweeping cinematic journey through untouched Himalayan landscapes.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=380&fit=crop&auto=format',
    tags: ['Color Grade', '4K', 'DaVinci'],
    color: '#7B2EFF',
  },
  {
    title: 'Neon Nights',
    category: 'Cinematic Short',
    desc: 'Urban noir short film blending neon light and deep shadows.',
    img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=380&fit=crop&auto=format',
    tags: ['VFX', 'Grading', 'After Effects'],
    color: '#9D5FFF',
  },
  {
    title: 'Brand Elevate',
    category: 'Commercial Ad',
    desc: 'Luxury brand commercial with cinematic product photography integration.',
    img: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600&h=380&fit=crop&auto=format',
    tags: ['Commercial', 'Motion', 'Premiere'],
    color: '#7B2EFF',
  },
  {
    title: 'Velocity',
    category: 'Sports Promo',
    desc: 'High-octane sports promotional reel with dynamic fast cuts.',
    img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=380&fit=crop&auto=format',
    tags: ['Fast Cut', 'SFX', 'Motion Blur'],
    color: '#9D5FFF',
  },
  {
    title: 'Golden Hour',
    category: 'Wedding Film',
    desc: 'Emotional cinematic wedding film capturing timeless moments.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=380&fit=crop&auto=format',
    tags: ['Cinematic', 'Color Grade', 'Audio'],
    color: '#7B2EFF',
  },
  {
    title: 'Tech Uprising',
    category: 'Corporate Video',
    desc: 'Futuristic corporate brand film with motion graphics integration.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=380&fit=crop&auto=format',
    tags: ['Motion GFX', '3D', 'After Effects'],
    color: '#9D5FFF',
  },
]

function ProjectCard({ project, delay }: { project: (typeof projects)[0]; delay: number }) {
  const { ref, tiltStyle, shinePos, onMouseMove, onMouseLeave } = useTilt(10)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { onMouseLeave(); setHovered(false) }}
      onMouseEnter={() => setHovered(true)}
      data-hover
      data-aos="fade-up"
      data-aos-delay={Math.round(delay * 1000)}
      style={{
        ...tiltStyle,
        transformStyle: 'preserve-3d',
        cursor: 'none',
      }}
    >
      <div
        className="glass-card"
        style={{
          overflow: 'hidden', borderRadius: 20,
          position: 'relative',
          boxShadow: hovered
            ? `0 0 40px rgba(123,46,255,0.35), 0 30px 60px rgba(0,0,0,0.5)`
            : '0 10px 40px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10' }}>
          <img
            src={project.img}
            alt={project.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              display: 'block',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          {/* Overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: hovered
              ? 'linear-gradient(135deg, rgba(123,46,255,0.55) 0%, rgba(0,0,0,0.6) 100%)'
              : 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)',
            transition: 'background 0.4s ease',
          }} />

          {/* Play button */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(0.7)',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(123,46,255,0.25)',
              backdropFilter: 'blur(12px)',
              border: '2px solid rgba(255,255,255,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 30px rgba(123,46,255,0.6)',
              fontSize: '1.2rem',
            }}>
              ▶
            </div>
          </div>

          {/* Shine */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.1) 0%, transparent 65%)`,
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }} />

          {/* Category badge */}
          <div style={{
            position: 'absolute', top: 14, left: 14,
            padding: '5px 13px', borderRadius: 20,
            background: 'rgba(123,46,255,0.25)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(123,46,255,0.45)',
            fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--purple-light)',
          }}>
            {project.category}
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '22px 24px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.15rem',
            fontWeight: 700, color: '#fff', marginBottom: 8,
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.87rem',
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.65,
            marginBottom: 16,
          }}>
            {project.desc}
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '4px 11px', borderRadius: 20,
                  fontFamily: 'var(--font-sub)', fontSize: '0.7rem',
                  letterSpacing: '0.05em',
                  border: '1px solid rgba(123,46,255,0.25)',
                  color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(123,46,255,0.06)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 6vw, 80px)',
        background: 'var(--bg)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '20%', right: '-5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,46,255,0.07) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <div
          data-aos="fade-up"
          style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 90px)' }}
        >
          <span className="section-tag">My Work</span>
          <h2 className="section-header">
            <span style={{ color: '#fff' }}>Featured </span>
            <span className="purple-gradient-text">Portfolio</span>
          </h2>
          <p className="section-desc" style={{ marginTop: 14 }}>
            A curated selection of cinematic projects that showcase my craft across genres, formats, and visual styles.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
          gap: 28,
        }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 0.08} />
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <a
            href="#contact"
            data-hover
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 36px',
              border: '1px solid rgba(123,46,255,0.4)', borderRadius: 50,
              color: 'var(--purple-light)',
              fontFamily: 'var(--font-sub)', fontWeight: 600,
              fontSize: '0.9rem', letterSpacing: '0.08em',
              textDecoration: 'none',
              background: 'rgba(123,46,255,0.06)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(123,46,255,0.18)'
              el.style.borderColor = 'var(--purple)'
              el.style.boxShadow = '0 0 28px rgba(123,46,255,0.35)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(123,46,255,0.06)'
              el.style.borderColor = 'rgba(123,46,255,0.4)'
              el.style.boxShadow = 'none'
            }}
          >
            Get a Custom Project →
          </a>
        </div>
      </div>
    </section>
  )
}
