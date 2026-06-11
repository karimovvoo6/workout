import React, { useState } from 'react';

interface AnatomicalModelProps {
  exerciseId?: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  forcedView?: 'front' | 'back' | 'both';
}

export const AnatomicalModel: React.FC<AnatomicalModelProps> = ({
  exerciseId,
  primaryMuscles,
  secondaryMuscles
}) => {
  const [loading, setLoading] = useState(true);

  // Resolve the dynamic image source from assets/exercises/
  const imageSrc = exerciseId
    ? new URL(`../assets/exercises/${exerciseId}.webp`, import.meta.url).href
    : '';

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-950/45 border border-zinc-200 dark:border-zinc-900 rounded-2xl w-full mx-auto shadow-md dark:shadow-2xl transition-colors duration-300 backdrop-blur-md">
      <div className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-4 text-center">
        РАБОТАЮЩИЕ МЫШЦЫ (GYMVISUAL)
      </div>

      <div className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center overflow-hidden bg-zinc-900/30 dark:bg-zinc-950/20 rounded-xl border border-zinc-100/5 p-2">
        {imageSrc ? (
          <>
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-white dark:bg-zinc-950 z-10">
                <div className="w-9 h-9 border-[3px] border-lesnar-red border-t-transparent rounded-full animate-spin shadow-[0_0_10px_rgba(229,27,35,0.2)]" />
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-widest">Загрузка мышечной карты...</span>
              </div>
            )}
            <img
              src={imageSrc}
              alt="Workout Mannequin"
              onLoad={() => setLoading(false)}
              onError={() => setLoading(false)}
              className="w-full h-full object-contain filter brightness-[1.05] transition-opacity duration-500"
              style={{ opacity: loading ? 0 : 1 }}
            />
          </>
        ) : (
          <div className="text-zinc-500 font-bold text-[10px] uppercase tracking-wider py-10">Изображение отсутствует</div>
        )}
      </div>

      {/* Badges with indicators */}
      <div className="flex flex-wrap gap-2 mt-4.5 justify-center w-full border-t border-zinc-100 dark:border-zinc-900/60 pt-4.5">
        {primaryMuscles.map(m => (
          <span key={m} className="px-2.5 py-1 text-[9px] font-black uppercase rounded-lg bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20 dark:border-red-500/30 flex items-center gap-1.5 shadow-[0_2px_8px_rgba(229,27,35,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 dark:bg-red-400 animate-pulse shadow-[0_0_6px_#ef4444]"></span>
            {getMuscleRussianName(m)}
          </span>
        ))}
        {secondaryMuscles.map(m => (
          <span key={m} className="px-2.5 py-1 text-[9px] font-black uppercase rounded-lg bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-850 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-zinc-600 dark:bg-zinc-500"></span>
            {getMuscleRussianName(m)}
          </span>
        ))}
      </div>
    </div>
  );
};

// Функция перевода латинских ID в русские названия мышц
function getMuscleRussianName(id: string): string {
  const map: Record<string, string> = {
    pectorals: "Грудные",
    triceps: "Трицепс",
    biceps: "Бицепс",
    latissimus: "Широчайшие",
    traps: "Трапеции",
    deltoids_front: "Передние дельты",
    deltoids_medial: "Средние дельты",
    deltoids_back: "Задние дельты",
    forearms: "Предплечья",
    abs: "Пресс",
    quadriceps: "Квадрицепс",
    hamstrings: "Бицепс бедра",
    glutes: "Ягодичные",
    calves: "Икроножные"
  };
  return map[id] || id;
}

export default AnatomicalModel;
