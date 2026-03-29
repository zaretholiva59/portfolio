import { useLocation } from 'react-router-dom'

const variantClass = {
  '/': 'blob-home',
  '/profile': 'blob-profile',
  '/about': 'blob-about',
  '/projects': 'blob-projects',
}

export default function BlobLayer() {
  const { pathname } = useLocation()
  const cls = variantClass[pathname] || 'blob-home'
  return (
    <div className="blob-layer" aria-hidden>
      <div className={`blob-shape ${cls}`} />
    </div>
  )
}
