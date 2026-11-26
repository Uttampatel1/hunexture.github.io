import React from 'react'

// Wraps the last word of a title in the mint highlight mark.
export default function BrandTitle({ text }) {
  const s = String(text || '')
  const i = s.lastIndexOf(' ')
  if (i < 0) return <span className="brand-mark">{s}</span>
  return <>{s.slice(0, i + 1)}<span className="brand-mark">{s.slice(i + 1)}</span></>
}
