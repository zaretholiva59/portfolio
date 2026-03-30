export default function About() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-purple-800">Tu hijo tomará el liderazgo en su aprendizaje</h2>
            <p className="mt-4 text-gray-600">Nuestro objetivo es educar y desarrollar a los niños de todas las edades. Nuestro plan de estudios está cuidadosamente diseñado para educar a su hijo con placer.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-100 p-6 rounded-lg text-center">
              <p className="text-5xl font-bold text-orange-500">75</p>
              <p className="text-gray-600">Actividades al aire libre</p>
            </div>
            <div className="bg-blue-100 p-6 rounded-lg text-center">
              <p className="text-5xl font-bold text-blue-500">23</p>
              <p className="text-gray-600">Maestros cariñosos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
