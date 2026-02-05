'use client';

import { Crown } from 'lucide-react';

interface PremiumBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function PremiumBadge({ size = 'sm', showText = false }: PremiumBadgeProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full p-1">
        <Crown className={`${sizeClasses[size]} text-yellow-900`} />
      </div>
      {showText && <span className="text-xs font-semibold text-yellow-400">Premium</span>}
    </div>
  );
}
