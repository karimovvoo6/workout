import React from 'react';
import { Calendar } from '../components/Calendar';
import { WORKOUT_DATABASE } from '../data/workoutData';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface ActiveWorkout {
  dayId: number;
  completedExercises: Record<string, boolean>;
}

interface CompletedWorkout {
  dayId: number;
  title: string;
  date: string;
  volume: number;
  totalExercises: number;
}

interface DashboardProps {
  history: CompletedWorkout[];
  activeWorkout: ActiveWorkout | null;
  onSelectDay: (dayId: number) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 16 
    } 
  }
};

export const Dashboard: React.FC<DashboardProps> = ({
  history,
  activeWorkout,
  onSelectDay
}) => {
  const isToday = (someDate: Date) => {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear();
  };

  return (
    <div className="flex flex-col gap-6.5 w-full pb-6 relative z-10">
      {/* Календарь тренировок */}
      <Calendar history={history} />

      {/* Карточки дней тренировок */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="font-display font-black text-xs uppercase text-white tracking-[0.15em]">
            План тренировок
          </h2>
          <span className="text-[9px] font-black text-zinc-500 tracking-wider uppercase bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800/30">
            {WORKOUT_DATABASE.length} ДНЯ
          </span>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4.5"
        >
          {WORKOUT_DATABASE.map(day => {
            const isCompletedToday = history.some(h => h.dayId === day.id && isToday(new Date(h.date)));
            const isStarted = activeWorkout && activeWorkout.dayId === day.id;

            return (
              <motion.div
                variants={itemVariants}
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                className={`relative glass-panel glass-panel-hover overflow-hidden rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 group ${
                  isStarted 
                    ? 'border-lesnar-red/60 shadow-[0_0_20px_rgba(229,27,35,0.15)] bg-zinc-900/40' 
                    : isCompletedToday
                    ? 'border-lesnar-green/40 bg-zinc-900/20'
                    : 'border-zinc-800/40'
                }`}
              >
                {/* Фоновое легкое свечение для активной карты */}
                {isStarted && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-lesnar-red/5 to-transparent pointer-events-none rounded-full blur-xl"></div>
                )}

                {/* Вертикальный статус-бар сбоку */}
                <span className={`absolute left-0 top-0 w-1 h-full rounded-l-2xl ${
                  isStarted 
                    ? 'bg-lesnar-red shadow-[0_0_10px_rgba(229,27,35,0.5)]' 
                    : isCompletedToday 
                    ? 'bg-lesnar-green' 
                    : 'bg-zinc-800'
                }`}></span>

                <div className="flex justify-between items-start pl-1.5">
                  <span className="text-[10px] font-black text-lesnar-red uppercase tracking-widest">
                    День {day.id}
                  </span>
                  
                  {/* Статус-бейдж */}
                  {isCompletedToday ? (
                    <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-lesnar-green/20 text-lesnar-green border border-lesnar-green/30">
                      Пройдено
                    </span>
                  ) : isStarted ? (
                    <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-lesnar-red/20 text-lesnar-red border border-lesnar-red/30 animate-pulse">
                      В процессе
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-zinc-900 text-zinc-500 border border-zinc-800/50">
                      Не начато
                    </span>
                  )}
                </div>

                <div className="pl-1.5">
                  <h3 className="font-display font-black text-lg uppercase leading-none text-white group-hover:text-lesnar-red transition-colors duration-300">
                    {day.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-semibold mt-2.5 leading-snug">
                    {day.subtitle}
                  </p>
                </div>

                {/* Целевые группы мышц */}
                <div className="flex flex-wrap gap-1.5 pl-1.5 mt-1">
                  {day.muscles.map(m => (
                    <span key={m} className="px-2.5 py-1 text-[9px] font-bold rounded-lg bg-zinc-900/60 text-zinc-400 border border-zinc-800/30 group-hover:border-zinc-700/50 transition-colors">
                      {m}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pl-1.5 mt-2.5 pt-3 border-t border-zinc-900/80 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Award size={12} className="text-zinc-600" />
                    {day.exercises.length} Упражнений
                  </span>
                  <span className="text-zinc-400 group-hover:text-lesnar-red group-hover:translate-x-1.5 transition-all duration-300 font-black">
                    {isStarted ? 'Продолжить →' : 'Начать сессию →'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
};

export default Dashboard;
