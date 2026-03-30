const teachers = [
  { name: 'Maestra 1', role: 'Educadora Principal' },
  { name: 'Maestra 2', role: 'Asistente de Aula' },
  { name: 'Maestro 3', role: 'Especialista en Arte' },
]

export default function Teachers() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-purple-800">Nuestros Maestros Profesionales</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {teachers.map(teacher => (
            <div key={teacher.name} className="bg-gray-100 p-8 rounded-lg">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold">{teacher.name}</h3>
              <p className="text-gray-600">{teacher.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
