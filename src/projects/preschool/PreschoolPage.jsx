import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Teachers from './components/Teachers'
import Cta from './components/Cta'

export default function PreschoolPage() {
  return (
    <div className="bg-white text-gray-800">
      <Hero />
      <About />
      <Features />
      <Teachers />
      <Cta />
    </div>
  )
}
