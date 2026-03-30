import { useLocation } from 'react-router-dom'

const variantClass = {
  '/': 'blob-home',
  '/profile': 'blob-profile',
  '/about': 'blob-about',
  '/projects': 'blob-projects',
}

export default function BlobLayer() {
  const { pathname } = useLocation()
  if (pathname === '/projects/gantt' || pathname === '/projects/ecommerce') {
    return null
  }
  const cls =
    variantClass[pathname] ||
    (pathname.startsWith('/projects') ? 'blob-projects' : 'blob-home')
  return (
    <div className="blob-layer" aria-hidden>
      <div className={`blob-shape ${cls}`} />
    </div>
  )
}
