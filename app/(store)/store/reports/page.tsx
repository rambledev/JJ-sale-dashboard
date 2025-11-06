'use client'

import { mockProducts, mockMaterials, mockDashboardStats } from '@/lib/herbal-types'

export default function ReportsPage() {
  // คำนวณข้อมูลเพิ่มเติม
  const totalProductStock = mockProducts.reduce((sum, p) => sum + p.stock, 0)
  const totalProductValue = mockProducts.reduce((sum, p) => sum + (p.stock * p.price), 0)
  const totalMaterialValue = mockMaterials.reduce((sum, m) => sum + (m.stock * m.pricePerUnit), 0)

  // สินค้าขายดี (มากที่สุด 5 อันดับ)
  const topProducts = [...mockProducts]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 5)

  // วัตถุดิบใช้มาก (คำนวณจากราคารวม)
  const topMaterials = [...mockMaterials]
    .sort((a, b) => (b.stock * b.pricePerUnit) - (a.stock * a.pricePerUnit))
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">
            📊 รายงานและวิเคราะห์
          </h1>
          <p className="text-gray-600">สรุปข้อมูลสำหรับวางแผนการผลิตและการตลาด</p>
        </div>
        <a
          href="/store"
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
        >
          ← กลับหน้าหลัก
        </a>
      </div>

      {/* สรุปภาพรวม */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 shadow-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">มูลค่าสินค้าทั้งหมด</h3>
            <span className="text-4xl">📦</span>
          </div>
          <p className="text-4xl font-bold mb-2">฿{totalProductValue.toLocaleString()}</p>
          <p className="text-green-100 text-sm">
            จากสินค้า {mockProducts.length} รายการ ({totalProductStock} หน่วย)
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 shadow-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">มูลค่าวัตถุดิบทั้งหมด</h3>
            <span className="text-4xl">🌿</span>
          </div>
          <p className="text-4xl font-bold mb-2">฿{totalMaterialValue.toLocaleString()}</p>
          <p className="text-purple-100 text-sm">
            วัตถุดิบ {mockMaterials.length} รายการ
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 shadow-xl text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">กำไรคาดการณ์</h3>
            <span className="text-4xl">💰</span>
          </div>
          <p className="text-4xl font-bold mb-2">
            ฿{(totalProductValue - totalMaterialValue).toLocaleString()}
          </p>
          <p className="text-blue-100 text-sm">
            อัตรากำไร {(((totalProductValue - totalMaterialValue) / totalProductValue) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* รายงานหลัก */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* สินค้าสต็อกมากสุด */}
        <div className="bg-white rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-3xl mr-3">🏆</span>
              สินค้าสต็อกมากสุด 5 อันดับ
            </h2>
            <span className="text-sm text-gray-500">เรียงจากมาก → น้อย</span>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, idx) => {
              const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣']
              const colors = [
                'from-yellow-400 to-orange-500',
                'from-gray-300 to-gray-400',
                'from-orange-400 to-orange-500',
                'from-blue-400 to-blue-500',
                'from-green-400 to-green-500',
              ]
              return (
                <div
                  key={product.id}
                  className={`p-4 rounded-xl bg-gradient-to-r ${colors[idx]} text-white shadow-lg transform hover:scale-105 transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{medals[idx]}</span>
                      <div>
                        <p className="font-bold text-lg">{product.name}</p>
                        <p className="text-sm opacity-90">{product.size}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{product.stock}</p>
                      <p className="text-sm opacity-90">{product.unit}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm opacity-90">
                    <span>ราคา: ฿{product.price}</span>
                    <span>มูลค่า: ฿{(product.stock * product.price).toLocaleString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* วัตถุดิบมูลค่าสูง */}
        <div className="bg-white rounded-xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="text-3xl mr-3">💎</span>
              วัตถุดิบมูลค่าสูงสุด 5 อันดับ
            </h2>
            <span className="text-sm text-gray-500">เรียงจากมาก → น้อย</span>
          </div>
          <div className="space-y-4">
            {topMaterials.map((material, idx) => {
              const value = material.stock * material.pricePerUnit
              const colors = [
                'from-purple-400 to-pink-500',
                'from-indigo-400 to-purple-500',
                'from-blue-400 to-indigo-500',
                'from-teal-400 to-green-500',
                'from-green-400 to-emerald-500',
              ]
              return (
                <div
                  key={material.id}
                  className={`p-4 rounded-xl bg-gradient-to-r ${colors[idx]} text-white shadow-lg transform hover:scale-105 transition-all`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-bold text-lg">#{idx + 1} {material.name}</p>
                      <p className="text-sm opacity-90">{material.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="opacity-75">คงเหลือ</p>
                      <p className="font-bold">{material.stock} {material.unit}</p>
                    </div>
                    <div>
                      <p className="opacity-75">ราคา/หน่วย</p>
                      <p className="font-bold">฿{material.pricePerUnit}</p>
                    </div>
                    <div>
                      <p className="opacity-75">มูลค่ารวม</p>
                      <p className="font-bold">฿{value.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* สินค้าใกล้หมด/หมด */}
      <div className="bg-white rounded-xl p-6 shadow-xl mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-3xl mr-3">⚠️</span>
          สินค้าต้องติดตาม (ใกล้หมด/หมดสต็อก)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProducts
            .filter(p => p.status === 'low-stock' || p.status === 'out-of-stock')
            .map(product => (
              <div
                key={product.id}
                className={`p-4 rounded-xl border-2 ${
                  product.status === 'out-of-stock'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-yellow-50 border-yellow-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-800">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.size}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      product.status === 'out-of-stock'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {product.status === 'out-of-stock' ? '🚨 หมด!' : '⚠️ ใกล้หมด'}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    คงเหลือ: <span className="font-bold">{product.stock}</span> {product.unit}
                  </p>
                  <p className="text-gray-700">
                    ขั้นต่ำ: <span className="font-bold">{product.minStock}</span> {product.unit}
                  </p>
                  <p className="text-gray-700">
                    ราคา: <span className="font-bold">฿{product.price}</span>
                  </p>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        product.status === 'out-of-stock' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(product.stock / product.minStock) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* วัตถุดิบใกล้หมด/วิกฤต */}
      <div className="bg-white rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="text-3xl mr-3">🚨</span>
          วัตถุดิบต้องสั่งเพิ่ม (ใกล้หมด/วิกฤต)
        </h2>
        <div className="space-y-4">
          {mockMaterials
            .filter(m => m.status === 'low' || m.status === 'critical')
            .map(material => {
              const percentRemaining = (material.stock / material.minStock) * 100
              return (
                <div
                  key={material.id}
                  className={`p-6 rounded-xl border-2 ${
                    material.status === 'critical'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-yellow-50 border-yellow-300'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{material.name}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            material.status === 'critical'
                              ? 'bg-red-200 text-red-800'
                              : 'bg-yellow-200 text-yellow-800'
                          }`}
                        >
                          {material.status === 'critical' ? '🚨 วิกฤต!' : '⚠️ ใกล้หมด'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-gray-600">คงเหลือ</p>
                          <p className="font-bold text-lg text-gray-800">
                            {material.stock} {material.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">ขั้นต่ำ</p>
                          <p className="font-bold text-lg text-gray-800">
                            {material.minStock} {material.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">ต้องสั่งเพิ่ม</p>
                          <p className="font-bold text-lg text-red-600">
                            {material.minStock - material.stock} {material.unit}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">ผู้จัดจำหน่าย</p>
                          <p className="font-semibold text-gray-800">{material.supplier}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              material.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${Math.min(percentRemaining, 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {percentRemaining.toFixed(0)}% ของระดับขั้นต่ำ
                        </p>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap">
                      📞 ติดต่อสั่งซื้อ
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* การดำเนินการแนะนำ */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 shadow-2xl text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="text-3xl mr-3">💡</span>
          ข้อแนะนำสำหรับการวางแผน
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <h3 className="font-bold text-lg mb-2">✅ การผลิต</h3>
            <ul className="space-y-2 text-sm">
              <li>• เน้นผลิตสินค้าที่สต็อกน้อย เช่น {mockProducts.find(p => p.status === 'low-stock')?.name}</li>
              <li>• วางแผนการผลิตล่วงหน้า 1-2 สัปดาห์</li>
              <li>• ตรวจสอบวัตถุดิบก่อนการผลิตทุกครั้ง</li>
            </ul>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur">
            <h3 className="font-bold text-lg mb-2">📦 การจัดซื้อ</h3>
            <ul className="space-y-2 text-sm">
              <li>• สั่งซื้อวัตถุดิบวิกฤตทันที ({mockMaterials.filter(m => m.status === 'critical').length} รายการ)</li>
              <li>• ติดตามวัตถุดิบใกล้หมด ({mockMaterials.filter(m => m.status === 'low').length} รายการ)</li>
              <li>• จัดสรรงบประมาณ ฿{totalMaterialValue.toLocaleString()} สำหรับวัตถุดิบ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}