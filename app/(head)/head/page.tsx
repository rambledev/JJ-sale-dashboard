'use client';

import { TrendingUp, ShoppingCart, Users, Award } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const teamPerformance = [
  { name: 'พนักงาน A', ยอดขาย: 85000, ออเดอร์: 320 },
  { name: 'พนักงาน B', ยอดขาย: 72000, ออเดอร์: 280 },
  { name: 'พนักงาน C', ยอดขาย: 68000, ออเดอร์: 250 },
  { name: 'พนักงาน D', ยอดขาย: 55000, ออเดอร์: 210 },
];

const salesTrend = [
  { วัน: 'จ.', ยอดขาย: 12000 },
  { วัน: 'อ.', ยอดขาย: 15000 },
  { วัน: 'พ.', ยอดขาย: 18000 },
  { วัน: 'พฤ.', ยอดขาย: 14000 },
  { วัน: 'ศ.', ยอดขาย: 22000 },
  { วัน: 'ส.', ยอดขาย: 25000 },
  { วัน: 'อา.', ยอดขาย: 20000 },
];

const recentActivities = [
  { emp: 'พนักงาน A', action: 'บันทึกข้อมูลการขาย', channel: 'TikTok', time: '10 นาทีที่แล้ว' },
  { emp: 'พนักงาน B', action: 'บันทึกข้อมูลการขาย', channel: 'Shopee', time: '25 นาทีที่แล้ว' },
  { emp: 'พนักงาน C', action: 'แก้ไขข้อมูลการขาย', channel: 'Lazada', time: '1 ชั่วโมงที่แล้ว' },
  { emp: 'พนักงาน D', action: 'บันทึกข้อมูลการขาย', channel: 'Facebook', time: '2 ชั่วโมงที่แล้ว' },
];

export default function HEADDashboard() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">HEAD Dashboard</h1>
              <p className="text-sm text-gray-500">หน่วยขาย กรุงเทพ</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 bg-green-50 rounded-lg">
                <p className="text-xs text-green-600 font-medium">อันดับ #1 🏆</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="ยอดขายหน่วย"
            value="฿450,000"
            change="+25%"
            trend="up"
            icon={TrendingUp}
            iconColor="bg-green-50 text-green-600"
          />
          <StatsCard
            title="ออเดอร์ทั้งหมด"
            value="1,800"
            change="+18%"
            trend="up"
            icon={ShoppingCart}
            iconColor="bg-blue-50 text-blue-600"
          />
          <StatsCard
            title="จำนวนพนักงาน"
            value="4"
            icon={Users}
            iconColor="bg-purple-50 text-purple-600"
          />
          <StatsCard
            title="อันดับของหน่วย"
            value="1"
            change="Top Unit"
            trend="up"
            icon={Award}
            iconColor="bg-yellow-50 text-yellow-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Team Performance */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">ผลงานทีม</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ยอดขาย" fill="#10B981" />
                <Bar dataKey="ออเดอร์" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sales Trend */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">ยอดขายรายวัน (7 วัน)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="วัน" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ยอดขาย" stroke="#10B981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">กิจกรรมล่าสุด</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">
                        {activity.emp.charAt(activity.emp.length - 1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.emp}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                      {activity.channel}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}