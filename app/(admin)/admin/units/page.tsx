'use client';

import { useState } from 'react';
import { 
  Building2,
  Plus,
  Edit,
  Trash,
  Search,
  Users,
  Target,
  TrendingUp,
  X,
  Save,
  UserPlus,
  Crown,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';

// Type definitions
interface UnitMember {
  id: number;
  name: string;
  email: string;
  role: 'HEAD' | 'EMPLOYEE';
  joinDate: string;
  salesThisMonth: number;
}

interface Unit {
  id: number;
  name: string;
  code: string;
  headName: string;
  headEmail: string;
  memberCount: number;
  members: UnitMember[];
  targetSales: number;
  currentSales: number;
  achievement: number;
  status: 'active' | 'inactive';
  createdDate: string;
}

// Mock data
const unitsData: Unit[] = [
  {
    id: 1,
    name: 'หน่วยงานขายภาคกลาง',
    code: 'CENTRAL',
    headName: 'สุภาพร มานะ',
    headEmail: 'supaporn@jongcharoen.com',
    memberCount: 12,
    members: [
      {
        id: 1,
        name: 'สุภาพร มานะ',
        email: 'supaporn@jongcharoen.com',
        role: 'HEAD',
        joinDate: '2024-01-15',
        salesThisMonth: 850000
      },
      {
        id: 2,
        name: 'สมชาย ใจดี',
        email: 'somchai@jongcharoen.com',
        role: 'EMPLOYEE',
        joinDate: '2024-02-01',
        salesThisMonth: 420000
      },
      {
        id: 3,
        name: 'ประภาพร วงศ์ใหญ่',
        email: 'prapaporn@jongcharoen.com',
        role: 'EMPLOYEE',
        joinDate: '2024-03-10',
        salesThisMonth: 380000
      }
    ],
    targetSales: 5000000,
    currentSales: 4250000,
    achievement: 85,
    status: 'active',
    createdDate: '2024-01-01'
  },
  {
    id: 2,
    name: 'หน่วยงานขายภาคเหนือ',
    code: 'NORTH',
    headName: 'นภัสสร แสนดี',
    headEmail: 'napatsorn@jongcharoen.com',
    memberCount: 8,
    members: [
      {
        id: 4,
        name: 'นภัสสร แสนดี',
        email: 'napatsorn@jongcharoen.com',
        role: 'HEAD',
        joinDate: '2024-01-15',
        salesThisMonth: 680000
      },
      {
        id: 5,
        name: 'วิชัย เจริญ',
        email: 'wichai@jongcharoen.com',
        role: 'EMPLOYEE',
        joinDate: '2024-02-15',
        salesThisMonth: 520000
      }
    ],
    targetSales: 3500000,
    currentSales: 3150000,
    achievement: 90,
    status: 'active',
    createdDate: '2024-01-01'
  },
  {
    id: 3,
    name: 'หน่วยงานขายภาคใต้',
    code: 'SOUTH',
    headName: 'อนุชา สมบูรณ์',
    headEmail: 'anucha@jongcharoen.com',
    memberCount: 10,
    members: [
      {
        id: 6,
        name: 'อนุชา สมบูรณ์',
        email: 'anucha@jongcharoen.com',
        role: 'HEAD',
        joinDate: '2024-01-15',
        salesThisMonth: 720000
      }
    ],
    targetSales: 4000000,
    currentSales: 2800000,
    achievement: 70,
    status: 'active',
    createdDate: '2024-01-01'
  },
  {
    id: 4,
    name: 'หน่วยงานขายภาคตะวันออกเฉียงเหนือ',
    code: 'NORTHEAST',
    headName: 'ธนาวุฒิ พัฒนา',
    headEmail: 'thanawut@jongcharoen.com',
    memberCount: 15,
    members: [
      {
        id: 7,
        name: 'ธนาวุฒิ พัฒนา',
        email: 'thanawut@jongcharoen.com',
        role: 'HEAD',
        joinDate: '2024-01-15',
        salesThisMonth: 950000
      }
    ],
    targetSales: 6000000,
    currentSales: 5400000,
    achievement: 90,
    status: 'active',
    createdDate: '2024-01-01'
  },
  {
    id: 5,
    name: 'หน่วยงานออนไลน์',
    code: 'ONLINE',
    headName: 'สิริกร ทันสมัย',
    headEmail: 'sirikorn@jongcharoen.com',
    memberCount: 6,
    members: [
      {
        id: 8,
        name: 'สิริกร ทันสมัย',
        email: 'sirikorn@jongcharoen.com',
        role: 'HEAD',
        joinDate: '2024-02-01',
        salesThisMonth: 1200000
      }
    ],
    targetSales: 8000000,
    currentSales: 7200000,
    achievement: 90,
    status: 'active',
    createdDate: '2024-02-01'
  }
];

export default function UnitsManagementPage() {
  const [units, setUnits] = useState<Unit[]>(unitsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    headName: '',
    headEmail: '',
    targetSales: 0
  });

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.headName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMembers = units.reduce((sum, unit) => sum + unit.memberCount, 0);
  const totalTargetSales = units.reduce((sum, unit) => sum + unit.targetSales, 0);
  const totalCurrentSales = units.reduce((sum, unit) => sum + unit.currentSales, 0);
  const overallAchievement = Math.round((totalCurrentSales / totalTargetSales) * 100);

  const handleCreateUnit = () => {
    const newUnit: Unit = {
      id: units.length + 1,
      name: formData.name,
      code: formData.code,
      headName: formData.headName,
      headEmail: formData.headEmail,
      memberCount: 1,
      members: [{
        id: Date.now(),
        name: formData.headName,
        email: formData.headEmail,
        role: 'HEAD',
        joinDate: new Date().toISOString().split('T')[0],
        salesThisMonth: 0
      }],
      targetSales: formData.targetSales,
      currentSales: 0,
      achievement: 0,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0]
    };
    setUnits([...units, newUnit]);
    setShowCreateModal(false);
    setFormData({ name: '', code: '', headName: '', headEmail: '', targetSales: 0 });
    alert('สร้างหน่วยการขายสำเร็จ');
  };

  const handleEditUnit = () => {
    if (selectedUnit) {
      setUnits(units.map(u => 
        u.id === selectedUnit.id 
          ? { ...u, ...formData }
          : u
      ));
      setShowEditModal(false);
      setSelectedUnit(null);
      alert('แก้ไขหน่วยการขายสำเร็จ');
    }
  };

  const handleDeleteUnit = (unitId: number) => {
    if (confirm('คุณต้องการลบหน่วยการขายนี้ใช่หรือไม่?')) {
      setUnits(units.filter(u => u.id !== unitId));
      alert('ลบหน่วยการขายสำเร็จ');
    }
  };

  const openEditModal = (unit: Unit) => {
    setSelectedUnit(unit);
    setFormData({
      name: unit.name,
      code: unit.code,
      headName: unit.headName,
      headEmail: unit.headEmail,
      targetSales: unit.targetSales
    });
    setShowEditModal(true);
  };

  const openMembersModal = (unit: Unit) => {
    setSelectedUnit(unit);
    setShowMembersModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">จัดการหน่วยการขาย</h1>
          <p className="text-gray-600 mt-1">จัดการข้อมูลหน่วยงานขายและสมาชิกในทีม</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          สร้างหน่วยงานใหม่
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">หน่วยงานทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{units.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">สมาชิกทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalMembers}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">เป้าหมายรวม</p>
              <p className="text-xl font-bold text-gray-900 mt-1">
                {totalTargetSales.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ผลการดำเนินงาน</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{overallAchievement}%</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหาหน่วยงาน, รหัส, หัวหน้าทีม..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUnits.map((unit) => (
          <div
            key={unit.id}
            className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            {/* Unit Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-lg">{unit.name}</h3>
                </div>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                  {unit.code}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEditModal(unit)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="แก้ไข"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteUnit(unit.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="ลบ"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Unit Head */}
            <div className="mb-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-purple-900">หัวหน้าทีม</span>
              </div>
              <p className="font-semibold text-gray-900">{unit.headName}</p>
              <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                <Mail className="w-3 h-3" />
                <span>{unit.headEmail}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>สมาชิก</span>
                </div>
                <span className="font-semibold text-gray-900">{unit.memberCount} คน</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="w-4 h-4" />
                  <span>เป้าหมาย</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {unit.targetSales.toLocaleString()} บาท
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>ยอดขายปัจจุบัน</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {unit.currentSales.toLocaleString()} บาท
                </span>
              </div>
            </div>

            {/* Achievement Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">ผลการดำเนินงาน</span>
                <span className={`text-sm font-bold ${
                  unit.achievement >= 90 ? 'text-green-600' :
                  unit.achievement >= 70 ? 'text-blue-600' :
                  unit.achievement >= 50 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {unit.achievement}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    unit.achievement >= 90 ? 'bg-green-500' :
                    unit.achievement >= 70 ? 'bg-blue-500' :
                    unit.achievement >= 50 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${unit.achievement}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <button
              onClick={() => openMembersModal(unit)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Users className="w-4 h-4" />
              ดูสมาชิกในทีม
            </button>
          </div>
        ))}
      </div>

      {/* Create Unit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">สร้างหน่วยงานใหม่</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อหน่วยงาน <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="เช่น หน่วยงานขายภาคกลาง"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รหัสหน่วยงาน <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="เช่น CENTRAL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อหัวหน้าทีม <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.headName}
                    onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                    placeholder="เช่น สมชาย ใจดี"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    อีเมลหัวหน้าทีม <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.headEmail}
                    onChange={(e) => setFormData({ ...formData, headEmail: e.target.value })}
                    placeholder="somchai@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เป้าหมายยอดขาย (บาท) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.targetSales}
                  onChange={(e) => setFormData({ ...formData, targetSales: Number(e.target.value) })}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCreateUnit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                สร้างหน่วยงาน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Unit Modal */}
      {showEditModal && selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">แก้ไขหน่วยงาน</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อหน่วยงาน
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รหัสหน่วยงาน
                </label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อหัวหน้าทีม
                  </label>
                  <input
                    type="text"
                    value={formData.headName}
                    onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    อีเมลหัวหน้าทีม
                  </label>
                  <input
                    type="email"
                    value={formData.headEmail}
                    onChange={(e) => setFormData({ ...formData, headEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เป้าหมายยอดขาย (บาท)
                </label>
                <input
                  type="number"
                  value={formData.targetSales}
                  onChange={(e) => setFormData({ ...formData, targetSales: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleEditUnit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Members Modal */}
      {showMembersModal && selectedUnit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">สมาชิกในทีม</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedUnit.name}</p>
              </div>
              <button
                onClick={() => setShowMembersModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {selectedUnit.members.map((member) => (
                <div
                  key={member.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        {member.role === 'HEAD' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                            <Crown className="w-3 h-3" />
                            หัวหน้าทีม
                          </span>
                        )}
                        {member.role === 'EMPLOYEE' && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            พนักงาน
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          <span>ยอดขายเดือนนี้: {member.salesThisMonth.toLocaleString()} บาท</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        เข้าร่วมเมื่อ: {new Date(member.joinDate).toLocaleDateString('th-TH')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => alert('ฟีเจอร์เพิ่มสมาชิกใหม่')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                เพิ่มสมาชิกใหม่
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}