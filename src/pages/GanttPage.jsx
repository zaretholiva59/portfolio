import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  loadTasks,
  saveTasks,
  parseISODate,
  getViewRange,
  eachDayInRange,
} from './ganttUtils'
import './GanttPage.css'

const CELL = 28

function normalizeStatus(s) {
  if (s === 'in-progress') return 'in_progress'
  return s
}

function statusLabel(s) {
  if (s === 'done') return 'Hecho'
  if (s === 'in_progress') return 'En curso'
  return 'Por hacer'
}

function priorityLabel(p) {
  if (p === 'alta') return 'Alta'
  if (p === 'media') return 'Media'
  return 'Baja'
}

function formatDM(d) {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}`
}

function dayIndexFromRange(date, rangeStart) {
  const a = new Date(date)
  const b = new Date(rangeStart)
  a.setHours(0, 0, 0, 0)
  b.setHours(0, 0, 0, 0)
  return Math.round((a - b) / 86400000)
}

function statusBadgeClass(status) {
  const s = normalizeStatus(status)
  if (s === 'done') return 'done'
  if (s === 'in_progress') return 'progress'
  return 'todo'
}

export default function GanttPage() {
  const [tasks, setTasks] = useState(() => loadTasks())
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [search, setSearch] = useState('')
  const [barsReady, setBarsReady] = useState(false)
  const [modal, setModal] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [formError, setFormError] = useState('')
  const [tooltip, setTooltip] = useState(null)

  const { rangeStart, rangeEnd } = useMemo(() => getViewRange(), [])
  const days = useMemo(
    () => eachDayInRange(rangeStart, rangeEnd),
    [rangeStart, rangeEnd]
  )
  const totalDays = days.length
  const timelineWidth = totalDays * CELL

  useEffect(() => {
    const id = requestAnimationFrame(() => setBarsReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tasks
      .map((t) => ({ ...t, status: normalizeStatus(t.status) }))
      .filter((t) => {
        if (statusFilter && t.status !== statusFilter) return false
        if (priorityFilter && t.priority !== priorityFilter) return false
        if (q && !t.name.toLowerCase().includes(q)) return false
        return true
      })
  }, [tasks, statusFilter, priorityFilter, search])

  const todayIdx = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (today < rangeStart || today > rangeEnd) return null
    return dayIndexFromRange(today, rangeStart)
  }, [rangeStart, rangeEnd])

  const getBarMetrics = useCallback(
    (task) => {
      const ts = parseISODate(task.start)
      const te = parseISODate(task.end)
      ts.setHours(0, 0, 0, 0)
      te.setHours(0, 0, 0, 0)
      const vs = ts > rangeStart ? ts : new Date(rangeStart)
      const ve = te < rangeEnd ? te : new Date(rangeEnd)
      if (vs > ve) return null
      const i0 = dayIndexFromRange(vs, rangeStart)
      const i1 = dayIndexFromRange(ve, rangeStart)
      const leftPx = i0 * CELL
      const widthPx = (i1 - i0 + 1) * CELL
      const leftPct = (leftPx / timelineWidth) * 100
      const widthPct = (widthPx / timelineWidth) * 100
      return { leftPct, widthPct }
    },
    [rangeStart, rangeEnd, timelineWidth]
  )

  const openNew = () => {
    setFormError('')
    setModal({
      mode: 'create',
      id: null,
      name: '',
      desc: '',
      priority: 'media',
      status: 'todo',
      start: '',
      end: '',
    })
  }

  const openEdit = (task) => {
    setFormError('')
    setModal({
      mode: 'edit',
      id: task.id,
      name: task.name,
      desc: task.desc || '',
      priority: task.priority,
      status: normalizeStatus(task.status),
      start: task.start,
      end: task.end,
    })
  }

  const closeModal = () => {
    setModal(null)
    setFormError('')
  }

  const submitModal = () => {
    if (!modal) return
    const name = modal.name.trim()
    if (!name) {
      setFormError('El nombre es obligatorio.')
      return
    }
    if (!modal.start || !modal.end) {
      setFormError('Indica fecha de inicio y fin.')
      return
    }
    const ds = parseISODate(modal.start)
    const de = parseISODate(modal.end)
    if (de <= ds) {
      setFormError('La fecha fin debe ser posterior a la fecha inicio.')
      return
    }
    setFormError('')
    if (modal.mode === 'create') {
      const nid = Math.max(0, ...tasks.map((t) => t.id)) + 1
      setTasks((prev) => [
        ...prev,
        {
          id: nid,
          name,
          desc: modal.desc.trim(),
          priority: modal.priority,
          status: modal.status,
          start: modal.start,
          end: modal.end,
        },
      ])
    } else {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === modal.id
            ? {
                ...t,
                name,
                desc: modal.desc.trim(),
                priority: modal.priority,
                status: modal.status,
                start: modal.start,
                end: modal.end,
              }
            : t
        )
      )
    }
    closeModal()
  }

  const confirmDelete = () => {
    if (deleteId == null) return
    setTasks((prev) => prev.filter((t) => t.id !== deleteId))
    setDeleteId(null)
  }

  return (
    <div className="gantt-page relative z-10">
      <div className="gantt-page__inner">
        <header className="gantt-header">
          <div className="flex flex-wrap items-start gap-4">
            <Link to="/projects" className="gantt-back">
              ← Volver a proyectos
            </Link>
            <div className="gantt-title-block">
              <h1 className="gantt-title">Gestión de proyectos</h1>
              <p className="gantt-sub">Diagrama de Gantt · equipos técnicos</p>
            </div>
          </div>
          <button type="button" className="gantt-btn-new" onClick={openNew}>
            + Nueva tarea
          </button>
        </header>

        <p className="gantt-desc">
          Sistema de gestión de proyectos con visualización dinámica de tiempos, hitos
          y dependencias. Optimizado para la toma de decisiones en equipos técnicos.
        </p>

        <div className="gantt-filters">
          <div className="gantt-filter-group">
            <span className="gantt-filter-label">Estado</span>
            {[
              ['', 'Todos'],
              ['todo', 'Por hacer'],
              ['in_progress', 'En curso'],
              ['done', 'Hecho'],
            ].map(([val, lab]) => (
              <button
                key={lab}
                type="button"
                className={`gantt-toggle ${statusFilter === val ? 'gantt-toggle--active' : ''}`}
                onClick={() => setStatusFilter(val)}
              >
                {lab}
              </button>
            ))}
          </div>
          <div className="gantt-filter-group">
            <span className="gantt-filter-label">Prioridad</span>
            {[
              ['', 'Todas'],
              ['alta', 'Alta'],
              ['media', 'Media'],
              ['baja', 'Baja'],
            ].map(([val, lab]) => (
              <button
                key={lab}
                type="button"
                className={`gantt-toggle ${priorityFilter === val ? 'gantt-toggle--active' : ''}`}
                onClick={() => setPriorityFilter(val)}
              >
                {lab}
              </button>
            ))}
          </div>
          <input
            type="search"
            className="gantt-search"
            placeholder="Buscar por nombre de tarea…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar tarea"
          />
        </div>

        <div className="gantt-table-wrap">
          <div className="gantt-sticky-col">
            <div className="gantt-sticky-header">Tarea</div>
            {filtered.length === 0 && (
              <div className="gantt-row-left gantt-row-left--odd">
                <p className="gantt-row-name text-sm text-[#78716c]">
                  Sin resultados
                </p>
              </div>
            )}
            {filtered.map((task, i) => (
              <div
                key={task.id}
                className={`gantt-row-left ${i % 2 === 0 ? 'gantt-row-left--even' : 'gantt-row-left--odd'}`}
              >
                <div className="gantt-row-info">
                  <p className="gantt-row-name">{task.name}</p>
                  <div className="gantt-badges">
                    <span
                      className={`gantt-badge gantt-badge--p-${task.priority}`}
                    >
                      {priorityLabel(task.priority)}
                    </span>
                    <span
                      className={`gantt-badge gantt-badge--s-${statusBadgeClass(task.status)}`}
                    >
                      {statusLabel(normalizeStatus(task.status))}
                    </span>
                  </div>
                </div>
                <div className="gantt-row-actions">
                  <button
                    type="button"
                    className="gantt-icon-btn"
                    aria-label="Editar"
                    onClick={() => openEdit(task)}
                  >
                    <i className="fa-solid fa-pen" />
                  </button>
                  <button
                    type="button"
                    className="gantt-icon-btn"
                    aria-label="Eliminar"
                    onClick={() => setDeleteId(task.id)}
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="gantt-scroll">
            <div
              className="gantt-timeline"
              style={{
                width: timelineWidth,
                minWidth: '100%',
                ['--cell']: `${CELL}px`,
                ['--timeline-min']: `${timelineWidth}px`,
              }}
            >
              <div className="gantt-date-header">
                {days.map((d) => {
                  const w = d.getDay()
                  const weekend = w === 0 || w === 6
                  return (
                    <div
                      key={d.toISOString()}
                      className={`gantt-date-cell ${weekend ? 'gantt-date-cell--weekend' : ''}`}
                      style={{ width: CELL }}
                    >
                      {formatDM(d)}
                    </div>
                  )
                })}
              </div>

              <div
                className="relative"
                style={{
                  minHeight:
                    filtered.length === 0 ? 120 : filtered.length * 56,
                }}
              >
                {todayIdx != null && filtered.length > 0 && (
                  <>
                    <div
                      className="gantt-today-line"
                      style={{
                        left: todayIdx * CELL + CELL / 2 - 1,
                        top: 0,
                        height: filtered.length * 56,
                      }}
                    />
                    <div
                      className="gantt-today-label"
                      style={{
                        left: todayIdx * CELL + CELL / 2,
                        top: 4,
                      }}
                    >
                      HOY
                    </div>
                  </>
                )}

                {filtered.length === 0 ? (
                  <div className="flex min-h-[120px] items-center justify-center px-4">
                    <p className="font-mono-label text-sm text-[#78716c]">
                      Sin tareas que coincidan con los filtros.
                    </p>
                  </div>
                ) : (
                  filtered.map((task, i) => {
                  const m = getBarMetrics(task)
                  const barClass =
                    task.priority === 'alta'
                      ? 'gantt-bar--alta'
                      : task.priority === 'media'
                        ? 'gantt-bar--media'
                        : 'gantt-bar--baja'
                  return (
                    <div
                      key={task.id}
                      className={`gantt-row-track ${i % 2 === 0 ? 'gantt-track-row--even' : 'gantt-track-row--odd'}`}
                    >
                      <div className="gantt-track-bg">
                        {days.map((d, di) => (
                          <div
                            key={di}
                            className={`gantt-track-cell ${di % 2 === 0 ? 'gantt-track-cell--even' : ''}`}
                            style={{ width: CELL }}
                          />
                        ))}
                      </div>
                      {m && (
                        <div
                          className="gantt-bar-wrap"
                          style={{
                            left: `${m.leftPct}%`,
                            width: `${m.widthPct}%`,
                          }}
                          onMouseEnter={(e) => {
                            setTooltip({
                              x: e.clientX,
                              y: e.clientY,
                              task,
                            })
                          }}
                          onMouseMove={(e) => {
                            setTooltip((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    x: e.clientX,
                                    y: e.clientY,
                                  }
                                : null
                            )
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        >
                          <div
                            className={`gantt-bar-inner ${barClass} ${barsReady ? 'gantt-bar-inner--visible' : ''}`}
                          />
                        </div>
                      )}
                    </div>
                  )
                })
                )}
              </div>
            </div>
          </div>
        </div>

        {tooltip && (
          <div
            className="gantt-tooltip"
            style={{
              left: Math.min(tooltip.x + 12, typeof window !== 'undefined' ? window.innerWidth - 300 : 0),
              top: tooltip.y + 12,
            }}
          >
            <strong>{tooltip.task.name}</strong>
            {formatDM(parseISODate(tooltip.task.start))} →{' '}
            {formatDM(parseISODate(tooltip.task.end))}
            <br />
            Estado: {statusLabel(normalizeStatus(tooltip.task.status))}
            <br />
            Prioridad: {priorityLabel(tooltip.task.priority)}
          </div>
        )}
      </div>

      {modal && (
        <div
          className="gantt-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gantt-modal-title"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="gantt-modal">
            <h3 id="gantt-modal-title">
              {modal.mode === 'create' ? 'Nueva tarea' : 'Editar tarea'}
            </h3>
            <div className="gantt-field">
              <label htmlFor="gantt-name">Nombre de tarea</label>
              <input
                id="gantt-name"
                value={modal.name}
                onChange={(e) =>
                  setModal((m) => ({ ...m, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="gantt-field">
              <label htmlFor="gantt-desc">Descripción</label>
              <textarea
                id="gantt-desc"
                value={modal.desc}
                onChange={(e) =>
                  setModal((m) => ({ ...m, desc: e.target.value }))
                }
              />
            </div>
            <div className="gantt-field">
              <label htmlFor="gantt-p">Prioridad</label>
              <select
                id="gantt-p"
                value={modal.priority}
                onChange={(e) =>
                  setModal((m) => ({ ...m, priority: e.target.value }))
                }
              >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
            <div className="gantt-field">
              <label htmlFor="gantt-s">Estado</label>
              <select
                id="gantt-s"
                value={modal.status}
                onChange={(e) =>
                  setModal((m) => ({ ...m, status: e.target.value }))
                }
              >
                <option value="todo">Por hacer</option>
                <option value="in_progress">En curso</option>
                <option value="done">Hecho</option>
              </select>
            </div>
            <div className="gantt-field">
              <label htmlFor="gantt-start">Fecha inicio</label>
              <input
                id="gantt-start"
                type="date"
                value={modal.start}
                onChange={(e) =>
                  setModal((m) => ({ ...m, start: e.target.value }))
                }
              />
            </div>
            <div className="gantt-field">
              <label htmlFor="gantt-end">Fecha fin</label>
              <input
                id="gantt-end"
                type="date"
                value={modal.end}
                onChange={(e) =>
                  setModal((m) => ({ ...m, end: e.target.value }))
                }
              />
            </div>
            {formError && <p className="gantt-field-error">{formError}</p>}
            <div className="gantt-modal-actions">
              <button
                type="button"
                className="gantt-btn-outline"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="gantt-btn-primary"
                onClick={submitModal}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId != null && (
        <div
          className="gantt-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gantt-del-title"
          onClick={(e) => e.target === e.currentTarget && setDeleteId(null)}
        >
          <div className="gantt-modal gantt-modal--small">
            <h3 id="gantt-del-title">¿Eliminar esta tarea?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="gantt-modal-actions">
              <button
                type="button"
                className="gantt-btn-outline"
                onClick={() => setDeleteId(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="gantt-btn-primary"
                onClick={confirmDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
