/**
 * Wix REST client for a headless site, over plain fetch (no SDK dependency).
 * Shape follows Wix's verified headless template `shared/rest/client.ts`:
 * an anonymous VISITOR token minted from the public OAuth client id, cached in
 * localStorage and refreshed with its refresh token.
 * docs: https://dev.wix.com/docs/api-reference/business-management/headless/authentication/retrieve-tokens
 */
export const WIX_CLIENT_ID: string = (import.meta.env.VITE_WIX_CLIENT_ID ?? '').trim()
export const WIX_API_BASE = 'https://www.wixapis.com'
const STORAGE_KEY = `wix-visitor-${WIX_CLIENT_ID}`

type Tokens = { accessToken: string; refreshToken: string; expiresAt: number }

let memory: Tokens | null = null
function load(): Tokens | null {
  if (memory) return memory
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) memory = JSON.parse(raw) as Tokens
  } catch {
    /* storage disabled or corrupt: mint a fresh visitor */
  }
  return memory
}
function save(t: Tokens) {
  memory = t
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t))
  } catch {
    /* ignore */
  }
}

async function mint(body: Record<string, string>, signal?: AbortSignal): Promise<Tokens> {
  const res = await fetch(`${WIX_API_BASE}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId: WIX_CLIENT_ID, ...body }),
    signal,
  })
  if (!res.ok) throw new Error(`Wix auth failed (${res.status})`)
  const d = await res.json()
  return { accessToken: d.access_token, refreshToken: d.refresh_token, expiresAt: Date.now() + d.expires_in * 1000 }
}

let pending: Promise<string> | null = null
/** A valid visitor access token: cached, refreshed when expired, minted on first use. */
export function accessToken(signal?: AbortSignal): Promise<string> {
  const t = load()
  if (t && t.expiresAt - 60_000 > Date.now()) return Promise.resolve(t.accessToken)
  pending ??= (async () => {
    let fresh: Tokens | undefined
    if (t?.refreshToken) {
      try {
        fresh = await mint({ grantType: 'refresh_token', refreshToken: t.refreshToken }, signal)
      } catch {
        /* fall through to a new visitor */
      }
    }
    fresh ??= await mint({ grantType: 'anonymous' }, signal)
    save(fresh)
    return fresh.accessToken
  })().finally(() => {
    pending = null
  })
  return pending
}

export class WixApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

/** POST/GET a Wix REST path as the visitor. The header carries the raw token (no "Bearer "). */
export async function wixRequest<T>(path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${WIX_API_BASE}${path}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers: { Authorization: await accessToken(signal), 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  })
  if (!res.ok) {
    let msg = ''
    try {
      msg = (await res.json())?.message ?? ''
    } catch {
      /* no JSON */
    }
    throw new WixApiError(msg || `${path} failed (${res.status})`, res.status)
  }
  return (await res.json()) as T
}

/** Query a CMS collection (Wix Data v2), sorted by the `order` field. */
export async function queryCollection<T = Record<string, unknown>>(dataCollectionId: string, signal?: AbortSignal): Promise<T[]> {
  const out = await wixRequest<{ dataItems?: { data: T }[] }>(
    '/wix-data/v2/items/query',
    { dataCollectionId, query: { sort: [{ fieldName: 'order', order: 'ASC' }], paging: { limit: 100 } } },
    signal,
  )
  return (out.dataItems ?? []).map((i) => i.data)
}
