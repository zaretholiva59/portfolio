import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import BlobLayer from './components/BlobLayer'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Projects from './pages/Projects'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell flex min-h-screen flex-col">
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
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
