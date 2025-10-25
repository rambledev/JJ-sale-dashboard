'use client';

import { Calendar, Filter, Search } from 'lucide-react';

const salesHistory = [
  { id: 1, date: '24 ต.ค. 68', emp: 'พนักงาน A', channel: 'TikTok', orders: 100, amount: 25000 },
  { id: 2, date: '24 ต.ค. 68', emp: 'พนักงาน B', channel: 'Shopee', orders: 112, amount: 28000 },
  { id: 3, date: '23 ต.ค. 68', emp: 'พนักงาน A', channel: 'Shopee', orders: 95, amount: 23750 },
  { id: 4, date: '23 ต.ค. 68', emp: 'พนักงาน C', channel: 'Lazada', orders: 45, amount: 11250 },
  { id: 5, date: '22 ต.ค. 68', emp: 'พนักงาน B', channel: 'Facebook', orders: 78, amount: 19500 },
];

export default function HEADHistoryPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">ประวัติการขาย</h1>
              <p className="text-sm text-gray-500">ประวัติการขายของทีม</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหา..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>กรอง</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">พนักงาน</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ช่องทาง</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ออเดอร์</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ยอดขาย</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">การกระทำ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salesHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{record.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.emp}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                        {record.channel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{record.orders}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">฿{record.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-green-600 hover:text-green-800 font-medium">ดูรายละเอียด</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}