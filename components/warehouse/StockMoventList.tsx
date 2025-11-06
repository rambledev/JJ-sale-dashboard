'use client'

import { StockMovement } from '@/lib/types'

interface StockMovementListProps {
  movements: StockMovement[]
}

export default function StockMovementList({ movements }: StockMovementListProps) {
  const getTypeColor = (type: StockMovement['type']) => {
    switch (type) {
      case 'in':
        return 'bg-green-100 text-green-800'
      case 'out':
        return 'bg-red-100 text-red-800'
      case 'adjust':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeText = (type: StockMovement['type']) => {
    switch (type) {
      case 'in':
        return 'รับเข้า'
      case 'out':
        return 'เบิกออก'
      case 'adjust':
        return 'ปรับยอด'
      default:
        return type
    }
  }

  const getTypeIcon = (type: StockMovement['type']) => {
    switch (type) {
      case 'in':
        return '↓'
      case 'out':
        return '↑'
      case 'adjust':
        return '⟲'
      default:
        return '•'
    }
  }

  return (
    <div className="space-y-4">
      {movements.map((movement) => (
        <div
          key={movement.id}
          className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(
                    movement.type
                  )}`}
                >
                  {getTypeIcon(movement.type)} {getTypeText(movement.type)}
                </span>
                <span className="text-sm text-gray-500">{movement.date}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {movement.productName}
              </h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">จำนวน</p>
                  <p className="text-base font-medium text-gray-900">
                    {movement.type === 'out' || movement.quantity < 0 ? '-' : '+'}
                    {Math.abs(movement.quantity)} หน่วย
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">เลขที่อ้างอิง</p>
                  <p className="text-base font-medium text-gray-900">{movement.reference}</p>
                </div>
              </div>
              {movement.note && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">หมายเหตุ</p>
                  <p className="text-sm text-gray-700">{movement.note}</p>
                </div>
              )}
              <p className="mt-2 text-xs text-gray-400">โดย: {movement.user}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}