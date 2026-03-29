export const STORAGE_KEY = 'gantt-tasks'

function pad(n) {
  return String(n).padStart(2, '0')
}

export function toISODate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function addDays(base, n) {
  const x = new Date(base)
  x.setDate(x.getDate() + n)
  return x
}

/** Fechas repartidas en mes actual + siguiente para que el Gantt muestre todas las barras */
export function getDefaultTasks() {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  const start0 = new Date(y, m, 1)

  const ranges = [
    [0, 4],
    [2, 5],
    [5, 11],
    [9, 17],
    [13, 19],
    [17, 23],
    [19, 29],
    [27, 34],
  ]

  const raw = [
    {
      id: 1,
      name: 'Diseño de wireframes',
      desc: 'Mockups en Figma',
      priority: 'alta',
      status: 'done',
    },
    {
      id: 2,
      name: 'Setup del proyecto',
      desc: 'Vite + React + Tailwind',
      priority: 'alta',
      status: 'done',
    },
    {
      id: 3,
      name: 'Componentes base',
      desc: 'Navbar, Footer, Layout',
      priority: 'media',
      status: 'done',
    },
    {
      id: 4,
      name: 'Página Home',
      desc: 'Hero section y animaciones',
      priority: 'media',
      status: 'in_progress',
    },
    {
      id: 5,
      name: 'Página Profile',
      desc: 'Tabla de datos y contacto',
      priority: 'media',
      status: 'in_progress',
    },
    {
      id: 6,
      name: 'Página About',
      desc: 'Skills y barras animadas',
      priority: 'baja',
      status: 'todo',
    },
    {
      id: 7,
      name: 'Task Manager Gantt',
      desc: 'Este mismo componente',
      priority: 'alta',
      status: 'in_progress',
    },
    {
      id: 8,
      name: 'Deploy y testing',
      desc: 'Vercel + QA final',
      priority: 'alta',
      status: 'todo',
    },
  ]

  return raw.map((t, i) => {
    const [a, b] = ranges[i]
    const s = addDays(start0, a)
    const e = addDays(start0, b)
    return {
      ...t,
      start: toISODate(s),
      end: toISODate(e),
    }
  })
}

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getDefaultTasks()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return getDefaultTasks()
    return parsed
  } catch {
    return getDefaultTasks()
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export function parseISODate(s) {
  const [y, mo, d] = s.split('-').map(Number)
  return new Date(y, mo - 1, d)
}

/** Primer día del mes actual y último día del mes siguiente */
export function getViewRange() {
  const now = new Date()
  const rangeStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const rangeEnd = new Date(now.getFullYear(), now.getMonth() + 2, 0)
  return { rangeStart, rangeEnd }
}

export function eachDayInRange(start, end) {
  const days = []
  const d = new Date(start)
  while (d <= end) {
    days.push(new Date(d))
    d.setDate(d.getDate() + 1)
  }
  return days
}

export function daysBetweenInclusive(a, b) {
  const ms = b.getTime() - a.getTime()
  return Math.round(ms / 86400000) + 1
}

export function clampDate(d, min, max) {
  if (d < min) return new Date(min)
  if (d > max) return new Date(max)
  return d
}
