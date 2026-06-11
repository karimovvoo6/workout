import React from 'react';
import { Dumbbell, BarChart2, Shield } from 'lucide-react';

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-18 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800 flex justify-around items-center z-50 px-4 py-2">
      <button
        onClick={() => setActiveTab('workouts')}
        className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${
          activeTab === 'workouts' || activeTab === 'day-details'
            ? 'text-lesnar-red'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <Dumbbell size={20} className="transition-transform active:scale-95" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Тренировки</span>
      </button>

      <button
        onClick={() => setActiveTab('gym')}
        className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${
          activeTab === 'gym'
            ? 'text-lesnar-red'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <Shield size={20} className="transition-transform active:scale-95" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Мой зал</span>
      </button>

      <button
        onClick={() => setActiveTab('progress')}
        className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${
          activeTab === 'progress'
            ? 'text-lesnar-red'
            : 'text-zinc-500 hover:text-zinc-300'
        }`}
      >
        <BarChart2 size={20} className="transition-transform active:scale-95" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Прогресс</span>
      </button>
    </nav>
  );
};
export default TabBar;
