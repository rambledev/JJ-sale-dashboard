'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StoreSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'หน้าหลัก',
      href: '/store',
      icon: '🏠'
    },
    {
      name: 'จัดการสินค้า',
      href: '/store/product',
      icon: '📦'
    },
    {
      name: 'จัดการวัตถุดิบ',
      href: '/store/materials',
      icon: '🌿'
    },
    {
      name: 'วางแผนการผลิต',
      href: '/store/production',
      icon: '🏭'
    },
    {
      name: 'รายงานและวิเคราะห์',
      href: '/store/reports',
      icon: '📊'
    },
  ];

  const isActive = (href: string) => {
    if (href === '/store') {
      return pathname === '/store';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-purple-800 text-white shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gradient-to-b from-purple-800 to-purple-900 shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="p-6 border-b border-purple-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-lg">🏪</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ระบบคลังสินค้า</h1>
              <p className="text-purple-200 text-sm">Store Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive(item.href)
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-100 hover:bg-purple-700 hover:text-white'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">S</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">ผู้จัดการคลังสินค้า</p>
              <p className="text-purple-300 text-xs truncate">Store Manager</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}