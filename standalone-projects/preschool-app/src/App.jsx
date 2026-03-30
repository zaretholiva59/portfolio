import React, { useState, useEffect } from 'react'
import { 
  Sun, Moon, Star, Heart, CheckCircle2, 
  Calendar, Camera, Bell, Info, Mail, 
  ChevronRight, ArrowRight, Play, LayoutGrid 
} from 'lucide-react'
import './App.css'

export default function App() {
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('preschool-data')
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Círculo de la mañana', done: false },
      { id: 2, text: 'Artes y manualidades', done: false },
      { id: 3, text: 'Tiempo de juego afuera', done: false },
      { id: 4, text: 'Almuerzo saludable', done: false },
      { id: 5, text: 'Hora de la siesta', done: false },
      { id: 6, text: 'Cuentacuentos', done: false },
    ]
  })
  const [galleryItem, setGalleryItem] = useState(null)

  useEffect(() => {
    localStorage.setItem('preschool-data', JSON.stringify(activities))
  }, [activities])

  const toggleActivity = (id) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, done: !a.done } : a))
  }

  const images = [
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
    'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=600&q=80',
    'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80',
    'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=600&q=80',
    'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=600&q=80',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
  ]

  const events = [
    { day: '12', month: 'Abr', title: 'Fiesta de Primavera' },
    { day: '25', month: 'Abr', title: 'Excursión al Zoo' },
    { day: '05', month: 'May', title: 'Día de la Madre' },
  ]

  return (
    <div className="ps-app">
      <section className="ps-hero">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center mb-6 reveal-up">
            <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full font-bold text-sm tracking-widest uppercase">
              Kiddino Preschool
            </span>
          </div>
          <h1 className="ps-title reveal-up" style={{ animationDelay: '0.1s' }}>
            Preparamos a tu hijo <br /> para la vida 🎨
          </h1>
          <p className="text-xl text-stone-500 mb-10 max-w-2xl mx-auto reveal-up" style={{ animationDelay: '0.2s' }}>
            Un enfoque de aprendizaje enriquecedor, holístico y divertido para los más pequeños.
          </p>
          <div className="flex flex-wrap justify-center gap-4 reveal-up" style={{ animationDelay: '0.3s' }}>
            <button className="ps-btn-main">¡Aplica ahora!</button>
            <button className="px-8 py-3 rounded-full font-bold text-lg text-stone-700 hover:bg-stone-100 transition">
              Conocer más
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-100 ps-card" style={{ transform: 'rotate(-2deg)' }}>
                <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-4"><Star /></div>
                <h3 className="font-black text-xl mb-2">Aprendizaje Activo</h3>
                <p className="text-sm text-blue-800 opacity-70">Exploración guiada para despertar la curiosidad.</p>
              </div>
              <div className="bg-amber-100 ps-card" style={{ transform: 'rotate(2deg)' }}>
                <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-4"><Heart /></div>
                <h3 className="font-black text-xl mb-2">Cuidado Cariñoso</h3>
                <p className="text-sm text-amber-800 opacity-70">Ambiente seguro y acogedor como en casa.</p>
              </div>
              <div className="bg-green-100 ps-card" style={{ transform: 'rotate(1deg)' }}>
                <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-4"><Sun /></div>
                <h3 className="font-black text-xl mb-2">Comida Sana</h3>
                <p className="text-sm text-green-800 opacity-70">Nutrición balanceada para el crecimiento.</p>
              </div>
              <div className="bg-pink-100 ps-card" style={{ transform: 'rotate(-1deg)' }}>
                <div className="w-12 h-12 bg-pink-500 text-white rounded-2xl flex items-center justify-center mb-4"><Moon /></div>
                <h3 className="font-black text-xl mb-2">Entorno Seguro</h3>
                <p className="text-sm text-pink-800 opacity-70">Instalaciones de primer nivel para jugar.</p>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-black text-stone-800 mb-6">Tu hijo es el protagonista del aprendizaje</h2>
              <p className="text-lg text-stone-500 mb-8">
                Nuestro objetivo es educar y desarrollar a los niños de todas las edades a través del juego y la creatividad. Nuestro plan de estudios está cuidadosamente diseñado para educar a su hijo con placer.
              </p>
              <div className="flex gap-10">
                <div>
                  <span className="text-4xl font-black text-amber-500">75+</span>
                  <p className="text-sm font-bold text-stone-400">Actividades</p>
                </div>
                <div>
                  <span className="text-4xl font-black text-purple-500">23</span>
                  <p className="text-sm font-bold text-stone-400">Maestros</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-stone-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-black mb-6">Actividades del Día</h2>
              <p className="text-stone-500 mb-8">Sigue el progreso diario de las aventuras de tu pequeño en Kiddino.</p>
              <div className="space-y-3">
                {activities.map(a => (
                  <div 
                    key={a.id} 
                    className={`activity-item ${a.done ? 'completed' : ''}`}
                    onClick={() => toggleActivity(a.id)}
                  >
                    <div className="check-circle">
                      {a.done && <CheckCircle2 size={16} />}
                    </div>
                    <span className="font-bold text-sm">{a.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black">Galería de Trabajos</h2>
                <button className="text-sm font-bold text-purple-600 flex items-center gap-1 hover:underline">
                  Ver todo <ChevronRight size={16} />
                </button>
              </div>
              <div className="gallery-grid">
                {images.map((img, i) => (
                  <div key={i} className="gallery-item" onClick={() => setGalleryItem(img)}>
                    <img src={img} alt={`Obra de arte ${i+1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Calendar className="text-amber-500" /> Calendario Escolar
              </h2>
              <div className="space-y-6">
                {events.map((e, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-amber-50 transition group">
                    <div className="text-center w-16">
                      <span className="block text-2xl font-black text-amber-500">{e.day}</span>
                      <span className="block text-xs font-bold text-stone-400 uppercase">{e.month}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg group-hover:text-amber-700">{e.title}</h4>
                      <p className="text-sm text-stone-400">9:00 AM - 12:00 PM</p>
                    </div>
                    <ArrowRight className="text-stone-200 group-hover:text-amber-500" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Bell className="text-purple-500" /> Últimos Anuncios
              </h2>
              <div className="bg-purple-100 p-8 rounded-[32px] relative overflow-hidden">
                <div className="relative z-10">
                  <span className="inline-block bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-xs font-bold mb-4">IMPORTANTE</span>
                  <h3 className="text-2xl font-black text-purple-900 mb-4">Nueva zona de juegos inaugurada</h3>
                  <p className="text-purple-800 opacity-70 mb-6">Estamos felices de anunciar que ya está lista la nueva zona de juegos con materiales reciclados y seguros.</p>
                  <button className="flex items-center gap-2 font-bold text-purple-700 hover:gap-4 transition-all">
                    Leer más <ArrowRight size={18} />
                  </button>
                </div>
                <div className="absolute -bottom-6 -right-6 text-8xl opacity-10">🎨</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-6">¿Quieres ser parte de Kiddino?</h2>
          <p className="text-stone-400 mb-10 max-w-xl mx-auto">Nuestro proceso de inscripción es sencillo y estamos encantados de conocer a nuevas familias.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-3">
              <Mail className="text-amber-500" /> info@kiddino.edu
            </div>
            <div className="flex items-center gap-3">
              <Info className="text-amber-500" /> Callao, Lima, Perú
            </div>
          </div>
        </div>
      </footer>

      {galleryItem && (
        <div className="ps-modal-overlay" onClick={() => setGalleryItem(null)}>
          <img src={galleryItem} alt="Vista previa" className="ps-modal-img" />
        </div>
      )}
    </div>
  )
}
