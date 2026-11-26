import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// seoMeta pulls in every data file, so load it on demand to keep it out of the main bundle.
let seoPromise
const loadSeo = () => (seoPromise ||= import('../seo/seoMeta'))

const setMeta = (name, value, attr = 'name') => {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

// Keeps <title>, description, canonical, social tags and JSON-LD in sync with the route.
const RouteSeo = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    let cancelled = false
    loadSeo().then(({ getSeoForPath, buildJsonLd }) => {
    if (cancelled) return
    const seo = getSeoForPath(pathname)
    if (!seo) {
      setMeta('robots', 'noindex, follow')
      return
    }
    document.title = seo.title
    setMeta('robots', 'index, follow, max-image-preview:large')
    setMeta('description', seo.description)
    setMeta('og:title', seo.title, 'property')
    setMeta('og:description', seo.description, 'property')
    setMeta('og:url', seo.url, 'property')
    setMeta('twitter:title', seo.title)
    setMeta('twitter:description', seo.description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = seo.url

    let ld = document.head.querySelector('script[data-route-ld]')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.setAttribute('data-route-ld', '')
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(buildJsonLd(seo))
    })
    return () => { cancelled = true }
  }, [pathname])

  return null
}

export default RouteSeo
