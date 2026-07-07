import { useEffect, useState } from 'react'

const links = ['Home', 'About', 'Portfolio', 'Services', 'Experience', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      const sections = links.map((l) => document.getElementById(l.toLowerCase()))
      const current = sections.find((el) => {
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      if (current) setActive(current.id)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '14px clamp(16px, 5vw, 40px)' : '22px clamp(16px, 5vw, 40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled
          ? 'rgba(11, 11, 11, 0.88)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(123, 46, 255, 0.15)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        style={{ textDecoration: 'none' }}
        data-hover
      >
        <span
          className="navbar-brand"
          style={{ fontSize: '1.05rem' }}
        >
          rajadhileepan
        </span>
      </a>

      {/* Desktop nav */}
      <div
        style={{
          display: 'flex',
          gap: 36,
          alignItems: 'center',
        }}
        className="nav-links"
      >
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            data-hover
            style={{
              fontFamily: 'var(--font-sub)',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color:
                active === link.toLowerCase()
                  ? 'var(--purple-light)'
                  : 'rgba(255,255,255,0.65)',
              transition: 'color 0.25s ease',
              position: 'relative',
              paddingBottom: 2,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = 'var(--purple-light)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                active === link.toLowerCase()
                  ? 'var(--purple-light)'
                  : 'rgba(255,255,255,0.65)')
            }
          >
            {link}
            {active === link.toLowerCase() && (
              <span
                style={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  right: 0,
                  height: 1.5,
                  background: 'var(--purple)',
                  boxShadow: '0 0 8px var(--purple-glow)',
                  borderRadius: 1,
                }}
              />
            )}
          </a>
        ))}
      </div>

      {/* CTA button */}
      <a
        href="#contact"
        data-hover
        style={{
          fontFamily: 'var(--font-sub)',
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          color: '#fff',
          padding: '9px 24px',
          border: '1px solid rgba(123, 46, 255, 0.5)',
          borderRadius: 40,
          background: 'rgba(123, 46, 255, 0.1)',
          boxShadow: '0 0 15px rgba(123, 46, 255, 0.2)',
          transition: 'all 0.3s ease',
          display: 'block',
        }}
        className="nav-cta"
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'rgba(123, 46, 255, 0.25)'
          el.style.borderColor = 'var(--purple)'
          el.style.boxShadow = '0 0 25px rgba(123, 46, 255, 0.4)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'rgba(123, 46, 255, 0.1)'
          el.style.borderColor = 'rgba(123, 46, 255, 0.5)'
          el.style.boxShadow = '0 0 15px rgba(123, 46, 255, 0.2)'
        }}
      >
        Hire Me
      </a>

      {/* Mobile hamburger */}
      <button
        data-hover
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          padding: 8,
        }}
        className="nav-hamburger"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: 24,
              height: 1.5,
              background: menuOpen && i === 1 ? 'transparent' : 'var(--purple-light)',
              borderRadius: 1,
              transform:
                menuOpen && i === 0
                  ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : menuOpen && i === 2
                  ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(11,11,11,0.97)',
            backdropFilter: 'blur(24px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
          }}
        >
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              data-hover
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: active === link.toLowerCase() ? 'var(--purple-light)' : '#fff',
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
