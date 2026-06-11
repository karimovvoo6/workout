import React from 'react';
import { StatsCharts } from '../components/StatsCharts';
import { Trash2, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface HistoryItem {
  dayId: number;
  title: string;
  date: string;
  volume: number;
  totalExercises: number;
}

interface ProgressProps {
  history: HistoryItem[];
  bestRecords: Record<string, number>;
  onResetData: () => void;
}

export const Progress: React.FC<ProgressProps> = ({
  history,
  onResetData
}) => {
  return (
    <div className="flex flex-col gap-6 w-full pb-10 relative z-10">
      
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="border-b border-zinc-900 pb-3"
      >
        <h2 className="font-display font-black text-xl uppercase text-white leading-tight tracking-tight">
          Твои Достижения
        </h2>
      </motion.div>

      {/* Дашборд краткой сводки */}
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, type: "spring", stiffness: 100, damping: 15 }}
        className="glass-panel border-zinc-850/40 rounded-2xl p-5.5 flex flex-col gap-2 shadow-2xl text-center relative overflow-hidden"
      >
        <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-36 h-36 bg-radial from-lesnar-red/10 to-transparent blur-xl rounded-full pointer-events-none"></div>
        
        <div className="flex items-center justify-center gap-1.5 z-10">
          <Flame size={12} className="text-lesnar-red animate-pulse" />
          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] block">
            Всего Тренировок
          </span>
        </div>
        
        <span className="font-display font-black text-4xl text-lesnar-red leading-none mt-2 z-10 filter drop-shadow-[0_2px_8px_rgba(229,27,35,0.25)]">
          {history.length}
        </span>
      </motion.div>

      {/* Графика статистики */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <StatsCharts history={history} />
      </motion.div>

      {/* Сброс данных */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-4 border-t border-zinc-900/60 pt-6"
      >
        <button
          onClick={onResetData}
          className="w-full py-3.5 rounded-xl border border-zinc-800 hover:border-red-950/60 text-zinc-500 hover:text-lesnar-red text-xs font-display font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group cursor-pointer bg-transparent"
        >
          <Trash2 size={13} className="text-zinc-600 group-hover:text-lesnar-red transition-colors" />
          Очистить все данные
        </button>
      </motion.div>

    </div>
  );
};

export default Progress;
