'use client';

import { Download, FileText } from 'lucide-react';

export default function HEADReportsPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">รายงาน</h1>
              <p className="text-sm text-gray-500">รายงานของหน่วย กรุงเทพ</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['รายงานยอดขายทีม', 'รายงานรายบุคคล', 'รายงานตามช่องทาง', 'รายงานรายวัน', 'รายงานรายเดือน', 'รายงานผลงานทีม'].map((report, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{report}</h3>
              <p className="text-sm text-gray-600 mb-4">ดาวน์โหลด{report}</p>
              <button className="flex items-center space-x-2 text-sm text-green-600 hover:text-green-700 font-medium">
                <Download className="w-4 h-4" />
                <span>ดาวน์โหลด</span>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}