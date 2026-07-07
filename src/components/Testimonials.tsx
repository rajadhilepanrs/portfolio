import { useState } from 'react'

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'YouTube Creator — 1.2M Subscribers',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    text: "Rajadhileepan completely transformed my content. The cinematic quality he brings to every video is unmatched. My watch time increased by 65% after we started working together. Pure genius with color grading.",
    stars: 5,
  },
  {
    name: 'Priya Nair',
    role: 'Brand Director — LuxeForma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
    text: "Our commercial campaign exceeded every KPI after Raja edited it. The motion graphics were stunning, the pacing was perfect, and the final product looked like a million-dollar production. Highly recommended.",
    stars: 5,
  },
  {
    name: 'Karthik Sundaram',
    role: 'Filmmaker & Director',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format',
    text: "Working with Raja on our short film was an incredible experience. His understanding of narrative rhythm and visual storytelling elevated every scene. He's not just an editor — he's a true co-creator.",
    stars: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#C77DFF', fontSize: '0.9rem' }}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section
      id="testimonials"
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 6vw, 80px)',
        background: 'var(--bg2)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', bottom: '15%', right: '-5%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,46,255,0.08) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div
          data-aos="fade-up"
          style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 90px)' }}
        >
          <span className="section-tag">Client Stories</span>
          <h2 className="section-header">
            <span style={{ color: '#fff' }}>What Clients </span>
            <span className="purple-gradient-text">Say</span>
          </h2>
        </div>

        {/* Testimonial cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: 28,
        }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="glass-card"
              data-hover
              data-aos="fade-up"
              data-aos-delay={Math.round(i * 120)}
              style={{
                padding: 'clamp(26px, 3vw, 36px)',
                borderRadius: 22,
                position: 'relative', overflow: 'hidden',
                cursor: 'none',
                borderColor: active === i ? 'rgba(123,46,255,0.5)' : 'var(--glass-border)',
                boxShadow: active === i ? '0 0 40px rgba(123,46,255,0.18)' : 'none',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(0)}
            >
              {/* Quote mark */}
              <div style={{
                position: 'absolute', top: -10, right: 28,
                fontFamily: 'Georgia, serif',
                fontSize: '8rem', fontWeight: 900,
                color: 'rgba(123,46,255,0.12)',
                lineHeight: 1, pointerEvents: 'none',
                userSelect: 'none',
              }}>
                "
              </div>

              {/* Stars */}
              <StarRating count={t.stars} />

              {/* Quote */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.93rem', lineHeight: 1.78,
                color: 'rgba(255,255,255,0.68)',
                margin: '20px 0 28px',
                fontStyle: 'italic',
              }}>
                "{t.text}"
              </p>

              {/* Author */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                paddingTop: 20,
                borderTop: '1px solid rgba(123,46,255,0.15)',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', overflow: 'hidden',
                  border: '2px solid rgba(123,46,255,0.45)',
                  boxShadow: '0 0 16px rgba(123,46,255,0.3)',
                  flexShrink: 0,
                }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-sub)', fontSize: '0.92rem',
                    fontWeight: 600, color: '#fff',
                  }}>
                    {t.name}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.77rem',
                    color: 'rgba(255,255,255,0.45)',
                  }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 44 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              data-hover
              onClick={() => setActive(i)}
              style={{
                width: active === i ? 28 : 8,
                height: 8, borderRadius: 4,
                background: active === i ? 'var(--purple)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                transition: 'all 0.35s ease',
                boxShadow: active === i ? '0 0 12px rgba(123,46,255,0.6)' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
