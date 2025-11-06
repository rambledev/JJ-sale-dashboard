'use client'

import { useState } from 'react'
import { mockProducts, mockMaterials, mockDashboardStats } from '@/lib/herbal-types'

export default function StoreDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
          🌿 ระบบคลังสินค้า - ยาดมสมุนไพร
        </h1>
        <p className="text-gray-600">ภาพรวมและข้อมูลสำคัญสำหรับการวางแผนการผลิต</p>
      </div>

      {/* สถิติด่วน - Header Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* สินค้าทั้งหมด */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">สินค้าทั้งหมด</p>
              <p className="text-3xl font-bold text-green-700">{mockDashboardStats.totalProducts}</p>
              <p className="text-xs text-gray-500 mt-1">รายการ</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>

        {/* มูลค่าสินค้า */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">มูลค่าสินค้า</p>
              <p className="text-2xl font-bold text-blue-700">
                ฿{mockDashboardStats.totalProductValue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">บาท</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>

        {/* วัตถุดิบทั้งหมด */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">วัตถุดิบทั้งหมด</p>
              <p className="text-3xl font-bold text-purple-700">{mockDashboardStats.totalMaterials}</p>
              <p className="text-xs text-gray-500 mt-1">รายการ</p>
            </div>
            <div className="text-4xl">🌿</div>
          </div>
        </div>

        {/* แจ้งเตือน */}
        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">ต้องติดตาม</p>
              <p className="text-3xl font-bold text-red-700">
                {mockDashboardStats.lowStockProducts + mockDashboardStats.criticalMaterials}
              </p>
              <p className="text-xs text-gray-500 mt-1">รายการ</p>
            </div>
            <div className="text-4xl">⚠️</div>
          </div>
        </div>
      </div>

      {/* เมนูหลัก */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* จัดการสินค้า */}
        <a
          href="/store/products"
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <div className="text-white">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-2xl font-bold mb-2">จัดการสินค้า</h2>
            <p className="text-green-100 mb-4">เพิ่ม แก้ไข ลบ ข้อมูลสินค้า</p>
            <div className="flex items-center justify-between">
              <span className="text-sm">มีสินค้า {mockProducts.length} รายการ</span>
              <span className="text-2xl">→</span>
            </div>
          </div>
        </a>

        {/* จัดการวัตถุดิบ */}
        <a
          href="/store/materials"
          className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <div className="text-white">
            <div className="text-5xl mb-4">🌿</div>
            <h2 className="text-2xl font-bold mb-2">จัดการวัตถุดิบ</h2>
            <p className="text-purple-100 mb-4">เพิ่ม แก้ไข ลบ วัตถุดิบสมุนไพร</p>
            <div className="flex items-center justify-between">
              <span className="text-sm">มีวัตถุดิบ {mockMaterials.length} รายการ</span>
              <span className="text-2xl">→</span>
            </div>
          </div>
        </a>

        {/* รายงาน */}
        <a
          href="/store/reports"
          className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
        >
          <div className="text-white">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-2">รายงาน</h2>
            <p className="text-blue-100 mb-4">วิเคราะห์และวางแผนการผลิต</p>
            <div className="flex items-center justify-between">
              <span className="text-sm">ดูรายงานทั้งหมด</span>
              <span className="text-2xl">→</span>
            </div>
          </div>
        </a>
      </div>

      {/* ข้อมูลสำคัญด่วน */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* สินค้าขายดี/สต็อกมาก */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">🏆</span>
            สินค้าสต็อกมากสุด 5 อันดับ
          </h3>
          <div className="space-y-3">
            {mockProducts
              .sort((a, b) => b.stock - a.stock)
              .slice(0, 5)
              .map((product, idx) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-green-600">#{idx + 1}</span>
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.size}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-700">{product.stock}</p>
                    <p className="text-xs text-gray-600">{product.unit}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* วัตถุดิบใกล้หมด */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">⚠️</span>
            วัตถุดิบต้องติดตาม
          </h3>
          <div className="space-y-3">
            {mockMaterials
              .filter((m) => m.status === 'low' || m.status === 'critical')
              .map((material) => (
                <div
                  key={material.id}
                  className={`p-4 rounded-lg border-2 ${
                    material.status === 'critical'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-yellow-50 border-yellow-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{material.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600">
                          คงเหลือ: <span className="font-bold">{material.stock}</span> {material.unit}
                        </span>
                        <span className="text-sm text-gray-600">
                          ขั้นต่ำ: {material.minStock} {material.unit}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        material.status === 'critical'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {material.status === 'critical' ? 'วิกฤต!' : 'ใกล้หมด'}
                    </span>
                  </div>
                </div>
              ))}
            {mockMaterials.filter((m) => m.status === 'low' || m.status === 'critical').length ===
              0 && (
              <p className="text-center text-gray-500 py-4">✅ วัตถุดิบเพียงพอทั้งหมด</p>
            )}
          </div>
        </div>
      </div>

      {/* สินค้าใกล้หมด */}
      {mockProducts.filter((p) => p.status === 'low-stock' || p.status === 'out-of-stock').length >
        0 && (
        <div className="mt-6 bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">📉</span>
            สินค้าสต็อกน้อย/หมด
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockProducts
              .filter((p) => p.status === 'low-stock' || p.status === 'out-of-stock')
              .map((product) => (
                <div
                  key={product.id}
                  className={`p-4 rounded-lg border-2 ${
                    product.status === 'out-of-stock'
                      ? 'bg-red-50 border-red-300'
                      : 'bg-yellow-50 border-yellow-300'
                  }`}
                >
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">
                      เหลือ: <span className="font-bold">{product.stock}</span> {product.unit}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'out-of-stock'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {product.status === 'out-of-stock' ? 'หมด!' : 'ใกล้หมด'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}