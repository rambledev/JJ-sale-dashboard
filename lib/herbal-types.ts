// Types สำหรับระบบคลังยาดมสมุนไพร

export interface Product {
  id: string
  name: string
  size: string // เช่น "8 มล.", "15 มล."
  price: number
  stock: number
  unit: string // หน่วย เช่น "ขวด", "กล่อง"
  minStock: number // สต็อกขั้นต่ำ
  image?: string
  category: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  lastUpdated: string
}

export interface Material {
  id: string
  name: string
  stock: number // จำนวนที่มี (กรัม)
  unit: string // หน่วย เช่น "กรัม", "กิโลกรัม"
  minStock: number // สต็อกขั้นต่ำ
  pricePerUnit: number // ราคาต่อหน่วย
  supplier: string // ผู้จัดจำหน่าย
  status: 'sufficient' | 'low' | 'critical'  // เปลี่ยนจาก 'adequate' เป็น 'sufficient'
  lastUpdated: string
  description?: string
}

export interface ProductionPlan {
  productId: string
  productName: string
  plannedQuantity: number
  requiredMaterials: {
    materialId: string
    materialName: string
    requiredAmount: number
    availableAmount: number
    sufficient: boolean
  }[]
  canProduce: boolean
}

export interface DashboardStats {
  totalProducts: number
  totalProductValue: number
  lowStockProducts: number
  outOfStockProducts: number
  totalMaterials: number
  totalMaterialValue: number
  lowStockMaterials: number
  criticalMaterials: number
  topSellingProducts: Product[]
  mostUsedMaterials: Material[]
}

// Mock data
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'ยาดมสมุนไพรสกัดจากกะเพรา',
    size: '8 มล.',
    price: 89,
    stock: 150,
    unit: 'ขวด',
    minStock: 30,
    category: 'ยาดม',
    status: 'in-stock',
    lastUpdated: '2025-01-15'
  },
  {
    id: '2',
    name: 'ยาดมสมุนไพรสกัดจากขิง',
    size: '8 มล.',
    price: 99,
    stock: 25,
    unit: 'ขวด',
    minStock: 30,
    category: 'ยาดม',
    status: 'low-stock',
    lastUpdated: '2025-01-15'
  },
  {
    id: '3',
    name: 'ยาดมสมุนไพรสกัดจากมะนาว',
    size: '15 มล.',
    price: 129,
    stock: 0,
    unit: 'ขวด',
    minStock: 20,
    category: 'ยาดม',
    status: 'out-of-stock',
    lastUpdated: '2025-01-14'
  },
  {
    id: '4',
    name: 'ยาดมสมุนไพรผสมน้ำผึ้ง',
    size: '8 มล.',
    price: 119,
    stock: 80,
    unit: 'ขวด',
    minStock: 25,
    category: 'ยาดม',
    status: 'in-stock',
    lastUpdated: '2025-01-15'
  },
  {
    id: '5',
    name: 'ยาดมสมุนไพรสกัดจากกระเทียม',
    size: '15 มล.',
    price: 139,
    stock: 45,
    unit: 'ขวด',
    minStock: 20,
    category: 'ยาดม',
    status: 'in-stock',
    lastUpdated: '2025-01-15'
  },
  {
    id: '6',
    name: 'ยาดมสมุนไพรผสมตะไคร้',
    size: '8 มล.',
    price: 109,
    stock: 12,
    unit: 'ขวด',
    minStock: 25,
    category: 'ยาดม',
    status: 'low-stock',
    lastUpdated: '2025-01-14'
  }
]

export const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'ใบกะเพรา',
    description: 'ใบกะเพราสดสำหรับทำชา',
    stock: 50,
    minStock: 20,
    pricePerUnit: 15,
    unit: 'กิโลกรัม',
    supplier: 'ฟาร์มกะเพรา',
    status: 'sufficient',
    lastUpdated: '2025-01-15'
  },
  {
    id: '2',
    name: 'ขิง',
    description: 'ขิงสดคุณภาพสูง',
    stock: 15,
    minStock: 25,
    pricePerUnit: 25,
    unit: 'กิโลกรัม',
    supplier: 'สวนขิงธรรมชาติ',
    status: 'low',
    lastUpdated: '2025-01-15'
  },
  {
    id: '3',
    name: 'มะนาว',
    description: 'มะนาวพันธุ์แป้น',
    stock: 8,
    minStock: 30,
    pricePerUnit: 10,
    unit: 'กิโลกรัม',
    supplier: 'สวนมะนาว',
    status: 'critical',
    lastUpdated: '2025-01-15'
  },
  {
    id: '4',
    name: 'น้ำผึ้ง',
    description: 'น้ำผึ้งดอกลำไย',
    stock: 40,
    minStock: 15,
    pricePerUnit: 200,
    unit: 'ขวด',
    supplier: 'ฟาร์มน้ำผึ้ง',
    status: 'sufficient',
    lastUpdated: '2025-01-15'
  },
  {
    id: '5',
    name: 'กระเทียม',
    description: 'กระเทียมไทยสด',
    stock: 12,
    minStock: 20,
    pricePerUnit: 18,
    unit: 'กิโลกรัม',
    supplier: 'สวนกระเทียม',
    status: 'low',
    lastUpdated: '2025-01-15'
  },
  {
    id: '6',
    name: 'ตะไคร้',
    description: 'ตะไคร้หอมสด',
    stock: 35,
    minStock: 15,
    pricePerUnit: 12,
    unit: 'กิโลกรัม',
    supplier: 'สวนตะไคร้',
    status: 'sufficient',
    lastUpdated: '2025-01-15'
  }
]

export const mockDashboardStats: DashboardStats = {
  totalProducts: mockProducts.length,
  totalProductValue: mockProducts.reduce((sum, p) => sum + (p.stock * p.price), 0),
  lowStockProducts: mockProducts.filter(p => p.status === 'low-stock').length,
  outOfStockProducts: mockProducts.filter(p => p.status === 'out-of-stock').length,
  totalMaterials: mockMaterials.length,
  totalMaterialValue: mockMaterials.reduce((sum, m) => sum + (m.stock * m.pricePerUnit), 0),
  lowStockMaterials: mockMaterials.filter(m => m.status === 'low').length,
  criticalMaterials: mockMaterials.filter(m => m.status === 'critical').length,
  topSellingProducts: mockProducts.slice(0, 3),
  mostUsedMaterials: mockMaterials.slice(0, 3)
}