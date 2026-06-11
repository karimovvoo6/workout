import React, { useState, useEffect } from 'react';
import type { WorkoutDay } from '../data/workoutData';
import { ExerciseAnimator } from '../components/ExerciseAnimator';
import { RestTimer } from '../components/RestTimer';
import { AnatomicalModel } from '../components/AnatomicalModel';
import { Check, ArrowLeft, Dumbbell, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SetLog {
  weight: number;
  reps: number;
  completed: boolean;
}

interface ActiveWorkout {
  dayId: number;
  date: string;
  completedExercises: Record<string, boolean>;
  exerciseLogs: Record<string, SetLog[]>;
}

interface ActiveWorkoutViewProps {
  day: WorkoutDay;
  activeWorkout: ActiveWorkout;
  bestRecords: Record<string, number>;
  onBack: () => void;
  onSaveExerciseLog: (exerciseId: string, sets: SetLog[]) => void;
  onCompleteSession: (completedWorkout: {
    dayId: number;
    title: string;
    date: string;
    volume: number;
    totalExercises: number;
  }) => void;
}

export const ActiveWorkoutView: React.FC<ActiveWorkoutViewProps> = ({
  day,
  activeWorkout,
  bestRecords,
  onBack,
  onSaveExerciseLog,
  onCompleteSession
}) => {
  const exercises = day.exercises;
  
  // Ищем первое невыполненное упражнение
  const initialExIndex = exercises.findIndex(ex => !activeWorkout.completedExercises[ex.id]);
  const defaultIndex = initialExIndex === -1 ? 0 : initialExIndex;

  const [currentExIndex, setCurrentExIndex] = useState(defaultIndex);
  
  // Состояния таймера отдыха
  const [showTimer, setShowTimer] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const activeExercise = exercises[currentExIndex];

  // Проверка тяжести упражнения (тяжелые базовые = 90с, обычные = 60с)
  const getRestDurationForExercise = (id: string) => {
    const heavyExercises = [
      'bench-press',       // Жим штанги лежа
      'wide-pullups',      // Подтягивания широким хватом
      'underhand-pullups', // Подтягивания обратным хватом
      'close-pullups',     // Подтягивания узким хватом
      'barbell-row',       // Тяга штанги в наклоне
      'military-press',    // Жим штанги стоя
      'squats',            // Приседания со штангой
      'romanian-deadlift'  // Румынская тяга
    ];
    return heavyExercises.includes(id) ? 90 : 60;
  };

  // Сбрасываем таймер при переходе к новому упражнению
  useEffect(() => {
    setShowTimer(false);
  }, [currentExIndex]);

  const handleNextExercise = () => {
    // Отмечаем текущее упражнение выполненным
    activeWorkout.completedExercises[activeExercise.id] = true;

    // Также запишем выполненные подходы по умолчанию в лог для правильного объема
    const exId = activeExercise.id;
    const bestWeight = bestRecords[exId] !== undefined ? bestRecords[exId] : activeExercise.defaultWeight;
    const completedSets: SetLog[] = [];
    for (let i = 0; i < activeExercise.targetSets; i++) {
      completedSets.push({
        weight: bestWeight,
        reps: activeExercise.targetReps,
        completed: true
      });
    }
    onSaveExerciseLog(exId, completedSets);

    if (currentExIndex < exercises.length - 1) {
      // Запускаем таймер отдыха
      setShowTimer(true);
      setTimerKey(prev => prev + 1);
      
      setCurrentExIndex(prev => prev + 1);
    } else {
      // Последнее упражнение выполнено — завершаем!
      finishWorkout();
    }
  };

  // Завершение тренировки
  const finishWorkout = () => {
    // Если тренировка завершается, пометим текущее упражнение выполненным, если оно не было помечено
    if (!activeWorkout.completedExercises[activeExercise.id]) {
      activeWorkout.completedExercises[activeExercise.id] = true;
      const exId = activeExercise.id;
      const bestWeight = bestRecords[exId] !== undefined ? bestRecords[exId] : activeExercise.defaultWeight;
      const completedSets: SetLog[] = [];
      for (let i = 0; i < activeExercise.targetSets; i++) {
        completedSets.push({
          weight: bestWeight,
          reps: activeExercise.targetReps,
          completed: true
        });
      }
      onSaveExerciseLog(exId, completedSets);
    }

    let totalVolume = 0;
    let totalSetsLogged = 0;

    Object.values(activeWorkout.exerciseLogs).forEach((logs) => {
      logs.forEach(s => {
        if (s.completed) {
          totalVolume += s.weight * s.reps;
          totalSetsLogged++;
        }
      });
    });

    if (totalSetsLogged === 0) {
      const exitConfirm = window.confirm("Вы не выполнили ни одного упражнения. Выйти из тренировки?");
      if (exitConfirm) {
        onBack();
      }
      return;
    }

    onCompleteSession({
      dayId: day.id,
      title: day.title,
      date: new Date().toISOString(),
      volume: totalVolume,
      totalExercises: exercises.length
    });
  };

  const restTime = getRestDurationForExercise(activeExercise.id);
  const totalCompletedCount = Object.keys(activeWorkout.completedExercises).filter(
    key => exercises.some(e => e.id === key) && activeWorkout.completedExercises[key]
  ).length;
  const progressPercent = Math.round((totalCompletedCount / exercises.length) * 100);

  return (
    <div className="flex flex-col gap-5.5 w-full pb-10 relative z-10">
      
      {/* Шапка тренировки */}
      <div className="flex justify-between items-center bg-zinc-950/70 backdrop-blur-md border border-zinc-900/60 rounded-2xl px-4.5 py-3.5 shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[10px] font-black text-zinc-500 hover:text-lesnar-red uppercase tracking-widest transition-colors cursor-pointer"
        >
          <ArrowLeft size={12} />
          Назад
        </button>
        <div className="text-right">
          <span className="text-[10px] font-black text-lesnar-red uppercase tracking-widest block leading-none">
            {day.title}
          </span>
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1.5 inline-block">
            Упражнение {currentExIndex + 1} из {exercises.length}
          </span>
        </div>
      </div>

      {/* Верхний прогресс-бар */}
      <div className="bg-zinc-950/40 border border-zinc-900/60 rounded-xl p-4 flex flex-col gap-2 shadow-lg backdrop-blur-md">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
          <span className="text-zinc-400">Прогресс тренировки</span>
          <span className="text-lesnar-red font-mono">{totalCompletedCount} / {exercises.length} ({progressPercent}%)</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-lesnar-red to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Анимированный контент активного упражнения */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeExercise.id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-5.5 w-full"
        >
          {/* Информация об упражнении */}
          <div className="glass-panel border-zinc-850/40 p-5 rounded-2xl flex flex-col gap-2 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-lesnar-red/5 to-transparent pointer-events-none rounded-full blur-lg"></div>
            
            <div className="flex justify-between items-start gap-3">
              <h2 className="font-display font-black text-lg uppercase text-white leading-tight tracking-tight">
                {activeExercise.name}
              </h2>
              <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-zinc-950 text-zinc-400 border border-zinc-850 flex items-center gap-1 flex-shrink-0">
                <Dumbbell size={9} className="text-lesnar-red" />
                {activeExercise.equipment}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 mt-1">
              <Award size={11} className="text-lesnar-red" />
              <p className="text-[10px] text-zinc-400 font-black uppercase tracking-wider">
                Цель: {activeExercise.targetSets} подходов по {activeExercise.targetReps} повт.
              </p>
            </div>
          </div>

          {/* Таймер отдыха (открывается при отметке подхода) */}
          {showTimer && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <RestTimer
                key={timerKey}
                defaultDuration={restTime}
                onTimerComplete={() => {
                  setShowTimer(false);
                }}
              />
            </motion.div>
          )}

          {/* Визуализация (Аниматор движения) */}
          <div className="w-full">
            <ExerciseAnimator exerciseId={activeExercise.id} />
          </div>

          {/* Область внимания (мышечная карта) */}
          <div className="w-full">
            <AnatomicalModel
              exerciseId={activeExercise.id}
              primaryMuscles={activeExercise.primaryMuscles}
              secondaryMuscles={activeExercise.secondaryMuscles}
              forcedView="both"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Кнопки переходов */}
      <div className="flex flex-col gap-3.5 mt-4 border-t border-zinc-900/60 pt-6">
        <button
          onClick={handleNextExercise}
          className="btn-premium w-full py-4 rounded-xl text-white font-display font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden group shadow-lg"
        >
          <span className="absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
          <Check size={14} strokeWidth={3.5} />
          {currentExIndex < exercises.length - 1 ? 'Следующее упражнение' : 'Завершить тренировку'}
        </button>

        <button
          onClick={finishWorkout}
          className="w-full py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-zinc-300 text-[10px] font-display font-black uppercase tracking-widest transition-all cursor-pointer bg-transparent"
        >
          Завершить тренировку досрочно
        </button>
      </div>

    </div>
  );
};

export default ActiveWorkoutView;
