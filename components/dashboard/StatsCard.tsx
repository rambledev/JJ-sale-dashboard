import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: LucideIcon;
  iconColor?: string;
}

export default function StatsCard({
  title,
  value,
  change,
  trend = 'stable',
  icon: Icon,
  iconColor = 'bg-blue-50 text-blue-600'
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && trend !== 'stable' && (
          <span className={`text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}