'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  ShoppingCart,
  Calendar,
  Download,
  BarChart3,
  PieChart as PieChartIcon,
  Building2,
  Package,
  AlertCircle,
  ChevronRight,
  X,
  ArrowLeft
} from 'lucide-react';
import {
  LineChart,
  Line,
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
  Area,
  AreaChart
} from 'recharts';

// ========================================
// TypeScript Interfaces & Types
// ========================================

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

type TimePeriod = 'day' | 'week' | 'month' | 'year';

interface KPICard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
  color: string;
  description: string;
}

interface TrendData {
  period: string;
  revenue: number;
  orders: number;
}

interface ChannelPerformance {
  channel: string;
  channelKey: SalesChannel;
  revenue: number;
  orders: number;
  avgOrderValue: number;
  growth: number;
  products: ProductDetail[];
  topSellingSize: ProductSize;
}

interface ProductDetail {
  size: ProductSize;
  quantity: number;
  unitPrice: number;
  revenue: number;
}

interface SalesUnitPerformance {
  id: number;
  unitName: string;
  unitCode: string;
  headName: string;
  memberCount: number;
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  topChannel: string;
  products: ProductDetail[];
  channelBreakdown: {
    channelKey: SalesChannel;
    channelName: string;
    revenue: number;
    orders: number;
  }[];
}

interface AccessoryData {
  name: string;
  quantity: number;
  unit: string;
  trend: number;
}

// ========================================
// CEO Dashboard Component
// ========================================

export default function CEODashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('month');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<SalesUnitPerformance | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<ChannelPerformance | null>(null);

  // ========================================
  // Mock Data Generator based on Period
  // ========================================

  const getTrendData = (period: TimePeriod): TrendData[] => {
    switch (period) {
      case 'day':
        return [
          { period: '00:00', revenue: 45000, orders: 48 },
          { period: '04:00', revenue: 32000, orders: 34 },
          { period: '08:00', revenue: 78000, orders: 85 },
          { period: '12:00', revenue: 125000, orders: 135 },
          { period: '16:00', revenue: 156000, orders: 168 },
          { period: '20:00', revenue: 98000, orders: 105 },
        ];
      case 'week':
        return [
          { period: 'จันทร์', revenue: 520000, orders: 560 },
          { period: 'อังคาร', revenue: 480000, orders: 515 },
          { period: 'พุธ', revenue: 650000, orders: 700 },
          { period: 'พฤหัส', revenue: 720000, orders: 775 },
          { period: 'ศุกร์', revenue: 890000, orders: 958 },
          { period: 'เสาร์', revenue: 1250000, orders: 1345 },
          { period: 'อาทิตย์', revenue: 1170000, orders: 1260 },
        ];
      case 'month':
        return [
          { period: 'พ.ค.', revenue: 4250000, orders: 4580 },
          { period: 'มิ.ย.', revenue: 4680000, orders: 5040 },
          { period: 'ก.ค.', revenue: 5120000, orders: 5515 },
          { period: 'ส.ค.', revenue: 4890000, orders: 5265 },
          { period: 'ก.ย.', revenue: 5340000, orders: 5750 },
          { period: 'ต.ค.', revenue: 5680000, orders: 6120 },
        ];
      case 'year':
        return [
          { period: '2020', revenue: 45000000, orders: 48500 },
          { period: '2021', revenue: 52000000, orders: 56000 },
          { period: '2022', revenue: 58000000, orders: 62500 },
          { period: '2023', revenue: 64000000, orders: 69000 },
          { period: '2024', revenue: 68000000, orders: 73300 },
        ];
    }
  };

  const trendData = getTrendData(selectedPeriod);
  const currentData = trendData[trendData.length - 1];
  const previousData = trendData[trendData.length - 2];

  // Calculate growth
  const revenueGrowth = previousData 
    ? ((currentData.revenue - previousData.revenue) / previousData.revenue) * 100
    : 0;
  const ordersGrowth = previousData
    ? ((currentData.orders - previousData.orders) / previousData.orders) * 100
    : 0;

  // ========================================
  // Sales Channels Performance
  // ========================================

  const channelPerformance: ChannelPerformance[] = [
    {
      channel: 'TikTok Shop',
      channelKey: 'TIKTOK',
      revenue: 1850000,
      orders: 3420,
      avgOrderValue: 541,
      growth: 28.5,
      topSellingSize: 'M',
      products: [
        { size: 'SS', quantity: 520, unitPrice: 500, revenue: 260000 },
        { size: 'S', quantity: 780, unitPrice: 550, revenue: 429000 },
        { size: 'M', quantity: 1100, unitPrice: 600, revenue: 660000 },
        { size: 'L', quantity: 720, unitPrice: 700, revenue: 504000 },
        { size: 'XL', quantity: 480, unitPrice: 750, revenue: 360000 },
      ]
    },
    {
      channel: 'Shopee',
      channelKey: 'SHOPEE',
      revenue: 1620000,
      orders: 2890,
      avgOrderValue: 561,
      growth: 15.2,
      topSellingSize: 'M',
      products: [
        { size: 'SS', quantity: 450, unitPrice: 500, revenue: 225000 },
        { size: 'S', quantity: 680, unitPrice: 550, revenue: 374000 },
        { size: 'M', quantity: 950, unitPrice: 600, revenue: 570000 },
        { size: 'L', quantity: 620, unitPrice: 700, revenue: 434000 },
        { size: 'XL', quantity: 410, unitPrice: 750, revenue: 307500 },
      ]
    },
    {
      channel: 'Facebook/Instagram (VRICH)',
      channelKey: 'FACEBOOK_INSTAGRAM_VRICH',
      revenue: 980000,
      orders: 1450,
      avgOrderValue: 676,
      growth: 22.8,
      topSellingSize: 'L',
      products: [
        { size: 'SS', quantity: 220, unitPrice: 500, revenue: 110000 },
        { size: 'S', quantity: 340, unitPrice: 550, revenue: 187000 },
        { size: 'M', quantity: 480, unitPrice: 600, revenue: 288000 },
        { size: 'L', quantity: 520, unitPrice: 700, revenue: 364000 },
        { size: 'XL', quantity: 280, unitPrice: 750, revenue: 210000 },
      ]
    },
    {
      channel: 'Lazada',
      channelKey: 'LAZADA',
      revenue: 720000,
      orders: 1280,
      avgOrderValue: 563,
      growth: -5.3,
      topSellingSize: 'S',
      products: [
        { size: 'SS', quantity: 180, unitPrice: 500, revenue: 90000 },
        { size: 'S', quantity: 420, unitPrice: 550, revenue: 231000 },
        { size: 'M', quantity: 360, unitPrice: 600, revenue: 216000 },
        { size: 'L', quantity: 240, unitPrice: 700, revenue: 168000 },
        { size: 'XL', quantity: 160, unitPrice: 750, revenue: 120000 },
      ]
    },
    {
      channel: 'Line My Shop',
      channelKey: 'LINE_MY_SHOP',
      revenue: 560000,
      orders: 890,
      avgOrderValue: 629,
      growth: 12.4,
      topSellingSize: 'M',
      products: [
        { size: 'SS', quantity: 140, unitPrice: 500, revenue: 70000 },
        { size: 'S', quantity: 210, unitPrice: 550, revenue: 115500 },
        { size: 'M', quantity: 290, unitPrice: 600, revenue: 174000 },
        { size: 'L', quantity: 190, unitPrice: 700, revenue: 133000 },
        { size: 'XL', quantity: 130, unitPrice: 750, revenue: 97500 },
      ]
    },
    {
      channel: 'Modern Trade',
      channelKey: 'MODERN_TRADE',
      revenue: 450000,
      orders: 620,
      avgOrderValue: 726,
      growth: 8.7,
      topSellingSize: 'L',
      products: [
        { size: 'SS', quantity: 90, unitPrice: 500, revenue: 45000 },
        { size: 'S', quantity: 150, unitPrice: 550, revenue: 82500 },
        { size: 'M', quantity: 200, unitPrice: 600, revenue: 120000 },
        { size: 'L', quantity: 240, unitPrice: 700, revenue: 168000 },
        { size: 'XL', quantity: 110, unitPrice: 750, revenue: 82500 },
      ]
    },
    {
      channel: 'Event',
      channelKey: 'EVENT',
      revenue: 320000,
      orders: 450,
      avgOrderValue: 711,
      growth: 45.2,
      topSellingSize: 'M',
      products: [
        { size: 'SS', quantity: 70, unitPrice: 500, revenue: 35000 },
        { size: 'S', quantity: 110, unitPrice: 550, revenue: 60500 },
        { size: 'M', quantity: 150, unitPrice: 600, revenue: 90000 },
        { size: 'L', quantity: 120, unitPrice: 700, revenue: 84000 },
        { size: 'XL', quantity: 80, unitPrice: 750, revenue: 60000 },
      ]
    },
    {
      channel: 'Line OA',
      channelKey: 'LINE_OA',
      revenue: 180000,
      orders: 340,
      avgOrderValue: 529,
      growth: 18.9,
      topSellingSize: 'S',
      products: [
        { size: 'SS', quantity: 50, unitPrice: 500, revenue: 25000 },
        { size: 'S', quantity: 110, unitPrice: 550, revenue: 60500 },
        { size: 'M', quantity: 80, unitPrice: 600, revenue: 48000 },
        { size: 'L', quantity: 60, unitPrice: 700, revenue: 42000 },
        { size: 'XL', quantity: 40, unitPrice: 750, revenue: 30000 },
      ]
    }
  ];

  // ========================================
  // Sales Units Performance
  // ========================================

  const salesUnitsPerformance: SalesUnitPerformance[] = [
    {
      id: 1,
      unitName: 'หน่วยงานขายภาคกลาง',
      unitCode: 'CENTRAL',
      headName: 'สมชาย ใจดี',
      memberCount: 12,
      totalRevenue: 4250000,
      totalOrders: 4520,
      avgOrderValue: 940,
      topChannel: 'TikTok',
      products: [
        { size: 'SS', quantity: 850, unitPrice: 500, revenue: 425000 },
        { size: 'S', quantity: 1200, unitPrice: 550, revenue: 660000 },
        { size: 'M', quantity: 1680, unitPrice: 600, revenue: 1008000 },
        { size: 'L', quantity: 1120, unitPrice: 700, revenue: 784000 },
        { size: 'XL', quantity: 750, unitPrice: 750, revenue: 562500 },
      ],
      channelBreakdown: [
        { channelKey: 'TIKTOK', channelName: 'TikTok Shop', revenue: 1200000, orders: 1280 },
        { channelKey: 'SHOPEE', channelName: 'Shopee', revenue: 950000, orders: 1015 },
        { channelKey: 'FACEBOOK_INSTAGRAM_VRICH', channelName: 'Facebook/IG', revenue: 680000, orders: 725 },
        { channelKey: 'LAZADA', channelName: 'Lazada', revenue: 520000, orders: 555 },
        { channelKey: 'LINE_MY_SHOP', channelName: 'Line My Shop', revenue: 380000, orders: 405 },
        { channelKey: 'MODERN_TRADE', channelName: 'Modern Trade', revenue: 280000, orders: 300 },
        { channelKey: 'EVENT', channelName: 'Event', revenue: 160000, orders: 170 },
        { channelKey: 'LINE_OA', channelName: 'Line OA', revenue: 80000, orders: 70 },
      ]
    },
    {
      id: 2,
      unitName: 'หน่วยงานขายภาคเหนือ',
      unitCode: 'NORTH',
      headName: 'นภัสสร แสนดี',
      memberCount: 8,
      totalRevenue: 3150000,
      totalOrders: 3280,
      avgOrderValue: 960,
      topChannel: 'Shopee',
      products: [
        { size: 'SS', quantity: 620, unitPrice: 500, revenue: 310000 },
        { size: 'S', quantity: 890, unitPrice: 550, revenue: 489500 },
        { size: 'M', quantity: 1250, unitPrice: 600, revenue: 750000 },
        { size: 'L', quantity: 850, unitPrice: 700, revenue: 595000 },
        { size: 'XL', quantity: 580, unitPrice: 750, revenue: 435000 },
      ],
      channelBreakdown: [
        { channelKey: 'SHOPEE', channelName: 'Shopee', revenue: 980000, orders: 1020 },
        { channelKey: 'TIKTOK', channelName: 'TikTok Shop', revenue: 820000, orders: 855 },
        { channelKey: 'FACEBOOK_INSTAGRAM_VRICH', channelName: 'Facebook/IG', revenue: 450000, orders: 470 },
        { channelKey: 'LAZADA', channelName: 'Lazada', revenue: 350000, orders: 365 },
        { channelKey: 'LINE_MY_SHOP', channelName: 'Line My Shop', revenue: 280000, orders: 290 },
        { channelKey: 'MODERN_TRADE', channelName: 'Modern Trade', revenue: 150000, orders: 160 },
        { channelKey: 'EVENT', channelName: 'Event', revenue: 80000, orders: 85 },
        { channelKey: 'LINE_OA', channelName: 'Line OA', revenue: 40000, orders: 35 },
      ]
    },
    {
      id: 3,
      unitName: 'หน่วยงานขายภาคใต้',
      unitCode: 'SOUTH',
      headName: 'อนุชา สมบูรณ์',
      memberCount: 10,
      totalRevenue: 2800000,
      totalOrders: 2890,
      avgOrderValue: 969,
      topChannel: 'Facebook/IG',
      products: [
        { size: 'SS', quantity: 550, unitPrice: 500, revenue: 275000 },
        { size: 'S', quantity: 780, unitPrice: 550, revenue: 429000 },
        { size: 'M', quantity: 1100, unitPrice: 600, revenue: 660000 },
        { size: 'L', quantity: 750, unitPrice: 700, revenue: 525000 },
        { size: 'XL', quantity: 510, unitPrice: 750, revenue: 382500 },
      ],
      channelBreakdown: [
        { channelKey: 'FACEBOOK_INSTAGRAM_VRICH', channelName: 'Facebook/IG', revenue: 750000, orders: 780 },
        { channelKey: 'TIKTOK', channelName: 'TikTok Shop', revenue: 620000, orders: 645 },
        { channelKey: 'SHOPEE', channelName: 'Shopee', revenue: 510000, orders: 530 },
        { channelKey: 'LAZADA', channelName: 'Lazada', revenue: 380000, orders: 395 },
        { channelKey: 'LINE_MY_SHOP', channelName: 'Line My Shop', revenue: 280000, orders: 290 },
        { channelKey: 'MODERN_TRADE', channelName: 'Modern Trade', revenue: 150000, orders: 155 },
        { channelKey: 'EVENT', channelName: 'Event', revenue: 80000, orders: 65 },
        { channelKey: 'LINE_OA', channelName: 'Line OA', revenue: 30000, orders: 30 },
      ]
    },
    {
      id: 4,
      unitName: 'หน่วยงานขายภาคตะวันออกเฉียงเหนือ',
      unitCode: 'NORTHEAST',
      headName: 'วีระ มั่นคง',
      memberCount: 15,
      totalRevenue: 5480000,
      totalOrders: 5650,
      avgOrderValue: 970,
      topChannel: 'TikTok',
      products: [
        { size: 'SS', quantity: 1100, unitPrice: 500, revenue: 550000 },
        { size: 'S', quantity: 1580, unitPrice: 550, revenue: 869000 },
        { size: 'M', quantity: 2200, unitPrice: 600, revenue: 1320000 },
        { size: 'L', quantity: 1500, unitPrice: 700, revenue: 1050000 },
        { size: 'XL', quantity: 1020, unitPrice: 750, revenue: 765000 },
      ],
      channelBreakdown: [
        { channelKey: 'TIKTOK', channelName: 'TikTok Shop', revenue: 1650000, orders: 1720 },
        { channelKey: 'SHOPEE', channelName: 'Shopee', revenue: 1280000, orders: 1335 },
        { channelKey: 'FACEBOOK_INSTAGRAM_VRICH', channelName: 'Facebook/IG', revenue: 890000, orders: 925 },
        { channelKey: 'LAZADA', channelName: 'Lazada', revenue: 620000, orders: 645 },
        { channelKey: 'LINE_MY_SHOP', channelName: 'Line My Shop', revenue: 480000, orders: 500 },
        { channelKey: 'MODERN_TRADE', channelName: 'Modern Trade', revenue: 320000, orders: 335 },
        { channelKey: 'EVENT', channelName: 'Event', revenue: 180000, orders: 140 },
        { channelKey: 'LINE_OA', channelName: 'Line OA', revenue: 60000, orders: 50 },
      ]
    }
  ];

  // ========================================
  // Calculations
  // ========================================

  const totalRevenue = channelPerformance.reduce((sum, ch) => sum + ch.revenue, 0);
  const totalOrders = channelPerformance.reduce((sum, ch) => sum + ch.orders, 0);
  const totalCustomers = Math.floor(totalOrders * 0.65);
  const avgOrderValue = totalRevenue / totalOrders;

  // KPI Cards
  const kpiCards: KPICard[] = [
    {
      title: `รายได้รวม${selectedPeriod === 'day' ? 'วันนี้' : selectedPeriod === 'week' ? 'สัปดาห์นี้' : selectedPeriod === 'month' ? 'เดือนนี้' : 'ปีนี้'}`,
      value: `฿${(currentData.revenue / 1000000).toFixed(2)}M`,
      change: `${revenueGrowth > 0 ? '+' : ''}${revenueGrowth.toFixed(1)}%`,
      isPositive: revenueGrowth > 0,
      icon: DollarSign,
      color: 'bg-blue-500',
      description: `เทียบกับ${selectedPeriod === 'day' ? 'เมื่อวาน' : selectedPeriod === 'week' ? 'สัปดาห์ที่แล้ว' : selectedPeriod === 'month' ? 'เดือนที่แล้ว' : 'ปีที่แล้ว'}`
    },
    {
      title: 'ยอดสั่งซื้อทั้งหมด',
      value: currentData.orders.toLocaleString(),
      change: `${ordersGrowth > 0 ? '+' : ''}${ordersGrowth.toFixed(1)}%`,
      isPositive: ordersGrowth > 0,
      icon: ShoppingCart,
      color: 'bg-green-500',
      description: 'คำสั่งซื้อที่เสร็จสมบูรณ์'
    },
    {
      title: 'มูลค่าเฉลี่ย/ออเดอร์',
      value: `฿${Math.round(avgOrderValue).toLocaleString()}`,
      change: '+8.7%',
      isPositive: true,
      icon: TrendingUp,
      color: 'bg-purple-500',
      description: 'ค่าเฉลี่ยต่อคำสั่งซื้อ'
    }
  ];

  // Chart colors
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  // ========================================
  // Helper Functions
  // ========================================

  const formatCurrency = (amount: number): string => {
    return `฿${amount.toLocaleString()}`;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    console.log(`Exporting to ${format}...`);
    alert(`กำลังส่งออกข้อมูลเป็นไฟล์ ${format.toUpperCase()}...`);
    setShowExportMenu(false);
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
  // Unit Detail Modal
  // ========================================

  const UnitDetailModal = ({ unit }: { unit: SalesUnitPerformance }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedUnit(null)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold">{unit.unitName}</h2>
                <p className="text-blue-100 text-sm mt-1">
                  หัวหน้าหน่วย: {unit.headName} • สมาชิก: {unit.memberCount} คน
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

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="text-sm text-blue-600 mb-1">ยอดขายรวม</div>
                <div className="text-2xl font-bold text-blue-900">
                  {formatCurrency(unit.totalRevenue)}
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">ยอดสั่งซื้อ</div>
                <div className="text-2xl font-bold text-green-900">
                  {formatNumber(unit.totalOrders)} ออเดอร์
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="text-sm text-purple-600 mb-1">ค่าเฉลี่ย/ออเดอร์</div>
                <div className="text-2xl font-bold text-purple-900">
                  {formatCurrency(unit.avgOrderValue)}
                </div>
              </div>
            </div>

            {/* Products Sold */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="text-orange-600" size={24} />
                สินค้าที่ขาย (แยกตามขนาด)
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">ขนาด</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">จำนวน</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">ราคา/หน่วย</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">รายได้</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">สัดส่วน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unit.products.map((product, index) => {
                      const percentage = (product.revenue / unit.totalRevenue) * 100;
                      return (
                        <tr key={product.size} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></div>
                              <span className="font-semibold text-gray-900">
                                ขนาด {product.size}
                              </span>
                            </div>
                          </td>
                          <td className="text-right py-3 px-4 text-gray-900">
                            {formatNumber(product.quantity)} กระปุก
                          </td>
                          <td className="text-right py-3 px-4 text-gray-700">
                            {formatCurrency(product.unitPrice)}
                          </td>
                          <td className="text-right py-3 px-4 font-semibold text-gray-900">
                            {formatCurrency(product.revenue)}
                          </td>
                          <td className="text-right py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${percentage}%`,
                                    backgroundColor: COLORS[index % COLORS.length]
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold text-gray-700 w-12">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-blue-50 border-t-2 border-blue-200">
                    <tr>
                      <td className="py-3 px-4 font-bold text-gray-900">รวม</td>
                      <td className="text-right py-3 px-4 font-bold text-blue-600">
                        {formatNumber(unit.products.reduce((sum, p) => sum + p.quantity, 0))} กระปุก
                      </td>
                      <td></td>
                      <td className="text-right py-3 px-4 font-bold text-blue-600">
                        {formatCurrency(unit.totalRevenue)}
                      </td>
                      <td className="text-right py-3 px-4 font-bold text-blue-600">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Channel Breakdown */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={24} />
                ยอดขายแยกตามช่องทาง
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unit.channelBreakdown
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((channel, index) => {
                    const percentage = (channel.revenue / unit.totalRevenue) * 100;
                    return (
                      <div
                        key={channel.channelKey}
                        className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="font-semibold text-gray-900">
                              {channel.channelName}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-600">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">รายได้:</span>
                            <span className="font-bold text-gray-900">
                              {formatCurrency(channel.revenue)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">ออเดอร์:</span>
                            <span className="font-semibold text-gray-700">
                              {formatNumber(channel.orders)} ออเดอร์
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // Channel Detail Modal
  // ========================================

  const ChannelDetailModal = ({ channel }: { channel: ChannelPerformance }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedChannel(null)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h2 className="text-2xl font-bold">{channel.channel}</h2>
                <p className="text-purple-100 text-sm mt-1">
                  รายละเอียดการขายผ่านช่องทาง{channel.channel}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedChannel(null)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                <div className="text-sm text-purple-600 mb-1">ยอดขายรวม</div>
                <div className="text-2xl font-bold text-purple-900">
                  {formatCurrency(channel.revenue)}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                <div className="text-sm text-blue-600 mb-1">ยอดสั่งซื้อ</div>
                <div className="text-2xl font-bold text-blue-900">
                  {formatNumber(channel.orders)} ออเดอร์
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">ค่าเฉลี่ย/ออเดอร์</div>
                <div className="text-2xl font-bold text-green-900">
                  {formatCurrency(channel.avgOrderValue)}
                </div>
              </div>
              <div className={`bg-gradient-to-br rounded-xl p-4 border ${
                channel.growth > 0
                  ? 'from-emerald-50 to-emerald-100 border-emerald-200'
                  : 'from-red-50 to-red-100 border-red-200'
              }`}>
                <div className={`text-sm mb-1 ${channel.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  อัตราเติบโต
                </div>
                <div className={`text-2xl font-bold flex items-center gap-2 ${
                  channel.growth > 0 ? 'text-emerald-900' : 'text-red-900'
                }`}>
                  {channel.growth > 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                  {channel.growth > 0 ? '+' : ''}{channel.growth.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Products Sold */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="text-orange-600" size={24} />
                สินค้าที่ขายผ่านช่องทาง{channel.channel}
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">ขนาด</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">จำนวน</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">ราคา/หน่วย</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">รายได้</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">สัดส่วน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channel.products
                      .sort((a, b) => b.revenue - a.revenue)
                      .map((product, index) => {
                        const percentage = (product.revenue / channel.revenue) * 100;
                        const isTopSelling = product.size === channel.topSellingSize;
                        return (
                          <tr
                            key={product.size}
                            className={`border-t border-gray-100 hover:bg-gray-50 ${
                              isTopSelling ? 'bg-yellow-50' : ''
                            }`}
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className={`font-semibold ${isTopSelling ? 'text-yellow-700' : 'text-gray-900'}`}>
                                  ขนาด {product.size}
                                  {isTopSelling && <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">ขายดีที่สุด</span>}
                                </span>
                              </div>
                            </td>
                            <td className="text-right py-3 px-4 text-gray-900">
                              {formatNumber(product.quantity)} กระปุก
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700">
                              {formatCurrency(product.unitPrice)}
                            </td>
                            <td className="text-right py-3 px-4 font-semibold text-gray-900">
                              {formatCurrency(product.revenue)}
                            </td>
                            <td className="text-right py-3 px-4">
                              <div className="flex items-center justify-end gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="h-2 rounded-full"
                                    style={{
                                      width: `${percentage}%`,
                                      backgroundColor: COLORS[index % COLORS.length]
                                    }}
                                  ></div>
                                </div>
                                <span className="text-sm font-semibold text-gray-700 w-12">
                                  {percentage.toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot className="bg-purple-50 border-t-2 border-purple-200">
                    <tr>
                      <td className="py-3 px-4 font-bold text-gray-900">รวม</td>
                      <td className="text-right py-3 px-4 font-bold text-purple-600">
                        {formatNumber(channel.products.reduce((sum, p) => sum + p.quantity, 0))} กระปุก
                      </td>
                      <td></td>
                      <td className="text-right py-3 px-4 font-bold text-purple-600">
                        {formatCurrency(channel.revenue)}
                      </td>
                      <td className="text-right py-3 px-4 font-bold text-purple-600">100%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Product Size Distribution Chart */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <PieChartIcon className="text-pink-600" size={24} />
                การกระจายยอดขายตามขนาดสินค้า
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={channel.products}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry: any) => {
                        const size = entry.size as ProductSize;
                        const revenue = entry.revenue as number;
                        return `${size}: ฿${(revenue / 1000).toFixed(0)}K`;
                      }}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="revenue"
                    >
                      {channel.products.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`฿${value.toLocaleString()}`, 'รายได้']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // Render Component
  // ========================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Building2 className="text-blue-600" size={40} />
                CEO Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                บริษัท จงเจริญ 1977 - สรุปยอดขาย{getPeriodLabel(selectedPeriod)}
              </p>
            </div>

            {/* Export Button */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Download size={20} />
                ส่งออกรายงาน
              </button>
              
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-10">
                  <button
                    onClick={() => handleExport('excel')}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    📊 ส่งออกเป็น Excel
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    📄 ส่งออกเป็น PDF
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Period Selector */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {(['day', 'week', 'month', 'year'] as TimePeriod[]).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                {period === 'day' && '📅 รายวัน'}
                {period === 'week' && '📆 รายสัปดาห์'}
                {period === 'month' && '📊 รายเดือน'}
                {period === 'year' && '📈 รายปี'}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpiCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-100 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.color} p-3 rounded-xl shadow-lg`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <div
                    className={`flex items-center gap-1 font-semibold ${
                      card.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {card.isPositive ? (
                      <TrendingUp size={18} />
                    ) : (
                      <TrendingDown size={18} />
                    )}
                    <span className="text-base">{card.change}</span>
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm mb-2">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
                <p className="text-xs text-gray-400">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={28} />
              แนวโน้มรายได้ ({getPeriodLabel(selectedPeriod)})
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={400}>
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
                style={{ fontSize: '14px', fontWeight: 500 }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '14px' }}
                tickFormatter={(value) => {
                  if (selectedPeriod === 'year') {
                    return `${(value / 1000000).toFixed(0)}M`;
                  }
                  return `${(value / 1000).toFixed(0)}K`;
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
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
                name="รายได้"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales Channels Detailed Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Package className="text-indigo-600" size={24} />
            รายละเอียดช่องทางการขาย (8 ช่องทาง)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    ช่องทาง
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">
                    รายได้
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">
                    ยอดสั่งซื้อ
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">
                    ค่าเฉลี่ย/ออเดอร์
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">
                    อัตราเติบโต
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    ขายดีที่สุด
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">
                    ดูรายละเอียด
                  </th>
                </tr>
              </thead>
              <tbody>
                {channelPerformance
                  .sort((a, b) => b.revenue - a.revenue)
                  .map((channel, index) => (
                    <tr
                      key={channel.channelKey}
                      className="border-b border-gray-100 hover:bg-purple-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span className="font-medium text-gray-900">
                            {channel.channel}
                          </span>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4 font-semibold text-gray-900">
                        {formatCurrency(channel.revenue)}
                      </td>
                      <td className="text-right py-4 px-4 text-gray-700">
                        {formatNumber(channel.orders)}
                      </td>
                      <td className="text-right py-4 px-4 text-gray-700">
                        {formatCurrency(channel.avgOrderValue)}
                      </td>
                      <td className="text-right py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold ${
                            channel.growth > 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {channel.growth > 0 ? (
                            <TrendingUp size={16} />
                          ) : (
                            <TrendingDown size={16} />
                          )}
                          {channel.growth > 0 ? '+' : ''}
                          {channel.growth.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          ขนาด {channel.topSellingSize}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <button
                          onClick={() => setSelectedChannel(channel)}
                          className="inline-flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow hover:shadow-lg"
                        >
                          <span>ดูรายละเอียด</span>
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="bg-purple-50 font-bold border-t-2 border-purple-200">
                  <td className="py-4 px-4">รวมทั้งหมด</td>
                  <td className="text-right py-4 px-4 text-purple-600">
                    {formatCurrency(totalRevenue)}
                  </td>
                  <td className="text-right py-4 px-4 text-purple-600">
                    {formatNumber(totalOrders)}
                  </td>
                  <td className="text-right py-4 px-4 text-purple-600">
                    {formatCurrency(Math.round(avgOrderValue))}
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PieChartIcon className="text-purple-600" size={24} />
              ยอดขายตามช่องทาง (8 ช่องทาง)
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={channelPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  type="number"
                  stroke="#6b7280"
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <YAxis
                  type="category"
                  dataKey="channel"
                  stroke="#6b7280"
                  width={180}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px'
                  }}
                  formatter={(value: number) => [`฿${value.toLocaleString()}`, 'รายได้']}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PieChartIcon className="text-pink-600" size={24} />
              สัดส่วนรายได้ช่องทาง
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={channelPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => {
                    const channel = entry.channel as string;
                    const revenue = entry.revenue as number;
                    return `${channel.split(' ')[0]}: ${((revenue / totalRevenue) * 100).toFixed(1)}%`;
                  }}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {channelPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`฿${value.toLocaleString()}`, 'รายได้']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Units Performance Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Building2 className="text-teal-600" size={24} />
            ผลงานหน่วยงานขาย (4 ภาค)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    หน่วยงาน
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    หัวหน้า
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">
                    สมาชิก
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">
                    ยอดขายรวม
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">
                    ยอดสั่งซื้อ
                  </th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-700">
                    ค่าเฉลี่ย/ออเดอร์
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-700">
                    ช่องทางหลัก
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-700">
                    ดูรายละเอียด
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesUnitsPerformance
                  .sort((a, b) => b.totalRevenue - a.totalRevenue)
                  .map((unit) => (
                    <tr
                      key={unit.id}
                      className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {unit.unitName}
                          </div>
                          <div className="text-sm text-gray-500">{unit.unitCode}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{unit.headName}</td>
                      <td className="text-center py-4 px-4">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {unit.memberCount} คน
                        </span>
                      </td>
                      <td className="text-right py-4 px-4 font-bold text-blue-600">
                        {formatCurrency(unit.totalRevenue)}
                      </td>
                      <td className="text-right py-4 px-4 font-semibold text-gray-900">
                        {formatNumber(unit.totalOrders)}
                      </td>
                      <td className="text-right py-4 px-4 text-gray-700">
                        {formatCurrency(unit.avgOrderValue)}
                      </td>
                      <td className="py-4 px-4 text-gray-700">{unit.topChannel}</td>
                      <td className="text-center py-4 px-4">
                        <button
                          onClick={() => setSelectedUnit(unit)}
                          className="inline-flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow hover:shadow-lg"
                        >
                          <span>ดูรายละเอียด</span>
                          <ChevronRight size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot className="bg-blue-50 border-t-2 border-blue-200">
                <tr>
                  <td className="py-4 px-4 font-bold text-gray-900" colSpan={3}>
                    รวมทั้งหมด
                  </td>
                  <td className="text-right py-4 px-4 font-bold text-blue-600">
                    {formatCurrency(
                      salesUnitsPerformance.reduce((sum, u) => sum + u.totalRevenue, 0)
                    )}
                  </td>
                  <td className="text-right py-4 px-4 font-bold text-blue-600">
                    {formatNumber(
                      salesUnitsPerformance.reduce((sum, u) => sum + u.totalOrders, 0)
                    )}
                  </td>
                  <td colSpan={3}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold mb-2">สรุปภาพรวม{getPeriodLabel(selectedPeriod)}</h3>
            <p className="text-blue-100">ข้อมูล ณ วันที่ {new Date().toLocaleDateString('th-TH')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">
                {formatNumber(currentData.orders)}
              </div>
              <div className="text-blue-100">ยอดสั่งซื้อทั้งหมด</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                ฿{(currentData.revenue / 1000000).toFixed(2)}M
              </div>
              <div className="text-blue-100">รายได้รวม</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {salesUnitsPerformance.length}
              </div>
              <div className="text-blue-100">หน่วยงานขาย</div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>อัพเดทล่าสุด: {new Date().toLocaleString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })} น.</p>
        </div>
      </div>

      {/* Unit Detail Modal */}
      {selectedUnit && <UnitDetailModal unit={selectedUnit} />}
      
      {/* Channel Detail Modal */}
      {selectedChannel && <ChannelDetailModal channel={selectedChannel} />}
    </div>
  );
}