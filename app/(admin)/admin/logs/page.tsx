'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  User,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Settings,
  LogIn,
  LogOut
} from 'lucide-react';

// Mock data สำหรับ Activity Log
const activityLogs = [
  {
    id: 1,
    timestamp: '2025-10-24 09:15:32',
    user: 'สมชาย ใจดี',
    role: 'EMPLOYEE',
    action: 'เพิ่มข้อมูลยอดขาย',
    module: 'Sales Entry',
    details: 'เพิ่มยอดขาย TikTok Shop วันที่ 24/10/2025',
    status: 'success',
    ipAddress: '192.168.1.100'
  },
  {
    id: 2,
    timestamp: '2025-10-24 09:10:18',
    user: 'สุภาพร มานะ',
    role: 'HEAD',
    action: 'ดูรายงาน',
    module: 'Reports',
    details: 'ดูรายงานสรุปยอดขายทีม A',
    status: 'success',
    ipAddress: '192.168.1.101'
  },
  {
    id: 3,
    timestamp: '2025-10-24 08:55:42',
    user: 'ธนวัฒน์ สมบูรณ์',
    role: 'ADMIN',
    action: 'แก้ไขผู้ใช้',
    module: 'User Management',
    details: 'แก้ไขข้อมูลผู้ใช้: สมชาย ใจดี',
    status: 'success',
    ipAddress: '192.168.1.50'
  },
  {
    id: 4,
    timestamp: '2025-10-24 08:45:20',
    user: 'ประภาพร วงศ์ใหญ่',
    role: 'EMPLOYEE',
    action: 'ลบข้อมูล',
    module: 'Sales Entry',
    details: 'พยายามลบยอดขายที่ไม่ได้รับอนุญาต',
    status: 'failed',
    ipAddress: '192.168.1.102'
  },
  {
    id: 5,
    timestamp: '2025-10-24 08:30:15',
    user: 'วิชัย เจริญ',
    role: 'CEO',
    action: 'ดาวน์โหลดรายงาน',
    module: 'Reports',
    details: 'ดาวน์โหลดรายงานภาพรวมประจำเดือน',
    status: 'success',
    ipAddress: '192.168.1.10'
  },
  {
    id: 6,
    timestamp: '2025-10-24 08:15:08',
    user: 'นภัสสร แสนดี',
    role: 'HEAD',
    action: 'อนุมัติข้อมูล',
    module: 'Sales Entry',
    details: 'อนุมัติยอดขาย Shopee วันที่ 23/10/2025',
    status: 'success',
    ipAddress: '192.168.1.103'
  },
  {
    id: 7,
    timestamp: '2025-10-24 08:00:00',
    user: 'ธนวัฒน์ สมบูรณ์',
    role: 'ADMIN',
    action: 'เข้าสู่ระบบ',
    module: 'Authentication',
    details: 'เข้าสู่ระบบสำเร็จ',
    status: 'success',
    ipAddress: '192.168.1.50'
  },
  {
    id: 8,
    timestamp: '2025-10-23 22:30:45',
    user: 'System',
    role: 'SYSTEM',
    action: 'สำรองข้อมูล',
    module: 'System',
    details: 'สำรองข้อมูลอัตโนมัติประจำวัน',
    status: 'success',
    ipAddress: 'system'
  },
  {
    id: 9,
    timestamp: '2025-10-23 18:45:12',
    user: 'สมชาย ใจดี',
    role: 'EMPLOYEE',
    action: 'ออกจากระบบ',
    module: 'Authentication',
    details: 'ออกจากระบบ',
    status: 'success',
    ipAddress: '192.168.1.100'
  },
  {
    id: 10,
    timestamp: '2025-10-23 17:20:30',
    user: 'ธนวัฒน์ สมบูรณ์',
    role: 'ADMIN',
    action: 'เปลี่ยนสิทธิ์',
    module: 'Permissions',
    details: 'เปลี่ยนสิทธิ์ผู้ใช้: ประภาพร วงศ์ใหญ่ จาก EMPLOYEE เป็น HEAD',
    status: 'success',
    ipAddress: '192.168.1.50'
  }
];

const actionIcons: any = {
  'เพิ่มข้อมูลยอดขาย': FileText,
  'ดูรายงาน': Eye,
  'แก้ไขผู้ใช้': Edit,
  'ลบข้อมูล': Trash2,
  'ดาวน์โหลดรายงาน': Download,
  'อนุมัติข้อมูล': CheckCircle,
  'เข้าสู่ระบบ': LogIn,
  'สำรองข้อมูล': Settings,
  'ออกจากระบบ': LogOut,
  'เปลี่ยนสิทธิ์': Settings
};

const statusColors: any = {
  success: 'bg-green-100 text-green-700 border-green-300',
  failed: 'bg-red-100 text-red-700 border-red-300',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-300'
};

const roleColors: any = {
  CEO: 'bg-purple-100 text-purple-700',
  HEAD: 'bg-blue-100 text-blue-700',
  EMPLOYEE: 'bg-teal-100 text-teal-700',
  ADMIN: 'bg-orange-100 text-orange-700',
  SYSTEM: 'bg-gray-100 text-gray-700'
};

export default function ActivityLogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterModule, setFilterModule] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const filteredLogs = activityLogs.filter(log => {
    const matchSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'all' || log.role === filterRole;
    const matchStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchModule = filterModule === 'all' || log.module === filterModule;
    
    return matchSearch && matchRole && matchStatus && matchModule;
  });

  const handleExport = () => {
    alert('กำลังส่งออกข้อมูล Activity Log...');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-600 mt-1">บันทึกการใช้งานระบบทั้งหมด</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          ส่งออกข้อมูล
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">กิจกรรมวันนี้</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">247</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">สำเร็จ</p>
              <p className="text-2xl font-bold text-green-600 mt-1">235</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ล้มเหลว</p>
              <p className="text-2xl font-bold text-red-600 mt-1">8</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ผู้ใช้ออนไลน์</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">23</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ค้นหา
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ค้นหาผู้ใช้, การกระทำ, รายละเอียด..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter by Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              บทบาท
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">ทั้งหมด</option>
              <option value="CEO">CEO</option>
              <option value="HEAD">HEAD</option>
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SYSTEM">SYSTEM</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              สถานะ
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">ทั้งหมด</option>
              <option value="success">สำเร็จ</option>
              <option value="failed">ล้มเหลว</option>
              <option value="warning">เตือน</option>
            </select>
          </div>

          {/* Filter by Module */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              โมดูล
            </label>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">ทั้งหมด</option>
              <option value="Sales Entry">Sales Entry</option>
              <option value="Reports">Reports</option>
              <option value="User Management">User Management</option>
              <option value="Authentication">Authentication</option>
              <option value="Permissions">Permissions</option>
              <option value="System">System</option>
            </select>
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="mt-4 flex items-center gap-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <div className="flex gap-2">
            {['today', 'week', 'month', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === 'today' && 'วันนี้'}
                {range === 'week' && '7 วันล่าสุด'}
                {range === 'month' && '30 วันล่าสุด'}
                {range === 'all' && 'ทั้งหมด'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  เวลา
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ผู้ใช้
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การกระทำ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  โมดูล
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รายละเอียด
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => {
                const ActionIcon = actionIcons[log.action] || FileText;
                return (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {log.user}
                          </div>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${roleColors[log.role]}`}>
                            {log.role}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ActionIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-900">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{log.module}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {log.details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[log.status]}`}>
                        {log.status === 'success' && <CheckCircle className="w-3 h-3" />}
                        {log.status === 'failed' && <XCircle className="w-3 h-3" />}
                        {log.status === 'warning' && <AlertCircle className="w-3 h-3" />}
                        {log.status === 'success' && 'สำเร็จ'}
                        {log.status === 'failed' && 'ล้มเหลว'}
                        {log.status === 'warning' && 'เตือน'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ipAddress}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            แสดง <span className="font-medium">{filteredLogs.length}</span> จาก{' '}
            <span className="font-medium">{activityLogs.length}</span> รายการ
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              ก่อนหน้า
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}