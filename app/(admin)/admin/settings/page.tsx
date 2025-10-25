'use client';

import { useState } from 'react';
import { 
  Settings,
  Save,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Bell,
  Lock,
  Database,
  Calendar,
  Clock,
  FileText,
  Image,
  AlertCircle,
  CheckCircle,
  Upload,
  Download,
  RefreshCw,
  Shield,
  Zap,
  Users,
  HardDrive,
  Trash
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'JongCharoen 1977',
    companyNameEn: 'JongCharoen 1977 Company',
    taxId: '0-1234-56789-01-2',
    email: 'contact@jongcharoen1977.com',
    phone: '02-123-4567',
    address: '123 ถนนสุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพมหานคร 10110',
    website: 'https://www.jongcharoen1977.com',
    logo: null as File | null
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    timezone: 'Asia/Bangkok',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    currency: 'THB',
    language: 'th',
    fiscalYearStart: 'january',
    maintenanceMode: false,
    debugMode: false
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    salesAlerts: true,
    reportAlerts: true,
    userAlerts: true,
    systemAlerts: true,
    dailyReport: true,
    weeklyReport: true,
    monthlyReport: true,
    alertEmail: 'admin@jongcharoen1977.com'
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    ipWhitelist: false
  });

  // Backup Settings State
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    backupTime: '02:00',
    retentionDays: 30,
    backupLocation: 'cloud',
    lastBackup: '2025-10-24 02:00:00'
  });

  const handleSaveSettings = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('บันทึกการตั้งค่าเรียบร้อยแล้ว');
  };

  const handleBackupNow = () => {
    alert('กำลังสำรองข้อมูล...');
  };

  const handleRestoreBackup = () => {
    if (confirm('คุณต้องการกู้คืนข้อมูลจากการสำรองล่าสุดใช่หรือไม่?')) {
      alert('กำลังกู้คืนข้อมูล...');
    }
  };

  const tabs = [
    { id: 'general', name: 'ทั่วไป', icon: Building2 },
    { id: 'system', name: 'ระบบ', icon: Settings },
    { id: 'notifications', name: 'การแจ้งเตือน', icon: Bell },
    { id: 'security', name: 'ความปลอดภัย', icon: Shield },
    { id: 'backup', name: 'สำรองข้อมูล', icon: Database }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ตั้งค่าระบบ</h1>
          <p className="text-gray-600 mt-1">จัดการการตั้งค่าทั่วไปของระบบ</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              กำลังบันทึก...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              บันทึกการเปลี่ยนแปลง
            </>
          )}
        </button>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">สถานะระบบ</p>
              <p className="text-lg font-bold text-green-600 mt-1">ออนไลน์</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ผู้ใช้งานทั้งหมด</p>
              <p className="text-lg font-bold text-gray-900 mt-1">58 คน</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">พื้นที่จัดเก็บ</p>
              <p className="text-lg font-bold text-gray-900 mt-1">45.2 GB</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <HardDrive className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">สำรองล่าสุด</p>
              <p className="text-xs font-medium text-gray-900 mt-1">24/10/2025 02:00</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow border border-gray-200 p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">ข้อมูลบริษัท</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อบริษัท (ภาษาไทย)
                    </label>
                    <input
                      type="text"
                      value={generalSettings.companyName}
                      onChange={(e) => setGeneralSettings({...generalSettings, companyName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อบริษัท (ภาษาอังกฤษ)
                    </label>
                    <input
                      type="text"
                      value={generalSettings.companyNameEn}
                      onChange={(e) => setGeneralSettings({...generalSettings, companyNameEn: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เลขประจำตัวผู้เสียภาษี
                    </label>
                    <input
                      type="text"
                      value={generalSettings.taxId}
                      onChange={(e) => setGeneralSettings({...generalSettings, taxId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      อีเมล
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={generalSettings.email}
                        onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เบอร์โทรศัพท์
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={generalSettings.phone}
                        onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เว็บไซต์
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="url"
                        value={generalSettings.website}
                        onChange={(e) => setGeneralSettings({...generalSettings, website: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ที่อยู่
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      rows={3}
                      value={generalSettings.address}
                      onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    โลโก้บริษัท
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <Image className="w-8 h-8 text-gray-400" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Upload className="w-4 h-4" />
                      อัปโหลดโลโก้
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    รองรับไฟล์ PNG, JPG ขนาดไม่เกิน 2MB (แนะนำ 200x200 px)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* System Settings */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">การตั้งค่าระบบ</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      โซนเวลา
                    </label>
                    <select
                      value={systemSettings.timezone}
                      onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
                      <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
                      <option value="UTC">UTC (GMT+0)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      รูปแบบวันที่
                    </label>
                    <select
                      value={systemSettings.dateFormat}
                      onChange={(e) => setSystemSettings({...systemSettings, dateFormat: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY (24/10/2025)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (10/24/2025)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2025-10-24)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      รูปแบบเวลา
                    </label>
                    <select
                      value={systemSettings.timeFormat}
                      onChange={(e) => setSystemSettings({...systemSettings, timeFormat: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="24h">24 ชั่วโมง (14:30)</option>
                      <option value="12h">12 ชั่วโมง (2:30 PM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      สกุลเงิน
                    </label>
                    <select
                      value={systemSettings.currency}
                      onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="THB">บาท (THB)</option>
                      <option value="USD">ดอลลาร์สหรัฐ (USD)</option>
                      <option value="EUR">ยูโร (EUR)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ภาษา
                    </label>
                    <select
                      value={systemSettings.language}
                      onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="th">ไทย</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      เริ่มต้นปีงบประมาณ
                    </label>
                    <select
                      value={systemSettings.fiscalYearStart}
                      onChange={(e) => setSystemSettings({...systemSettings, fiscalYearStart: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="january">มกราคม</option>
                      <option value="october">ตุลาคม</option>
                      <option value="april">เมษายน</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">โหมดขั้นสูง</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900">โหมดปิดปรับปรุง</p>
                          <p className="text-sm text-gray-600">ปิดระบบชั่วคราวเพื่อบำรุงรักษา</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={systemSettings.maintenanceMode}
                          onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Zap className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-900">โหมด Debug</p>
                          <p className="text-sm text-gray-600">แสดงข้อมูลสำหรับนักพัฒนา</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={systemSettings.debugMode}
                          onChange={(e) => setSystemSettings({...systemSettings, debugMode: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">การแจ้งเตือน</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">แจ้งเตือนผ่านอีเมล</p>
                        <p className="text-sm text-gray-600">เปิดการแจ้งเตือนผ่านอีเมล</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="ml-8 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">แจ้งเตือนยอดขาย</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.salesAlerts}
                          onChange={(e) => setNotificationSettings({...notificationSettings, salesAlerts: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">แจ้งเตือนรายงาน</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.reportAlerts}
                          onChange={(e) => setNotificationSettings({...notificationSettings, reportAlerts: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">แจ้งเตือนผู้ใช้</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.userAlerts}
                          onChange={(e) => setNotificationSettings({...notificationSettings, userAlerts: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">แจ้งเตือนระบบ</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.systemAlerts}
                          onChange={(e) => setNotificationSettings({...notificationSettings, systemAlerts: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">รายงานอัตโนมัติ</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">รายงานประจำวัน</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.dailyReport}
                          onChange={(e) => setNotificationSettings({...notificationSettings, dailyReport: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">รายงานประจำสัปดาห์</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.weeklyReport}
                          onChange={(e) => setNotificationSettings({...notificationSettings, weeklyReport: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-700">รายงานประจำเดือน</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.monthlyReport}
                          onChange={(e) => setNotificationSettings({...notificationSettings, monthlyReport: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    อีเมลสำหรับแจ้งเตือน
                  </label>
                  <input
                    type="email"
                    value={notificationSettings.alertEmail}
                    onChange={(e) => setNotificationSettings({...notificationSettings, alertEmail: e.target.value})}
                    className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">ความปลอดภัย</h2>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">นโยบายความปลอดภัย</p>
                      <p className="text-sm text-blue-700 mt-1">
                        การตั้งค่าเหล่านี้จะมีผลกับผู้ใช้ทั้งหมดในระบบ
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">ความปลอดภัยรหัสผ่าน</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ความยาวรหัสผ่านขั้นต่ำ
                    </label>
                    <select
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
                      className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="6">6 ตัวอักษร</option>
                      <option value="8">8 ตัวอักษร</option>
                      <option value="10">10 ตัวอักษร</option>
                      <option value="12">12 ตัวอักษร</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">ต้องมีตัวพิมพ์ใหญ่</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.passwordRequireUppercase}
                          onChange={(e) => setSecuritySettings({...securitySettings, passwordRequireUppercase: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">ต้องมีตัวพิมพ์เล็ก</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.passwordRequireLowercase}
                          onChange={(e) => setSecuritySettings({...securitySettings, passwordRequireLowercase: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">ต้องมีตัวเลข</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.passwordRequireNumbers}
                          onChange={(e) => setSecuritySettings({...securitySettings, passwordRequireNumbers: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">ต้องมีอักขระพิเศษ</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.passwordRequireSpecialChars}
                          onChange={(e) => setSecuritySettings({...securitySettings, passwordRequireSpecialChars: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">การควบคุมการเข้าถึง</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        เซสชั่นหมดอายุ (นาที)
                      </label>
                      <select
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="15">15 นาที</option>
                        <option value="30">30 นาที</option>
                        <option value="60">1 ชั่วโมง</option>
                        <option value="120">2 ชั่วโมง</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        จำนวนครั้งเข้าสู่ระบบสูงสุด
                      </label>
                      <select
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="3">3 ครั้ง</option>
                        <option value="5">5 ครั้ง</option>
                        <option value="10">10 ครั้ง</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ความปลอดภัยขั้นสูง</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">การยืนยันตัวตนสองชั้น (2FA)</p>
                        <p className="text-sm text-gray-600">เพิ่มความปลอดภัยด้วยการยืนยันสองขั้นตอน</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">IP Whitelist</p>
                        <p className="text-sm text-gray-600">จำกัดการเข้าถึงจาก IP ที่ระบุเท่านั้น</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.ipWhitelist}
                          onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">สำรองข้อมูล</h2>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-900">การสำรองข้อมูลล่าสุด</p>
                        <p className="text-sm text-green-700 mt-1">
                          {backupSettings.lastBackup}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleBackupNow}
                        className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        <Download className="w-4 h-4" />
                        สำรองเดี๋ยวนี้
                      </button>
                      <button
                        onClick={handleRestoreBackup}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <Upload className="w-4 h-4" />
                        กู้คืนข้อมูล
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">การตั้งค่าสำรองข้อมูลอัตโนมัติ</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">เปิดการสำรองข้อมูลอัตโนมัติ</p>
                      <p className="text-sm text-gray-600">สำรองข้อมูลตามกำหนดเวลา</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={backupSettings.autoBackup}
                        onChange={(e) => setBackupSettings({...backupSettings, autoBackup: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ความถี่ในการสำรอง
                      </label>
                      <select
                        value={backupSettings.backupFrequency}
                        onChange={(e) => setBackupSettings({...backupSettings, backupFrequency: e.target.value})}
                        disabled={!backupSettings.autoBackup}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      >
                        <option value="hourly">ทุกชั่วโมง</option>
                        <option value="daily">ทุกวัน</option>
                        <option value="weekly">ทุกสัปดาห์</option>
                        <option value="monthly">ทุกเดือน</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        เวลาที่สำรอง
                      </label>
                      <input
                        type="time"
                        value={backupSettings.backupTime}
                        onChange={(e) => setBackupSettings({...backupSettings, backupTime: e.target.value})}
                        disabled={!backupSettings.autoBackup}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        เก็บข้อมูลสำรอง (วัน)
                      </label>
                      <select
                        value={backupSettings.retentionDays}
                        onChange={(e) => setBackupSettings({...backupSettings, retentionDays: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="7">7 วัน</option>
                        <option value="14">14 วัน</option>
                        <option value="30">30 วัน</option>
                        <option value="90">90 วัน</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ที่เก็บข้อมูล
                      </label>
                      <select
                        value={backupSettings.backupLocation}
                        onChange={(e) => setBackupSettings({...backupSettings, backupLocation: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="cloud">Cloud Storage</option>
                        <option value="local">Local Server</option>
                        <option value="both">ทั้งสองแบบ</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">ประวัติการสำรองข้อมูล</h3>
                  
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Database className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              backup_{new Date(Date.now() - i * 86400000).toISOString().split('T')[0]}.sql
                            </p>
                            <p className="text-xs text-gray-600">
                              {new Date(Date.now() - i * 86400000).toLocaleString('th-TH')} • 245.8 MB
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}