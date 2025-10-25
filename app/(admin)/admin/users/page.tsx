'use client';

import { Users, UserPlus, Search, MoreVertical, Edit, Trash, X, Save, Lock, Mail, User, Building2 } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  unit: string;
  status: string;
  password?: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'ผู้บริหาร', email: 'ceo@company.com', role: 'CEO', unit: '-', status: 'active' },
  { id: 2, name: 'หัวหน้าหน่วย กรุงเทพ', email: 'head.bkk@company.com', role: 'HEAD', unit: 'กรุงเทพ', status: 'active' },
  { id: 3, name: 'หัวหน้าหน่วย เชียงใหม่', email: 'head.cm@company.com', role: 'HEAD', unit: 'เชียงใหม่', status: 'active' },
  { id: 4, name: 'พนักงาน A', email: 'emp.a@company.com', role: 'EMP', unit: 'กรุงเทพ', status: 'active' },
  { id: 5, name: 'พนักงาน B', email: 'emp.b@company.com', role: 'EMP', unit: 'กรุงเทพ', status: 'active' },
  { id: 6, name: 'พนักงาน C', email: 'emp.c@company.com', role: 'EMP', unit: 'เชียงใหม่', status: 'inactive' },
];

const roleColors: { [key: string]: string } = {
  'CEO': 'bg-blue-100 text-blue-700',
  'HEAD': 'bg-green-100 text-green-700',
  'EMP': 'bg-purple-100 text-purple-700',
  'ADMIN': 'bg-orange-100 text-orange-700',
};

const unitOptions = [
  'กรุงเทพ',
  'เชียงใหม่',
  'ภาคกลาง',
  'ภาคเหนือ',
  'ภาคใต้',
  'ภาคตะวันออกเฉียงเหนือ',
  'ออนไลน์'
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'EMP',
    unit: '',
    password: '',
    status: 'active'
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Handle Create User
  const handleCreateUser = () => {
    if (!formData.name || !formData.email) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    const newUser: User = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      unit: formData.unit || '-',
      status: formData.status
    };
    setUsers([...users, newUser]);
    setShowCreateModal(false);
    resetForm();
    alert('เพิ่มผู้ใช้สำเร็จ');
  };

  // Handle Edit User
  const handleEditUser = () => {
    if (!formData.name || !formData.email) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (selectedUser) {
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, name: formData.name, email: formData.email, role: formData.role, unit: formData.unit || '-', status: formData.status }
          : u
      ));
      setShowEditModal(false);
      setSelectedUser(null);
      resetForm();
      alert('แก้ไขผู้ใช้สำเร็จ');
    }
  };

  // Handle Delete User
  const handleDeleteUser = (userId: number) => {
    if (confirm('คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?')) {
      setUsers(users.filter(u => u.id !== userId));
      alert('ลบผู้ใช้สำเร็จ');
    }
  };

  // Open Edit Modal
  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      unit: user.unit === '-' ? '' : user.unit,
      password: '',
      status: user.status
    });
    setShowEditModal(true);
  };

  // Reset Form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'EMP',
      unit: '',
      password: '',
      status: 'active'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">จัดการผู้ใช้</h1>
              <p className="text-sm text-gray-500">จัดการบัญชีผู้ใช้ในระบบ</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow-sm"
            >
              <UserPlus className="w-5 h-5" />
              <span>เพิ่มผู้ใช้</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">{users.length}</span>
            </div>
            <p className="text-sm text-gray-600">ผู้ใช้ทั้งหมด</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.status === 'active').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">ผู้ใช้ที่ใช้งานอยู่</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'EMP').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">พนักงานขาย</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'HEAD').length}
              </span>
            </div>
            <p className="text-sm text-gray-600">หัวหน้าหน่วย</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ค้นหาผู้ใช้..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Role Filter */}
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            >
              <option value="all">ทุก Role</option>
              <option value="CEO">CEO</option>
              <option value="HEAD">HEAD</option>
              <option value="EMP">EMP</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ผู้ใช้</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">อีเมล</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">หน่วยขาย</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">การกระทำ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.unit}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => openEditModal(user)}
                          className="text-blue-600 hover:text-blue-800"
                          title="แก้ไข"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800"
                          title="ลบ"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">ไม่พบผู้ใช้</p>
            </div>
          )}
        </div>
      </main>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">เพิ่มผู้ใช้ใหม่</h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    ชื่อ-นามสกุล <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="เช่น สมชาย ใจดี"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    อีเมล <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    รหัสผ่าน <span className="text-red-500">*</span>
                  </div>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="EMP">พนักงาน (EMP)</option>
                    <option value="HEAD">หัวหน้าหน่วย (HEAD)</option>
                    <option value="CEO">ผู้บริหาร (CEO)</option>
                    <option value="ADMIN">ผู้ดูแลระบบ (ADMIN)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      หน่วยขาย
                    </div>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">-- เลือกหน่วยขาย --</option>
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สถานะ
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="active">ใช้งาน</option>
                  <option value="inactive">ไม่ใช้งาน</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCreateUser}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                เพิ่มผู้ใช้
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">แก้ไขข้อมูลผู้ใช้</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                  resetForm();
                }}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    ชื่อ-นามสกุล
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    อีเมล
                  </div>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    รหัสผ่านใหม่ (ถ้าต้องการเปลี่ยน)
                  </div>
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="เว้นว่างไว้หากไม่ต้องการเปลี่ยน"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="EMP">พนักงาน (EMP)</option>
                    <option value="HEAD">หัวหน้าหน่วย (HEAD)</option>
                    <option value="CEO">ผู้บริหาร (CEO)</option>
                    <option value="ADMIN">ผู้ดูแลระบบ (ADMIN)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      หน่วยขาย
                    </div>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">-- เลือกหน่วยขาย --</option>
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สถานะ
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="active">ใช้งาน</option>
                  <option value="inactive">ไม่ใช้งาน</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                  resetForm();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleEditUser}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}