import React, { useState } from 'react';

interface ExerciseAnimatorProps {
  exerciseId: string;
}

export const ExerciseAnimator: React.FC<ExerciseAnimatorProps> = ({ exerciseId }) => {
  const [loading, setLoading] = useState(true);

  // Карта названий упражнений для тега alt
  const exerciseNames: Record<string, string> = {
    'bench-press': 'Жим штанги лёжа',
    'dips': 'Отжимания на брусьях',
    'wide-pushups': 'Отжимания широким хватом',
    'french-press': 'Французский жим',
    'close-grip-pushups': 'Узкие отжимания',
    'wide-pullups': 'Подтягивания широким хватом',
    'underhand-pullups': 'Подтягивания обратным хватом',
    'close-pullups': 'Подтягивания узким хватом',
    'barbell-row': 'Тяга штанги в наклоне',
    'barbell-curl': 'Подъём штанги на бицепс',
    'hammer-curls': 'Молотки с гантелью',
    'military-press': 'Жим штанги стоя',
    'dumbbell-press-up': 'Жим гантели вверх',
    'lateral-raises': 'Махи в стороны',
    'upright-row': 'Тяга к подбородку',
    'shrugs': 'Шраги',
    'incline-dumbbell-flyes': 'Разведение гантели в наклоне',
    'squats': 'Приседания со штангой',
    'lunges': 'Выпады',
    'romanian-deadlift': 'Румынская тяга',
    'calf-raises': 'Подъём на носки',
    'stationary-bike': 'Велотренажёр'
  };

  const exerciseName = exerciseNames[exerciseId] || 'Упражнение';
  
  // Динамическое разрешение локального пути к GIF-файлу
  const gifSrc = exerciseId
    ? new URL(`../assets/animations/${exerciseId}.gif`, import.meta.url).href
    : '';

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] text-center mb-1">
        Техника движения
      </div>
      <div className="relative w-full aspect-video flex items-center justify-center bg-white border border-zinc-200 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-inner p-2.5">
        {gifSrc ? (
          <>
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-white dark:bg-zinc-950 z-10">
                <div className="w-9 h-9 border-[3px] border-lesnar-red border-t-transparent rounded-full animate-spin shadow-[0_0_10px_rgba(229,27,35,0.2)]" />
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-widest">Загрузка анимации...</span>
              </div>
            )}
            <img
              src={gifSrc}
              alt={exerciseName}
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
              className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-opacity duration-500"
              style={{ opacity: loading ? 0 : 1 }}
            />
          </>
        ) : (
          <span className="text-zinc-400 font-bold text-[10px] uppercase tracking-wider">Анимация движения отсутствует</span>
        )}
      </div>
    </div>
  );
};

export default ExerciseAnimator;
