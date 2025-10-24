export type Role = 'CEO' | 'HEAD' | 'EMP' | 'ADMIN';

export type SalesChannel = 
  | 'TIKTOK'
  | 'SHOPEE'
  | 'FACEBOOK_INSTAGRAM_VRICH'
  | 'LAZADA'
  | 'LINE_MY_SHOP'
  | 'MODERN_TRADE'
  | 'EVENT'
  | 'LINE_OA';

export type ProductSize = 'SS' | 'S' | 'M' | 'L' | 'XL';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  salesUnitId?: string;
}

export interface SalesRecord {
  id: string;
  date: Date;
  channel: SalesChannel;
  totalOrders: number;
  products: ProductSale[];
  accessories: Accessory[];
  notes?: string;
  attachments: string[];
}

export interface ProductSale {
  size: ProductSize;
  quantity: number;
  unitType: string;
}

export interface Accessory {
  name: string;
  quantity: number;
  unit: string;
}