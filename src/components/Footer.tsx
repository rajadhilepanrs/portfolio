const socials = [
  { label: 'Instagram', icon: '📸', href: 'https://instagram.com/rajadhileepan' },
  { label: 'YouTube', icon: '▶', href: '#' },
  { label: 'LinkedIn', icon: '💼', href: '#' },
  { label: 'Behance', icon: '🎨', href: '#' },
  { label: 'Twitter', icon: '✦', href: '#' },
]

const navLinks = ['Home', 'About', 'Portfolio', 'Services', 'Experience', 'Contact']

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid rgba(123,46,255,0.12)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(123,46,255,0.5) 30%, rgba(157,95,255,0.6) 50%, rgba(123,46,255,0.5) 70%, transparent)',
        boxShadow: '0 0 20px rgba(123,46,255,0.4)',
      }} />

      {/* Main footer content */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) clamp(30px, 4vw, 50px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: 'clamp(40px, 5vw, 60px)',
          marginBottom: 'clamp(50px, 6vw, 80px)',
        }}>
          {/* Brand column */}
          <div data-aos="fade-up" style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: 20 }}>
              <span
                className="brand-text"
                style={{ fontSize: '1.05rem', fontWeight: 700, display: 'block', marginBottom: 12 }}
              >
                rajadhileepan.visuals
              </span>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.88rem',
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.75,
              }}>
                Professional Video Editor crafting cinematic stories that move, inspire, and connect.
              </p>
            </div>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  data-hover
                  title={s.label}
                  style={{
                    width: 40, height: 40, borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(123,46,255,0.1)',
                    border: '1px solid rgba(123,46,255,0.25)',
                    color: '#fff', fontSize: '0.95rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(123,46,255,0.25)'
                    el.style.borderColor = 'var(--purple)'
                    el.style.boxShadow = '0 0 20px rgba(123,46,255,0.45)'
                    el.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = 'rgba(123,46,255,0.1)'
                    el.style.borderColor = 'rgba(123,46,255,0.25)'
                    el.style.boxShadow = 'none'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div data-aos="fade-up" data-aos-delay="100">
            <h4 style={{
              fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)', marginBottom: 22,
            }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  data-hover
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--purple-light)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 style={{
              fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)', marginBottom: 22,
            }}>
              Services
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Video Editing', 'Color Grading', 'Motion Graphics', 'YouTube Editing', 'Reels Editing', 'Commercial Ads'].map((s) => (
                <a
                  key={s}
                  href="#services"
                  data-hover
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--purple-light)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h4 style={{
              fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)', marginBottom: 22,
            }}>
              Start a Project
            </h4>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.88rem',
              color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 20,
            }}>
              Ready to create something cinematic? Let's talk about your vision.
            </p>
            <a
              href="#contact"
              data-hover
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 24px',
                background: 'linear-gradient(135deg, #7B2EFF, #4A1B99)',
                color: '#fff', borderRadius: 40,
                fontFamily: 'var(--font-sub)', fontWeight: 600,
                fontSize: '0.82rem', letterSpacing: '0.08em',
                textDecoration: 'none',
                boxShadow: '0 0 22px rgba(123,46,255,0.4)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 40px rgba(123,46,255,0.65)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.boxShadow = '0 0 22px rgba(123,46,255,0.4)'
                el.style.transform = 'translateY(0)'
              }}
            >
              Hire Me →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 28,
          borderTop: '1px solid rgba(123,46,255,0.1)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 14,
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.35)',
          }}>
            © 2026 - 2027 <span style={{ color: 'var(--purple-light)' }}>rajadhileepan.visuals</span>. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em',
          }}>
            Professional Video Editor ✦ Chennai, India
          </p>
        </div>
      </div>
    </footer>
  )
}
