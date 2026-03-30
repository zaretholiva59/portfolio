export const EC_PRODUCTS_KEY = 'ec-products'
export const EC_CART_KEY = 'ec-cart'

export const CATEGORY_LABELS = {
  todas: 'Todas',
  verduras: 'Verduras',
  frutas: 'Frutas',
  lacteos: 'Lácteos',
  despensa: 'Despensa',
}

export const CATEGORY_LIST = ['verduras', 'frutas', 'lacteos', 'despensa']

export function getDefaultProducts() {
  return [
    {
      id: 'p1',
      name: 'Tomates cherry',
      category: 'verduras',
      price: 2.49,
      image:
        'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&q=80',
      description: 'Tomates cherry frescos, ideales para ensaladas.',
    },
    {
      id: 'p2',
      name: 'Lechuga romana',
      category: 'verduras',
      price: 1.89,
      image:
        'https://images.unsplash.com/photo-1622206151226-18ca2c9d4d3f?w=600&q=80',
      description: 'Lechuga crujiente de temporada.',
    },
    {
      id: 'p3',
      name: 'Manzanas Fuji',
      category: 'frutas',
      price: 3.29,
      image:
        'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&q=80',
      description: 'Manzanas dulces y jugosas.',
    },
    {
      id: 'p4',
      name: 'Plátanos',
      category: 'frutas',
      price: 1.49,
      image:
        'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=600&q=80',
      description: 'Ricos en potasio, punto perfecto de maduración.',
    },
    {
      id: 'p5',
      name: 'Leche entera',
      category: 'lacteos',
      price: 2.99,
      image:
        'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=80',
      description: 'Leche fresca 1 L.',
    },
    {
      id: 'p6',
      name: 'Queso curado',
      category: 'lacteos',
      price: 6.5,
      image:
        'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600&q=80',
      description: 'Queso curado en cuña.',
    },
    {
      id: 'p7',
      name: 'Arroz integral',
      category: 'despensa',
      price: 2.2,
      image:
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
      description: 'Arroz integral 1 kg.',
    },
    {
      id: 'p8',
      name: 'Aceite de oliva',
      category: 'despensa',
      price: 7.95,
      image:
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=80',
      description: 'Virgen extra 750 ml.',
    },
  ]
}

export function loadProducts() {
  try {
    const raw = localStorage.getItem(EC_PRODUCTS_KEY)
    if (!raw) return getDefaultProducts()
    const p = JSON.parse(raw)
    return Array.isArray(p) && p.length ? p : getDefaultProducts()
  } catch {
    return getDefaultProducts()
  }
}

export function saveProducts(products) {
  localStorage.setItem(EC_PRODUCTS_KEY, JSON.stringify(products))
}

export function loadCart() {
  try {
    const raw = localStorage.getItem(EC_CART_KEY)
    if (!raw) return {}
    const c = JSON.parse(raw)
    return c && typeof c === 'object' ? c : {}
  } catch {
    return {}
  }
}

export function saveCart(cart) {
  localStorage.setItem(EC_CART_KEY, JSON.stringify(cart))
}
