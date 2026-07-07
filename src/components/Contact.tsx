import { useState } from 'react'

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'rajadhileepan@visuals.in' },
  { icon: '📱', label: 'Phone', value: '+91 9080191679' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', project: '', message: '' })
  }

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 6vw, 80px)',
        background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Glows */}
      <div style={{
        position: 'absolute', top: '25%', left: '-8%',
        width: 550, height: 550, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,46,255,0.1) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-8%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,46,255,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div
          data-aos="fade-up"
          style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 90px)' }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-header">
            <span style={{ color: '#fff' }}>Start Your </span>
            <span className="purple-gradient-text">Project</span>
          </h2>
          <p className="section-desc" style={{ marginTop: 14 }}>
            Have a vision? Let's build it together. I'm available for freelance and collaborative projects.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(40px, 6vw, 70px)',
          alignItems: 'start',
        }}>
          {/* Left: Info */}
          <div data-aos="fade-right">
            <div style={{ marginBottom: 42 }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.5rem',
                fontWeight: 700, color: '#fff', marginBottom: 14,
              }}>
                Let's Create Something
                <span className="purple-gradient-text"> Extraordinary</span>
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.97rem',
                lineHeight: 1.8, color: 'rgba(255,255,255,0.58)',
              }}>
                Whether it's a cinematic commercial, YouTube series, or a short film — I'm ready to bring your vision to life with precision and artistry.
              </p>
            </div>

            {/* Contact info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 44 }}>
              {contactInfo.map((info, i) => (
                <div
                  key={info.label}
                  className="glass-card"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 22px', borderRadius: 14,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(123,46,255,0.5)'
                    el.style.boxShadow = '0 0 20px rgba(123,46,255,0.15)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--glass-border)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem',
                    background: 'rgba(123,46,255,0.14)',
                    border: '1px solid rgba(123,46,255,0.3)',
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-sub)', fontSize: '0.7rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.4)', marginBottom: 3,
                    }}>
                      {info.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.8)',
                    }}>
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '12px 20px', borderRadius: 12,
              background: 'rgba(0, 200, 100, 0.07)',
              border: '1px solid rgba(0, 200, 100, 0.25)',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#00c864',
                boxShadow: '0 0 10px rgba(0,200,100,0.7)',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'var(--font-sub)', fontSize: '0.82rem',
                color: 'rgba(0,200,100,0.9)', letterSpacing: '0.08em',
              }}>
                Available for new projects
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div data-aos="fade-left">
            <div
              className="glass-card"
              style={{ padding: 'clamp(28px, 4vw, 44px)', borderRadius: 24 }}
            >
              {sent ? (
                <div style={{
                  textAlign: 'center', padding: '40px 20px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                }}>
                  <div style={{
                    fontSize: '3rem',
                    filter: 'drop-shadow(0 0 20px rgba(123,46,255,0.7))',
                  }}>✨</div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                    fontWeight: 700, color: '#fff',
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.6)',
                  }}>
                    I'll get back to you within 24 hours. Let's create something incredible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.15rem',
                    fontWeight: 700, color: '#fff', marginBottom: 6,
                  }}>
                    Send a Message
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
                    <div>
                      <label style={{
                        fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 8,
                      }}>
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input-glow"
                        style={{ width: '100%', padding: '12px 16px' }}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label style={{
                        fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 8,
                      }}>
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="input-glow"
                        style={{ width: '100%', padding: '12px 16px' }}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{
                      fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 8,
                    }}>
                      Project Type
                    </label>
                    <select
                      required
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                      className="input-glow"
                      style={{ width: '100%', padding: '12px 16px' }}
                    >
                      <option value="" style={{ background: '#111' }}>Select project type</option>
                      {['Commercial Ad', 'YouTube Video', 'Short Film', 'Social Media Reels', 'Corporate Video', 'Color Grading', 'Motion Graphics', 'Other'].map((o) => (
                        <option key={o} value={o} style={{ background: '#111' }}>{o}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{
                      fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
                      letterSpacing: '0.15em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.45)', display: 'block', marginBottom: 8,
                    }}>
                      Message
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="input-glow"
                      style={{ width: '100%', padding: '12px 16px', resize: 'vertical', minHeight: 120 }}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    data-hover
                    style={{
                      width: '100%', padding: '15px',
                      background: 'linear-gradient(135deg, #7B2EFF, #4A1B99)',
                      color: '#fff', border: 'none', borderRadius: 10,
                      fontFamily: 'var(--font-sub)', fontWeight: 600,
                      fontSize: '0.95rem', letterSpacing: '0.08em',
                      boxShadow: '0 0 30px rgba(123,46,255,0.45)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.boxShadow = '0 0 55px rgba(123,46,255,0.7)'
                      el.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.boxShadow = '0 0 30px rgba(123,46,255,0.45)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    Send Message ✦
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
