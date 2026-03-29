import { Outlet, useLocation } from 'react-router-dom'

export default function PageTransition() {
  const location = useLocation()
  return (
    <div className="page-transition-inner" key={location.pathname}>
      <Outlet />
    </div>
  )
}
