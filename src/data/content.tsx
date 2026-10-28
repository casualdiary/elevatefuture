import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { WIX_CLIENT_ID } from '../wix/client'
import { fetchContent, localContent, type CollectionKey, type Content, type Source } from './cms'

export type ContentState = Content & {
  /** 'loading' while the Wix request is in flight; 'wix' when every collection came from Wix;
   *  'partial' when some fell back; 'local' when Wix is not configured or unreachable. */
  status: 'loading' | 'wix' | 'partial' | 'local'
  sources: Partial<Record<CollectionKey, Source>>
}

const initial: ContentState = { ...localContent, status: WIX_CLIENT_ID ? 'loading' : 'local', sources: {} }
const Ctx = createContext<ContentState>(initial)

/** Loads the site content from the Wix CMS once per page load; the local copy renders meanwhile and on failure. */
export function ContentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ContentState>(initial)
  useEffect(() => {
    if (!WIX_CLIENT_ID) return
    let alive = true
    fetchContent()
      .then(({ content, sources, errors }) => {
        if (!alive) return
        const fromWix = Object.values(sources).filter((s) => s === 'wix').length
        const status = fromWix === 0 ? 'local' : fromWix === Object.keys(sources).length ? 'wix' : 'partial'
        if (errors.length) console.warn('[wix] using local content for:', errors)
        setState({ ...content, status, sources })
      })
      .catch((e) => {
        console.warn('[wix] unreachable, using local content', e)
        if (alive) setState({ ...localContent, status: 'local', sources: {} })
      })
    return () => {
      alive = false
    }
  }, [])
  useEffect(() => {
    document.documentElement.dataset.content = state.status
  }, [state.status])
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => useContext(Ctx)
