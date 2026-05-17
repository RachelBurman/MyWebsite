import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import {
  SITE,
  PROJECTS,
  TIMELINE,
  NOW,
  READING,
  USES,
  POSTS,
  PHOTOS,
  JOURNAL,
  GUESTBOOK_NOTE,
} from '../content'

export const Route = createFileRoute('/')({ component: DeskPage })

// ─── Theme ───────────────────────────────────────────────────────────────────

const dT = {
  body: '"Inter", system-ui, sans-serif',
  serif: '"Lora", Georgia, serif',
  mono: '"JetBrains Mono", monospace',
  hand: '"Caveat", cursive',
  wood: '#a8835e',
  wood2: '#8a6644',
  wood3: '#6e4f30',
  paper: '#f5efe3',
  ink: '#1f1a14',
  faded: '#6b6157',
  accent: '#c9572e',
  brass: '#b8893c',
  lamp: 'rgba(255,220,140,0.35)',
} as const

// ─── Desk object layout ───────────────────────────────────────────────────────

interface DeskObjDef {
  id: string
  label: string
  hint: string
  x: number
  y: number
  w: number
  h: number
}

const DESK_OBJECTS: DeskObjDef[] = [
  { id: 'work',        label: 'Projects',    hint: 'the laptop',     x: 360, y: 230, w: 280, h: 200 },
  { id: 'writing',     label: 'Writing',     hint: 'the notebook',   x:  90, y: 340, w: 230, h: 170 },
  { id: 'photography', label: 'Photographs', hint: 'the camera',     x: 660, y: 350, w: 180, h: 130 },
  { id: 'reading',     label: 'Reading',     hint: 'stack of books', x:  80, y: 130, w: 180, h: 140 },
  { id: 'now',         label: 'Right now',   hint: "today's mug",    x: 290, y:  90, w: 100, h: 110 },
  { id: 'about',       label: 'About me',    hint: 'the postcard',   x: 700, y: 160, w: 180, h: 130 },
  { id: 'uses',        label: 'Uses',        hint: 'pens & things',  x: 480, y: 120, w: 130, h:  70 },
  { id: 'cycling',     label: 'Off-duty',    hint: 'bike helmet',    x: 870, y: 470, w: 110, h:  90 },
  { id: 'plant',       label: '',            hint: '',               x: 480, y: 470, w: 110, h: 130 },
]

// ─── SVG object shapes ────────────────────────────────────────────────────────

function renderDeskObject(obj: DeskObjDef) {
  switch (obj.id) {
    case 'work':
      return (
        <g>
          <rect x="0" y="0" width={obj.w} height={obj.h} rx="14" fill="#d8d4cc" stroke="#a8a39a" strokeWidth="1.5" />
          <rect x="14" y="14" width={obj.w - 28} height={obj.h - 56} rx="3" fill="#1c1e22" />
          <rect x="22" y="22" width={obj.w - 44} height="10" fill="#2d3036" />
          <circle cx="30" cy="27" r="2" fill="#ff5f56" />
          <circle cx="40" cy="27" r="2" fill="#ffbd2e" />
          <circle cx="50" cy="27" r="2" fill="#27c93f" />
          <text x="26" y="50" fill="#7cdcfe" fontFamily={dT.mono} fontSize="9">$ R --version</text>
          <text x="26" y="64" fill="#a6e3a1" fontFamily={dT.mono} fontSize="9">R 4.4.1 (2026)</text>
          <text x="26" y="80" fill="#cdd6f4" fontFamily={dT.mono} fontSize="9">{'>'} fit &lt;- glm(...)</text>
          <text x="26" y="94" fill="#cdd6f4" fontFamily={dT.mono} fontSize="9">{'>'} summary(fit)</text>
          <text x="26" y="112" fill="#f9e2af" fontFamily={dT.mono} fontSize="9">non-inferior ✓</text>
          <rect x="14" y={obj.h - 38} width={obj.w - 28} height="6" rx="2" fill="#bdb8ad" />
          <rect x="14" y={obj.h - 24} width={obj.w - 28} height="14" rx="3" fill="#ccc7be" />
        </g>
      )
    case 'writing':
      return (
        <g transform="rotate(-4 115 85)">
          <rect x="0" y="0" width={obj.w} height={obj.h} fill="#f6f1e0" stroke="#c8bfa8" strokeWidth="1.5" />
          <line x1={obj.w / 2} y1="0" x2={obj.w / 2} y2={obj.h} stroke="#c8bfa8" strokeWidth="1" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1="10" y1={30 + i * 18} x2={obj.w - 10} y2={30 + i * 18} stroke="rgba(80,100,180,0.18)" strokeWidth="1" />
          ))}
          <text x="14" y="44" fill={dT.accent} fontFamily={dT.hand} fontSize="18">Hello, world.</text>
          <text x="14" y="80" fill={dT.ink} fontFamily={dT.hand} fontSize="14">why I bothered</text>
          <text x="14" y="98" fill={dT.ink} fontFamily={dT.hand} fontSize="14">with another site</text>
          <text x={obj.w / 2 + 8} y="44" fill={dT.faded} fontFamily={dT.hand} fontSize="14">3 essays.</text>
          <text x={obj.w / 2 + 8} y="62" fill={dT.faded} fontFamily={dT.hand} fontSize="14">4 journal</text>
          <text x={obj.w / 2 + 8} y="80" fill={dT.faded} fontFamily={dT.hand} fontSize="14">entries.</text>
          <line x1={obj.w / 2 + 8} y1="98" x2={obj.w / 2 + 80} y2="98" stroke={dT.accent} strokeWidth="2" />
        </g>
      )
    case 'photography':
      return (
        <g transform="rotate(8 90 65)">
          <rect x="0" y="20" width={obj.w} height="90" rx="6" fill="#2a2622" />
          <circle cx={obj.w / 2} cy="70" r="42" fill="#1a1614" stroke="#3a342c" strokeWidth="3" />
          <circle cx={obj.w / 2} cy="70" r="34" fill="#0f0c0a" />
          <circle cx={obj.w / 2} cy="70" r="22" fill="#1c1916" stroke="#4a4238" strokeWidth="1" />
          <circle cx={obj.w / 2} cy="70" r="8" fill="#000" />
          <rect x={obj.w / 2 - 14} y="6" width="28" height="14" rx="2" fill="#3a342c" />
          <text x={obj.w / 2} y="105" textAnchor="middle" fill="#9b9389" fontFamily={dT.mono} fontSize="7" letterSpacing="0.15em">FUJIFILM</text>
          <rect x="-12" y="34" width="14" height="6" fill={dT.wood3} />
          <rect x={obj.w - 2} y="34" width="14" height="6" fill={dT.wood3} />
        </g>
      )
    case 'reading':
      return (
        <g>
          <rect x="0"  y="100" width={obj.w}      height="30" fill="#3a4d4a" stroke="#1f2c2a" strokeWidth="1" />
          <rect x="6"  y="74"  width={obj.w - 12} height="26" fill="#7a3c2e" stroke="#3e1f17" strokeWidth="1" />
          <rect x="-4" y="50"  width={obj.w + 4}  height="24" fill="#c2a64a" stroke="#7e6c2c" strokeWidth="1" />
          <rect x="10" y="28"  width={obj.w - 20} height="22" fill="#3f5670" stroke="#1f2c39" strokeWidth="1" />
          <rect x="2"  y="10"  width={obj.w - 18} height="18" fill="#a8783e" stroke="#5e421f" strokeWidth="1" />
          <text x="14" y="118" fill="#dcd3c4" fontFamily={dT.serif} fontSize="9" fontStyle="italic">Statistical Issues</text>
          <text x="14" y="91"  fill="#f4e6d4" fontFamily={dT.serif} fontSize="9" fontStyle="italic">Bayesian Approaches</text>
          <text x="14" y="68"  fill="#3a2e10" fontFamily={dT.serif} fontSize="9" fontStyle="italic">How to Read a Paper</text>
          <text x="14" y="44"  fill="#dee4ec" fontFamily={dT.serif} fontSize="9" fontStyle="italic">Visual Display · Tufte</text>
          <text x="14" y="24"  fill="#f1dfc4" fontFamily={dT.serif} fontSize="9" fontStyle="italic">Bridgerton</text>
        </g>
      )
    case 'now':
      return (
        <g>
          <ellipse cx={obj.w / 2} cy={obj.h / 2} rx="42" ry="42" fill="#f2ede2" stroke="#b8b0a0" strokeWidth="2" />
          <ellipse cx={obj.w / 2} cy={obj.h / 2} rx="34" ry="34" fill="#3d2817" />
          <ellipse cx={obj.w / 2} cy={obj.h / 2} rx="30" ry="30" fill="#4a3322" />
          <ellipse cx={obj.w / 2} cy={obj.h / 2} rx="26" ry="26" fill="#2c1b0e" />
          <path d="M 35 20 Q 40 10 35 0 Q 30 -10 35 -20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <path d="M 50 22 Q 55 10 50 -2 Q 45 -14 50 -22" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
          <path d="M 65 20 Q 70 10 65 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <ellipse cx={obj.w - 6} cy={obj.h / 2} rx="10" ry="16" fill="none" stroke="#b8b0a0" strokeWidth="3" />
        </g>
      )
    case 'about':
      return (
        <g transform="rotate(-3 90 65)">
          <rect x="0" y="0" width={obj.w} height={obj.h} fill="#fefaef" stroke="#c8bfa8" strokeWidth="1.5" />
          <rect x="8" y="8" width="100" height="80" fill="#7a8c6b" />
          <rect x={obj.w - 36} y="8" width="24" height="28" fill="#c9572e" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 1.5" />
          <text x={obj.w - 24} y="26" textAnchor="middle" fill="#fff" fontFamily={dT.mono} fontSize="6">UK</text>
          <text x="118" y="22" fill={dT.ink}   fontFamily={dT.hand} fontSize="14">to: a visitor</text>
          <text x="118" y="42" fill={dT.faded} fontFamily={dT.hand} fontSize="12">i'm rachel,</text>
          <text x="118" y="58" fill={dT.faded} fontFamily={dT.hand} fontSize="12">stats &amp; light.</text>
          <text x="118" y="82" fill={dT.accent} fontFamily={dT.hand} fontSize="12">london, '26</text>
        </g>
      )
    case 'uses':
      return (
        <g transform="rotate(-12 65 35)">
          <rect x="0"  y="18" width={obj.w}      height="6"  rx="3"   fill="#2a3340" />
          <polygon points={`${obj.w},18 ${obj.w + 8},21 ${obj.w},24`} fill="#1a1f28" />
          <rect x="4"  y="42" width={obj.w - 20} height="5"  rx="2.5" fill="#c9a85b" />
          <polygon points={`${obj.w - 16},42 ${obj.w - 8},44.5 ${obj.w - 16},47`} fill="#1f1a14" />
          <rect x="-4" y="42" width="8" height="5" fill="#d63e3e" />
        </g>
      )
    case 'cycling':
      return (
        <g>
          <ellipse cx={obj.w / 2} cy={obj.h / 2}      rx={obj.w / 2 - 6}  ry={obj.h / 2 - 8}  fill="#1f2933" stroke="#0d1219" strokeWidth="2" />
          <ellipse cx={obj.w / 2} cy={obj.h / 2 - 6}  rx={obj.w / 2 - 16} ry={obj.h / 2 - 18} fill="#2c3845" />
          {[0, 1, 2].map((i) => (
            <ellipse key={i} cx={obj.w / 2 - 22 + i * 22} cy={obj.h / 2 - 6} rx="6" ry="3" fill="#0a0e14" />
          ))}
          <text x={obj.w / 2} y={obj.h / 2 + 18} textAnchor="middle" fill="#c9572e" fontFamily={dT.mono} fontSize="6" letterSpacing="0.15em">SPECIALIZED</text>
        </g>
      )
    case 'plant':
      return (
        <g>
          <ellipse cx={obj.w / 2} cy={obj.h - 18} rx={obj.w / 2 - 14} ry="16" fill="#a8612a" stroke="#6b3d18" strokeWidth="1.5" />
          <ellipse cx={obj.w / 2} cy={obj.h - 22} rx={obj.w / 2 - 18} ry="13" fill="#3a2810" />
          {[-30, 0, 30, 60, -60].map((rot, i) => (
            <g key={i} transform={`rotate(${rot} ${obj.w / 2} ${obj.h - 22})`}>
              <ellipse cx={obj.w / 2} cy={obj.h - 60} rx="22" ry="36" fill={i % 2 === 0 ? '#3d5e3d' : '#4a7252'} />
            </g>
          ))}
        </g>
      )
    default:
      return null
  }
}

// ─── Desk object group (hover + click) ────────────────────────────────────────

interface DeskObjectProps {
  obj: DeskObjDef
  hovered: boolean
  onHover: (id: string | null) => void
  onClick: (id: string) => void
}

function DeskObject({ obj, hovered, onHover, onClick }: DeskObjectProps) {
  const isInteractive = !!obj.label
  const lift = hovered ? -2 : 0
  return (
    <g
      transform={`translate(${obj.x}, ${obj.y + lift})`}
      style={{ cursor: isInteractive ? 'pointer' : 'default', transition: 'transform .2s ease' }}
      onMouseEnter={() => isInteractive && onHover(obj.id)}
      onMouseLeave={() => isInteractive && onHover(null)}
      onClick={(e) => {
        if (!isInteractive) return
        const r = (e.currentTarget as SVGGElement).getBoundingClientRect()
        document.documentElement.style.setProperty('--vt-x', `${r.left + r.width / 2}px`)
        document.documentElement.style.setProperty('--vt-y', `${r.top + r.height / 2}px`)
        onClick(obj.id)
      }}
    >
      <ellipse cx={obj.w / 2} cy={obj.h + 6} rx={obj.w / 2.2} ry="8" fill="rgba(0,0,0,0.18)" />
      {renderDeskObject(obj)}
      {isInteractive && hovered && (
        <g transform={`translate(${obj.w / 2}, -14)`}>
          <rect x="-60" y="-14" width="120" height="22" rx="4" fill={dT.ink} />
          <text x="0" y="1" textAnchor="middle" fill={dT.paper} fontFamily={dT.mono} fontSize="11" letterSpacing="0.06em">
            {obj.label.toUpperCase()}
          </text>
        </g>
      )}
    </g>
  )
}

// ─── Desk home view ───────────────────────────────────────────────────────────

interface DeskHomeProps {
  onOpen: (id: string) => void
  hovered: string | null
  setHovered: (id: string | null) => void
}

function DeskHome({ onOpen, hovered, setHovered }: DeskHomeProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: `var(--wood, ${dT.wood})`,
        backgroundImage: `
          radial-gradient(circle at 30% 25%, var(--lamp-grad, ${dT.lamp}) 0, transparent 38%),
          repeating-linear-gradient(90deg, var(--wood, ${dT.wood}) 0, var(--wood, ${dT.wood}) 14px, var(--wood2, ${dT.wood2}) 14px, var(--wood2, ${dT.wood2}) 15px, var(--wood, ${dT.wood}) 15px, var(--wood, ${dT.wood}) 32px),
          repeating-linear-gradient(180deg, transparent 0, transparent 60px, rgba(0,0,0,0.04) 60px, rgba(0,0,0,0.04) 61px)
        `,
        overflow: 'hidden',
      }}
    >
      <header
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '24px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 4,
          color: dT.paper,
        }}
      >
        <div style={{ fontFamily: dT.serif, fontSize: 22, fontStyle: 'italic' }}>Rachel's desk</div>
        <nav
          style={{
            display: 'flex',
            gap: 18,
            fontFamily: dT.mono,
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {DESK_OBJECTS.filter((o) => o.label).map((o) => (
            <button
              key={o.id}
              onClick={() => {
                document.documentElement.style.setProperty('--vt-x', '50%')
                document.documentElement.style.setProperty('--vt-y', '50%')
                onOpen(o.id)
              }}
              style={{
                background: 'none',
                border: 0,
                color: dT.paper,
                opacity: 0.75,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                padding: 0,
              }}
            >
              {o.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Lamp glow */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: -100,
          width: 800,
          height: 800,
          background: `radial-gradient(circle, var(--ambient, rgba(255,225,150,0.25)) 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      <svg
        viewBox="0 0 1100 720"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          maxHeight: 'calc(100vh - 60px)',
          marginTop: 60,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <rect x="40" y="40" width="1020" height="650" rx="8" fill="rgba(40,30,20,0.18)" />
        {DESK_OBJECTS.map((o) => (
          <DeskObject
            key={o.id}
            obj={o}
            hovered={hovered === o.id}
            onHover={setHovered}
            onClick={onOpen}
          />
        ))}
      </svg>

      {/* Hero text */}
      <div
        style={{
          position: 'absolute',
          top: 90,
          left: 40,
          color: dT.paper,
          maxWidth: 360,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontFamily: dT.hand, fontSize: 26, color: '#fce7b8', transform: 'rotate(-3deg)', marginBottom: 6 }}>
          welcome →
        </div>
        <h1
          style={{
            fontFamily: dT.serif,
            fontSize: 56,
            fontWeight: 400,
            lineHeight: 1,
            margin: 0,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          I'm Rachel.
        </h1>
        <p
          style={{
            fontFamily: dT.body,
            fontSize: 16,
            lineHeight: 1.55,
            marginTop: 16,
            color: '#f6efde',
          }}
        >
          Pull up a chair. Click anything on the desk to see that part of my life. The mug is hot. The plant is overwatered. The bike helmet is mine.
        </p>
      </div>
    </div>
  )
}

// ─── Panel content ────────────────────────────────────────────────────────────

function PanelContent({ id }: { id: string }) {
  switch (id) {
    case 'work':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>Projects</h2>
          {PROJECTS.map((p) => (
            <div key={p.slug} style={{ paddingBottom: 22, marginBottom: 22, borderBottom: `1px solid ${dT.faded}22` }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 4 }}>
                <h3 style={{ fontFamily: dT.body, fontSize: 20, fontWeight: 600, margin: 0 }}>{p.title}</h3>
                <span style={{ fontFamily: dT.mono, fontSize: 10, color: dT.accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {p.status} · {p.year}
                </span>
              </div>
              <div style={{ fontFamily: dT.serif, fontStyle: 'italic', fontSize: 13, color: dT.faded, marginBottom: 8 }}>{p.full}</div>
              <p style={{ fontFamily: dT.body, fontSize: 14, lineHeight: 1.55, margin: 0 }}>{p.blurb}</p>
            </div>
          ))}
        </>
      )

    case 'writing':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>Writing</h2>
          {POSTS.map((p) => (
            <article key={p.slug} style={{ paddingBottom: 24, marginBottom: 24, borderBottom: `1px solid ${dT.faded}22` }}>
              <div style={{ fontFamily: dT.mono, fontSize: 10, color: dT.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                {p.tag} · {p.date} · {p.readTime}
              </div>
              <h3 style={{ fontFamily: dT.serif, fontSize: 24, fontWeight: 400, lineHeight: 1.2, margin: '0 0 10px' }}>{p.title}</h3>
              {p.body.map((para, i) => (
                <p key={i} style={{ fontFamily: dT.serif, fontSize: 15, lineHeight: 1.65, margin: '0 0 10px' }}>{para}</p>
              ))}
            </article>
          ))}
        </>
      )

    case 'photography':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>Photographs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {PHOTOS.map((p, i) => (
              <figure key={i} style={{ margin: 0 }}>
                <img src={p.src} alt={p.alt} style={{ width: '100%', maxHeight: 480, objectFit: 'cover', display: 'block' }} />
                <figcaption style={{ fontFamily: dT.hand, fontSize: 20, color: dT.faded, marginTop: 8 }}>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </>
      )

    case 'reading':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>On the desk</h2>
          {READING.map((b, i) => (
            <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${dT.faded}22` }}>
              <div style={{ fontFamily: dT.serif, fontSize: 17, fontWeight: 500 }}>{b.title}</div>
              <div style={{ fontFamily: dT.serif, fontStyle: 'italic', fontSize: 13, color: dT.faded, marginTop: 2 }}>
                {b.author} · {b.status}
              </div>
              {b.note && (
                <p style={{ fontFamily: dT.body, fontSize: 13, color: dT.ink, margin: '8px 0 0', lineHeight: 1.5 }}>{b.note}</p>
              )}
            </div>
          ))}
        </>
      )

    case 'now':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 4px' }}>Right now</h2>
          <div style={{ fontFamily: dT.mono, fontSize: 11, color: dT.faded, marginBottom: 24, letterSpacing: '0.1em' }}>
            {NOW.asOf} · {NOW.location}
          </div>
          {NOW.blocks.map((b, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: dT.mono, fontSize: 10, color: dT.accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
                {b.label}
              </div>
              <p style={{ fontFamily: dT.serif, fontSize: 16, lineHeight: 1.55, margin: 0 }}>{b.body}</p>
            </div>
          ))}
        </>
      )

    case 'about':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>About</h2>
          {GUESTBOOK_NOTE.body.map((p, i) => (
            <p key={i} style={{ fontFamily: dT.serif, fontSize: 16, lineHeight: 1.65, margin: '0 0 12px' }}>{p}</p>
          ))}
          <h3 style={{ fontFamily: dT.serif, fontStyle: 'italic', fontSize: 22, fontWeight: 400, margin: '32px 0 12px' }}>A short history</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {TIMELINE.map((t, i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 14, padding: '10px 0', borderTop: `1px solid ${dT.faded}22` }}>
                <span style={{ fontFamily: dT.mono, fontSize: 12, color: dT.accent }}>{t.year}</span>
                <span style={{ fontFamily: dT.serif, fontSize: 15, lineHeight: 1.45 }}>{t.event}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 32, fontFamily: dT.mono, fontSize: 12, color: dT.faded, display: 'flex', gap: 18 }}>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" style={{ color: dT.accent, textDecoration: 'none' }}>github</a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: dT.accent, textDecoration: 'none' }}>linkedin</a>
            <a href={`mailto:${SITE.email}`} style={{ color: dT.accent, textDecoration: 'none' }}>email</a>
          </div>
        </>
      )

    case 'uses':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>Uses</h2>
          {USES.map((g, i) => (
            <div key={i} style={{ marginBottom: 22 }}>
              <div style={{ fontFamily: dT.mono, fontSize: 11, color: dT.accent, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
                {g.cat}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {g.items.map((it, j) => (
                  <li key={j} style={{ fontFamily: dT.body, fontSize: 14 }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )

    case 'cycling':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>Off-duty</h2>
          <p style={{ fontFamily: dT.serif, fontSize: 17, lineHeight: 1.65 }}>Gym, dance floor, archery range, bike trails. Roughly in that rotation.</p>
          <p style={{ fontFamily: dT.serif, fontSize: 16, lineHeight: 1.65, color: dT.faded }}>The bike is a Specialised Sirrus X. It's been through too much. So have I.</p>
          <h3 style={{ fontFamily: dT.serif, fontStyle: 'italic', fontSize: 20, fontWeight: 400, marginTop: 32 }}>Recent journal</h3>
          {JOURNAL.map((j, i) => (
            <div key={i} style={{ padding: '12px 0', borderTop: `1px solid ${dT.faded}22`, fontFamily: dT.body, fontSize: 14, lineHeight: 1.55 }}>
              <span style={{ fontFamily: dT.mono, fontSize: 11, color: dT.accent, marginRight: 8 }}>{j.date}</span>
              {j.body}
            </div>
          ))}
        </>
      )

    default:
      return null
  }
}

// ─── Full-screen content page ─────────────────────────────────────────────────

function ContentPage({ id, onBack }: { id: string; onBack: () => void }) {
  const obj = DESK_OBJECTS.find((o) => o.id === id)
  return (
    <div style={{ minHeight: '100vh', background: dT.paper, color: dT.ink }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          background: dT.paper,
          borderBottom: `1px solid ${dT.faded}22`,
          padding: '20px 48px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          zIndex: 10,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: `1px solid ${dT.faded}55`,
            fontFamily: dT.mono,
            fontSize: 11,
            color: dT.faded,
            cursor: 'pointer',
            padding: '6px 14px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            flexShrink: 0,
          }}
        >
          ← desk
        </button>
        {obj && (
          <span style={{ fontFamily: dT.serif, fontStyle: 'italic', fontSize: 16, color: dT.faded }}>
            {obj.hint}
          </span>
        )}
      </header>
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 48px 96px' }}>
        <PanelContent id={id} />
      </main>
    </div>
  )
}

// ─── Page root ────────────────────────────────────────────────────────────────

function DeskPage() {
  const [panelId, setPanelId] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const h = new Date().getHours()
    document.documentElement.dataset.time =
      h >= 7 && h < 17 ? 'day' : h < 19 ? 'golden' : h < 21 ? 'dusk' : 'night'
  }, [])

  function navigate(toPanel: string | null) {
    document.documentElement.dataset.navDirection = toPanel ? 'forward' : 'back'
    if (!document.startViewTransition) {
      setPanelId(toPanel)
      return
    }
    document.startViewTransition(() => {
      flushSync(() => setPanelId(toPanel))
    })
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {panelId
        ? <ContentPage id={panelId} onBack={() => navigate(null)} />
        : <DeskHome onOpen={navigate} hovered={hovered} setHovered={setHovered} />
      }
    </div>
  )
}
