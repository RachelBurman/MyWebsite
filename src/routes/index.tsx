import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { flushSync } from 'react-dom'
import {
  SITE, PROJECTS, TIMELINE, NOW, READING, USES, POSTS, PHOTOS, JOURNAL, GUESTBOOK_NOTE,
  GAMING, WORKSHOP,
} from '../content'

export const Route = createFileRoute('/')({ component: DeskPage })

// ─── Theme ────────────────────────────────────────────────────────────────────

const dT = {
  body:  '"Inter", system-ui, sans-serif',
  serif: '"Lora", Georgia, serif',
  mono:  '"JetBrains Mono", monospace',
  hand:  '"Caveat", cursive',
  paper: '#f5efe3',
  ink:   '#231b14',
  faded: '#6b6157',
  accent:'#c9572e',
} as const

// ─── Sections & objects ───────────────────────────────────────────────────────

const DESK_OBJECTS = [
  { id: 'work',        label: 'Projects',    hint: 'the laptop',     x: 340, y: 210, w: 290, h: 205 },
  { id: 'now',         label: 'Right now',   hint: 'the mug',        x: 665, y: 195, w: 110, h: 120 },
  { id: 'reading',     label: 'Reading',     hint: 'the books',      x:  70, y: 115, w: 185, h: 150 },
  { id: 'writing',     label: 'Writing',     hint: 'the notebook',   x:  75, y: 345, w: 235, h: 175 },
  { id: 'photography', label: 'Photographs', hint: 'the camera',     x: 660, y: 355, w: 185, h: 130 },
  { id: 'about',       label: 'About me',    hint: 'the postcard',   x: 820, y: 105, w: 180, h: 130 },
  { id: 'plant',       label: '',            hint: '',               x: 880, y: 420, w: 115, h: 140 },
]

const SECTIONS: Record<string, { label: string; hint: string }> = {
  work:        { label: 'Projects',    hint: 'the laptop'   },
  now:         { label: 'Right now',   hint: 'the mug'      },
  reading:     { label: 'Reading',     hint: 'the books'    },
  writing:     { label: 'Writing',     hint: 'the notebook' },
  photography: { label: 'Photographs', hint: 'the camera'   },
  about:       { label: 'About me',    hint: 'the postcard' },
}

// ─── Desk objects ─────────────────────────────────────────────────────────────

type DeskObj = typeof DESK_OBJECTS[0]

function renderDeskObject(obj: DeskObj): ReactNode {
  switch (obj.id) {
    case 'work': return (
      <g>
        <rect x="0" y="0" width={obj.w} height={obj.h-42} rx="10"
          fill="#ccc8c0" stroke="#1a0e06" strokeWidth="2.5" />
        <rect x="12" y="12" width={obj.w-24} height={obj.h-70} rx="4" fill="#1c1e22" stroke="#1a0e06" strokeWidth="1.5"/>
        <circle cx="28" cy="26" r="4" fill="#ff5f56" stroke="#1a0e06" strokeWidth="1"/>
        <circle cx="42" cy="26" r="4" fill="#ffbd2e" stroke="#1a0e06" strokeWidth="1"/>
        <circle cx="56" cy="26" r="4" fill="#27c93f" stroke="#1a0e06" strokeWidth="1"/>
        <text x="20" y="52" fill="#7cdcfe" fontFamily={dT.mono} fontSize="10">$ R --version</text>
        <text x="20" y="67" fill="#a6e3a1" fontFamily={dT.mono} fontSize="10">R 4.4.1 (2026)</text>
        <text x="20" y="82" fill="#cdd6f4" fontFamily={dT.mono} fontSize="10">{'>'} fit {'<'}- glm(...)</text>
        <text x="20" y="97" fill="#cdd6f4" fontFamily={dT.mono} fontSize="10">{'>'} summary(fit)</text>
        <text x="20" y="116" fill="#f9e2af" fontFamily={dT.mono} fontSize="10">non-inferior ✓</text>
        <rect x="0" y={obj.h-42} width={obj.w} height="28" rx="6"
          fill="#d4d0c8" stroke="#1a0e06" strokeWidth="2.5"/>
        <rect x="8" y={obj.h-36} width={obj.w-16} height="16" rx="3" fill="#c8c4bc" stroke="#1a0e06" strokeWidth="1"/>
        <rect x={obj.w/2-28} y={obj.h-16} width="56" height="10" rx="3"
          fill="#bfbbb2" stroke="#1a0e06" strokeWidth="1"/>
      </g>
    )
    case 'now': return (
      <g>
        <ellipse cx={obj.w/2} cy={obj.h-10} rx={obj.w/2-4} ry="10"
          fill="#e8e0d0" stroke="#1a0e06" strokeWidth="2"/>
        <rect x="8" y="24" width={obj.w-16} height={obj.h-42} rx="8"
          fill="#f2ede2" stroke="#1a0e06" strokeWidth="2.5"/>
        <ellipse cx={obj.w/2} cy="32" rx={obj.w/2-14} ry="10"
          fill="#2c1608" stroke="#1a0e06" strokeWidth="1.5"/>
        <ellipse cx={obj.w/2} cy="32" rx={obj.w/2-18} ry="7" fill="#3d2010"/>
        <path d={`M ${obj.w-8},38 Q ${obj.w+16},38 ${obj.w+16},55 Q ${obj.w+16},72 ${obj.w-8},72`}
          stroke="#1a0e06" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d={`M ${obj.w-8},38 Q ${obj.w+10},38 ${obj.w+10},55 Q ${obj.w+10},72 ${obj.w-8},72`}
          stroke="#e8e0d0" strokeWidth="1.5" fill="none"/>
        <path d="M 32,18 Q 38,4 32,-10 Q 26,-22 32,-34" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M 48,20 Q 54,4 48,-12 Q 42,-26 48,-38" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M 64,18 Q 70,6 64,-6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>
    )
    case 'reading': return (
      <g>
        <rect x="0"   y="108" width={obj.w}     height="32" rx="2" fill="#3a4d4a" stroke="#1a0e06" strokeWidth="2"/>
        <rect x="8"   y="80"  width={obj.w-10}  height="28" rx="2" fill="#8b3a2c" stroke="#1a0e06" strokeWidth="2"/>
        <rect x="-4"  y="54"  width={obj.w+4}   height="26" rx="2" fill="#c9a83c" stroke="#1a0e06" strokeWidth="2"/>
        <rect x="12"  y="30"  width={obj.w-18}  height="24" rx="2" fill="#3f5670" stroke="#1a0e06" strokeWidth="2"/>
        <rect x="4"   y="10"  width={obj.w-16}  height="20" rx="2" fill="#a8783e" stroke="#1a0e06" strokeWidth="2"/>
        <text x="12" y="128" fill="#dcd3c4" fontFamily={dT.serif} fontSize="9" fontStyle="italic">Statistical Issues</text>
        <text x="12" y="98"  fill="#f4e6d4" fontFamily={dT.serif} fontSize="9" fontStyle="italic">Bayesian Approaches</text>
        <text x="12" y="70"  fill="#2a1e08" fontFamily={dT.serif} fontSize="9" fontStyle="italic">How to Read a Paper</text>
        <text x="12" y="46"  fill="#dee4ec" fontFamily={dT.serif} fontSize="9" fontStyle="italic">Visual Display · Tufte</text>
        <text x="12" y="24"  fill="#f1dfc4" fontFamily={dT.serif} fontSize="9" fontStyle="italic">Bridgerton</text>
      </g>
    )
    case 'writing': return (
      <g transform="rotate(-4 115 85)">
        <rect x="0" y="0" width={obj.w} height={obj.h} rx="3"
          fill="#f6f1e0" stroke="#1a0e06" strokeWidth="2.5"/>
        <rect x={obj.w/2-2} y="0" width="4" height={obj.h} fill="#e0d8c4" stroke="#1a0e06" strokeWidth="1"/>
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i} x1="10" y1={32+i*20} x2={obj.w/2-8} y2={32+i*20}
            stroke="rgba(80,100,180,0.2)" strokeWidth="1"/>
        ))}
        <text x="12" y="26" fill="#c9572e" fontFamily={dT.hand} fontSize="19">Hello, world.</text>
        <text x="12" y="60" fill="#1a0e06" fontFamily={dT.hand} fontSize="14">why I bothered</text>
        <text x="12" y="78" fill="#1a0e06" fontFamily={dT.hand} fontSize="14">with another site</text>
        <text x={obj.w/2+10} y="44" fill="#6b6157" fontFamily={dT.hand} fontSize="14">3 essays.</text>
        <text x={obj.w/2+10} y="64" fill="#6b6157" fontFamily={dT.hand} fontSize="14">4 journal</text>
        <text x={obj.w/2+10} y="82" fill="#6b6157" fontFamily={dT.hand} fontSize="14">entries.</text>
        <line x1={obj.w/2+10} y1="96" x2={obj.w/2+78} y2="96" stroke="#c9572e" strokeWidth="2.5"/>
      </g>
    )
    case 'photography': return (
      <g transform="rotate(6 90 65)">
        <rect x="4" y="22" width={obj.w-8} height="82" rx="8"
          fill="#2a2622" stroke="#1a0e06" strokeWidth="2.5"/>
        <rect x={obj.w/2-16} y="10" width="32" height="16" rx="4"
          fill="#3a342c" stroke="#1a0e06" strokeWidth="2"/>
        <circle cx={obj.w/2} cy="68" r="34" fill="#1a1614" stroke="#1a0e06" strokeWidth="2.5"/>
        <circle cx={obj.w/2} cy="68" r="26" fill="#0f0c0a" stroke="#3a342c" strokeWidth="1.5"/>
        <circle cx={obj.w/2} cy="68" r="16" fill="#1c1916"/>
        <circle cx={obj.w/2} cy="68" r="6"  fill="#000"/>
        <circle cx={obj.w/2-8} cy="58" r="4" fill="rgba(255,255,255,0.12)"/>
        <text x={obj.w/2} y="114" textAnchor="middle"
          fill="#9b9389" fontFamily={dT.mono} fontSize="7" letterSpacing="0.18em">FUJIFILM</text>
        <rect x="-2" y="36" width="8" height="10" rx="2" fill="#3a342c" stroke="#1a0e06" strokeWidth="1.5"/>
        <rect x={obj.w-6} y="36" width="8" height="10" rx="2" fill="#3a342c" stroke="#1a0e06" strokeWidth="1.5"/>
      </g>
    )
    case 'about': return (
      <g transform="rotate(-3 90 65)">
        <rect x="0" y="0" width={obj.w} height={obj.h} rx="3"
          fill="#fefaef" stroke="#1a0e06" strokeWidth="2.5"/>
        <rect x="8" y="8" width="88" height="72" rx="2"
          fill="#7a8c6b" stroke="#1a0e06" strokeWidth="1.5"/>
        <rect x={obj.w-38} y="8" width="26" height="32" rx="2"
          fill="#c9572e" stroke="#1a0e06" strokeWidth="1.5"/>
        <rect x={obj.w-36} y="10" width="22" height="28" rx="1"
          fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="2 2"/>
        <text x={obj.w-25} y="28" textAnchor="middle"
          fill="#fff" fontFamily={dT.mono} fontSize="6">UK</text>
        <line x1="104" y1="8" x2="104" y2={obj.h-8} stroke="#1a0e06" strokeWidth="1" strokeDasharray="3 3"/>
        <text x="112" y="26" fill="#1a0e06" fontFamily={dT.hand} fontSize="14">to: a visitor</text>
        <text x="112" y="46" fill="#6b6157" fontFamily={dT.hand} fontSize="12">i'm rachel,</text>
        <text x="112" y="62" fill="#6b6157" fontFamily={dT.hand} fontSize="12">stats &amp; light.</text>
        <text x="112" y="84" fill="#c9572e" fontFamily={dT.hand} fontSize="13">london, '26</text>
      </g>
    )
    case 'plant': return (
      <g>
        <path d={`M 18,${obj.h} L 10,${obj.h-45} L ${obj.w-10},${obj.h-45} L ${obj.w-18},${obj.h} Z`}
          fill="#b8642a" stroke="#1a0e06" strokeWidth="2.5"/>
        <rect x="6" y={obj.h-50} width={obj.w-12} height="12" rx="3"
          fill="#c87838" stroke="#1a0e06" strokeWidth="2"/>
        <ellipse cx={obj.w/2} cy={obj.h-46} rx={obj.w/2-10} ry="8" fill="#2a1a0a" stroke="#1a0e06" strokeWidth="1.5"/>
        {[-28, 0, 28, 50, -50].map((rot, i) => (
          <g key={i} transform={`rotate(${rot} ${obj.w/2} ${obj.h-46})`}>
            <ellipse cx={obj.w/2} cy={obj.h-82} rx="18" ry="32"
              fill={i % 2 === 0 ? '#3d5e3d' : '#4a7252'}
              stroke="#1a0e06" strokeWidth="1.8"/>
          </g>
        ))}
      </g>
    )
    default: return null
  }
}

function DeskObject({ obj, hovered, onHover, onClick }: {
  obj: DeskObj
  hovered: boolean
  onHover: (id: string | null) => void
  onClick: (id: string) => void
}) {
  const clickable = !!obj.label
  return (
    <g
      style={{ viewTransitionName: `desk-${obj.id}` } as React.CSSProperties}
      transform={`translate(${obj.x}, ${obj.y})`}
    >
      <ellipse cx={obj.w/2} cy={obj.h+8} rx={obj.w*0.45} ry="7" fill="rgba(0,0,0,0.28)" />
      <g
        className="hit"
        onMouseEnter={() => onHover(obj.id)}
        onMouseLeave={() => onHover(null)}
        onClick={clickable ? () => onClick(obj.id) : undefined}
        style={clickable ? undefined : { cursor: 'default' } as React.CSSProperties}
      >
        {renderDeskObject(obj)}
        {hovered && obj.hint && (
          <g transform={`translate(${obj.w/2}, -18)`}>
            <rect x="-54" y="-14" width="108" height="22" rx="11" fill="#1a1208" />
            <rect x="-54" y="-14" width="108" height="22" rx="11" fill="none" stroke="#c9925a" strokeWidth="0.8" />
            <text x="0" y="3" textAnchor="middle" fill="#f5e6c8" fontFamily={dT.mono} fontSize="10" letterSpacing="0.08em">
              {obj.hint.toUpperCase()}
            </text>
          </g>
        )}
      </g>
    </g>
  )
}


// ─── Desk home ────────────────────────────────────────────────────────────────

function DeskHome({ onOpen }: { onOpen: (id: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      background: `var(--room-bg, #c4955a)`,
      backgroundImage: `repeating-linear-gradient(90deg,
        transparent 0, transparent 18px,
        rgba(0,0,0,0.04) 18px, rgba(0,0,0,0.04) 19px)`,
      overflow: 'hidden',
    }}>
      <header style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '20px 36px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 4, color: '#f5efe3',
      }}>
        <div style={{ fontFamily: dT.serif, fontSize: 20, fontStyle: 'italic' }}>Rachel's desk</div>
        <nav style={{ display: 'flex', gap: 20, fontFamily: dT.mono, fontSize: 11,
          letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {DESK_OBJECTS.filter(o => o.label).map(o => (
            <button key={o.id} onClick={() => onOpen(o.id)} style={{
              background: 'none', border: 0, color: '#f5efe3',
              opacity: 0.7, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', padding: 0,
            }}>{o.label}</button>
          ))}
        </nav>
      </header>

      <svg viewBox="0 0 1100 720"
        style={{ display: 'block', width: '100%', height: 'auto',
          maxHeight: 'calc(100vh - 60px)', marginTop: 60, position: 'relative', zIndex: 1 }}>
        <defs>
          <radialGradient id="lampPool" cx="48%" cy="38%" r="52%">
            <stop offset="0%"  stopColor="rgba(255,225,140,0.38)" />
            <stop offset="60%" stopColor="rgba(255,200,100,0.12)" />
            <stop offset="100%" stopColor="rgba(255,180,80,0)" />
          </radialGradient>
          <radialGradient id="edgeDark" cx="50%" cy="50%" r="70%">
            <stop offset="40%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(20,10,4,0.4)" />
          </radialGradient>
        </defs>

        {/* Desk surface — walnut trapezoid */}
        <polygon points="60,30 1040,30 1095,700 5,700" fill="var(--desk-surface, #3d2510)" />
        {/* Wood grain */}
        {[80,140,200,260,320,380,440,500,560,620,680,740,800,860,920,980].map((y,i) => (
          <line key={i} x1={5 + y*0.06} y1={y} x2={1095 - y*0.06} y2={y}
            stroke="rgba(255,180,100,0.05)" strokeWidth="1" />
        ))}
        {/* Lamp glow pool */}
        <ellipse cx="540" cy="300" rx="520" ry="320" fill="url(#lampPool)" />
        {/* Edge vignette */}
        <polygon points="60,30 1040,30 1095,700 5,700" fill="url(#edgeDark)" />
        {/* Desk front edge */}
        <polygon points="5,700 1095,700 1098,720 2,720" fill="#2a1808" />
        <line x1="5" y1="700" x2="1095" y2="700" stroke="rgba(255,200,120,0.2)" strokeWidth="1.5" />

        {/* Objects */}
        {DESK_OBJECTS.map(o => (
          <DeskObject key={o.id} obj={o}
            hovered={hovered === o.id}
            onHover={setHovered}
            onClick={onOpen} />
        ))}
      </svg>

      {/* Intro text */}
      <div style={{
        position: 'absolute', bottom: 48, left: 44,
        color: '#f5efe3', maxWidth: 280, zIndex: 3, pointerEvents: 'none',
      }}>
        <div style={{ fontFamily: dT.hand, fontSize: 22, color: '#fce7b8',
          transform: 'rotate(-2deg)', marginBottom: 4 }}>welcome →</div>
        <h1 style={{ fontFamily: dT.serif, fontSize: 42, fontWeight: 400,
          lineHeight: 1.05, margin: '0 0 10px', letterSpacing: '-0.02em',
          textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>I'm Rachel.</h1>
        <p style={{ fontFamily: dT.body, fontSize: 13, lineHeight: 1.5,
          margin: 0, color: 'rgba(245,239,227,0.75)' }}>
          The mug is hot. The plant is overwatered.
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
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>On the shelf</h2>
          {READING.map((b, i) => (
            <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: `1px solid ${dT.faded}22` }}>
              <div style={{ fontFamily: dT.serif, fontSize: 17, fontWeight: 500 }}>{b.title}</div>
              <div style={{ fontFamily: dT.serif, fontStyle: 'italic', fontSize: 13, color: dT.faded, marginTop: 2 }}>
                {b.author} · {b.status}
              </div>
              {b.note && <p style={{ fontFamily: dT.body, fontSize: 13, color: dT.ink, margin: '8px 0 0', lineHeight: 1.5 }}>{b.note}</p>}
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
            <a href={SITE.github}   target="_blank" rel="noopener noreferrer" style={{ color: dT.accent, textDecoration: 'none' }}>github</a>
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
                {g.items.map((it, j) => <li key={j} style={{ fontFamily: dT.body, fontSize: 14 }}>{it}</li>)}
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

    case 'gaming':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>Gaming</h2>
          <p style={{ fontFamily: dT.serif, fontSize: 16, lineHeight: 1.65, marginBottom: 28 }}>
            I play games the way I read — voraciously and then not at all for three months.
          </p>
          {GAMING.map((g, i) => (
            <div key={i} style={{ paddingBottom: 18, marginBottom: 18, borderBottom: `1px solid ${dT.faded}22` }}>
              <div style={{ fontFamily: dT.body, fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{g.name}</div>
              <p style={{ fontFamily: dT.serif, fontSize: 14, lineHeight: 1.55, margin: 0, color: dT.faded }}>{g.note}</p>
            </div>
          ))}
        </>
      )

    case 'workshop':
      return (
        <>
          <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>Workshop</h2>
          <p style={{ fontFamily: dT.serif, fontSize: 16, lineHeight: 1.65, marginBottom: 28 }}>
            A collection of things that make and fix other things. In various states of progress.
          </p>
          {WORKSHOP.map((w, i) => (
            <div key={i} style={{ paddingBottom: 18, marginBottom: 18, borderBottom: `1px solid ${dT.faded}22` }}>
              <div style={{ fontFamily: dT.body, fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{w.name}</div>
              <p style={{ fontFamily: dT.serif, fontSize: 14, lineHeight: 1.55, margin: 0, color: dT.faded }}>{w.note}</p>
            </div>
          ))}
        </>
      )

    default:
      return null
  }
}

// ─── Content page ─────────────────────────────────────────────────────────────

function ContentPage({ id, onBack }: { id: string; onBack: () => void }) {
  const hint = SECTIONS[id]?.hint
  return (
    <div style={{ minHeight: '100vh', background: dT.paper, color: dT.ink }}>
      <header style={{
        position: 'sticky', top: 0, background: dT.paper,
        borderBottom: `1px solid ${dT.faded}22`,
        padding: '20px 48px',
        display: 'flex', alignItems: 'center', gap: 24, zIndex: 10,
      }}>
        <button onClick={onBack} style={{
          background: 'none', border: `1px solid ${dT.faded}55`,
          fontFamily: dT.mono, fontSize: 11, color: dT.faded,
          cursor: 'pointer', padding: '6px 14px',
          letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0,
        }}>
          ← room
        </button>
        {hint && (
          <span style={{ fontFamily: dT.serif, fontStyle: 'italic', fontSize: 16, color: dT.faded }}>
            {hint}
          </span>
        )}
      </header>
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 48px 96px' }}>
        <PanelContent id={id} />
      </main>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

function DeskPage() {
  const [panelId, setPanelId] = useState<string | null>(null)

  useEffect(() => {
    const h = new Date().getHours()
    document.documentElement.dataset.time =
      h >= 7 && h < 17 ? 'day' : h < 19 ? 'golden' : h < 21 ? 'dusk' : 'night'
  }, [])

  function navigate(toPanel: string | null) {
    document.documentElement.dataset.navDirection = toPanel ? 'forward' : 'back'
    if (!document.startViewTransition) { setPanelId(toPanel); return }
    document.startViewTransition(() => { flushSync(() => setPanelId(toPanel)) })
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {panelId
        ? <ContentPage id={panelId} onBack={() => navigate(null)} />
        : <DeskHome onOpen={navigate} />
      }
    </div>
  )
}
