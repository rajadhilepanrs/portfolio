import { useScrollReveal } from '../hooks/useScrollReveal'

const timeline = [
  {
    year: '2024 – Present',
    role: 'Senior Video Editor',
    company: 'Freelance & Agency Collaborations',
    desc: 'Leading full-scale post-production for premium commercial brands, YouTube creators, and documentary productions. Handling color grading, motion graphics, and editorial strategy.',
    tags: ['Commercial', 'Documentary', 'Color Grade'],
  },
  {
    year: '2022 – 2024',
    role: 'Video Editor & Colorist',
    company: 'Pixel Creative Studio',
    desc: 'Managed post-production pipeline for digital ad campaigns and social content. Delivered 100+ videos with consistent brand language and cinema-grade quality.',
    tags: ['Social Media', 'Ads', 'DaVinci'],
  },
  {
    year: '2021 – 2022',
    role: 'Video Editor',
    company: 'MediaFlow Productions',
    desc: 'Produced and edited corporate videos, event coverage, and product demos. Introduced motion graphics standards that reduced post time by 40%.',
    tags: ['Corporate', 'Events', 'After Effects'],
  },
  {
    year: '2019 – 2021',
    role: 'Junior Video Editor',
    company: 'Content Spark Agency',
    desc: 'Started career cutting YouTube content and social media reels. Built foundational skills in Premiere Pro, After Effects, and audience-optimized storytelling.',
    tags: ['YouTube', 'Reels', 'Premiere Pro'],
  },
]

function TimelineItem({
  item, index, isEven,
}: {
  item: (typeof timeline)[0]; index: number; isEven: boolean
}) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.15)

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: 0,
        alignItems: 'flex-start',
        marginBottom: 44,
        flexDirection: isEven ? 'row' : 'row-reverse',
      }}
      className="exp-item"
    >
      {/* Card half */}
      <div
        style={{
          flex: 1,
          padding: isEven ? '0 48px 0 0' : '0 0 0 48px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : (isEven ? 'translateX(-35px)' : 'translateX(35px)'),
          transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`,
        }}
        className="exp-card-col"
      >
        <div
          className="glass-card"
          style={{ padding: 'clamp(20px, 3vw, 30px)', borderRadius: 18, textAlign: isEven ? 'right' : 'left' }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'rgba(123,46,255,0.5)'
            el.style.boxShadow = '0 0 35px rgba(123,46,255,0.2), 0 15px 50px rgba(0,0,0,0.4)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--glass-border)'
            el.style.boxShadow = 'none'
          }}
        >
          <div style={{
            fontFamily: 'var(--font-sub)', fontSize: '0.72rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--purple-light)', marginBottom: 10,
          }}>
            {item.year}
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.05rem',
            fontWeight: 700, color: '#fff', marginBottom: 5,
          }}>
            {item.role}
          </h3>
          <p style={{
            fontFamily: 'var(--font-sub)', fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.5)', marginBottom: 14,
          }}>
            {item.company}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.87rem',
            color: 'rgba(255,255,255,0.52)', lineHeight: 1.68, marginBottom: 16,
          }}>
            {item.desc}
          </p>
          <div style={{
            display: 'flex', gap: 7, flexWrap: 'wrap',
            justifyContent: isEven ? 'flex-end' : 'flex-start',
          }}>
            {item.tags.map((t) => (
              <span key={t} style={{
                padding: '4px 12px', borderRadius: 20,
                fontFamily: 'var(--font-sub)', fontSize: '0.7rem',
                border: '1px solid rgba(123,46,255,0.3)',
                color: 'rgba(255,255,255,0.5)',
                background: 'rgba(123,46,255,0.07)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 2, width: 56, flexShrink: 0,
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          background: visible ? 'var(--purple)' : 'rgba(123,46,255,0.25)',
          border: '3px solid rgba(123,46,255,0.5)',
          boxShadow: visible ? '0 0 20px rgba(123,46,255,0.7)' : 'none',
          transition: `all 0.5s ease ${index * 0.15 + 0.3}s`,
          flexShrink: 0, marginTop: 22,
        }} />
        <div style={{
          width: 1, flex: 1, minHeight: 80,
          background: 'linear-gradient(to bottom, rgba(123,46,255,0.4), rgba(123,46,255,0.08))',
          marginTop: 4,
        }} />
      </div>

      {/* Empty half */}
      <div style={{ flex: 1 }} className="exp-card-col" />
    </div>
  )
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 6vw, 80px)',
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .exp-item {
            flex-direction: row !important;
          }
          .exp-item > .exp-card-col:last-child {
            display: none !important;
          }
          .exp-item > .exp-card-col:first-child {
            padding: 0 0 0 16px !important;
            text-align: left !important;
          }
          .glass-card {
            text-align: left !important;
          }
        }
      `}</style>

      <div style={{
        position: 'absolute', top: '20%', left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,46,255,0.06) 0%, transparent 70%)',
        filter: 'blur(70px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {/* Header */}
        <div
          data-aos="fade-up"
          style={{ textAlign: 'center', marginBottom: 'clamp(50px, 8vw, 90px)' }}
        >
          <span className="section-tag">My Journey</span>
          <h2 className="section-header">
            <span style={{ color: '#fff' }}>Work </span>
            <span className="purple-gradient-text">Experience</span>
          </h2>
          <p className="section-desc" style={{ marginTop: 14 }}>
            Years of dedicated craft, evolving from junior editor to senior creative post-production specialist.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          <div className="timeline-line" />
          {timeline.map((item, i) => (
            <TimelineItem key={item.role} item={item} index={i} isEven={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
