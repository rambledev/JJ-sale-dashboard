'use client';

import { useState } from 'react';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Check,
  Eye,
  FileText,
  Users,
  Settings,
  BarChart3,
  Lock,
  Unlock,
  Copy
} from 'lucide-react';

// Type definitions
type PermissionAction = 'view' | 'create' | 'edit' | 'delete';
type ModuleId = 'dashboard' | 'sales' | 'reports' | 'users' | 'settings' | 'analytics' | 'export';

type ModulePermissions = {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
};

type RolePermissions = Record<ModuleId, ModulePermissions>;

interface Role {
  id: number;
  name: string;
  displayName: string;
  description: string;
  userCount: number;
  color: string;
  permissions: RolePermissions;
}

interface Module {
  id: ModuleId;
  name: string;
  icon: any;
}

// Mock data สำหรับ Roles และ Permissions
const rolesData: Role[] = [
  {
    id: 1,
    name: 'CEO',
    displayName: 'ผู้บริหารระดับสูง',
    description: 'สิทธิ์เต็มในการดูภาพรวมทุกหน่วยงาน',
    userCount: 2,
    color: 'purple',
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false },
      sales: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, create: true, edit: false, delete: false },
      users: { view: true, create: false, edit: false, delete: false },
      settings: { view: true, create: false, edit: false, delete: false },
      analytics: { view: true, create: false, edit: false, delete: false },
      export: { view: true, create: true, edit: false, delete: false }
    }
  },
  {
    id: 2,
    name: 'HEAD',
    displayName: 'หัวหน้าทีม',
    description: 'จัดการทีมและอนุมัติข้อมูลในหน่วยงานของตน',
    userCount: 8,
    color: 'blue',
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false },
      sales: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: true, edit: false, delete: false },
      users: { view: true, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
      analytics: { view: true, create: false, edit: false, delete: false },
      export: { view: true, create: true, edit: false, delete: false }
    }
  },
  {
    id: 3,
    name: 'EMPLOYEE',
    displayName: 'พนักงาน',
    description: 'บันทึกยอดขายและดูข้อมูลของตนเอง',
    userCount: 45,
    color: 'teal',
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false },
      sales: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
      analytics: { view: false, create: false, edit: false, delete: false },
      export: { view: false, create: false, edit: false, delete: false }
    }
  },
  {
    id: 4,
    name: 'ADMIN',
    displayName: 'ผู้ดูแลระบบ',
    description: 'จัดการผู้ใช้และตั้งค่าระบบทั้งหมด',
    userCount: 3,
    color: 'orange',
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false },
      sales: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, create: true, edit: true, delete: true },
      users: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, create: true, edit: true, delete: true },
      analytics: { view: true, create: false, edit: false, delete: false },
      export: { view: true, create: true, edit: false, delete: false }
    }
  }
];

const modulesList: Module[] = [
  { id: 'dashboard', name: 'แดชบอร์ด', icon: BarChart3 },
  { id: 'sales', name: 'ข้อมูลยอดขาย', icon: FileText },
  { id: 'reports', name: 'รายงาน', icon: FileText },
  { id: 'users', name: 'จัดการผู้ใช้', icon: Users },
  { id: 'settings', name: 'ตั้งค่าระบบ', icon: Settings },
  { id: 'analytics', name: 'วิเคราะห์ข้อมูล', icon: BarChart3 },
  { id: 'export', name: 'ส่งออกข้อมูล', icon: FileText }
];

const colorClasses: Record<string, string> = {
  purple: 'bg-purple-100 text-purple-700 border-purple-300',
  blue: 'bg-blue-100 text-blue-700 border-blue-300',
  teal: 'bg-teal-100 text-teal-700 border-teal-300',
  orange: 'bg-orange-100 text-orange-700 border-orange-300'
};

export default function PermissionsPage() {
  const [roles, setRoles] = useState<Role[]>(rolesData);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleEditRole = (role: Role) => {
    setSelectedRole({ ...role });
    setIsEditing(true);
  };

  const handleSavePermissions = () => {
    if (selectedRole) {
      setRoles(roles.map(r => r.id === selectedRole.id ? selectedRole : r));
      setIsEditing(false);
      setSelectedRole(null);
      alert('บันทึกสิทธิ์การใช้งานเรียบร้อยแล้ว');
    }
  };

  const handleCancelEdit = () => {
    setSelectedRole(null);
    setIsEditing(false);
  };

  const togglePermission = (moduleId: ModuleId, action: PermissionAction) => {
    if (selectedRole) {
      setSelectedRole({
        ...selectedRole,
        permissions: {
          ...selectedRole.permissions,
          [moduleId]: {
            ...selectedRole.permissions[moduleId],
            [action]: !selectedRole.permissions[moduleId][action]
          }
        }
      });
    }
  };

  const handleDuplicateRole = (role: Role) => {
    const newRole: Role = {
      ...role,
      id: roles.length + 1,
      name: `${role.name}_COPY`,
      displayName: `${role.displayName} (สำเนา)`,
      userCount: 0
    };
    setRoles([...roles, newRole]);
    alert('คัดลอกบทบาทเรียบร้อยแล้ว');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">สิทธิ์การใช้งาน</h1>
          <p className="text-gray-600 mt-1">จัดการสิทธิ์การเข้าถึงของแต่ละบทบาท</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          สร้างบทบาทใหม่
        </button>
      </div>

      {/* Roles Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${colorClasses[role.color]}`}>
                <Shield className="w-6 h-6" />
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEditRole(role)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  title="แก้ไข"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDuplicateRole(role)}
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  title="คัดลอก"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              {role.displayName}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {role.description}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">ผู้ใช้งาน</span>
              <span className="font-semibold text-gray-900">{role.userCount} คน</span>
            </div>
          </div>
        ))}
      </div>

      {/* Permission Details */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">รายละเอียดสิทธิ์การใช้งาน</h2>
          <p className="text-gray-600 mt-1">คลิกแก้ไขเพื่อจัดการสิทธิ์ของแต่ละบทบาท</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50">
                  โมดูล
                </th>
                {roles.map((role) => (
                  <th
                    key={role.id}
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{role.displayName}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${colorClasses[role.color]}`}>
                        {role.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {modulesList.map((module) => {
                const Icon = module.icon;
                return (
                  <tr key={module.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-gray-500" />
                        <span className="font-medium text-gray-900">{module.name}</span>
                      </div>
                    </td>
                    {roles.map((role) => (
                      <td key={`${module.id}-${role.id}`} className="px-6 py-4">
                        <div className="flex justify-center gap-4 flex-wrap">
                          {(['view', 'create', 'edit', 'delete'] as PermissionAction[]).map((action) => {
                            const hasPermission = role.permissions[module.id]?.[action] ?? false;
                            const isCurrentlyEditing = isEditing && selectedRole?.id === role.id;
                            
                            return (
                              <button
                                key={action}
                                onClick={() => isCurrentlyEditing && togglePermission(module.id, action)}
                                disabled={!isCurrentlyEditing}
                                className={`group relative ${isCurrentlyEditing ? 'cursor-pointer' : 'cursor-default'}`}
                                title={
                                  action === 'view' ? 'ดู' :
                                  action === 'create' ? 'สร้าง' :
                                  action === 'edit' ? 'แก้ไข' :
                                  'ลบ'
                                }
                              >
                                <div className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                                  hasPermission
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-400'
                                } ${isCurrentlyEditing ? 'hover:ring-2 hover:ring-blue-500' : ''}`}>
                                  {action === 'view' && <Eye className="w-4 h-4" />}
                                  {action === 'create' && <Plus className="w-4 h-4" />}
                                  {action === 'edit' && <Edit className="w-4 h-4" />}
                                  {action === 'delete' && <Trash2 className="w-4 h-4" />}
                                </div>
                                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                  {action === 'view' ? 'ดู' :
                                   action === 'create' ? 'สร้าง' :
                                   action === 'edit' ? 'แก้ไข' :
                                   'ลบ'}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Edit Actions */}
        {isEditing && selectedRole && (
          <div className="p-4 bg-blue-50 border-t border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">
                  กำลังแก้ไขสิทธิ์: {selectedRole.displayName}
                </p>
                <p className="text-sm text-blue-700">
                  คลิกที่ไอคอนเพื่อเปิด/ปิดสิทธิ์การใช้งาน
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                ยกเลิก
              </button>
              <button
                onClick={handleSavePermissions}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                บันทึกการเปลี่ยนแปลง
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Permission Legend */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">คำอธิบายสิทธิ์</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="font-medium text-gray-900">ดู (View)</p>
              <p className="text-sm text-gray-600">สามารถดูข้อมูลได้</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
              <Plus className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="font-medium text-gray-900">สร้าง (Create)</p>
              <p className="text-sm text-gray-600">สามารถสร้างข้อมูลใหม่ได้</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
              <Edit className="w-5 h-5 text-green-700" />
            </div>
            <div>
              <p className="font-medium text-gray-900">แก้ไข (Edit)</p>
              <p className="text-sm text-gray-600">สามารถแก้ไขข้อมูลได้</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-700" />
            </div>
            <div>
              <p className="font-medium text-gray-900">ลบ (Delete)</p>
              <p className="text-sm text-gray-600">สามารถลบข้อมูลได้</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Role Modal (Simple placeholder) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">สร้างบทบาทใหม่</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อบทบาท (ภาษาอังกฤษ)
                </label>
                <input
                  type="text"
                  placeholder="เช่น MANAGER"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อที่แสดง (ภาษาไทย)
                </label>
                <input
                  type="text"
                  placeholder="เช่น ผู้จัดการ"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  คำอธิบาย
                </label>
                <textarea
                  rows={3}
                  placeholder="อธิบายบทบาทและหน้าที่..."
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
                onClick={() => {
                  setShowCreateModal(false);
                  alert('สร้างบทบาทใหม่เรียบร้อยแล้ว');
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                สร้าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}