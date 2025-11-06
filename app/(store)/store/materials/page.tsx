'use client'

import { useState } from 'react'
import { mockMaterials } from '@/lib/herbal-types'
import { Material } from '@/lib/herbal-types'

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>(mockMaterials)
  const [showForm, setShowForm] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)
  const [showStatsDialog, setShowStatsDialog] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<Material['status'] | 'all'>('all')
  const [formData, setFormData] = useState({
    name: '',
    stock: '',
    unit: 'กรัม',
    minStock: '',
    pricePerUnit: '',
    supplier: '',
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const stock = Number(formData.stock)
    const minStock = Number(formData.minStock)
    const status: Material['status'] = 
      stock < minStock * 0.3 ? 'critical' : 
      stock < minStock ? 'low' : 'sufficient'

    if (editingMaterial) {
      setMaterials(materials.map(m => 
        m.id === editingMaterial.id 
          ? {
              ...m,
              ...formData,
              stock,
              minStock,
              pricePerUnit: Number(formData.pricePerUnit),
              status,
              lastUpdated: new Date().toISOString().split('T')[0],
            }
          : m
      ))
      alert('✅ แก้ไขวัตถุดิบเรียบร้อย!')
    } else {
      const newMaterial: Material = {
        id: `m${materials.length + 1}`,
        ...formData,
        stock,
        minStock,
        pricePerUnit: Number(formData.pricePerUnit),
        status,
        lastUpdated: new Date().toISOString().split('T')[0],
      }
      setMaterials([...materials, newMaterial])
      alert('✅ เพิ่มวัตถุดิบเรียบร้อย!')
    }
    
    setFormData({
      name: '',
      stock: '',
      unit: 'กรัม',
      minStock: '',
      pricePerUnit: '',
      supplier: '',
      description: '',
    })
    setEditingMaterial(null)
    setShowForm(false)
  }

  const handleEdit = (material: Material) => {
    setEditingMaterial(material)
    setFormData({
      name: material.name,
      stock: material.stock.toString(),
      unit: material.unit,
      minStock: material.minStock.toString(),
      pricePerUnit: material.pricePerUnit.toString(),
      supplier: material.supplier,
      description: material.description || '',
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบวัตถุดิบนี้?')) {
      setMaterials(materials.filter(m => m.id !== id))
      alert('✅ ลบวัตถุดิบเรียบร้อย!')
    }
  }

  const handleStatCardClick = (status: Material['status'] | 'all') => {
    setSelectedStatus(status)
    setShowStatsDialog(true)
  }

  const getFilteredMaterials = () => {
    if (selectedStatus === 'all') return materials
    return materials.filter(m => m.status === selectedStatus)
  }

  const getStatusText = (status: Material['status']) => {
    switch (status) {
      case 'sufficient': return 'เพียงพอ'
      case 'low': return 'ใกล้หมด'
      case 'critical': return 'วิกฤต'
      default: return ''
    }
  }

  const getStatusColor = (status: Material['status']) => {
    switch (status) {
      case 'sufficient': return 'text-green-600'
      case 'low': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getBorderColor = (status: Material['status'] | 'all') => {
    switch (status) {
      case 'sufficient': return 'border-green-500'
      case 'low': return 'border-yellow-500'
      case 'critical': return 'border-red-500'
      case 'all': return 'border-purple-500'
      default: return 'border-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">
            🌿 จัดการวัตถุดิบสมุนไพร
          </h1>
          <p className="text-gray-600">เพิ่ม แก้ไข ลบ วัตถุดิบเพื่อวางแผนการผลิต</p>
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
              setEditingMaterial(null)
              setFormData({
                name: '',
                stock: '',
                unit: 'กรัม',
                minStock: '',
                pricePerUnit: '',
                supplier: '',
                description: '',
              })
            }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
          >
            {showForm ? 'ยกเลิก' : '+ เพิ่มวัตถุดิบใหม่'}
          </button>
        </div>
      </div>

      {/* สถิติวัตถุดิบ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div 
          className="bg-white rounded-lg p-4 shadow-md border-l-4 border-purple-500 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
          onClick={() => handleStatCardClick('all')}
        >
          <p className="text-sm text-gray-600">วัตถุดิบทั้งหมด</p>
          <p className="text-3xl font-bold text-purple-600">{materials.length}</p>
        </div>
        <div 
          className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
          onClick={() => handleStatCardClick('sufficient')}
        >
          <p className="text-sm text-gray-600">เพียงพอ</p>
          <p className="text-3xl font-bold text-green-600">
            {materials.filter(m => m.status === 'sufficient').length}
          </p>
        </div>
        <div 
          className="bg-white rounded-lg p-4 shadow-md border-l-4 border-yellow-500 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
          onClick={() => handleStatCardClick('low')}
        >
          <p className="text-sm text-gray-600">ใกล้หมด</p>
          <p className="text-3xl font-bold text-yellow-600">
            {materials.filter(m => m.status === 'low').length}
          </p>
        </div>
        <div 
          className="bg-white rounded-lg p-4 shadow-md border-l-4 border-red-500 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
          onClick={() => handleStatCardClick('critical')}
        >
          <p className="text-sm text-gray-600">วิกฤต!</p>
          <p className="text-3xl font-bold text-red-600">
            {materials.filter(m => m.status === 'critical').length}
          </p>
        </div>
      </div>

      {/* Dialog แสดงรายการตามสถานะ */}
      {showStatsDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${
              selectedStatus === 'sufficient' ? 'from-green-500 to-green-600' :
              selectedStatus === 'low' ? 'from-yellow-500 to-yellow-600' :
              selectedStatus === 'critical' ? 'from-red-500 to-red-600' :
              'from-purple-500 to-purple-600'
            } text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedStatus === 'all' ? '📦 วัตถุดิบทั้งหมด' :
                     selectedStatus === 'sufficient' ? '✅ วัตถุดิบเพียงพอ' :
                     selectedStatus === 'low' ? '⚠️ วัตถุดิบใกล้หมด' :
                     '🚨 วัตถุดิบระดับวิกฤต'}
                  </h2>
                  <p className="text-white text-opacity-90">
                    {getFilteredMaterials().length} รายการ
                  </p>
                </div>
                <button
                  onClick={() => setShowStatsDialog(false)}
                  className="text-white hover:text-gray-200 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {getFilteredMaterials().map((material) => (
                  <div
                    key={material.id}
                    className={`p-4 rounded-lg border-2 ${
                      material.status === 'critical'
                        ? 'bg-red-50 border-red-200'
                        : material.status === 'low'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{material.name}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              material.status === 'sufficient'
                                ? 'bg-green-200 text-green-800'
                                : material.status === 'low'
                                ? 'bg-yellow-200 text-yellow-800'
                                : 'bg-red-200 text-red-800'
                            }`}
                          >
                            {getStatusText(material.status)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">คงเหลือ</p>
                            <p className="font-semibold">
                              {material.stock} {material.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">ขั้นต่ำ</p>
                            <p className="font-semibold">
                              {material.minStock} {material.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">ราคา/หน่วย</p>
                            <p className="font-semibold text-purple-600">
                              ฿{material.pricePerUnit}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">ผู้จัดจำหน่าย</p>
                            <p className="font-semibold">{material.supplier}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => {
                            setShowStatsDialog(false)
                            handleEdit(material)
                          }}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                          ✏️
                        </button>
                      </div>
                    </div>
                    {material.description && (
                      <p className="text-sm text-gray-600 mt-2">{material.description}</p>
                    )}
                  </div>
                ))}
              </div>

              {getFilteredMaterials().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-lg">ไม่พบวัตถุดิบในหมวดหมู่นี้</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
              <p className="text-sm text-gray-600">
                คลิกที่ปุ่ม ✏️ เพื่อแก้ไขวัตถุดิบ
              </p>
              <button
                onClick={() => setShowStatsDialog(false)}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ฟอร์มเพิ่ม/แก้ไข */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {editingMaterial ? '✏️ แก้ไขวัตถุดิบ' : '➕ เพิ่มวัตถุดิบใหม่'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ชื่อวัตถุดิบ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
                placeholder="เช่น เทพทาโร, สมุลแว้ง"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                จำนวนที่มี <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
              >
                <option value="กรัม">กรัม</option>
                <option value="กิโลกรัม">กิโลกรัม</option>
                <option value="มิลลิลิตร">มิลลิลิตร</option>
                <option value="ลิตร">ลิตร</option>
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
                step="0.01"
                value={formData.minStock}
                onChange={(e) => setFormData({...formData, minStock: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ราคาต่อหน่วย (บาท) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.pricePerUnit}
                onChange={(e) => setFormData({...formData, pricePerUnit: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ผู้จัดจำหน่าย <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.supplier}
                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
                placeholder="ชื่อบริษัทหรือผู้จัดจำหน่าย"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                คำอธิบาย/คุณสมบัติ
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
                placeholder="คุณสมบัติหรือประโยชน์ของวัตถุดิบ..."
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                {editingMaterial ? '💾 บันทึกการแก้ไข' : '➕ เพิ่มวัตถุดิบ'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingMaterial(null)
                }}
                className="px-6 py-4 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-bold text-lg transition-all"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}

      {/* รายการวัตถุดิบ */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-600">
          <h2 className="text-2xl font-bold text-white">รายการวัตถุดิบทั้งหมด</h2>
        </div>

        <div className="p-6 space-y-4">
          {materials.map((material) => (
            <div
              key={material.id}
              className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                material.status === 'critical'
                  ? 'bg-red-50 border-red-300'
                  : material.status === 'low'
                  ? 'bg-yellow-50 border-yellow-300'
                  : 'bg-green-50 border-green-300'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{material.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        material.status === 'sufficient'
                          ? 'bg-green-200 text-green-800'
                          : material.status === 'low'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {material.status === 'sufficient' ? '✓ เพียงพอ' : 
                       material.status === 'low' ? '⚠ ใกล้หมด' : '🚨 วิกฤต!'}
                    </span>
                  </div>
                  {material.description && (
                    <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">คงเหลือ</p>
                      <p className="text-lg font-bold text-gray-800">
                        {material.stock} {material.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ขั้นต่ำ</p>
                      <p className="text-lg font-bold text-gray-600">
                        {material.minStock} {material.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ราคา/หน่วย</p>
                      <p className="text-lg font-bold text-purple-600">
                        ฿{material.pricePerUnit}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">ผู้จัดจำหน่าย</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {material.supplier}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => handleEdit(material)}
                    className="flex-1 md:flex-none px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    ✏️ แก้ไข
                  </button>
                  <button
                    onClick={() => handleDelete(material.id)}
                    className="flex-1 md:flex-none px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    🗑️ ลบ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}