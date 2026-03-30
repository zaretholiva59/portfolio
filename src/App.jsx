import { useEffect } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BlobLayer from './components/BlobLayer'
import CustomCursor from './components/CustomCursor'
import LandingPage from './pages/LandingPage'

function AppContent() {
  const { pathname } = useLocation()

  useEffect(() => {
    const light =
      pathname === '/projects/gantt' || pathname === '/projects/ecommerce'
    document.body.classList.toggle('corporate-route', light)
    return () => document.body.classList.remove('corporate-route')
  }, [pathname])

  return (
    <div className="app-shell flex min-h-screen flex-col app-shell-enter">
      <BlobLayer />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10 flex-1">
        <LandingPage />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
