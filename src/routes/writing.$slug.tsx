import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { POSTS, type BodyItem } from '../content'
import { dT } from '../lib/theme'
import * as AT from '../lib/atproto'

export const Route = createFileRoute('/writing/$slug')({ component: PostPage })

function PostPage() {
  const { slug }    = Route.useParams()
  const navigate    = useNavigate()
  const staticPost  = POSTS.find(p => p.slug === slug)

  const [atPost,  setAtPost]  = useState<AT.ATDocument | null>(null)
  const [loading, setLoading] = useState(!staticPost)

  useEffect(() => {
    if (staticPost) return
    const did = AT.getStoredDid()
    if (!did) { setLoading(false); return }
    AT.fetchDocuments(did)
      .then(docs => {
        const match = docs.find(d => {
          const pathSlug  = d.value.path?.split('/').pop()
          const titleSlug = d.value.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
          return pathSlug === slug || titleSlug === slug
        })
        setAtPost(match ?? null)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug, staticPost])

  function goBack() {
    document.documentElement.dataset.navDirection = 'back'
    if (!document.startViewTransition) {
      navigate({ to: '/$section', params: { section: 'writing' } })
      return
    }
    document.startViewTransition(() => {
      flushSync(() => navigate({ to: '/$section', params: { section: 'writing' } }))
    })
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: dT.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: dT.mono, fontSize: 12, color: dT.faded }}>…</span>
    </div>
  )

  if (!staticPost && !atPost) return (
    <div style={{ minHeight: '100vh', background: dT.paper, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
      <p style={{ fontFamily: dT.serif, fontStyle: 'italic', fontSize: 20, color: dT.faded, margin: 0 }}>Post not found.</p>
      <button onClick={goBack} style={backBtnStyle}>← writing</button>
    </div>
  )

  const title:       string   = staticPost ? staticPost.title       : atPost!.value.title
  const dateDisplay: string   = staticPost ? staticPost.date        : AT.formatDisplayDate(atPost!.value.publishedAt)
  const tag:         string   = staticPost ? staticPost.tag         : (atPost!.value.tags?.[0] ?? 'Post')
  const readTime:    string   = staticPost ? staticPost.readTime    : AT.estimateReadTime(atPost!.value.textContent ?? '')
  const body: BodyItem[] = staticPost
    ? staticPost.body
    : (atPost!.value.textContent ?? '').split(/\n\n+/).filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: dT.paper, color: dT.ink }}>
      <header style={{
        position: 'sticky', top: 0, background: dT.paper,
        borderBottom: `1px solid ${dT.faded}22`,
        padding: '20px 48px',
        display: 'flex', alignItems: 'center', gap: 24, zIndex: 10,
      }}>
        <button onClick={goBack} style={backBtnStyle}>← writing</button>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 48px 96px' }}>
        <div style={{ fontFamily: dT.mono, fontSize: 10, color: dT.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
          {tag} · {dateDisplay} · {readTime}
        </div>
        <h1 style={{ fontFamily: dT.serif, fontSize: 38, fontWeight: 400, lineHeight: 1.15, margin: '0 0 32px', color: dT.ink }}>
          {title}
        </h1>
        {body.map((item, i) => {
          if (typeof item === 'string') {
            return <p key={i} style={{ fontFamily: dT.serif, fontSize: 16, lineHeight: 1.75, margin: '0 0 18px', color: dT.ink }}>{item}</p>
          }
          if ('heading' in item) {
            const level = item.level ?? 2
            return level === 3
              ? <h3 key={i} style={{ fontFamily: dT.serif, fontSize: 18, fontWeight: 400, margin: '32px 0 10px', color: dT.ink }}>{item.heading}</h3>
              : <h2 key={i} style={{ fontFamily: dT.serif, fontSize: 24, fontWeight: 400, margin: '48px 0 14px', color: dT.ink }}>{item.heading}</h2>
          }
          if ('link' in item) {
            return <p key={i} style={{ fontFamily: dT.serif, fontSize: 16, lineHeight: 1.75, margin: '0 0 18px' }}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ color: dT.accent, textDecoration: 'none' }}>{item.link} ↗</a>
            </p>
          }
        })}
      </main>
    </div>
  )
}

const backBtnStyle: React.CSSProperties = {
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
}
