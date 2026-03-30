import React, { useState, useEffect, useMemo } from 'react'
import { 
  ShoppingBag, Heart, Search, Settings, ArrowLeft, 
  Trash2, Plus, Minus, CreditCard, User, Truck, CheckCircle2 
} from 'lucide-react'
import { 
  loadProducts, saveProducts, loadCart, saveCart, 
  loadWishlist, saveWishlist, CATEGORY_LABELS, CATEGORY_LIST 
} from './ecommerceData'
import './App.css'

export default function App() {
  const [products, setProducts] = useState(() => loadProducts())
  const [cart, setCart] = useState(() => loadCart())
  const [wishlist, setWishlist] = useState(() => loadWishlist())
  const [view, setView] = useState('catalog') // catalog, cart, favorites, admin, checkout
  const [filterCat, setFilterCat] = useState('todas')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('name-az')
  const [loading, setLoading] = useState(true)
  const [cartBump, setCartBump] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => { saveProducts(products) }, [products])
  useEffect(() => { saveCart(cart) }, [cart])
  useEffect(() => { saveWishlist(wishlist) }, [wishlist])

  const filteredProducts = useMemo(() => {
    let list = products
    if (filterCat !== 'todas') list = list.filter(p => p.category === filterCat)
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    
    return [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      return a.name.localeCompare(b.name)
    })
  }, [products, filterCat, search, sort])

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }))
    setCartBump(true)
    setTimeout(() => setCartBump(false), 300)
    setFeedback(id)
    setTimeout(() => setFeedback(null), 1500)
  }

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartTotal = products.reduce((acc, p) => acc + (cart[p.id] || 0) * p.price, 0)

  return (
    <div className="ec-app">
      <div className="ec-container">
        <header className="flex justify-between items-center mb-8">
          <div className="ec-brand cursor-pointer" onClick={() => setView('catalog')}>
            agora<span>.</span>fresh
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-10 pr-4 py-2 border rounded-full text-sm outline-none focus:border-amber-500"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="p-2 text-stone-500 hover:text-amber-600" onClick={() => setView('admin')}><Settings size={22}/></button>
          </div>
        </header>

        <nav className="ec-tabs">
          <button className={`ec-tab ${view === 'catalog' ? 'active' : ''}`} onClick={() => setView('catalog')}>Tienda</button>
          <button className={`ec-tab ${view === 'favorites' ? 'active' : ''}`} onClick={() => setView('favorites')}>
            <Heart size={16} /> Favoritos
          </button>
          <button className={`ec-tab ${view === 'cart' ? 'active' : ''}`} onClick={() => setView('cart')}>
            <ShoppingBag size={16} /> Carrito 
            {cartCount > 0 && <span className={`cart-badge ${cartBump ? 'bump' : ''}`}>{cartCount}</span>}
          </button>
        </nav>

        {view === 'catalog' && (
          <CatalogView 
            loading={loading}
            products={filteredProducts} 
            filterCat={filterCat} 
            setFilterCat={setFilterCat}
            sort={sort}
            setSort={setSort}
            onAdd={addToCart}
            onWish={toggleWishlist}
            wishlist={wishlist}
            feedback={feedback}
          />
        )}

        {view === 'favorites' && (
          <FavoritesView 
            products={products.filter(p => wishlist.includes(p.id))} 
            onAdd={addToCart}
            onWish={toggleWishlist}
            wishlist={wishlist}
            feedback={feedback}
          />
        )}

        {view === 'cart' && (
          <CartView 
            products={products} 
            cart={cart} 
            setCart={setCart} 
            total={cartTotal}
            onCheckout={() => setView('checkout')}
          />
        )}

        {view === 'checkout' && (
          <CheckoutView total={cartTotal} onBack={() => setView('cart')} />
        )}
      </div>
    </div>
  )
}

function CatalogView({ loading, products, filterCat, setFilterCat, sort, setSort, onAdd, onWish, wishlist, feedback }) {
  if (loading) return (
    <div className="ec-grid">
      {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-card" />)}
    </div>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          {['todas', ...CATEGORY_LIST].map(cat => (
            <button 
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${filterCat === cat ? 'bg-amber-100 text-amber-700' : 'bg-white text-stone-500 border'}`}
              onClick={() => setFilterCat(cat)}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
        <select 
          className="p-2 border rounded-lg text-sm outline-none"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="name-az">Nombre A-Z</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
        </select>
      </div>

      <div className="ec-grid">
        {products.map((p, idx) => (
          <ProductCard 
            key={p.id} 
            p={p} 
            idx={idx} 
            onAdd={onAdd} 
            onWish={onWish} 
            isWish={wishlist.includes(p.id)}
            isAdded={feedback === p.id}
          />
        ))}
      </div>
    </div>
  )
}

function ProductCard({ p, idx, onAdd, onWish, isWish, isAdded }) {
  return (
    <article className="ec-card" style={{ animationDelay: `${idx * 0.05}s` }}>
      <div className="ec-card-img-wrap">
        <img src={p.image} alt={p.name} className="ec-card-img" />
        <button 
          className={`wishlist-btn ${isWish ? 'active' : ''}`}
          onClick={() => onWish(p.id)}
        >
          <Heart size={18} fill={isWish ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="ec-card-content">
        <h3 className="ec-card-title">{p.name}</h3>
        <p className="ec-card-price">{p.price.toFixed(2)} €</p>
        <button 
          className={`ec-btn-add ${isAdded ? 'added' : ''}`}
          onClick={() => onAdd(p.id)}
        >
          {isAdded ? '✓ Agregado' : 'Añadir al carrito'}
        </button>
      </div>
    </article>
  )
}

function FavoritesView({ products, onAdd, onWish, wishlist, feedback }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Tus Favoritos</h2>
      {products.length === 0 ? (
        <p className="text-stone-500">No tienes productos en tu lista de deseos.</p>
      ) : (
        <div className="ec-grid">
          {products.map((p, idx) => (
            <ProductCard 
              key={p.id} 
              p={p} 
              idx={idx} 
              onAdd={onAdd} 
              onWish={onWish} 
              isWish={wishlist.includes(p.id)}
              isAdded={feedback === p.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function CartView({ products, cart, setCart, total, onCheckout }) {
  const items = products.filter(p => cart[p.id] > 0)

  const updateQty = (id, delta) => {
    setCart(prev => {
      const next = { ...prev }
      next[id] = Math.max(0, (next[id] || 0) + delta)
      if (next[id] === 0) delete next[id]
      return next
    })
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold mb-6">Tu Carrito</h2>
      {items.length === 0 ? (
        <p className="text-stone-500">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {items.map(p => (
            <div key={p.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border">
              <img src={p.image} alt={p.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-bold">{p.name}</h4>
                <p className="text-amber-600 font-bold">{p.price.toFixed(2)} €</p>
              </div>
              <div className="flex items-center gap-3 bg-stone-100 p-1 rounded-lg">
                <button onClick={() => updateQty(p.id, -1)} className="p-1 hover:bg-white rounded transition"><Minus size={16}/></button>
                <span className="font-bold w-6 text-center">{cart[p.id]}</span>
                <button onClick={() => updateQty(p.id, 1)} className="p-1 hover:bg-white rounded transition"><Plus size={16}/></button>
              </div>
              <button onClick={() => updateQty(p.id, -999)} className="text-stone-400 hover:text-red-600"><Trash2 size={20}/></button>
            </div>
          ))}
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-stone-500">Total:</span>
              <span className="text-2xl font-black text-stone-800">{total.toFixed(2)} €</span>
            </div>
            <button className="w-full bg-stone-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-stone-900 transition shadow-xl shadow-stone-200" onClick={onCheckout}>
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function CheckoutView({ total, onBack }) {
  const [step, setStep] = useState(1)
  const [done, setCheckoutDone] = useState(false)

  if (done) return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} />
      </div>
      <h2 className="text-3xl font-black mb-2">¡Pedido Realizado!</h2>
      <p className="text-stone-500 mb-8">Gracias por tu compra. Te hemos enviado un email con los detalles.</p>
      <button className="px-8 py-3 bg-stone-800 text-white rounded-xl font-bold" onClick={() => window.location.reload()}>
        Volver a la tienda
      </button>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto">
      <div className="checkout-steps">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-num">1</div> Envío
        </div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-num">2</div> Pago
        </div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-num">3</div> Confirmar
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2"><Truck size={20}/> Datos de Envío</h3>
            <input type="text" placeholder="Nombre completo" className="w-full p-3 border rounded-xl outline-none focus:border-amber-500" />
            <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl outline-none focus:border-amber-500" />
            <input type="text" placeholder="Dirección de entrega" className="w-full p-3 border rounded-xl outline-none focus:border-amber-500" />
            <button className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold mt-4" onClick={() => setStep(2)}>Siguiente</button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2"><CreditCard size={20}/> Método de Pago</h3>
            <input type="text" placeholder="Número de tarjeta" className="w-full p-3 border rounded-xl outline-none focus:border-amber-500" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="MM/AA" className="p-3 border rounded-xl outline-none" />
              <input type="text" placeholder="CVV" className="p-3 border rounded-xl outline-none" />
            </div>
            <button className="w-full bg-amber-600 text-white py-3 rounded-xl font-bold mt-4" onClick={() => setStep(3)}>Siguiente</button>
          </div>
        )}
        {step === 3 && (
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Resumen del Pedido</h3>
            <p className="text-stone-500 mb-2">Total a pagar:</p>
            <p className="text-4xl font-black text-stone-800 mb-8">{total.toFixed(2)} €</p>
            <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg" onClick={() => setCheckoutDone(true)}>Confirmar Pedido</button>
          </div>
        )}
      </div>
      <button className="flex items-center gap-2 text-stone-500 mt-6 font-bold" onClick={onBack}><ArrowLeft size={18}/> Volver</button>
    </div>
  )
}
