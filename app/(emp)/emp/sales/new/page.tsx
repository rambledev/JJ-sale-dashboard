'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Upload, Package, Gift } from 'lucide-react';

const channels = [
  { id: 'TIKTOK', name: 'TikTok' },
  { id: 'SHOPEE', name: 'Shopee' },
  { id: 'FACEBOOK_INSTAGRAM_VRICH', name: 'Facebook/Instagram/V-Rich' },
  { id: 'LAZADA', name: 'Lazada' },
  { id: 'LINE_MY_SHOP', name: 'Line My Shop' },
  { id: 'MODERN_TRADE', name: 'Modern Trade' },
  { id: 'EVENT', name: 'Event' },
  { id: 'LINE_OA', name: 'Line OA' },
];

const productSizes = ['SS', 'S', 'M', 'L', 'XL'];
const accessories = [
  'ห่วงหิ้วสีแดง',
  'ห่วงหิ้วสีเหลือง',
  'ธนบัตรขวัญถุง',
  'บัตรขอบคุณ'
];

export default function NewSalesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    channel: '',
    totalOrders: '',
    products: productSizes.map(size => ({ 
      size, 
      quantity: '', 
      unit: size === 'SS' ? 'แพ็ค' : 'กระปุก' 
    })),
    accessories: accessories.map(name => ({ 
      name, 
      quantity: '', 
      unit: name.includes('ห่วง') ? 'เส้น' : 'ใบ' 
    })),
    notes: '',
    files: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    alert('บันทึกข้อมูลสำเร็จ! 🎉');
    router.push('/emp');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, files }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-gray-900">บันทึกข้อมูลการขาย</h1>
              <p className="text-sm text-gray-500">กรอกข้อมูลการขายรายวัน</p>
            </div>
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <X className="w-5 h-5" />
              <span>ยกเลิก</span>
            </button>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Date & Channel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วันที่ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ช่องทางการขาย <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              >
                <option value="">เลือกช่องทาง</option>
                {channels.map(ch => (
                  <option key={ch.id} value={ch.id}>{ch.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Total Orders */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              จำนวนออเดอร์ทั้งหมด <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.totalOrders}
              onChange={(e) => setFormData({ ...formData, totalOrders: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="เช่น 100"
              min="0"
              required
            />
          </div>

          {/* Products */}
          <div>
            <div className="flex items-center mb-3">
              <Package className="w-5 h-5 text-gray-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                รายละเอียดสินค้า
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.products.map((product, index) => (
                <div key={product.size} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-16">
                    <span className="text-sm font-semibold text-gray-900">{product.size}</span>
                    <span className="text-xs text-gray-500 block">{product.unit}</span>
                  </div>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => {
                      const newProducts = [...formData.products];
                      newProducts[index].quantity = e.target.value;
                      setFormData({ ...formData, products: newProducts });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="จำนวน"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div>
            <div className="flex items-center mb-3">
              <Gift className="w-5 h-5 text-gray-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                อุปกรณ์เสริม
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.accessories.map((acc, index) => (
                <div key={acc.name} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-gray-900 block truncate">{acc.name}</span>
                    <span className="text-xs text-gray-500">{acc.unit}</span>
                  </div>
                  <input
                    type="number"
                    value={acc.quantity}
                    onChange={(e) => {
                      const newAcc = [...formData.accessories];
                      newAcc[index].quantity = e.target.value;
                      setFormData({ ...formData, accessories: newAcc });
                    }}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="0"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              แนบหลักฐาน (รูปภาพ หรือ PDF)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <label className="cursor-pointer">
                <span className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  คลิกเพื่ออัพโหลดไฟล์
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">รองรับ JPG, PNG, PDF (สูงสุด 5MB/ไฟล์)</p>
              {formData.files.length > 0 && (
                <div className="mt-3 space-y-1">
                  {formData.files.map((file, i) => (
                    <div key={i} className="text-xs text-gray-600">
                      ✓ {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หมายเหตุ
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="เพิ่มหมายเหตุ (ถ้ามี)"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>บันทึกข้อมูล</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}