import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { flushSync } from 'react-dom'
import { dT } from '../lib/theme'
import * as AT from '../lib/atproto'
import {
  SITE, PROJECTS, TIMELINE, NOW, READING, USES, POSTS, PHOTOS, JOURNAL,
  GUESTBOOK_NOTE, GAMING, WORKSHOP,
} from '../content'

// ─── Section header hints ─────────────────────────────────────────────────────
export const SECTIONS: Record<string, { label: string; hint: string }> = {
  writing:     { label: 'Writing',     hint: "the captain's log"   },
  work:        { label: 'Projects',    hint: 'the navigation chart' },
  photography: { label: 'Photographs', hint: 'the porthole'         },
  now:         { label: 'Right now',   hint: 'the pewter mug'       },
  about:       { label: 'About',       hint: 'the letter'           },
  reading:     { label: 'On the shelf', hint: 'the books'           },
  uses:        { label: 'Uses',        hint: 'the sea chest'        },
}

// ─── Writing panel ────────────────────────────────────────────────────────────
const MONTH_INDEX: Record<string, number> = {
  Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11,
}

function parsePostDate(d: string) {
  const [mon, yr] = d.split(' ')
  return new Date(parseInt(yr), MONTH_INDEX[mon] ?? 0)
}

export type DisplayPost = {
  key: string
  postSlug: string
  title: string
  dateDisplay: string
  timestamp: number
  readTime: string
  tag: string
  body: string[]
}

function atDocSlug(doc: AT.ATDocument): string {
  if (doc.value.path) {
    const last = doc.value.path.split('/').pop()
    if (last) return last
  }
  return doc.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function toDisplayPost(p: typeof POSTS[number]): DisplayPost {
  return {
    key: p.slug,
    postSlug: p.slug,
    title: p.title,
    dateDisplay: p.date,
    timestamp: parsePostDate(p.date).getTime(),
    readTime: p.readTime,
    tag: p.tag,
    body: p.body,
  }
}

function atDocToDisplayPost(doc: AT.ATDocument): DisplayPost {
  const text = doc.value.textContent ?? ''
  return {
    key: doc.uri,
    postSlug: atDocSlug(doc),
    title: doc.value.title,
    dateDisplay: AT.formatDisplayDate(doc.value.publishedAt),
    timestamp: new Date(doc.value.publishedAt).getTime(),
    readTime: AT.estimateReadTime(text),
    tag: doc.value.tags?.[0] ?? 'Post',
    body: text.split(/\n\n+/).filter(Boolean),
  }
}

function WritingPanel() {
  const navigate  = useNavigate()
  const [atDocs, setAtDocs] = useState<AT.ATDocument[]>([])

  useEffect(() => {
    const did = AT.getStoredDid()
    if (!did) return
    AT.fetchDocuments(did).then(setAtDocs).catch(() => {})
  }, [])

  const allPosts: DisplayPost[] = [
    ...POSTS.map(toDisplayPost),
    ...atDocs.map(atDocToDisplayPost),
  ].sort((a, b) => b.timestamp - a.timestamp)

  function goToPost(postSlug: string) {
    navigate({ to: '/writing/$slug', params: { slug: postSlug } })
  }

  return (
    <>
      <h2 style={{ fontFamily: dT.serif, fontSize: 36, fontWeight: 400, fontStyle: 'italic', margin: '0 0 24px' }}>Writing</h2>
      {allPosts.map((p) => {
        const hasMore = p.body.length > 1
        return (
          <article key={p.key} style={{ paddingBottom: 24, marginBottom: 24, borderBottom: `1px solid ${dT.faded}22` }}>
            <div style={{ fontFamily: dT.mono, fontSize: 10, color: dT.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
              {p.tag} · {p.dateDisplay} · {p.readTime}
            </div>
            <h3 style={{ fontFamily: dT.serif, fontSize: 24, fontWeight: 400, lineHeight: 1.2, margin: '0 0 10px' }}>{p.title}</h3>
            {p.body.slice(0, 1).map((para, i) => (
              <p key={i} style={{ fontFamily: dT.serif, fontSize: 15, lineHeight: 1.65, margin: '0 0 10px' }}>{para}</p>
            ))}
            {hasMore && (
              <button onClick={() => goToPost(p.postSlug)} style={{
                background: 'none', border: 'none', padding: 0,
                fontFamily: dT.mono, fontSize: 11, color: dT.accent,
                cursor: 'pointer', letterSpacing: '0.08em',
                textDecoration: 'underline', textUnderlineOffset: 3,
              }}>
                read more
              </button>
            )}
          </article>
        )
      })}
      <h3 style={{ fontFamily: dT.serif, fontStyle: 'italic', fontSize: 22, fontWeight: 400, margin: '32px 0 16px' }}>Ship's ledger</h3>
      {JOURNAL.map((j, i) => (
        <div key={i} style={{ padding: '10px 0', borderTop: `1px solid ${dT.faded}22`, fontFamily: dT.body, fontSize: 14, lineHeight: 1.55 }}>
          <span style={{ fontFamily: dT.mono, fontSize: 11, color: dT.accent, marginRight: 8 }}>{j.date}</span>
          {j.body}
        </div>
      ))}
    </>
  )
}

// ─── Panel content ────────────────────────────────────────────────────────────
export function PanelContent({ id }: { id: string }) {
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
      return <WritingPanel />

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
export function ContentPage({ id }: { id: string }) {
  const navigate = useNavigate()
  const hint = SECTIONS[id]?.hint

  function goBack() {
    document.documentElement.dataset.navDirection = 'back'
    if (!document.startViewTransition) { navigate({ to: '/' }); return }
    document.startViewTransition(() => { flushSync(() => navigate({ to: '/' })) })
  }

  return (
    <div style={{ minHeight: '100vh', background: dT.paper, color: dT.ink }}>
      <header style={{
        position: 'sticky', top: 0, background: dT.paper,
        borderBottom: `1px solid ${dT.faded}22`,
        padding: '20px 48px',
        display: 'flex', alignItems: 'center', gap: 24, zIndex: 10,
      }}>
        <button onClick={goBack} style={{
          background: 'none', border: `1px solid ${dT.faded}55`,
          fontFamily: dT.mono, fontSize: 11, color: dT.faded,
          cursor: 'pointer', padding: '6px 14px',
          letterSpacing: '0.1em', textTransform: 'uppercase', flexShrink: 0,
        }}>
          ← cabin
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
