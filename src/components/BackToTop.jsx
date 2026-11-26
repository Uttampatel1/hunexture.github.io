import { useEffect, useState } from 'react'
import { FiArrowUp } from 'react-icons/fi'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let ticking = false
    const check = () => {
      ticking = false
      setShow(window.scrollY > 900)
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(check)
      }
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const go = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }
  return (
    <button
      type="button"
      className={`back-to-top${show ? ' is-visible' : ''}`}
      onClick={go}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <FiArrowUp size={20} aria-hidden="true" />
    </button>
  )
}
