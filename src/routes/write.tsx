import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useCallback } from 'react'
import { SITE } from '../content'
import * as AT from '../lib/atproto'
import type { AtpAgent } from '../lib/atproto'

export const Route = createFileRoute('/write')({ component: WritePage })

const dT = {
  paper:  '#f5efe3',
  ink:    '#231b14',
  faded:  '#6b6157',
  accent: '#c9572e',
  body:   '"Inter", system-ui, sans-serif',
  serif:  '"Lora", Georgia, serif',
  mono:   '"JetBrains Mono", monospace',
} as const

const inputStyle: React.CSSProperties = {
  background: '#ece6da',
  border: `1px solid ${dT.faded}33`,
  borderRadius: 2,
  padding: '10px 14px',
  fontFamily: dT.body,
  fontSize: 14,
  color: dT.ink,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
}

const btnStyle: React.CSSProperties = {
  background: 'transparent',
  border: `1px solid ${dT.faded}55`,
  fontFamily: dT.mono,
  fontSize: 12,
  color: dT.ink,
  cursor: 'pointer',
  padding: '10px 20px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
}

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginForm({ onLogin }: { onLogin: (a: AtpAgent) => void }) {
  const [handle,  setHandle]  = useState('')
  const [pass,    setPass]    = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const agent = await AT.login(handle, pass)
      onLogin(agent)
    } catch (err: any) {
      setError(err?.message ?? 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: dT.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={submit} style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h1 style={{ fontFamily: dT.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 28, margin: '0 0 8px', color: dT.ink }}>
          Write
        </h1>
        <p style={{ fontFamily: dT.mono, fontSize: 11, color: dT.faded, margin: 0, letterSpacing: '0.06em' }}>
          Bluesky handle + app password
        </p>
        <input
          value={handle} onChange={e => setHandle(e.target.value)}
          placeholder="handle.bsky.social"
          style={inputStyle}
          autoComplete="username"
          required
        />
        <input
          type="password"
          value={pass} onChange={e => setPass(e.target.value)}
          placeholder="App password"
          style={inputStyle}
          autoComplete="current-password"
          required
        />
        {error && (
          <p style={{ fontFamily: dT.mono, fontSize: 12, color: dT.accent, margin: 0 }}>{error}</p>
        )}
        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <p style={{ fontFamily: dT.mono, fontSize: 10, color: dT.faded, margin: 0 }}>
          Generate an app password at bsky.app → Settings → App Passwords
        </p>
      </form>
    </div>
  )
}

// ─── Publication setup ────────────────────────────────────────────────────────
function SetupForm({ agent, onSetup }: { agent: AtpAgent; onSetup: (uri: string) => void }) {
  const [url,         setUrl]         = useState('')
  const [name,        setName]        = useState<string>(SITE.name)
  const [desc,        setDesc]        = useState('')
  const [existingUri, setExistingUri] = useState('')
  const [tab,         setTab]         = useState<'create' | 'existing'>('create')
  const [error,       setError]       = useState('')
  const [loading,     setLoading]     = useState(false)

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const uri = await AT.createPublication(agent, url, name, desc || undefined)
      AT.savePublicationUri(uri)
      onSetup(uri)
    } catch (err: any) {
      setError(err?.message ?? 'Failed to create publication')
    } finally {
      setLoading(false)
    }
  }

  function handleExisting(e: React.FormEvent) {
    e.preventDefault()
    if (!existingUri.startsWith('at://')) { setError('Must start with at://'); return }
    AT.savePublicationUri(existingUri)
    onSetup(existingUri)
  }

  const tabBtn = (t: 'create' | 'existing'): React.CSSProperties => ({
    ...btnStyle,
    padding: '6px 16px',
    background: tab === t ? dT.accent : 'transparent',
    color: tab === t ? '#fff' : dT.faded,
    border: `1px solid ${tab === t ? dT.accent : dT.faded}55`,
  })

  return (
    <div style={{ minHeight: '100vh', background: dT.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 440 }}>
        <h1 style={{ fontFamily: dT.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 28, margin: '0 0 8px', color: dT.ink }}>
          Set up your publication
        </h1>
        <p style={{ fontFamily: dT.mono, fontSize: 11, color: dT.faded, margin: '0 0 24px', letterSpacing: '0.06em' }}>
          One-time — creates a site.standard.publication record on your PDS.
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <button onClick={() => setTab('create')} style={tabBtn('create')}>Create new</button>
          <button onClick={() => setTab('existing')} style={tabBtn('existing')}>I have one</button>
        </div>

        {tab === 'create' ? (
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input value={url}  onChange={e => setUrl(e.target.value)}  placeholder="https://yoursite.com" style={inputStyle} required />
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Publication name"     style={inputStyle} required />
            <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)" style={inputStyle} />
            {error && <p style={{ fontFamily: dT.mono, fontSize: 12, color: dT.accent, margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? 'Creating…' : 'Create publication'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleExisting} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input
              value={existingUri} onChange={e => setExistingUri(e.target.value)}
              placeholder="at://did:plc:.../site.standard.publication/..."
              style={inputStyle} required
            />
            {error && <p style={{ fontFamily: dT.mono, fontSize: 12, color: dT.accent, margin: 0 }}>{error}</p>}
            <button type="submit" style={btnStyle}>Use this publication</button>
          </form>
        )}
      </div>
    </div>
  )
}

// ─── Editor ───────────────────────────────────────────────────────────────────
function Editor({ agent, publicationUri }: { agent: AtpAgent; publicationUri: string }) {
  const [title,      setTitle]      = useState('')
  const [tags,       setTags]       = useState('')
  const [content,    setContent]    = useState('')
  const [posts,      setPosts]      = useState<AT.ATDocument[]>([])
  const [publishing, setPublishing] = useState(false)
  const [error,      setError]      = useState('')
  const [success,    setSuccess]    = useState('')
  const [confirmDel, setConfirmDel] = useState<string | null>(null)

  const did = agent.session!.did

  const loadPosts = useCallback(async () => {
    try {
      const docs = await AT.fetchDocuments(did)
      setPosts(docs.sort((a, b) =>
        new Date(b.value.publishedAt).getTime() - new Date(a.value.publishedAt).getTime()
      ))
    } catch {}
  }, [did])

  useEffect(() => { loadPosts() }, [loadPosts])

  async function publish(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    setError('')
    setSuccess('')
    setPublishing(true)
    try {
      const tagList = tags.split(',').map(t => t.trim()).filter(Boolean)
      await AT.createDocument(agent, publicationUri, title.trim(), content.trim(), tagList, AT.slugify(title))
      setTitle('')
      setTags('')
      setContent('')
      setSuccess('Published.')
      await loadPosts()
    } catch (err: any) {
      setError(err?.message ?? 'Failed to publish')
    } finally {
      setPublishing(false)
    }
  }

  async function handleDelete(uri: string) {
    try {
      await AT.deleteDocument(agent, uri)
      setConfirmDel(null)
      await loadPosts()
    } catch (err: any) {
      setError(err?.message ?? 'Failed to delete')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: dT.paper, color: dT.ink }}>
      <header style={{
        position: 'sticky', top: 0, background: dT.paper,
        borderBottom: `1px solid ${dT.faded}22`,
        padding: '16px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        zIndex: 10,
      }}>
        <span style={{ fontFamily: dT.mono, fontSize: 11, color: dT.faded, letterSpacing: '0.1em' }}>
          {agent.session!.handle} · <span style={{ color: dT.accent }}>DID: {did}</span>
        </span>
        <button
          onClick={() => { AT.clearSession(); window.location.reload() }}
          style={{ ...btnStyle, padding: '4px 12px', fontSize: 11 }}
        >
          Sign out
        </button>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 48px 96px' }}>
        <h2 style={{ fontFamily: dT.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 28, margin: '0 0 8px' }}>
          New post
        </h2>
        <p style={{ fontFamily: dT.mono, fontSize: 10, color: dT.faded, margin: '0 0 24px', letterSpacing: '0.06em' }}>
          Blank lines between paragraphs. Tags are comma-separated.
        </p>

        <form onSubmit={publish} style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 64 }}>
          <input
            value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            style={{ ...inputStyle, fontFamily: dT.serif, fontSize: 20 }}
          />
          <input
            value={tags} onChange={e => setTags(e.target.value)}
            placeholder="Tags (comma-separated)"
            style={{ ...inputStyle, fontFamily: dT.mono, fontSize: 12 }}
          />
          <textarea
            value={content} onChange={e => setContent(e.target.value)}
            placeholder="Write here."
            rows={18}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: dT.serif, fontSize: 15, lineHeight: 1.7 }}
          />
          {error   && <p style={{ fontFamily: dT.mono, fontSize: 12, color: dT.accent,   margin: 0 }}>{error}</p>}
          {success && <p style={{ fontFamily: dT.mono, fontSize: 12, color: '#5a8a5a', margin: 0 }}>{success}</p>}
          <button
            type="submit"
            disabled={publishing || !title.trim() || !content.trim()}
            style={btnStyle}
          >
            {publishing ? 'Publishing…' : 'Publish'}
          </button>
        </form>

        {posts.length > 0 && (
          <>
            <h2 style={{ fontFamily: dT.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 22, margin: '0 0 16px' }}>
              Published
            </h2>
            {posts.map(p => (
              <div key={p.uri} style={{
                padding: '14px 0',
                borderBottom: `1px solid ${dT.faded}22`,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
              }}>
                <div>
                  <div style={{ fontFamily: dT.body, fontSize: 15, fontWeight: 500 }}>{p.value.title}</div>
                  <div style={{ fontFamily: dT.mono, fontSize: 10, color: dT.faded, marginTop: 4 }}>
                    {AT.formatDisplayDate(p.value.publishedAt)}
                    {p.value.tags?.length ? ` · ${p.value.tags.join(', ')}` : ''}
                  </div>
                </div>
                {confirmDel === p.uri ? (
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <button
                      onClick={() => handleDelete(p.uri)}
                      style={{ ...btnStyle, padding: '4px 12px', fontSize: 11, background: dT.accent, color: '#fff', border: 'none' }}
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setConfirmDel(null)}
                      style={{ ...btnStyle, padding: '4px 12px', fontSize: 11 }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDel(p.uri)}
                    style={{ ...btnStyle, padding: '4px 12px', fontSize: 11, flexShrink: 0 }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function WritePage() {
  const [agent,   setAgent]   = useState<AtpAgent | null>(null)
  const [pubUri,  setPubUri]  = useState<string | null>(null)
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    async function boot() {
      const stored = AT.getStoredSession()
      if (stored) {
        const a = await AT.resumeSession(stored)
        if (a) {
          setAgent(a)
          const pub = AT.getPublicationUri()
          if (pub) setPubUri(pub)
        }
      }
      setBooting(false)
    }
    boot()
  }, [])

  if (booting) return (
    <div style={{ minHeight: '100vh', background: dT.paper, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: dT.mono, fontSize: 12, color: dT.faded }}>…</span>
    </div>
  )

  if (!agent) return <LoginForm onLogin={a => setAgent(a)} />
  if (!pubUri) return <SetupForm agent={agent} onSetup={uri => setPubUri(uri)} />
  return <Editor agent={agent} publicationUri={pubUri} />
}
