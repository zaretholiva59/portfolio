import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CATEGORY_LABELS,
  CATEGORY_LIST,
  loadProducts,
  saveProducts,
  loadCart,
  saveCart,
  getDefaultProducts,
} from './ecommerceData'
import './EcommercePage.css'

const VIEWS = {
  catalog: 'Catálogo',
  admin: 'Administrar',
  cart: 'Carrito',
  checkout: 'Pago',
}

function cartCount(cart) {
  return Object.values(cart).reduce((a, b) => a + b, 0)
}

function cartTotal(cart, products) {
  let t = 0
  products.forEach((p) => {
    const q = cart[p.id] || 0
    t += q * p.price
  })
  return Math.round(t * 100) / 100
}

export default function EcommercePage() {
  const [products, setProducts] = useState(loadProducts)
  const [cart, setCart] = useState(loadCart)
  const [view, setView] = useState('catalog')
  const [filterCat, setFilterCat] = useState('todas')
  const [adminModal, setAdminModal] = useState(null)
  const [deleteProductId, setDeleteProductId] = useState(null)
  const [checkoutOk, setCheckoutOk] = useState(false)
  const [checkoutForm, setCheckoutForm] = useState({
    nombre: '',
    email: '',
    direccion: '',
    tarjeta: '',
    exp: '',
    cvv: '',
  })
  const [checkoutErrors, setCheckoutErrors] = useState({})

  useEffect(() => {
    saveProducts(products)
  }, [products])

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const filteredProducts = useMemo(() => {
    if (filterCat === 'todas') return products
    return products.filter((p) => p.category === filterCat)
  }, [products, filterCat])

  const addToCart = useCallback((id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }))
  }, [])

  const setQty = useCallback((id, q) => {
    setCart((c) => {
      const next = { ...c }
      if (q <= 0) delete next[id]
      else next[id] = q
      return next
    })
  }, [])

  const openAdminCreate = () => {
    setAdminModal({
      mode: 'create',
      id: null,
      name: '',
      category: 'verduras',
      price: '',
      image: '',
      description: '',
    })
  }

  const openAdminEdit = (p) => {
    setAdminModal({
      mode: 'edit',
      id: p.id,
      name: p.name,
      category: p.category,
      price: String(p.price),
      image: p.image,
      description: p.description || '',
    })
  }

  const submitAdmin = () => {
    if (!adminModal) return
    const name = adminModal.name.trim()
    const price = parseFloat(adminModal.price)
    const image = adminModal.image.trim() || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80'
    if (!name || Number.isNaN(price) || price < 0) return
    if (adminModal.mode === 'create') {
      const id = `p-${Date.now()}`
      setProducts((prev) => [
        ...prev,
        {
          id,
          name,
          category: adminModal.category,
          price,
          image,
          description: adminModal.description.trim(),
        },
      ])
    } else {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === adminModal.id
            ? {
                ...p,
                name,
                category: adminModal.category,
                price,
                image,
                description: adminModal.description.trim(),
              }
            : p
        )
      )
    }
    setAdminModal(null)
  }

  const confirmDeleteProduct = () => {
    if (!deleteProductId) return
    setProducts((prev) => prev.filter((p) => p.id !== deleteProductId))
    setCart((c) => {
      const next = { ...c }
      delete next[deleteProductId]
      return next
    })
    setDeleteProductId(null)
  }

  const resetDemo = () => {
    const fresh = getDefaultProducts()
    setProducts(fresh)
    saveProducts(fresh)
    setCart({})
    saveCart({})
  }

  const validateCheckout = () => {
    const e = {}
    if (!checkoutForm.nombre.trim()) e.nombre = 'Obligatorio'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutForm.email.trim()))
      e.email = 'Email no válido'
    if (!checkoutForm.direccion.trim()) e.direccion = 'Obligatorio'
    const digits = checkoutForm.tarjeta.replace(/\s/g, '')
    if (!/^\d{13,19}$/.test(digits)) e.tarjeta = 'Número de tarjeta inválido'
    if (!/^\d{2}\/\d{2}$/.test(checkoutForm.exp.trim()))
      e.exp = 'Use MM/AA'
    if (!/^\d{3,4}$/.test(checkoutForm.cvv.trim())) e.cvv = 'CVV inválido'
    setCheckoutErrors(e)
    return Object.keys(e).length === 0
  }

  const submitCheckout = (ev) => {
    ev.preventDefault()
    if (!validateCheckout()) return
    setCheckoutOk(true)
    setCart({})
    saveCart({})
  }

  const cnt = cartCount(cart)

  if (checkoutOk) {
    return (
      <div className="ec-root">
        <div className="ec-inner">
          <Link to="/projects" className="ec-back">
            ← Volver a proyectos
          </Link>
          <div className="ec-success mt-8">
            <h2>¡Pago confirmado!</h2>
            <p style={{ color: '#57534e', marginBottom: '1.5rem' }}>
              Gracias por tu compra. Recibirás un correo de confirmación en{' '}
              <strong>{checkoutForm.email}</strong> (simulado).
            </p>
            <button type="button" className="ec-btn" onClick={() => { setCheckoutOk(false); setView('catalog'); setCheckoutForm({ nombre: '', email: '', direccion: '', tarjeta: '', exp: '', cvv: '' }) }}>
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ec-root">
      <div className="ec-inner">
        <div className="ec-top">
          <div>
            <Link to="/projects" className="ec-back">
              ← Volver a proyectos
            </Link>
            <h1 className="ec-brand mt-2">
              agora<span>.</span> fresh
            </h1>
            <p style={{ fontSize: '0.85rem', color: '#78716c', marginTop: '0.25rem' }}>
              E-commerce full stack simulado · catálogo, carrito y pago
            </p>
          </div>
          <nav className="ec-tabs" aria-label="Secciones de la tienda">
            {Object.entries(VIEWS).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`ec-tab ${view === key ? 'ec-tab--active' : ''}`}
                onClick={() => setView(key)}
              >
                {label}
                {key === 'cart' && cnt > 0 && (
                  <span className="ec-tab-badge">{cnt}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {view === 'catalog' && (
          <>
            <div className="ec-filters">
              <button
                type="button"
                className={`ec-chip ${filterCat === 'todas' ? 'ec-chip--on' : ''}`}
                onClick={() => setFilterCat('todas')}
              >
                {CATEGORY_LABELS.todas}
              </button>
              {CATEGORY_LIST.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`ec-chip ${filterCat === c ? 'ec-chip--on' : ''}`}
                  onClick={() => setFilterCat(c)}
                >
                  {CATEGORY_LABELS[c]}
                </button>
              ))}
            </div>
            <div className="ec-grid">
              {filteredProducts.map((p) => (
                <article key={p.id} className="ec-card">
                  <img className="ec-card-img" src={p.image} alt="" loading="lazy" />
                  <div className="ec-card-body">
                    <h3 className="ec-card-title">{p.name}</h3>
                    <p className="ec-card-cat">{CATEGORY_LABELS[p.category]}</p>
                    <p className="ec-card-price">
                      {p.price.toFixed(2)} €
                    </p>
                    <button
                      type="button"
                      className="ec-btn"
                      onClick={() => addToCart(p.id)}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {view === 'admin' && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <button type="button" className="ec-btn" style={{ width: 'auto' }} onClick={openAdminCreate}>
                + Nuevo producto
              </button>
              <button type="button" className="ec-btn ec-btn-outline" style={{ width: 'auto' }} onClick={resetDemo}>
                Restaurar datos demo
              </button>
            </div>
            {products.map((p) => (
              <div key={p.id} className="ec-admin-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src={p.image} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} />
                  <div>
                    <strong>{p.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#78716c' }}>
                      {CATEGORY_LABELS[p.category]} · {p.price.toFixed(2)} €
                    </div>
                  </div>
                </div>
                <div className="ec-admin-actions">
                  <button type="button" className="ec-icon-btn" onClick={() => openAdminEdit(p)}>
                    Editar
                  </button>
                  <button
                    type="button"
                    className="ec-icon-btn ec-icon-btn--danger"
                    onClick={() => setDeleteProductId(p.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {view === 'cart' && (
          <div>
            {cnt === 0 ? (
              <p style={{ color: '#78716c' }}>Tu carrito está vacío.</p>
            ) : (
              <>
                {products
                  .filter((p) => cart[p.id])
                  .map((p) => (
                    <div key={p.id} className="ec-cart-line">
                      <img src={p.image} alt="" />
                      <div style={{ flex: 1 }}>
                        <strong>{p.name}</strong>
                        <div style={{ fontSize: '0.85rem', color: '#78716c' }}>
                          {p.price.toFixed(2)} € / u.
                        </div>
                      </div>
                      <div className="ec-qty">
                        <button type="button" onClick={() => setQty(p.id, (cart[p.id] || 0) - 1)}>
                          −
                        </button>
                        <span>{cart[p.id]}</span>
                        <button type="button" onClick={() => setQty(p.id, (cart[p.id] || 0) + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                <p className="ec-total">
                  Total: {cartTotal(cart, products).toFixed(2)} €
                </p>
                <button type="button" className="ec-btn" onClick={() => setView('checkout')}>
                  Ir a pago
                </button>
              </>
            )}
          </div>
        )}

        {view === 'checkout' && (
          <form onSubmit={submitCheckout} style={{ maxWidth: 480 }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Datos de envío y pago</h2>
            <div className="ec-field">
              <label htmlFor="co-nombre">Nombre completo</label>
              <input
                id="co-nombre"
                value={checkoutForm.nombre}
                onChange={(e) => setCheckoutForm((f) => ({ ...f, nombre: e.target.value }))}
              />
              {checkoutErrors.nombre && <div className="ec-error">{checkoutErrors.nombre}</div>}
            </div>
            <div className="ec-field">
              <label htmlFor="co-email">Correo electrónico</label>
              <input
                id="co-email"
                type="email"
                value={checkoutForm.email}
                onChange={(e) => setCheckoutForm((f) => ({ ...f, email: e.target.value }))}
              />
              {checkoutErrors.email && <div className="ec-error">{checkoutErrors.email}</div>}
            </div>
            <div className="ec-field">
              <label htmlFor="co-dir">Dirección</label>
              <input
                id="co-dir"
                value={checkoutForm.direccion}
                onChange={(e) => setCheckoutForm((f) => ({ ...f, direccion: e.target.value }))}
              />
              {checkoutErrors.direccion && <div className="ec-error">{checkoutErrors.direccion}</div>}
            </div>
            <div className="ec-field">
              <label htmlFor="co-card">Tarjeta (simulada)</label>
              <input
                id="co-card"
                placeholder="13–19 dígitos"
                value={checkoutForm.tarjeta}
                onChange={(e) => setCheckoutForm((f) => ({ ...f, tarjeta: e.target.value }))}
              />
              {checkoutErrors.tarjeta && <div className="ec-error">{checkoutErrors.tarjeta}</div>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="ec-field">
                <label htmlFor="co-exp">Caducidad MM/AA</label>
                <input
                  id="co-exp"
                  placeholder="12/28"
                  value={checkoutForm.exp}
                  onChange={(e) => setCheckoutForm((f) => ({ ...f, exp: e.target.value }))}
                />
                {checkoutErrors.exp && <div className="ec-error">{checkoutErrors.exp}</div>}
              </div>
              <div className="ec-field">
                <label htmlFor="co-cvv">CVV</label>
                <input
                  id="co-cvv"
                  value={checkoutForm.cvv}
                  onChange={(e) => setCheckoutForm((f) => ({ ...f, cvv: e.target.value }))}
                />
                {checkoutErrors.cvv && <div className="ec-error">{checkoutErrors.cvv}</div>}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="ec-btn ec-btn-outline" style={{ width: 'auto' }} onClick={() => setView('cart')}>
                Atrás
              </button>
              <button type="submit" className="ec-btn" style={{ flex: 1 }}>
                Confirmar pedido
              </button>
            </div>
          </form>
        )}

        {adminModal && (
          <div className="ec-modal-bg" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setAdminModal(null)}>
            <div className="ec-modal">
              <h3 style={{ marginTop: 0 }}>
                {adminModal.mode === 'create' ? 'Nuevo producto' : 'Editar producto'}
              </h3>
              <div className="ec-field">
                <label>Nombre</label>
                <input value={adminModal.name} onChange={(e) => setAdminModal((m) => ({ ...m, name: e.target.value }))} />
              </div>
              <div className="ec-field">
                <label>Categoría</label>
                <select value={adminModal.category} onChange={(e) => setAdminModal((m) => ({ ...m, category: e.target.value }))}>
                  {CATEGORY_LIST.map((c) => (
                    <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                  ))}
                </select>
              </div>
              <div className="ec-field">
                <label>Precio (€)</label>
                <input type="number" step="0.01" min="0" value={adminModal.price} onChange={(e) => setAdminModal((m) => ({ ...m, price: e.target.value }))} />
              </div>
              <div className="ec-field">
                <label>URL imagen</label>
                <input value={adminModal.image} onChange={(e) => setAdminModal((m) => ({ ...m, image: e.target.value }))} placeholder="Unsplash u otra URL" />
              </div>
              <div className="ec-field">
                <label>Descripción</label>
                <textarea value={adminModal.description} onChange={(e) => setAdminModal((m) => ({ ...m, description: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="ec-btn ec-btn-outline" style={{ width: 'auto' }} onClick={() => setAdminModal(null)}>Cancelar</button>
                <button type="button" className="ec-btn" style={{ width: 'auto' }} onClick={submitAdmin}>Guardar</button>
              </div>
            </div>
          </div>
        )}

        {deleteProductId && (
          <div className="ec-modal-bg" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setDeleteProductId(null)}>
            <div className="ec-modal">
              <h3 style={{ marginTop: 0 }}>¿Eliminar producto?</h3>
              <p style={{ color: '#57534e' }}>Esta acción no se puede deshacer.</p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="ec-btn ec-btn-outline" style={{ width: 'auto' }} onClick={() => setDeleteProductId(null)}>Cancelar</button>
                <button type="button" className="ec-btn" style={{ width: 'auto' }} onClick={confirmDeleteProduct}>Eliminar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
