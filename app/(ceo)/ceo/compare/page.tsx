'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const comparisonData = [
  { หน่วย: 'กรุงเทพ', มกราคม: 150000, กุมภาพันธ์: 165000, มีนาคม: 180000, เมษายน: 200000, พฤษภาคม: 225000, มิถุนายน: 250000 },
  { หน่วย: 'เชียงใหม่', มกราคม: 120000, กุมภาพันธ์: 130000, มีนาคม: 145000, เมษายน: 160000, พฤษภาคม: 175000, มิถุนายน: 190000 },
  { หน่วย: 'ภูเก็ต', มกราคม: 110000, กุมภาพันธ์: 125000, มีนาคม: 135000, เมษายน: 150000, พฤษภาคม: 165000, มิถุนายน: 175000 },
  { หน่วย: 'ขอนแก่น', มกราคม: 100000, กุมภาพันธ์: 110000, มีนาคม: 125000, เมษายน: 135000, พฤษภาคม: 150000, มิถุนายน: 160000 },
  { หน่วย: 'หาดใหญ่', มกราคม: 85000, กุมภาพันธ์: 95000, มีนาคม: 105000, เมษายน: 115000, พฤษภาคม: 125000, มิถุนายน: 140000 },
];

export default function CEOComparePage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">เปรียบเทียบหน่วยขาย</h1>
              <p className="text-sm text-gray-500">เปรียบเทียบผลงานระหว่างหน่วย</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">เปรียบเทียบยอดขาย 6 เดือนล่าสุด</h2>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="หน่วย" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="มกราคม" fill="#3B82F6" />
              <Bar dataKey="กุมภาพันธ์" fill="#10B981" />
              <Bar dataKey="มีนาคม" fill="#F59E0B" />
              <Bar dataKey="เมษายน" fill="#EF4444" />
              <Bar dataKey="พฤษภาคม" fill="#8B5CF6" />
              <Bar dataKey="มิถุนายน" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}