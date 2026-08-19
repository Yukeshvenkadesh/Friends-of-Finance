import React from 'react';
import type { MemberStatus } from '../types';
import { Sparkles, Activity, AlertTriangle, Moon, UserPlus } from 'lucide-react';

interface StatusBadgeProps {
  status: MemberStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs font-medium';
      case 'lg':
        return 'px-3 py-1 text-sm font-semibold';
      case 'md':
      default:
        return 'px-2.5 py-1 text-xs font-medium';
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'Newly Joined':
        return {
          bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          icon: <UserPlus className="w-3 h-3 mr-1 inline-block text-blue-400" />,
          dot: 'bg-blue-400'
        };
      case 'Active':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: <Activity className="w-3 h-3 mr-1 inline-block text-emerald-400" />,
          dot: 'bg-emerald-400'
        };
      case 'Highly Active':
        return {
          bg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
          icon: <Sparkles className="w-3 h-3 mr-1 inline-block text-purple-300" />,
          dot: 'bg-purple-400'
        };
      case 'At Risk':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: <AlertTriangle className="w-3 h-3 mr-1 inline-block text-amber-400" />,
          dot: 'bg-amber-400'
        };
      case 'Dormant':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: <Moon className="w-3 h-3 mr-1 inline-block text-rose-400" />,
          dot: 'bg-rose-400'
        };
      default:
        return {
          bg: 'bg-slate-700 text-slate-300 border-slate-600',
          icon: null,
          dot: 'bg-slate-400'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span
      className={`inline-flex items-center rounded-full border ${config.bg} ${getSizeClasses()}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.dot}`} />
      {status}
    </span>
  );
};
