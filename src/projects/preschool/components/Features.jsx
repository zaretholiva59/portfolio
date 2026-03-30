const features = [
  { title: 'Aprendizaje Activo', color: 'orange' },
  { title: 'Cuidado Infantil', color: 'blue' },
  { title: 'Comidas Saludables', color: 'green' },
  { title: 'Entorno Seguro', color: 'red' },
]

export default function Features() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-purple-800">Inscribe a tu hijo en una sesión ahora</h2>
        <div className="mt-12 grid md:grid-cols-4 gap-8">
          {features.map(feature => (
            <div key={feature.title} className={`bg-${feature.color}-100 p-8 rounded-lg`}>
              <h3 className={`text-2xl font-bold text-${feature.color}-800`}>{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
