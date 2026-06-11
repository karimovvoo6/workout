import React from 'react';
import type { Exercise } from '../data/workoutData';
import { ExerciseAnimator } from '../components/ExerciseAnimator';
import { AnatomicalModel } from '../components/AnatomicalModel';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExerciseViewProps {
  exercise: Exercise;
  onBack: () => void;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  exercise,
  onBack
}) => {
  return (
    <div className="flex flex-col gap-5.5 w-full pb-10 relative z-10">
      
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
          Назад к тренировке
        </button>
      </motion.div>

      {/* Название упражнения */}
      <motion.div 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-zinc-900/60 pb-3.5"
      >
        <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-lesnar-red/10 text-lesnar-red border border-lesnar-red/25 inline-block mb-2.5 tracking-wider">
          {exercise.equipment}
        </span>
        <h2 className="font-display font-black text-2xl uppercase text-white leading-tight tracking-tight">
          {exercise.name}
        </h2>
      </motion.div>

      {/* Блок визуализации: Анимация движения */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="w-full"
      >
        <ExerciseAnimator exerciseId={exercise.id} />
      </motion.div>

      {/* Область внимания (мышечная карта) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full"
      >
        <AnatomicalModel
          exerciseId={exercise.id}
          primaryMuscles={exercise.primaryMuscles}
          secondaryMuscles={exercise.secondaryMuscles}
          forcedView="both"
        />
      </motion.div>

      {/* Техника выполнения */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-zinc-950/40 backdrop-blur-md border border-zinc-900 border-l-4 border-l-lesnar-red p-4.5 rounded-r-2xl shadow-xl"
      >
        <h4 className="text-[10px] font-black text-lesnar-red uppercase tracking-[0.2em] mb-2 flex items-center gap-1.5">
          <AlertCircle size={12} className="text-lesnar-red animate-pulse" />
          Техника выполнения
        </h4>
        <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
          {exercise.desc}
        </p>
      </motion.div>

    </div>
  );
};

export default ExerciseView;
