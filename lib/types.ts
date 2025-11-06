// Types สำหรับระบบคลังสินค้า

export interface Product {
  id: string
  code: string
  name: string
  category: string
  unit: string
  quantity: number
  minStock: number
  price: number
  cost: number
  location: string
  supplier: string
  lastUpdated: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

export interface StockMovement {
  id: string
  productId: string
  productName: string
  type: 'in' | 'out' | 'adjust'
  quantity: number
  date: string
  reference: string
  note: string
  user: string
}

export interface Supplier {
  id: string
  name: string
  contact: string
  phone: string
  email: string
  address: string
}

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
}

export interface WarehouseStats {
  totalProducts: number
  totalValue: number
  lowStockItems: number
  outOfStockItems: number
  categories: number
}