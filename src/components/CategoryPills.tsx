'use client';

import React from 'react';
import { LayoutGrid, Volume2, Watch, Headphones, Video } from 'lucide-react';

interface CategoryPillsProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  productCounts: Record<string, number>;
}

export default function CategoryPills({
  selectedCategory,
  onSelectCategory,
  productCounts,
}: CategoryPillsProps) {
  const categories = [
    { id: 'all', label: 'সব গ্যাজেট', icon: LayoutGrid },
    { id: 'speaker', label: 'ব্লুটুথ ও কারাওকে স্পিকার', icon: Volume2 },
    { id: 'smartwatch', label: 'স্মার্টওয়াচ', icon: Watch },
    { id: 'headphone', label: 'হেডফোন ও নেকব্যান্ড', icon: Headphones },
    { id: 'accessories', label: 'ভ্লগিং ও লাইটিং', icon: Video },
  ];

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          const count = productCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 border ${
                isSelected
                  ? 'bg-rihlah-primary text-white border-rihlah-primary shadow-md scale-102 ring-2 ring-rihlah-primary/20'
                  : 'bg-white text-rihlah-deep border-rihlah-light hover:border-rihlah-primary/40 hover:bg-rihlah-light/50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'text-rihlah-amber' : 'text-rihlah-primary'}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isSelected ? 'bg-rihlah-deep text-white' : 'bg-surface-muted text-ink-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
