import { useMemo, useState } from 'react'

const COLS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in_progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

const initialTasks = () => [
  {
    id: 't1',
    title: 'Definir requisitos',
    column: 'done',
    start: 0,
    duration: 2,
  },
  {
    id: 't2',
    title: 'Prototipo UI',
    column: 'in_progress',
    start: 2,
    duration: 4,
  },
  {
    id: 't3',
    title: 'API REST',
    column: 'in_progress',
    start: 4,
    duration: 3,
  },
  {
    id: 't4',
    title: 'Tests e2e',
    column: 'todo',
    start: 7,
    duration: 3,
  },
  {
    id: 't5',
    title: 'Deploy producción',
    column: 'todo',
    start: 10,
    duration: 2,
  },
]

const TOTAL_DAYS = 14

export default function TaskManager() {
  const [tasks, setTasks] = useState(() => initialTasks())
  const [view, setView] = useState('kanban')
  const [dragId, setDragId] = useState(null)

  const moveToColumn = (taskId, column) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column } : t))
    )
  }

  const onDragStart = (e, id) => {
    setDragId(id)
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const onDragEnd = () => setDragId(null)

  const onDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const onDropCol = (e, column) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain') || dragId
    if (id) moveToColumn(id, column)
    setDragId(null)
  }

  const tasksByCol = useMemo(() => {
    const m = { todo: [], in_progress: [], done: [] }
    tasks.forEach((t) => {
      if (m[t.column]) m[t.column].push(t)
    })
    return m
  }, [tasks])

  return (
    <div className="task-panel mt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-display text-2xl text-white">Task Manager</h3>
        <div className="flex gap-2 font-mono-label text-xs">
          <button
            type="button"
            className={`rounded-lg border px-4 py-2 transition interactive-glow ${
              view === 'kanban'
                ? 'border-[#c44fd8] bg-[#c44fd8] text-white'
                : 'border-[rgba(196,79,216,0.5)] text-[#d4b8e0]'
            }`}
            onClick={() => setView('kanban')}
          >
            Kanban
          </button>
          <button
            type="button"
            className={`rounded-lg border px-4 py-2 transition interactive-glow ${
              view === 'gantt'
                ? 'border-[#c44fd8] bg-[#c44fd8] text-white'
                : 'border-[rgba(196,79,216,0.5)] text-[#d4b8e0]'
            }`}
            onClick={() => setView('gantt')}
          >
            Gantt
          </button>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="grid gap-4 md:grid-cols-3">
          {COLS.map((col) => (
            <div
              key={col.id}
              className="kanban-column"
              onDragOver={onDragOver}
              onDrop={(e) => onDropCol(e, col.id)}
            >
              <h4 className="font-mono-label mb-3 text-sm text-[#c44fd8]">
                {col.title}
              </h4>
              {tasksByCol[col.id].map((t) => (
                <div
                  key={t.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, t.id)}
                  onDragEnd={onDragEnd}
                  className={`task-card interactive-glow ${
                    dragId === t.id ? 'opacity-70' : ''
                  }`}
                >
                  <p className="font-body text-sm text-white">{t.title}</p>
                  <p className="font-mono-label mt-1 text-[10px] text-[#d4b8e0]">
                    {t.id}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[720px] rounded-lg border border-[rgba(196,79,216,0.35)] p-4">
            <div className="mb-3 flex pl-44">
              {Array.from({ length: TOTAL_DAYS + 1 }, (_, d) => (
                <span
                  key={d}
                  className="font-mono-label flex-1 text-center text-[10px] text-[#d4b8e0]"
                >
                  D{d}
                </span>
              ))}
            </div>
            {tasks.map((t) => (
              <div
                key={t.id}
                className="mb-3 flex items-center gap-3"
              >
                <div className="w-40 shrink-0 font-mono-label text-xs leading-tight text-[#d4b8e0]">
                  {t.title}
                </div>
                <div className="relative h-9 flex-1 rounded-md bg-[rgba(196,79,216,0.08)]">
                  <div
                    className="gantt-bar"
                    style={{
                      left: `${(t.start / TOTAL_DAYS) * 100}%`,
                      width: `${Math.max((t.duration / TOTAL_DAYS) * 100, 4)}%`,
                    }}
                    title={`${t.title} (${t.duration}d)`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
