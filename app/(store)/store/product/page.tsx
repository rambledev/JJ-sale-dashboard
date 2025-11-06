'use client'

import { useState } from 'react'
import { mockProducts } from '@/lib/herbal-types'
import { Product } from '@/lib/herbal-types'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    price: '',
    stock: '',
    unit: 'ขวด',
    minStock: '',
    category: 'ยาดม',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingProduct) {
      // แก้ไข
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...p,
              ...formData,
              price: Number(formData.price),
              stock: Number(formData.stock),
              minStock: Number(formData.minStock),
              status: Number(formData.stock) === 0 ? 'out-of-stock' : 
                     Number(formData.stock) < Number(formData.minStock) ? 'low-stock' : 'in-stock',
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : p
      ))
      alert('✅ แก้ไขสินค้าเรียบร้อย!')
    } else {
      // เพิ่มใหม่
      const newProduct: Product = {
        id: `p${products.length + 1}`,
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        minStock: Number(formData.minStock),
        status: Number(formData.stock) === 0 ? 'out-of-stock' : 
               Number(formData.stock) < Number(formData.minStock) ? 'low-stock' : 'in-stock',
        lastUpdated: new Date().toISOString().split('T')[0],
      }
      setProducts([...products, newProduct])
      alert('✅ เพิ่มสินค้าเรียบร้อย!')
    }
    
    // Reset form
    setFormData({
      name: '',
      size: '',
      price: '',
      stock: '',
      unit: 'ขวด',
      minStock: '',
      category: 'ยาดม',
    })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      size: product.size,
      price: product.price.toString(),
      stock: product.stock.toString(),
      unit: product.unit,
      minStock: product.minStock.toString(),
      category: product.category,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?')) {
      setProducts(products.filter(p => p.id !== id))
      alert('✅ ลบสินค้าเรียบร้อย!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            📦 จัดการสินค้า
          </h1>
          <p className="text-gray-600">เพิ่ม แก้ไข ลบ ข้อมูลสินค้ายาดมสมุนไพร</p>
        </div>
        <div className="flex gap-3">
          <a
            href="/store"
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
          >
            ← กลับ
          </a>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingProduct(null)
              setFormData({
                name: '',
                size: '',
                price: '',
                stock: '',
                unit: 'ขวด',
                minStock: '',
                category: 'ยาดม',
              })
            }}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
          >
            {showForm ? 'ยกเลิก' : '+ เพิ่มสินค้าใหม่'}
          </button>
        </div>
      </div>

      {/* สถิติสินค้า */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-sm text-gray-600">สินค้าทั้งหมด</p>
          <p className="text-3xl font-bold text-green-600">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-sm text-gray-600">พร้อมขาย</p>
          <p className="text-3xl font-bold text-blue-600">
            {products.filter(p => p.status === 'in-stock').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-sm text-gray-600">ใกล้หมด</p>
          <p className="text-3xl font-bold text-yellow-600">
            {products.filter(p => p.status === 'low-stock').length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-sm text-gray-600">สินค้าหมด</p>
          <p className="text-3xl font-bold text-red-600">
            {products.filter(p => p.status === 'out-of-stock').length}
          </p>
        </div>
      </div>

      {/* ฟอร์มเพิ่ม/แก้ไข */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingProduct ? '✏️ แก้ไขสินค้า' : '➕ เพิ่มสินค้าใหม่'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ชื่อสินค้า <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
                placeholder="เช่น ยาดมสมุนไพรตราดอกไม้"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ขนาด <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.size}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
                placeholder="เช่น 8 มล., 15 มล."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ราคา (บาท) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                จำนวนในสต็อก <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                หน่วย <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
              >
                <option value="ขวด">ขวด</option>
                <option value="แท่ง">แท่ง</option>
                <option value="กระปุก">กระปุก</option>
                <option value="กล่อง">กล่อง</option>
                <option value="ชิ้น">ชิ้น</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                สต็อกขั้นต่ำ <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.minStock}
                onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                หมวดหมู่ <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-lg"
              >
                <option value="ยาดม">ยาดม</option>
                <option value="น้ำมันหอมระเหย">น้ำมันหอมระเหย</option>
                <option value="บาล์ม">บาล์ม</option>
              </select>
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                {editingProduct ? '💾 บันทึกการแก้ไข' : '➕ เพิ่มสินค้า'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
                className="px-6 py-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-bold text-lg transition-all"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ตารางสินค้า */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 bg-green-600">
          <h2 className="text-2xl font-bold text-white">รายการสินค้าทั้งหมด</h2>
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden">
          {products.map((product) => (
            <div key={product.id} className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.size}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    product.status === 'in-stock'
                      ? 'bg-green-100 text-green-800'
                      : product.status === 'low-stock'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {product.status === 'in-stock' ? '✓ พร้อมขาย' : 
                   product.status === 'low-stock' ? '⚠ ใกล้หมด' : '✕ หมด'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-500">ราคา</p>
                  <p className="font-bold text-green-600">฿{product.price}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">จำนวน</p>
                  <p className="font-bold">{product.stock} {product.unit}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm"
                >
                  ✏️ แก้ไข
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm"
                >
                  🗑️ ลบ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ชื่อสินค้า</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ขนาด</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">ราคา</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">จำนวน</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">หน่วย</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">สถานะ</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">{product.size}</td>
                  <td className="px-6 py-4 font-bold text-green-600">฿{product.price}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{product.stock}</td>
                  <td className="px-6 py-4 text-gray-600">{product.unit}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        product.status === 'in-stock'
                          ? 'bg-green-100 text-green-800'
                          : product.status === 'low-stock'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status === 'in-stock' ? '✓ พร้อม' : 
                       product.status === 'low-stock' ? '⚠ ใกล้หมด' : '✕ หมด'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm transition-colors"
                      >
                        ✏️ แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold text-sm transition-colors"
                      >
                        🗑️ ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}