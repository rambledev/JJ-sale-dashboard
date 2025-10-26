'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  ChevronRight,
  X,
  ArrowLeft,
  DollarSign,
  ShoppingCart,
  Award,
  TrendingDown,
  BarChart3,
  Clock
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// ========================================
// TypeScript Interfaces & Types
// ========================================

type TimePeriod = 'day' | 'week' | 'month' | 'year';

type SalesChannel = 
  | 'TIKTOK'
  | 'SHOPEE'
  | 'FACEBOOK_INSTAGRAM_VRICH'
  | 'LAZADA'
  | 'LINE_MY_SHOP'
  | 'MODERN_TRADE'
  | 'EVENT'
  | 'LINE_OA';

type ProductSize = 'SS' | 'S' | 'M' | 'L' | 'XL';

interface SalesUnit {
  id: number;
  name: string;
  code: string;
  head: string;
  employees: number;
  sales: number;
  growth: number;
  location: string;
  phone: string;
  email: string;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  salesThisMonth: number;
  performance: number;
  joinDate: string;
}

interface SalesHistory {
  date: string;
  revenue: number;
  orders: number;
  channel: string;
}

interface TrendData {
  period: string;
  revenue: number;
  orders: number;
  target?: number;
}

interface ChannelSales {
  channelKey: SalesChannel;
  channelName: string;
  revenue: number;
  orders: number;
  percentage: number;
}

interface ProductSales {
  size: ProductSize;
  quantity: number;
  revenue: number;
  percentage: number;
}

// ========================================
// CEO Units Page Component
// ========================================

export default function CEOUnitsPage() {
  const [selectedUnit, setSelectedUnit] = useState<SalesUnit | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');

  // ========================================
  // Mock Data
  // ========================================

  const units: SalesUnit[] = [
    { 
      id: 1, 
      name: 'หน่วยงานขายภาคกลาง',
      code: 'CENTRAL',
      head: 'สมชาย ใจดี', 
      employees: 12, 
      sales: 4250000, 
      growth: 25, 
      location: 'กรุงเทพมหานคร', 
      phone: '02-xxx-xxxx', 
      email: 'central@jongcharoen.com' 
    },
    { 
      id: 2, 
      name: 'หน่วยงานขายภาคเหนือ',
      code: 'NORTH',
      head: 'นภัสสร แสนดี', 
      employees: 8, 
      sales: 3150000, 
      growth: 18, 
      location: 'เชียงใหม่', 
      phone: '053-xxx-xxx', 
      email: 'north@jongcharoen.com' 
    },
    { 
      id: 3, 
      name: 'หน่วยงานขายภาคใต้',
      code: 'SOUTH',
      head: 'อนุชา สมบูรณ์', 
      employees: 10, 
      sales: 2800000, 
      growth: 15, 
      location: 'ภูเก็ต', 
      phone: '076-xxx-xxx', 
      email: 'south@jongcharoen.com' 
    },
    { 
      id: 4, 
      name: 'หน่วยงานขายภาคตะวันออกเฉียงเหนือ',
      code: 'NORTHEAST',
      head: 'วีระ มั่นคง', 
      employees: 15, 
      sales: 5480000, 
      growth: 32, 
      location: 'ขอนแก่น', 
      phone: '043-xxx-xxx', 
      email: 'northeast@jongcharoen.com' 
    },
    { 
      id: 5, 
      name: 'หน่วยงานขายภาคตะวันออก',
      code: 'EAST',
      head: 'ประภาพร วงศ์ใหญ่', 
      employees: 6, 
      sales: 1850000, 
      growth: 8, 
      location: 'ชลบุรี', 
      phone: '038-xxx-xxx', 
      email: 'east@jongcharoen.com' 
    },
  ];

  // Sort units by sales
  const sortedUnits = [...units].sort((a, b) => b.sales - a.sales);

  // ========================================
  // Helper Functions
  // ========================================

  const formatCurrency = (amount: number): string => {
    return `฿${amount.toLocaleString()}`;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const getPeriodLabel = (period: TimePeriod): string => {
    switch (period) {
      case 'day': return 'รายวัน';
      case 'week': return 'รายสัปดาห์';
      case 'month': return 'รายเดือน';
      case 'year': return 'รายปี';
    }
  };

  // ========================================
  // Unit Detail Modal Component
  // ========================================

  const UnitDetailModal = ({ unit }: { unit: SalesUnit }) => {
    // Mock employees data
    const employees: Employee[] = [
      { 
        id: 1, 
        name: unit.head, 
        position: 'หัวหน้าหน่วย', 
        salesThisMonth: unit.sales * 0.3, 
        performance: 95,
        joinDate: '2022-01-15'
      },
      { 
        id: 2, 
        name: 'พนักงานขาย 1', 
        position: 'พนักงานขาย', 
        salesThisMonth: unit.sales * 0.2, 
        performance: 88,
        joinDate: '2022-06-01'
      },
      { 
        id: 3, 
        name: 'พนักงานขาย 2', 
        position: 'พนักงานขาย', 
        salesThisMonth: unit.sales * 0.15, 
        performance: 85,
        joinDate: '2023-02-10'
      },
      { 
        id: 4, 
        name: 'พนักงานขาย 3', 
        position: 'พนักงานขาย', 
        salesThisMonth: unit.sales * 0.12, 
        performance: 82,
        joinDate: '2023-08-20'
      },
    ];

    // Mock trend data based on period
    const getTrendData = (period: TimePeriod): TrendData[] => {
      const baseRevenue = unit.sales;
      
      switch (period) {
        case 'day':
          return [
            { period: '00:00', revenue: baseRevenue * 0.05, orders: 25 },
            { period: '04:00', revenue: baseRevenue * 0.03, orders: 15 },
            { period: '08:00', revenue: baseRevenue * 0.12, orders: 65 },
            { period: '12:00', revenue: baseRevenue * 0.18, orders: 95 },
            { period: '16:00', revenue: baseRevenue * 0.22, orders: 115 },
            { period: '20:00', revenue: baseRevenue * 0.15, orders: 80 },
          ];
        case 'week':
          return [
            { period: 'จันทร์', revenue: baseRevenue * 0.12, orders: 180 },
            { period: 'อังคาร', revenue: baseRevenue * 0.11, orders: 165 },
            { period: 'พุธ', revenue: baseRevenue * 0.15, orders: 225 },
            { period: 'พฤหัส', revenue: baseRevenue * 0.16, orders: 240 },
            { period: 'ศุกร์', revenue: baseRevenue * 0.18, orders: 270 },
            { period: 'เสาร์', revenue: baseRevenue * 0.20, orders: 300 },
            { period: 'อาทิตย์', revenue: baseRevenue * 0.08, orders: 120 },
          ];
        case 'month':
          return [
            { period: 'พ.ค.', revenue: baseRevenue * 0.85, orders: 1520 },
            { period: 'มิ.ย.', revenue: baseRevenue * 0.90, orders: 1680 },
            { period: 'ก.ค.', revenue: baseRevenue * 0.95, orders: 1750 },
            { period: 'ส.ค.', revenue: baseRevenue * 0.88, orders: 1620 },
            { period: 'ก.ย.', revenue: baseRevenue * 0.92, orders: 1720 },
            { period: 'ต.ค.', revenue: baseRevenue, orders: 1850 },
          ];
        case 'year':
          return [
            { period: '2020', revenue: baseRevenue * 0.60, orders: 12500 },
            { period: '2021', revenue: baseRevenue * 0.70, orders: 14200 },
            { period: '2022', revenue: baseRevenue * 0.80, orders: 16800 },
            { period: '2023', revenue: baseRevenue * 0.90, orders: 18500 },
            { period: '2024', revenue: baseRevenue, orders: 20200 },
          ];
      }
    };

    // Mock sales history
    const getSalesHistory = (): SalesHistory[] => {
      const channels = ['TikTok', 'Shopee', 'Facebook/IG', 'Lazada', 'Line My Shop', 'Modern Trade', 'Event', 'Line OA'];
      
      return Array.from({ length: 20 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        return {
          date: date.toLocaleDateString('th-TH', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          revenue: Math.floor(Math.random() * 50000) + 10000,
          orders: Math.floor(Math.random() * 50) + 10,
          channel: channels[Math.floor(Math.random() * channels.length)]
        };
      });
    };

    // Mock channel sales
    const channelSales: ChannelSales[] = [
      { channelKey: 'TIKTOK', channelName: 'TikTok Shop', revenue: unit.sales * 0.30, orders: 850, percentage: 30 },
      { channelKey: 'SHOPEE', channelName: 'Shopee', revenue: unit.sales * 0.25, orders: 720, percentage: 25 },
      { channelKey: 'FACEBOOK_INSTAGRAM_VRICH', channelName: 'Facebook/IG', revenue: unit.sales * 0.20, orders: 580, percentage: 20 },
      { channelKey: 'LAZADA', channelName: 'Lazada', revenue: unit.sales * 0.10, orders: 280, percentage: 10 },
      { channelKey: 'LINE_MY_SHOP', channelName: 'Line My Shop', revenue: unit.sales * 0.08, orders: 220, percentage: 8 },
      { channelKey: 'MODERN_TRADE', channelName: 'Modern Trade', revenue: unit.sales * 0.04, orders: 110, percentage: 4 },
      { channelKey: 'EVENT', channelName: 'Event', revenue: unit.sales * 0.02, orders: 55, percentage: 2 },
      { channelKey: 'LINE_OA', channelName: 'Line OA', revenue: unit.sales * 0.01, orders: 28, percentage: 1 },
    ];

    // Mock product sales
    const productSales: ProductSales[] = [
      { size: 'SS', quantity: 520, revenue: unit.sales * 0.15, percentage: 15 },
      { size: 'S', quantity: 780, revenue: unit.sales * 0.22, percentage: 22 },
      { size: 'M', quantity: 1100, revenue: unit.sales * 0.30, percentage: 30 },
      { size: 'L', quantity: 850, revenue: unit.sales * 0.20, percentage: 20 },
      { size: 'XL', quantity: 620, revenue: unit.sales * 0.13, percentage: 13 },
    ];

    const trendData = getTrendData(selectedPeriod);
    const salesHistory = getSalesHistory();
    const currentData = trendData[trendData.length - 1];
    const previousData = trendData[trendData.length - 2];
    const growthRate = previousData 
      ? ((currentData.revenue - previousData.revenue) / previousData.revenue) * 100 
      : 0;

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedUnit(null)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold">{unit.name}</h2>
                <p className="text-blue-100 text-sm mt-1">
                  {unit.code} • หัวหน้า: {unit.head}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedUnit(null)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Period Selector */}
            <div className="mb-6 flex gap-2 flex-wrap">
              {(['day', 'week', 'month', 'year'] as TimePeriod[]).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period === 'day' && '📅 รายวัน'}
                  {period === 'week' && '📆 รายสัปดาห์'}
                  {period === 'month' && '📊 รายเดือน'}
                  {period === 'year' && '📈 รายปี'}
                </button>
              ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="text-blue-600" size={20} />
                  <span className="text-sm text-blue-600">ยอดขายรวม</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">{formatCurrency(unit.sales)}</div>
                <div className="text-xs text-blue-600 mt-1">
                  {growthRate > 0 ? '↗' : '↘'} {Math.abs(growthRate).toFixed(1)}%
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingCart className="text-green-600" size={20} />
                  <span className="text-sm text-green-600">ยอดสั่งซื้อ</span>
                </div>
                <div className="text-2xl font-bold text-green-900">{formatNumber(currentData.orders)}</div>
                <div className="text-xs text-green-600 mt-1">คำสั่งซื้อทั้งหมด</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-purple-600" size={20} />
                  <span className="text-sm text-purple-600">พนักงาน</span>
                </div>
                <div className="text-2xl font-bold text-purple-900">{unit.employees} คน</div>
                <div className="text-xs text-purple-600 mt-1">ทีมขาย</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-orange-600" size={20} />
                  <span className="text-sm text-orange-600">อัตราเติบโต</span>
                </div>
                <div className="text-2xl font-bold text-orange-900">+{unit.growth}%</div>
                <div className="text-xs text-orange-600 mt-1">เทียบกับช่วงก่อน</div>
              </div>
            </div>

            {/* Sales Trend Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={24} />
                แนวโน้มยอดขาย ({getPeriodLabel(selectedPeriod)})
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="period" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`฿${value.toLocaleString()}`, 'รายได้']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Channel Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">ยอดขายตามช่องทาง</h3>
                <div className="space-y-3">
                  {channelSales.map((channel, index) => (
                    <div key={channel.channelKey} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {channel.channelName}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {formatCurrency(channel.revenue)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${channel.percentage}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">
                            {channel.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Size Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">ยอดขายตามขนาดสินค้า</h3>
                <div className="space-y-3">
                  {productSales.map((product, index) => (
                    <div key={product.size} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            ขนาด {product.size}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">
                            {formatNumber(product.quantity)} กระปุก
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${product.percentage}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 w-8">
                            {product.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Employees List */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="text-indigo-600" size={24} />
                รายชื่อพนักงาน ({employees.length} คน)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">ชื่อ</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">ตำแหน่ง</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">ยอดขายเดือนนี้</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">ผลงาน</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">วันที่เข้างาน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp, index) => (
                      <tr key={emp.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                              {emp.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{emp.name}</div>
                              {index === 0 && (
                                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                                  หัวหน้าทีม
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{emp.position}</td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">
                          {formatCurrency(emp.salesThisMonth)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  emp.performance >= 90 ? 'bg-green-500' :
                                  emp.performance >= 80 ? 'bg-blue-500' :
                                  'bg-yellow-500'
                                }`}
                                style={{ width: `${emp.performance}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 w-10">
                              {emp.performance}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{emp.joinDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sales History */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="text-green-600" size={24} />
                ประวัติการขาย (20 รายการล่าสุด)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">วันที่/เวลา</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">ช่องทาง</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">ยอดขาย</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">จำนวนออเดอร์</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesHistory.map((record, index) => (
                      <tr key={index} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-700">{record.date}</td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            {record.channel}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">
                          {formatCurrency(record.revenue)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {record.orders} ออเดอร์
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ข้อมูลติดต่อ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-gray-500" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">สถานที่</div>
                    <div className="font-medium text-gray-900">{unit.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-gray-500" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">โทรศัพท์</div>
                    <div className="font-medium text-gray-900">{unit.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-500" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">อีเมล</div>
                    <div className="font-medium text-gray-900">{unit.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="text-gray-500" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">รหัสหน่วย</div>
                    <div className="font-medium text-gray-900">{unit.code}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // Render Main Component
  // ========================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="text-blue-600" size={28} />
                หน่วยขายทั้งหมด
              </h1>
              <p className="text-sm text-gray-500">จัดการและติดตามหน่วยขายทั้ง {units.length} หน่วย</p>
            </div>
            {/* <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Building2 size={18} />
              เพิ่มหน่วยขาย
            </button> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">ยอดขายรวมทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(sortedUnits.reduce((sum, u) => sum + u.sales, 0))}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <DollarSign className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">จำนวนพนักงานทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">
                  {sortedUnits.reduce((sum, u) => sum + u.employees, 0)} คน
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">อัตราเติบโตเฉลี่ย</p>
                <p className="text-2xl font-bold text-green-600">
                  +{(sortedUnits.reduce((sum, u) => sum + u.growth, 0) / sortedUnits.length).toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUnits.map((unit, index) => (
            <div 
              key={unit.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group border border-gray-100 hover:scale-105"
            >
              {/* Top Color Bar */}
              <div className={`h-2 ${index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}></div>
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-100 to-yellow-200' : 'bg-gradient-to-br from-blue-100 to-indigo-100'
                    }`}>
                      <Building2 className={`w-7 h-7 ${index === 0 ? 'text-yellow-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{unit.name}</h3>
                      <p className="text-sm text-gray-500">รหัส: {unit.code}</p>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="flex flex-col items-center">
                      <span className="text-3xl mb-1">🏆</span>
                      <span className="text-xs font-semibold text-yellow-600">อันดับ 1</span>
                    </div>
                  )}
                  {index > 0 && (
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      อันดับ #{index + 1}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">ยอดขาย</span>
                    <span className="text-base font-bold text-gray-900">{formatCurrency(unit.sales)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">พนักงาน</span>
                    <span className="text-sm font-semibold text-gray-900">{unit.employees} คน</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">เติบโต</span>
                    <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                      <TrendingUp size={14} />
                      +{unit.growth}%
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{unit.head}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{unit.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>{unit.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{unit.email}</span>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => setSelectedUnit(unit)}
                    className="w-full px-4 py-3 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group-hover:scale-105"
                  >
                    <span>ดูรายละเอียด</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Unit Detail Modal */}
      {selectedUnit && <UnitDetailModal unit={selectedUnit} />}
    </div>
  );
}