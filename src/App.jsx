import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BlobLayer from './components/BlobLayer'
import CustomCursor from './components/CustomCursor'
import LandingPage from './pages/LandingPage'
import Preloader from './components/Preloader'
import ScrollToTop from './components/ScrollToTop'

const sections = ['home', 'profile', 'about', 'projects']

function AppContent() {
  const [activeLink, setActiveLink] = useState('#home')
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveLink('')
      return
    }
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      let currentSection = '#home'

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop - 80
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = `#${sectionId}`
            break
          }
        }
      }
      setActiveLink(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  return (
    <>
      <ScrollToTop />
      <Preloader className={loading ? '' : 'fade-out'} />
      <div className={`app-shell flex min-h-screen flex-col app-shell-enter ${loading ? 'hidden' : ''}`}>
        <BlobLayer />
        <CustomCursor />
        <Navbar activeLink={activeLink} />
        <main className="relative z-10 flex-1 pt-[56px]">
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
