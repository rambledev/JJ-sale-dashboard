'use client';

import { Building2, Users, TrendingUp, MapPin, Phone, Mail } from 'lucide-react';

const units = [
  { id: 1, name: 'กรุงเทพ', head: 'หัวหน้าหน่วย กรุงเทพ', employees: 4, sales: 450000, growth: 25, location: 'กรุงเทพมหานคร', phone: '02-xxx-xxxx', email: 'bkk@company.com' },
  { id: 2, name: 'เชียงใหม่', head: 'หัวหน้าหน่วย เชียงใหม่', employees: 3, sales: 380000, growth: 18, location: 'เชียงใหม่', phone: '053-xxx-xxx', email: 'cm@company.com' },
  { id: 3, name: 'ภูเก็ต', head: 'หัวหน้าหน่วย ภูเก็ต', employees: 3, sales: 350000, growth: 15, location: 'ภูเก็ต', phone: '076-xxx-xxx', email: 'phuket@company.com' },
  { id: 4, name: 'ขอนแก่น', head: 'หัวหน้าหน่วย ขอนแก่น', employees: 3, sales: 320000, growth: 12, location: 'ขอนแก่น', phone: '043-xxx-xxx', email: 'kk@company.com' },
  { id: 5, name: 'หาดใหญ่', head: 'หัวหน้าหน่วย หาดใหญ่', employees: 2, sales: 280000, growth: 8, location: 'สงขลา', phone: '074-xxx-xxx', email: 'hdy@company.com' },
];

export default function CEOUnitsPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">หน่วยขายทั้งหมด</h1>
              <p className="text-sm text-gray-500">จัดการและติดตามหน่วยขาย</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              + เพิ่มหน่วยขาย
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit, index) => (
            <div key={unit.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
              <div className={`h-2 ${index === 0 ? 'bg-yellow-400' : 'bg-blue-600'}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{unit.name}</h3>
                      <p className="text-sm text-gray-500">อันดับ #{index + 1}</p>
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="text-2xl">🏆</span>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">ยอดขาย</span>
                    <span className="text-sm font-bold text-gray-900">฿{unit.sales.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">พนักงาน</span>
                    <span className="text-sm font-semibold text-gray-900">{unit.employees} คน</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">เติบโต</span>
                    <span className="text-sm font-semibold text-green-600">+{unit.growth}%</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{unit.head}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{unit.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{unit.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{unit.email}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition">
                    ดูรายละเอียด →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}