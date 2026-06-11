import React, { useState, useEffect } from 'react';
import { TabBar } from './components/TabBar';
import { Dashboard } from './pages/Dashboard';
import { DayDetails } from './pages/DayDetails';
import { ExerciseView } from './pages/ExerciseView';
import { Progress } from './pages/Progress';
import { MyGym } from './pages/MyGym';
import { ActiveWorkoutView } from './pages/ActiveWorkoutView';
import type { Exercise } from './data/workoutData';
import { WORKOUT_DATABASE } from './data/workoutData';
import { Sun, Moon } from 'lucide-react';
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

interface CompletedWorkout {
  dayId: number;
  title: string;
  date: string;
  volume: number;
  totalExercises: number;
}

export const App: React.FC = () => {
  // Тема приложения (белая / черная)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('app-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // По умолчанию темная тема UFC
  });

  // Эффект для применения темы к documentElement
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Навигационный стейт
  const [activeTab, setActiveTab] = useState<string>('workouts'); // 'workouts' | 'progress' | 'gym'
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [activeWorkoutMode, setActiveWorkoutMode] = useState<boolean>(false);

  // Стейт данных
  const [history, setHistory] = useState<CompletedWorkout[]>([]);
  const [bestRecords, setBestRecords] = useState<Record<string, number>>({});
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(null);

  // Загрузка данных при инициализации
  useEffect(() => {
    const savedHistory = localStorage.getItem("lesnar_history");
    const savedRecords = localStorage.getItem("lesnar_records");
    const savedActive = localStorage.getItem("lesnar_active_workout");

    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedRecords) setBestRecords(JSON.parse(savedRecords));
    if (savedActive) {
      const parsedActive = JSON.parse(savedActive);
      setActiveWorkout(parsedActive);
    }
  }, []);

  // Синхронизация данных с LocalStorage
  const saveHistory = (newHistory: CompletedWorkout[]) => {
    setHistory(newHistory);
    localStorage.setItem("lesnar_history", JSON.stringify(newHistory));
  };

  const saveRecords = (newRecords: Record<string, number>) => {
    setBestRecords(newRecords);
    localStorage.setItem("lesnar_records", JSON.stringify(newRecords));
  };

  const saveActiveWorkout = (newActive: ActiveWorkout | null) => {
    setActiveWorkout(newActive);
    if (newActive) {
      localStorage.setItem("lesnar_active_workout", JSON.stringify(newActive));
    } else {
      localStorage.removeItem("lesnar_active_workout");
    }
  };

  // Старт новой тренировочной сессии
  const handleStartSession = (dayId: number) => {
    let currentActive = activeWorkout;

    // Если сессии нет или это другой день, инициализируем
    if (!currentActive || currentActive.dayId !== dayId) {
      currentActive = {
        dayId,
        date: new Date().toISOString(),
        completedExercises: {},
        exerciseLogs: {}
      };
      saveActiveWorkout(currentActive);
    }
    
    setActiveWorkoutMode(true);
  };

  // Промежуточное сохранение логов подходов в упражнении
  const handleSaveExerciseLog = (exerciseId: string, sets: SetLog[]) => {
    if (!activeWorkout) return;

    const updatedActive = {
      ...activeWorkout,
      exerciseLogs: {
        ...activeWorkout.exerciseLogs,
        [exerciseId]: sets
      }
    };
    saveActiveWorkout(updatedActive);
  };

  // Вызывается из ActiveWorkoutView при завершении сессии
  const handleCompleteSession = (completedWorkout: CompletedWorkout) => {
    const newHistory = [completedWorkout, ...history];
    saveHistory(newHistory);

    // Обновляем персональные рекорды на основе логов тренировки
    if (activeWorkout) {
      const newRecords = { ...bestRecords };
      let updated = false;

      Object.entries(activeWorkout.exerciseLogs).forEach(([exId, sets]) => {
        sets.forEach(set => {
          if (set.completed && set.weight > 0) {
            const currentBest = newRecords[exId] || 0;
            if (set.weight > currentBest) {
              newRecords[exId] = set.weight;
              updated = true;
            }
          }
        });
      });

      if (updated) {
        saveRecords(newRecords);
      }
    }

    saveActiveWorkout(null);
    setActiveWorkoutMode(false);
    setSelectedDayId(null);
    setActiveTab('progress'); // Перенаправляем на прогресс
  };

  // Сброс всех данных атлета
  const handleResetData = () => {
    const confirmReset = window.confirm("Внимание! Вы собираетесь стереть всю историю, личные рекорды и текущий прогресс. Это действие необратимо. Сбросить данные?");
    if (confirmReset) {
      localStorage.clear();
      setHistory([]);
      setBestRecords({});
      setActiveWorkout(null);
      setActiveExercise(null);
      setSelectedDayId(null);
      setActiveWorkoutMode(false);
      setActiveTab('workouts');
      alert("Все данные сброшены. Начните с чистого листа!");
    }
  };

  // Отрисовка активного экрана
  const renderContent = () => {
    // В активном режиме тренировки рендерим только его
    if (activeWorkoutMode && activeWorkout && selectedDayId !== null) {
      const day = WORKOUT_DATABASE.find(d => d.id === selectedDayId);
      if (day) {
        return (
          <ActiveWorkoutView
            day={day}
            activeWorkout={activeWorkout}
            bestRecords={bestRecords}
            onBack={() => {
              setActiveWorkoutMode(false);
            }}
            onSaveExerciseLog={handleSaveExerciseLog}
            onCompleteSession={handleCompleteSession}
          />
        );
      }
    }

    if (activeExercise) {
      return (
        <ExerciseView
          exercise={activeExercise}
          onBack={() => setActiveExercise(null)}
        />
      );
    }

    if (selectedDayId !== null) {
      return (
        <DayDetails
          dayId={selectedDayId}
          activeWorkout={activeWorkout}
          onBack={() => setSelectedDayId(null)}
          onStartSession={handleStartSession}
          onSelectExercise={(ex) => {
            // Открыть упражнение можно в любое время для просмотра/редактирования
            setActiveExercise(ex);
          }}
        />
      );
    }

    if (activeTab === 'workouts') {
      return (
        <Dashboard
          history={history}
          activeWorkout={activeWorkout}
          onSelectDay={(dayId) => setSelectedDayId(dayId)}
        />
      );
    }

    if (activeTab === 'progress') {
      return (
        <Progress
          history={history}
          bestRecords={bestRecords}
          onResetData={handleResetData}
        />
      );
    }

    if (activeTab === 'gym') {
      return (
        <MyGym />
      );
    }

    return null;
  };

  return (
    <div className="flex justify-center min-h-screen bg-lesnar-dark w-full overflow-x-hidden relative">
      {/* Фоновые градиенты Брока Леснара */}
      <div className="radial-glow-top"></div>
      <div className="radial-glow-bottom"></div>
      
      <div className={`w-full max-w-[480px] bg-lesnar-dark/95 min-h-screen flex flex-col relative border-x border-zinc-900/40 z-10 shadow-2xl ${
        (!activeExercise && !activeWorkoutMode) ? 'pb-24' : 'pb-4'
      }`}>
        
        {/* Хедер приложения */}
        <header className="py-5 px-5 text-center border-b border-zinc-900/60 bg-zinc-950/75 sticky top-0 backdrop-blur-lg z-40 relative">
          <div className="text-[9px] font-black text-lesnar-red tracking-[0.25em] uppercase mb-0.5">
            Сила и масса в стиле Брока Леснара
          </div>
          <h1 className="font-display font-black italic text-2xl text-white tracking-tight leading-none">
            СИЛОВОЙ ТРЕНЕР
          </h1>
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Переключить тему"
            title="Переключить тему"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Основной контент */}
        <main className="flex-grow px-4.5 py-5 overflow-y-auto relative z-10 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (selectedDayId ? `-day-${selectedDayId}` : '') + (activeExercise ? `-ex-${activeExercise.id}` : '') + (activeWorkoutMode ? '-workout' : '')}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="w-full flex flex-col flex-grow"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Таб-бар */}
        {!activeExercise && !activeWorkoutMode && (
          <TabBar activeTab={activeTab} setActiveTab={(tab) => {
            setSelectedDayId(null); // Сбрасываем выбранный день при переключении табов
            setActiveTab(tab);
          }} />
        )}

      </div>
    </div>
  );

};

export default App;