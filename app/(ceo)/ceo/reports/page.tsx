'use client';

import { Download, Calendar, Filter } from 'lucide-react';

export default function CEOReportsPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">รายงาน</h1>
              <p className="text-sm text-gray-500">สร้างและดาวน์โหลดรายงาน</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">เลือกประเภทรายงาน</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ช่วงเวลา</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>รายวัน</option>
                <option>รายสัปดาห์</option>
                <option>รายเดือน</option>
                <option>รายปี</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">หน่วยขาย</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>ทุกหน่วย</option>
                <option>กรุงเทพ</option>
                <option>เชียงใหม่</option>
                <option>ภูเก็ต</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['รายงานสรุปยอดขาย', 'รายงานตามช่องทาง', 'รายงานตามสินค้า', 'รายงานเปรียบเทียบ', 'รายงานประจำเดือน', 'รายงานประจำปี'].map((report, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{report}</h3>
              <p className="text-sm text-gray-600 mb-4">ดาวน์โหลดรายงาน{report}</p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                ดาวน์โหลด →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}