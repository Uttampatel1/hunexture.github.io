const CONSENT_KEY = 'hunexture-cookie-consent'
const PLAUSIBLE_DOMAIN = process.env.REACT_APP_PLAUSIBLE_DOMAIN
const GA_ID = process.env.REACT_APP_GA_ID

let loaded = false

const hasConsent = () => {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch (e) {
    return false
  }
}

export function trackPageview(path) {
  if (!loaded || typeof window === 'undefined') return
  if (GA_ID && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path || window.location.pathname + window.location.search,
      page_location: window.location.href
    })
  }
  // Plausible tracks SPA history changes automatically.
}

export function trackEvent(name, props) {
  if (!loaded || typeof window === 'undefined') return
  try {
    if (PLAUSIBLE_DOMAIN && typeof window.plausible === 'function') {
      window.plausible(name, props ? { props } : undefined)
    } else if (GA_ID && typeof window.gtag === 'function') {
      window.gtag('event', name, props || {})
    }
  } catch (e) {
    /* never break the app for analytics */
  }
}

function patchHistory() {
  const notify = () => setTimeout(() => trackPageview(), 0)
  ;['pushState', 'replaceState'].forEach((fn) => {
    const orig = window.history[fn]
    window.history[fn] = function () {
      const result = orig.apply(this, arguments)
      notify()
      return result
    }
  })
  window.addEventListener('popstate', notify)
}

export function initAnalytics() {
  if (loaded || typeof window === 'undefined' || typeof document === 'undefined') return
  if (!(PLAUSIBLE_DOMAIN || GA_ID) || !hasConsent()) return

  if (PLAUSIBLE_DOMAIN) {
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments)
      }
    const s = document.createElement('script')
    s.defer = true
    s.setAttribute('data-domain', PLAUSIBLE_DOMAIN)
    s.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(s)
    loaded = true
  } else {
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { anonymize_ip: true, send_page_view: true })
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
    document.head.appendChild(s)
    loaded = true
    patchHistory()
  }
}
