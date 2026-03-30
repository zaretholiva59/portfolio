import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  Plus, Search, LayoutGrid, Calendar, Trash2, Edit2, 
  ChevronRight, BarChart3, CheckCircle2, Clock, AlertCircle 
} from 'lucide-react'
import { loadTasks, saveTasks, parseISODate, getViewRange, eachDayInRange, toISODate } from './ganttUtils'
import './App.css'

const CELL_SIZE = 28
const ROW_HEIGHT = 60

export default function App() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [view, setView] = useState('gantt') // 'gantt' or 'kanban'
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [modal, setModal] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      done: tasks.filter(t => t.status === 'done').length,
      progress: tasks.filter(t => t.status === 'in_progress').length,
      todo: tasks.filter(t => t.status === 'todo').length
    }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || t.status === statusFilter
      const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, search, statusFilter, priorityFilter])

  const handleAddTask = (columnStatus = 'todo') => {
    const newTask = {
      id: Date.now(),
      name: '',
      desc: '',
      status: columnStatus,
      priority: 'media',
      start: toISODate(new Date()),
      end: toISODate(new Date(Date.now() + 86400000 * 3))
    }
    setModal({ mode: 'create', task: newTask })
  }

  const handleEditTask = (task) => {
    setModal({ mode: 'edit', task: { ...task } })
  }

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    setDeleteConfirm(null)
  }

  const handleSaveTask = () => {
    if (!modal.task.name.trim()) return
    if (modal.mode === 'create') {
      setTasks(prev => [...prev, modal.task])
    } else {
      setTasks(prev => prev.map(t => t.id === modal.task.id ? modal.task : t))
    }
    setModal(null)
  }

  return (
    <div className="gantt-app">
      <div className="gantt-container">
        <header className="gantt-header">
          <div className="gantt-title">
            <h1>Gantt Manager</h1>
            <p>Planificación y Gestión de Tareas</p>
          </div>
          <div className="flex gap-4">
            <div className="view-toggle flex bg-white rounded-lg p-1 border border-stone-200">
              <button 
                onClick={() => setView('gantt')}
                className={`p-2 rounded-md transition ${view === 'gantt' ? 'bg-amber-100 text-amber-700' : 'text-stone-500'}`}
              >
                <Calendar size={20} />
              </button>
              <button 
                onClick={() => setView('kanban')}
                className={`p-2 rounded-md transition ${view === 'kanban' ? 'bg-amber-100 text-amber-700' : 'text-stone-500'}`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>
            <button className="gantt-btn-new" onClick={() => handleAddTask()}>
              <Plus size={20} /> Nueva Tarea
            </button>
          </div>
        </header>

        <section className="gantt-stats">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-card">
            <span className="stat-value text-green-600">{stats.done}</span>
            <span className="stat-label">Hechas</span>
          </div>
          <div className="stat-card">
            <span className="stat-value text-amber-600">{stats.progress}</span>
            <span className="stat-label">En curso</span>
          </div>
          <div className="stat-card">
            <span className="stat-value text-stone-600">{stats.todo}</span>
            <span className="stat-label">Pendientes</span>
          </div>
        </section>

        <div className="gantt-controls">
          <div className="search-wrap">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar tareas..." 
              className="gantt-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <button 
              className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >Todos</button>
            <button 
              className={`filter-btn ${statusFilter === 'todo' ? 'active' : ''}`}
              onClick={() => setStatusFilter('todo')}
            >Por hacer</button>
            <button 
              className={`filter-btn ${statusFilter === 'in_progress' ? 'active' : ''}`}
              onClick={() => setStatusFilter('in_progress')}
            >En curso</button>
            <button 
              className={`filter-btn ${statusFilter === 'done' ? 'active' : ''}`}
              onClick={() => setStatusFilter('done')}
            >Hecho</button>
          </div>
        </div>

        {view === 'gantt' ? (
          <GanttView tasks={filteredTasks} onEdit={handleEditTask} onDelete={setDeleteConfirm} />
        ) : (
          <KanbanView tasks={filteredTasks} onEdit={handleEditTask} onDelete={setDeleteConfirm} onAdd={handleAddTask} />
        )}
      </div>

      {modal && (
        <TaskModal 
          modal={modal} 
          setModal={setModal} 
          onSave={handleSaveTask} 
        />
      )}

      {deleteConfirm && (
        <DeleteModal 
          onConfirm={() => handleDeleteTask(deleteConfirm)} 
          onCancel={() => setDeleteConfirm(null)} 
        />
      )}
    </div>
  )
}

function GanttView({ tasks, onEdit, onDelete }) {
  const { rangeStart, rangeEnd } = useMemo(() => getViewRange(), [])
  const days = useMemo(() => eachDayInRange(rangeStart, rangeEnd), [rangeStart, rangeEnd])
  const timelineWidth = days.length * CELL_SIZE

  const todayIdx = useMemo(() => {
    const today = new Date()
    today.setHours(0,0,0,0)
    if (today < rangeStart || today > rangeEnd) return null
    const diff = Math.round((today - rangeStart) / 86400000)
    return diff
  }, [rangeStart, rangeEnd])

  const getBarMetrics = (start, end) => {
    const s = parseISODate(start)
    const e = parseISODate(end)
    const vs = s > rangeStart ? s : rangeStart
    const ve = e < rangeEnd ? e : rangeEnd
    if (vs > ve) return null
    
    const left = Math.round((vs - rangeStart) / 86400000) * CELL_SIZE
    const width = (Math.round((ve - vs) / 86400000) + 1) * CELL_SIZE
    return { left, width }
  }

  return (
    <div className="gantt-wrapper">
      <div className="gantt-sidebar">
        <div className="sidebar-header">Tarea</div>
        {tasks.map(task => (
          <div key={task.id} className="task-row-info group">
            <div className="flex justify-between items-center">
              <p className="task-name">{task.name || 'Sin nombre'}</p>
              <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                <button onClick={() => onEdit(task)} className="p-1 text-stone-400 hover:text-amber-600"><Edit2 size={14}/></button>
                <button onClick={() => onDelete(task.id)} className="p-1 text-stone-400 hover:text-red-600"><Trash2 size={14}/></button>
              </div>
            </div>
            <div className="task-meta">
              <span className={`badge badge-${task.priority}`}>{task.priority}</span>
              <DueDateBadge date={task.end} status={task.status} />
            </div>
          </div>
        ))}
      </div>
      <div className="gantt-scroll-area">
        <div className="gantt-timeline" style={{ width: timelineWidth }}>
          <div className="timeline-header">
            {days.map(d => (
              <div key={d.toISOString()} className={`day-cell ${d.getDay() === 0 || d.getDay() === 6 ? 'weekend' : ''}`}>
                {d.getDate()}
              </div>
            ))}
          </div>
          {todayIdx !== null && (
            <div className="today-line" style={{ left: todayIdx * CELL_SIZE + CELL_SIZE/2 }} />
          )}
          {tasks.map((task, idx) => {
            const metrics = getBarMetrics(task.start, task.end)
            return (
              <div key={task.id} className="task-track">
                {metrics && (
                  <div 
                    className={`gantt-bar bg-gradient-to-r ${getBarGradient(task.priority)}`}
                    style={{ 
                      left: metrics.left, 
                      width: metrics.width,
                      animationDelay: `${idx * 0.05}s`
                    }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function KanbanView({ tasks, onEdit, onDelete, onAdd }) {
  const columns = [
    { id: 'todo', label: 'Por hacer', color: 'stone' },
    { id: 'in_progress', label: 'En curso', color: 'amber' },
    { id: 'done', label: 'Hecho', color: 'green' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(col => (
        <div key={col.id} className="kanban-col bg-stone-100 p-4 rounded-xl border border-stone-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-stone-700 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-${col.color}-500`}></span>
              {col.label}
              <span className="text-xs bg-stone-200 px-2 py-0.5 rounded-full text-stone-500">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </h3>
            <button 
              onClick={() => onAdd(col.id)}
              className="p-1 hover:bg-white rounded transition text-stone-400 hover:text-stone-600"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {tasks.filter(t => t.status === col.id).map(task => (
              <div key={task.id} className="kanban-card group bg-white p-3 rounded-lg border border-stone-200 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">{task.name || 'Sin nombre'}</h4>
                  <div className="opacity-0 group-hover:opacity-100 transition flex gap-1">
                    <button onClick={() => onEdit(task)} className="text-stone-400 hover:text-amber-600"><Edit2 size={12}/></button>
                    <button onClick={() => onDelete(task.id)} className="text-stone-400 hover:text-red-600"><Trash2 size={12}/></button>
                  </div>
                </div>
                <p className="text-xs text-stone-500 line-clamp-2 mb-3">{task.desc}</p>
                <div className="flex justify-between items-center">
                  <span className={`badge badge-${task.priority}`}>{task.priority}</span>
                  <DueDateBadge date={task.end} status={task.status} size="xs" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DueDateBadge({ date, status, size = 'sm' }) {
  const d = parseISODate(date)
  const isOverdue = d < new Date() && status !== 'done'
  const colorClass = isOverdue ? 'text-red-600' : 'text-green-600'
  const textSize = size === 'xs' ? 'text-[10px]' : 'text-xs'
  
  return (
    <span className={`${textSize} font-mono ${colorClass} flex items-center gap-1`}>
      <Clock size={size === 'xs' ? 10 : 12} />
      {date.split('-').slice(1).reverse().join('/')}
    </span>
  )
}

function TaskModal({ modal, setModal, onSave }) {
  const task = modal.task
  return (
    <div className="modal-overlay" onClick={() => setModal(null)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">{modal.mode === 'create' ? 'Nueva Tarea' : 'Editar Tarea'}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Nombre</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded-lg outline-none focus:border-amber-500"
              value={task.name}
              onChange={e => setModal({...modal, task: {...task, name: e.target.value}})}
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Descripción</label>
            <textarea 
              className="w-full p-2 border rounded-lg outline-none focus:border-amber-500 min-h-[80px]"
              value={task.desc}
              onChange={e => setModal({...modal, task: {...task, desc: e.target.value}})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Prioridad</label>
              <select 
                className="w-full p-2 border rounded-lg outline-none"
                value={task.priority}
                onChange={e => setModal({...modal, task: {...task, priority: e.target.value}})}
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Estado</label>
              <select 
                className="w-full p-2 border rounded-lg outline-none"
                value={task.status}
                onChange={e => setModal({...modal, task: {...task, status: e.target.value}})}
              >
                <option value="todo">Por hacer</option>
                <option value="in_progress">En curso</option>
                <option value="done">Hecho</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Inicio</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded-lg outline-none"
                value={task.start}
                onChange={e => setModal({...modal, task: {...task, start: e.target.value}})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-stone-500 mb-1">Fin</label>
              <input 
                type="date" 
                className="w-full p-2 border rounded-lg outline-none"
                value={task.end}
                onChange={e => setModal({...modal, task: {...task, end: e.target.value}})}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setModal(null)} className="px-4 py-2 text-stone-500 font-semibold">Cancelar</button>
          <button onClick={onSave} className="px-6 py-2 bg-amber-600 text-white rounded-lg font-bold shadow-lg shadow-amber-200">Guardar</button>
        </div>
      </div>
    </div>
  )
}

function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content max-w-[320px] text-center" onClick={e => e.stopPropagation()}>
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={24} />
        </div>
        <h2 className="text-lg font-bold mb-2">¿Eliminar tarea?</h2>
        <p className="text-stone-500 text-sm mb-6">Esta acción no se puede deshacer.</p>
        <div className="flex justify-center gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-stone-500 font-semibold">No, volver</button>
          <button onClick={onConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold shadow-lg shadow-red-200">Sí, eliminar</button>
        </div>
      </div>
    </div>
  )
}

function getBarGradient(p) {
  if (p === 'alta') return 'from-stone-800 to-stone-600'
  if (p === 'media') return 'from-amber-500 to-amber-600'
  return 'from-stone-300 to-stone-400'
}
