'use client';

import { TrendingUp, ShoppingCart, Calendar, Plus } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import Link from 'next/link';

const recentSales = [
  { date: '24 ต.ค. 68', channel: 'TikTok', orders: 100, products: 'SS: 80, S: 25, M: 1' },
  { date: '23 ต.ค. 68', channel: 'Shopee', orders: 112, products: 'SS: 74, S: 34, M: 3' },
  { date: '22 ต.ค. 68', channel: 'Lazada', orders: 8, products: 'SS: 7, S: 2, L: 1' },
  { date: '21 ต.ค. 68', channel: 'Facebook', orders: 45, products: 'SS: 30, S: 15' },
  { date: '20 ต.ค. 68', channel: 'Line OA', orders: 25, products: 'SS: 20, S: 5' },
];

const channelColors: { [key: string]: string } = {
  'TikTok': 'bg-pink-100 text-pink-700',
  'Shopee': 'bg-orange-100 text-orange-700',
  'Lazada': 'bg-indigo-100 text-indigo-700',
  'Facebook': 'bg-blue-100 text-blue-700',
  'Line OA': 'bg-green-100 text-green-700',
};

export default function EMPDashboard() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Employee Dashboard</h1>
              <p className="text-sm text-gray-500">สวัสดี, พนักงาน A 👋</p>
            </div>
            <Link
              href="/emp/sales/new"
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              <span>บันทึกการขาย</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="ยอดขายของฉัน (เดือนนี้)"
            value="฿85,420"
            change="+15%"
            trend="up"
            icon={TrendingUp}
            iconColor="bg-purple-50 text-purple-600"
          />
          <StatsCard
            title="ออเดอร์วันนี้"
            value="42"
            change="+8"
            trend="up"
            icon={ShoppingCart}
            iconColor="bg-green-50 text-green-600"
          />
          <StatsCard
            title="วันที่บันทึกล่าสุด"
            value="24 ต.ค. 68"
            icon={Calendar}
            iconColor="bg-blue-50 text-blue-600"
          />
        </div>

        {/* Quick Action */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 mb-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">เริ่มบันทึกข้อมูลการขาย</h2>
              <p className="text-purple-100 mb-4">บันทึกข้อมูลการขายของวันนี้เพื่อติดตามผลงาน</p>
              <Link
                href="/emp/sales/new"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 font-medium transition shadow-sm"
              >
                <Plus className="w-5 h-5" />
                <span>บันทึกเลย</span>
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-purple-500 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">การขายล่าสุดของฉัน</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ช่องทาง</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ออเดอร์</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สินค้า</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">การกระทำ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentSales.map((sale, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${channelColors[sale.channel]}`}>
                        {sale.channel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.orders}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {sale.products}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-purple-600 hover:text-purple-800 mr-3 font-medium">
                        แก้ไข
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 font-medium">
                        ดู
                      </button>
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