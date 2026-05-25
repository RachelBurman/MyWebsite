import { AtpAgent } from '@atproto/api'

export { AtpAgent }

const SERVICE = 'https://bsky.social'

export interface StoredSession {
  did: string
  handle: string
  accessJwt: string
  refreshJwt: string
}

export interface ATDocument {
  uri: string
  cid: string
  value: {
    $type: string
    site: string
    title: string
    publishedAt: string
    textContent?: string
    description?: string
    path?: string
    tags?: string[]
    updatedAt?: string
  }
}

const SESSION_KEY = 'atp_session'
const PUB_KEY     = 'atp_pub_uri'
const DID_KEY     = 'atp_did'

export function getStoredSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveSession(s: StoredSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(s))
  localStorage.setItem(DID_KEY, s.did)
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
}

export function getStoredDid(): string | null {
  // Env var takes priority (works across all browsers once set)
  const envDid = import.meta.env.VITE_ATPROTO_DID
  if (envDid) return envDid
  return localStorage.getItem(DID_KEY)
}

export function getPublicationUri(): string | null {
  return localStorage.getItem(PUB_KEY)
}

export function savePublicationUri(uri: string) {
  localStorage.setItem(PUB_KEY, uri)
}

export async function login(identifier: string, password: string): Promise<AtpAgent> {
  const agent = new AtpAgent({ service: SERVICE })
  const { data } = await agent.login({ identifier, password })
  saveSession({ did: data.did, handle: data.handle, accessJwt: data.accessJwt, refreshJwt: data.refreshJwt })
  return agent
}

export async function resumeSession(stored: StoredSession): Promise<AtpAgent | null> {
  try {
    const agent = new AtpAgent({ service: SERVICE })
    await agent.resumeSession({ ...stored, active: true })
    return agent
  } catch { return null }
}

export async function fetchDocuments(did: string): Promise<ATDocument[]> {
  const agent = new AtpAgent({ service: SERVICE })
  const { data } = await agent.com.atproto.repo.listRecords({
    repo: did,
    collection: 'site.standard.document',
    limit: 100,
  })
  return data.records as ATDocument[]
}

export async function fetchPublications(agent: AtpAgent): Promise<Array<{ uri: string; value: { url: string; name: string } }>> {
  const { data } = await agent.com.atproto.repo.listRecords({
    repo: agent.session!.did,
    collection: 'site.standard.publication',
    limit: 10,
  })
  return data.records as unknown as Array<{ uri: string; value: { url: string; name: string } }>
}

export async function createPublication(
  agent: AtpAgent,
  url: string,
  name: string,
  description?: string,
): Promise<string> {
  const { data } = await agent.com.atproto.repo.createRecord({
    repo: agent.session!.did,
    collection: 'site.standard.publication',
    record: {
      $type: 'site.standard.publication',
      url,
      name,
      ...(description ? { description } : {}),
    },
  })
  return data.uri
}

export async function createDocument(
  agent: AtpAgent,
  publicationUri: string,
  title: string,
  content: string,
  tags: string[],
  path: string,
): Promise<string> {
  const { data } = await agent.com.atproto.repo.createRecord({
    repo: agent.session!.did,
    collection: 'site.standard.document',
    record: {
      $type: 'site.standard.document',
      site: publicationUri,
      title,
      publishedAt: new Date().toISOString(),
      textContent: content,
      description: content.replace(/\n+/g, ' ').slice(0, 300),
      path,
      ...(tags.length ? { tags } : {}),
    },
  })
  return data.uri
}

export async function deleteDocument(agent: AtpAgent, uri: string): Promise<void> {
  const rkey = uri.split('/').pop()!
  await agent.com.atproto.repo.deleteRecord({
    repo: agent.session!.did,
    collection: 'site.standard.document',
    rkey,
  })
}

export function slugify(title: string): string {
  return '/writing/' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function estimateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  return `${Math.max(1, Math.round(words / 200))} min`
}

export function formatDisplayDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
}
