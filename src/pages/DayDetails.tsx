import React from 'react';
import { WORKOUT_DATABASE } from '../data/workoutData';
import type { Exercise } from '../data/workoutData';
import { ArrowLeft, Check, Play, Dumbbell, Award, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface ActiveWorkout {
  dayId: number;
  completedExercises: Record<string, boolean>;
}

interface DayDetailsProps {
  dayId: number;
  activeWorkout: ActiveWorkout | null;
  onBack: () => void;
  onStartSession: (dayId: number) => void;
  onSelectExercise: (exercise: Exercise) => void;
}

const listVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 18 
    } 
  }
};

export const DayDetails: React.FC<DayDetailsProps> = ({
  dayId,
  activeWorkout,
  onBack,
  onStartSession,
  onSelectExercise
}) => {
  const day = WORKOUT_DATABASE.find(d => d.id === dayId);
  if (!day) return null;

  const isStarted = activeWorkout && activeWorkout.dayId === dayId;
  
  // Расчет процента выполнения
  const getProgressInfo = () => {
    if (!isStarted || !activeWorkout) return { count: 0, percent: 0 };
    const completedCount = Object.keys(activeWorkout.completedExercises).filter(
      key => day.exercises.some(e => e.id === key) && activeWorkout.completedExercises[key]
    ).length;
    
    return {
      count: completedCount,
      percent: Math.round((completedCount / day.exercises.length) * 100)
    };
  };

  const progress = getProgressInfo();

  return (
    <div className="flex flex-col gap-5.5 w-full pb-6 relative z-10">
      
      {/* Кнопка назад */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[10px] font-black text-zinc-500 hover:text-lesnar-red uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft size={12} />
          Назад к дням
        </button>
      </motion.div>

      {/* Hero-карточка дня тренировки */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 100, damping: 15 }}
        className="relative overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900 border border-zinc-800/80 rounded-2xl p-5.5 text-center flex flex-col items-center gap-3.5 shadow-2xl"
      >
        {/* Декоративное фоновое свечение */}
        <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-48 h-48 bg-radial from-lesnar-red/10 to-transparent blur-2xl rounded-full pointer-events-none"></div>

        <div className="flex items-center gap-1 z-10">
          <Flame size={12} className="text-lesnar-red" />
          <span className="text-[10px] font-black text-lesnar-red uppercase tracking-[0.2em] block">
            ДЕНЬ {day.id}
          </span>
        </div>

        <h2 className="font-display font-black text-2xl uppercase leading-none text-white z-10 tracking-tight">
          {day.title}
        </h2>
        <p className="text-xs text-zinc-400 font-semibold max-w-[85%] z-10 leading-relaxed">
          {day.subtitle}
        </p>

        {/* Главная кнопка Старт / Продолжить */}
        <button
          onClick={() => onStartSession(day.id)}
          className="btn-premium mt-1.5 w-full max-w-[280px] py-3.5 rounded-xl text-white font-display font-black text-xs uppercase tracking-widest transition-all cursor-pointer relative overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          {isStarted ? 'Продолжить тренировку' : 'Начать тренировку'}
        </button>
      </motion.div>

      {/* Прогресс-бар для активной тренировки */}
      {isStarted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-4 flex flex-col gap-2.5 shadow-lg backdrop-blur-md"
        >
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-zinc-400 uppercase tracking-widest text-[10px]">Прогресс выполнения</span>
            <span className="text-lesnar-red font-mono font-black">{progress.count} / {day.exercises.length} ({progress.percent}%)</span>
          </div>
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-lesnar-red to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.div>
          </div>
        </motion.div>
      )}

      {/* Список упражнений */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-display font-black text-xs uppercase text-white tracking-[0.15em]">
            Список упражнений
          </h3>
          <span className="text-[9px] font-black text-zinc-500 bg-zinc-900/60 px-2 py-0.5 rounded border border-zinc-800/30 tracking-wider uppercase">
            {day.exercises.length} ДВИЖЕНИЙ
          </span>
        </div>

        <motion.div 
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-3.5"
        >
          {day.exercises.map(ex => {
            const isCompleted = activeWorkout && 
              activeWorkout.dayId === day.id && 
              activeWorkout.completedExercises[ex.id];

            return (
              <motion.div
                variants={cardVariants}
                key={ex.id}
                onClick={() => onSelectExercise(ex)}
                className={`glass-panel glass-panel-hover rounded-2xl p-4.5 flex justify-between items-center cursor-pointer transition-colors group ${
                  isCompleted 
                    ? 'border-lesnar-green/35 bg-zinc-950/40 shadow-[0_4px_15px_rgba(48,209,88,0.04)]' 
                    : 'border-zinc-850/40 bg-zinc-900/10'
                }`}
              >
                <div className="flex flex-col gap-2 flex-grow pr-4">
                  <h4 className="font-display font-black text-sm uppercase text-white leading-tight group-hover:text-lesnar-red transition-colors duration-300">
                    {ex.name}
                  </h4>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Метка инвентаря */}
                    <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-zinc-900/60 text-zinc-400 border border-zinc-800/60 flex items-center gap-1">
                      <Dumbbell size={8} className="text-lesnar-red" />
                      {ex.equipment}
                    </span>
                    
                    {/* Подходы и повторения */}
                    <span className="text-[10px] font-bold text-zinc-500 flex items-center gap-1 uppercase tracking-wide">
                      <Award size={10} className="text-zinc-600" />
                      {ex.id === 'stationary-bike' ? `${ex.targetReps} мин` : `${ex.targetSets} подх. x ${ex.targetReps} повт.`}
                    </span>
                  </div>
                </div>

                {/* Индикатор статуса выполнения */}
                <button
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    isCompleted
                      ? 'bg-lesnar-green border-lesnar-green text-zinc-950 shadow-[0_0_10px_rgba(48,209,88,0.3)]'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-500 group-hover:bg-lesnar-red group-hover:border-lesnar-red group-hover:text-white group-hover:shadow-[0_0_12px_rgba(229,27,35,0.4)]'
                  }`}
                >
                  {isCompleted ? <Check size={15} strokeWidth={3.5} /> : <Play size={11} className="ml-0.5 fill-current" />}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </div>
  );
};

export default DayDetails;
