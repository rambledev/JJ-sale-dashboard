'use client';

import { Users, UserPlus, Mail, Phone, Award } from 'lucide-react';

const teamMembers = [
  { id: 1, name: 'พนักงาน A', email: 'emp.a@company.com', phone: '08x-xxx-xxxx', sales: 85000, orders: 320, status: 'active' },
  { id: 2, name: 'พนักงาน B', email: 'emp.b@company.com', phone: '08x-xxx-xxxx', sales: 72000, orders: 280, status: 'active' },
  { id: 3, name: 'พนักงาน C', email: 'emp.c@company.com', phone: '08x-xxx-xxxx', sales: 68000, orders: 250, status: 'active' },
  { id: 4, name: 'พนักงาน D', email: 'emp.d@company.com', phone: '08x-xxx-xxxx', sales: 55000, orders: 210, status: 'active' },
];

export default function HEADTeamPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">จัดการทีม</h1>
              <p className="text-sm text-gray-500">จัดการสมาชิกในทีม</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <UserPlus className="w-5 h-5" />
              <span>เพิ่มสมาชิก</span>
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{member.name.slice(-1)}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded mt-1">
                        {member.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                      </span>
                    </div>
                  </div>
                  {index === 0 && <Award className="w-6 h-6 text-yellow-500" />}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ยอดขาย</p>
                    <p className="text-lg font-bold text-gray-900">฿{member.sales.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ออเดอร์</p>
                    <p className="text-lg font-bold text-gray-900">{member.orders}</p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 px-4 py-2 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50">
                    แก้ไข
                  </button>
                  <button className="flex-1 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}