import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import BlobLayer from './components/BlobLayer'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Projects from './pages/Projects'
import GanttPage from './pages/GanttPage'
import EcommercePage from './pages/ecommerce/EcommercePage'

function AppRoutes() {
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
        <Routes>
          <Route element={<PageTransition />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/gantt" element={<GanttPage />} />
            <Route path="/projects/ecommerce" element={<EcommercePage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
