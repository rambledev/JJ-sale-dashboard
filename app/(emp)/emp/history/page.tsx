'use client';

import React, { useState } from 'react';
import {
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Award,
  Target,
  Clock,
  Package,
  MapPin,
  Mail,
  Phone,
  Building2,
  Trophy,
  Star,
  ThumbsUp,
  ChevronRight,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// ========================================
// TypeScript Interfaces & Types
// ========================================

type TimePeriod = 'day' | 'week' | 'month' | 'year';
type ProductSize = 'SS' | 'S' | 'M' | 'L' | 'XL';

interface EmployeeInfo {
  id: string;
  name: string;
  position: string;
  unit: string;
  email: string;
  phone: string;
  joinDate: string;
  employeeCode: string;
  profileImage?: string;
}

interface SalesRecord {
  id: string;
  date: string;
  time: string;
  channel: string;
  productSize: ProductSize;
  quantity: number;
  amount: number;
  customer: string;
  orderNumber: string;
}

interface TrendData {
  period: string;
  sales: number;
  orders: number;
  target: number;
}

interface ChannelSales {
  channel: string;
  sales: number;
  orders: number;
  percentage: number;
}

interface ProductSales {
  size: ProductSize;
  quantity: number;
  percentage: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

interface MonthlyTarget {
  month: string;
  target: number;
  achieved: number;
  percentage: number;
}

// ========================================
// Employee History Page Component
// ========================================

export default function EmployeeHistoryPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');

  // ========================================
  // Mock Employee Data
  // ========================================

  const employee: EmployeeInfo = {
    id: 'EMP001',
    name: 'สมชาย ใจดี',
    position: 'พนักงานขาย',
    unit: 'หน่วยงานขายภาคกลาง',
    email: 'somchai.jaidee@jongcharoen.com',
    phone: '081-234-5678',
    joinDate: '2022-01-15',
    employeeCode: 'JC-CENTRAL-001'
  };

  // ========================================
  // Mock Data Generator
  // ========================================

  const getTrendData = (period: TimePeriod): TrendData[] => {
    switch (period) {
      case 'day':
        return [
          { period: '00:00', sales: 5000, orders: 3, target: 8000 },
          { period: '04:00', sales: 3000, orders: 2, target: 8000 },
          { period: '08:00', sales: 12000, orders: 8, target: 8000 },
          { period: '12:00', sales: 18000, orders: 12, target: 8000 },
          { period: '16:00', sales: 22000, orders: 15, target: 8000 },
          { period: '20:00', sales: 15000, orders: 10, target: 8000 },
        ];
      case 'week':
        return [
          { period: 'จันทร์', sales: 85000, orders: 45, target: 80000 },
          { period: 'อังคาร', sales: 92000, orders: 52, target: 80000 },
          { period: 'พุธ', sales: 88000, orders: 48, target: 80000 },
          { period: 'พฤหัส', sales: 95000, orders: 55, target: 80000 },
          { period: 'ศุกร์', sales: 105000, orders: 62, target: 80000 },
          { period: 'เสาร์', sales: 120000, orders: 70, target: 80000 },
          { period: 'อาทิตย์', sales: 98000, orders: 58, target: 80000 },
        ];
      case 'month':
        return [
          { period: 'พ.ค.', sales: 680000, orders: 420, target: 650000 },
          { period: 'มิ.ย.', sales: 720000, orders: 450, target: 650000 },
          { period: 'ก.ค.', sales: 750000, orders: 480, target: 650000 },
          { period: 'ส.ค.', sales: 690000, orders: 440, target: 650000 },
          { period: 'ก.ย.', sales: 780000, orders: 510, target: 650000 },
          { period: 'ต.ค.', sales: 820000, orders: 540, target: 650000 },
        ];
      case 'year':
        return [
          { period: '2020', sales: 6500000, orders: 4200, target: 6000000 },
          { period: '2021', sales: 7200000, orders: 4800, target: 7000000 },
          { period: '2022', sales: 7800000, orders: 5200, target: 7500000 },
          { period: '2023', sales: 8500000, orders: 5800, target: 8000000 },
          { period: '2024', sales: 9200000, orders: 6400, target: 9000000 },
        ];
    }
  };

  // Mock sales history
  const getSalesHistory = (): SalesRecord[] => {
    const channels = ['TikTok', 'Shopee', 'Facebook/IG', 'Lazada', 'Line My Shop', 'Modern Trade', 'Event', 'Line OA'];
    const sizes: ProductSize[] = ['SS', 'S', 'M', 'L', 'XL'];
    const customers = ['บริษัท ABC', 'ร้าน XYZ', 'คุณสมหญิง', 'บริษัท DEF', 'คุณมานะ', 'ร้าน PQR'];

    return Array.from({ length: 50 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      return {
        id: `ORD${String(i + 1).padStart(5, '0')}`,
        date: date.toLocaleDateString('th-TH', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric'
        }),
        time: date.toLocaleTimeString('th-TH', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        channel: channels[Math.floor(Math.random() * channels.length)],
        productSize: sizes[Math.floor(Math.random() * sizes.length)],
        quantity: Math.floor(Math.random() * 20) + 1,
        amount: Math.floor(Math.random() * 30000) + 5000,
        customer: customers[Math.floor(Math.random() * customers.length)],
        orderNumber: `JC-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}-${String(i + 1).padStart(4, '0')}`
      };
    });
  };

  // Mock channel sales
  const channelSales: ChannelSales[] = [
    { channel: 'TikTok Shop', sales: 280000, orders: 150, percentage: 32 },
    { channel: 'Shopee', sales: 220000, orders: 120, percentage: 25 },
    { channel: 'Facebook/IG', sales: 180000, orders: 95, percentage: 20 },
    { channel: 'Lazada', sales: 90000, orders: 48, percentage: 10 },
    { channel: 'Line My Shop', sales: 60000, orders: 32, percentage: 7 },
    { channel: 'Modern Trade', sales: 30000, orders: 15, percentage: 3 },
    { channel: 'Event', sales: 15000, orders: 8, percentage: 2 },
    { channel: 'Line OA', sales: 5000, orders: 3, percentage: 1 },
  ];

  // Mock product sales
  const productSales: ProductSales[] = [
    { size: 'SS', quantity: 85, percentage: 15 },
    { size: 'S', quantity: 125, percentage: 22 },
    { size: 'M', quantity: 170, percentage: 30 },
    { size: 'L', quantity: 115, percentage: 20 },
    { size: 'XL', quantity: 75, percentage: 13 },
  ];

  // Mock achievements
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'ยอดขายเดือนยอดเยี่ยม',
      description: 'ทำยอดขายสูงสุดในเดือน ตุลาคม 2024',
      date: '2024-10-31',
      icon: '🏆'
    },
    {
      id: '2',
      title: 'ครบเป้า 3 เดือนติดต่อกัน',
      description: 'ทำยอดขายครบเป้า 3 เดือนติดกัน',
      date: '2024-10-15',
      icon: '🎯'
    },
    {
      id: '3',
      title: 'พนักงานยอดเยี่ยม Q3',
      description: 'ได้รับรางวัลพนักงานยอดเยี่ยมประจำไตรมาส 3',
      date: '2024-09-30',
      icon: '⭐'
    },
    {
      id: '4',
      title: 'ลูกค้าให้คะแนนสูงสุด',
      description: 'ได้รับคะแนนความพึงพอใจจากลูกค้า 5/5',
      date: '2024-08-20',
      icon: '💯'
    }
  ];

  // Mock monthly targets
  const monthlyTargets: MonthlyTarget[] = [
    { month: 'พ.ค.', target: 650000, achieved: 680000, percentage: 105 },
    { month: 'มิ.ย.', target: 650000, achieved: 720000, percentage: 111 },
    { month: 'ก.ค.', target: 650000, achieved: 750000, percentage: 115 },
    { month: 'ส.ค.', target: 650000, achieved: 690000, percentage: 106 },
    { month: 'ก.ย.', target: 650000, achieved: 780000, percentage: 120 },
    { month: 'ต.ค.', target: 650000, achieved: 820000, percentage: 126 },
  ];

  const trendData = getTrendData(selectedPeriod);
  const salesHistory = getSalesHistory();
  const currentData = trendData[trendData.length - 1];
  const previousData = trendData[trendData.length - 2];
  
  const totalSales = trendData.reduce((sum, d) => sum + d.sales, 0);
  const totalOrders = trendData.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = totalSales / totalOrders;
  const growthRate = previousData 
    ? ((currentData.sales - previousData.sales) / previousData.sales) * 100 
    : 0;

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

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  // ========================================
  // Render Component
  // ========================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <User className="text-blue-600" size={28} />
                ประวัติของฉัน
              </h1>
              <p className="text-sm text-gray-500">ข้อมูลและผลงานการขายของคุณ</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Employee Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                {employee.name.charAt(0)}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-1">{employee.name}</h2>
                  <p className="text-lg text-gray-600">{employee.position}</p>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  <Star className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="font-bold">ระดับ: Gold</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Building2 className="text-gray-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">หน่วยงาน</div>
                    <div className="font-medium text-gray-900">{employee.unit}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">อีเมล</div>
                    <div className="font-medium text-gray-900">{employee.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">โทรศัพท์</div>
                    <div className="font-medium text-gray-900">{employee.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-400" size={20} />
                  <div>
                    <div className="text-sm text-gray-500">วันที่เข้างาน</div>
                    <div className="font-medium text-gray-900">
                      {new Date(employee.joinDate).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Period Selector */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {(['day', 'week', 'month', 'year'] as TimePeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedPeriod === period
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {period === 'day' && '📅 รายวัน'}
              {period === 'week' && '📆 รายสัปดาห์'}
              {period === 'month' && '📊 รายเดือน'}
              {period === 'year' && '📈 รายปี'}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={32} />
              <div className={`flex items-center gap-1 text-sm ${
                growthRate > 0 ? 'text-green-200' : 'text-red-200'
              }`}>
                {growthRate > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(growthRate).toFixed(1)}%
              </div>
            </div>
            <div className="text-sm opacity-90 mb-1">ยอดขายรวม</div>
            <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart size={32} />
            </div>
            <div className="text-sm opacity-90 mb-1">ยอดสั่งซื้อ</div>
            <div className="text-2xl font-bold">{formatNumber(totalOrders)} ออเดอร์</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp size={32} />
            </div>
            <div className="text-sm opacity-90 mb-1">ค่าเฉลี่ย/ออเดอร์</div>
            <div className="text-2xl font-bold">{formatCurrency(Math.round(avgOrderValue))}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Award size={32} />
            </div>
            <div className="text-sm opacity-90 mb-1">รางวัล</div>
            <div className="text-2xl font-bold">{achievements.length} รางวัล</div>
          </div>
        </div>




        {/* Sales History */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Clock className="text-blue-600" size={24} />
            ประวัติการขาย (50 รายการล่าสุด)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">วันที่</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">เวลา</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">เลขที่ใบสั่งซื้อ</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ช่องทาง</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">ขนาด</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">จำนวน</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">ยอดขาย</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">ลูกค้า</th>
                </tr>
              </thead>
              <tbody>
                {salesHistory.map((record, index) => (
                  <tr key={record.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{record.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{record.time}</td>
                    <td className="py-3 px-4 text-sm font-mono text-gray-900">{record.orderNumber}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {record.channel}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-bold">
                        {record.productSize}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-sm text-gray-900">
                      {record.quantity} กระปุก
                    </td>
                    <td className="text-right py-3 px-4 font-semibold text-gray-900">
                      {formatCurrency(record.amount)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{record.customer}</td>
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