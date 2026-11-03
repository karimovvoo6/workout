import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShieldCheck, Sparkles, X, ChevronRight, ChevronDown, ChevronUp, Layers, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { EXTRA_EXERCISES, type ExtraExercise } from '../data/gymVisualExercises';

interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  workouts: string;
  svgIcon: React.ReactNode;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 110, 
      damping: 16 
    } 
  }
};

export const MyGym: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<ExtraExercise | null>(null);
  const [expandedEquipmentId, setExpandedEquipmentId] = useState<string | null>(null);

  // Закрытие модального окна по клавише Escape и блокировка скролла фона
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedExercise(null);
      }
    };
    if (selectedExercise) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedExercise]);

  const toggleEquipment = (id: string) => {
    setExpandedEquipmentId(prev => prev === id ? null : id);
  };

  const getGifUrl = (id: string) => {
    return new URL(`../assets/animations/${id}.gif`, import.meta.url).href;
  };

  const getImageUrl = (id: string) => {
    return new URL(`../assets/exercises/${id}.jpg`, import.meta.url).href;
  };

  const equipmentList: EquipmentItem[] = [
    {
      id: "barbell",
      name: "Штанга",
      description: "Главный силовой снаряд для набора мышечной массы, выполнения тяжелых базовых приседаний, жимов и тяг.",
      workouts: "Жим штанги лёжа, Французский жим, Тяга в наклоне, Подъём на бицепс, Жим стоя, Тяга к подбородку, Шраги, Приседания, Румынская тяга, Подъём на носки.",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-lesnar-red fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="32" x2="56" y2="32" strokeWidth="3" />
          <rect x="8" y="20" width="4" height="24" rx="1" className="fill-zinc-800" />
          <rect x="4" y="24" width="4" height="16" rx="1" className="fill-zinc-700" />
          <rect x="52" y="20" width="4" height="24" rx="1" className="fill-zinc-800" />
          <rect x="56" y="24" width="4" height="16" rx="1" className="fill-zinc-700" />
          <circle cx="2" cy="32" r="1" />
          <circle cx="62" cy="32" r="1" />
        </svg>
      )
    },
    {
      id: "dumbbell",
      name: "Гантель",
      description: "Позволяет сбалансировано развивать силу каждой стороны тела и выполнять изолированные подъемы/махи.",
      workouts: "Молотки с гантелью, Жим гантели вверх, Махи в стороны, Разведение в наклоне, Выпады с гантелями.",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-lesnar-red fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="16" y1="32" x2="48" y2="32" strokeWidth="4" />
          <rect x="10" y="20" width="6" height="24" rx="2" className="fill-zinc-800" />
          <rect x="4" y="24" width="6" height="16" rx="2" className="fill-zinc-700" />
          <rect x="48" y="20" width="6" height="24" rx="2" className="fill-zinc-800" />
          <rect x="54" y="24" width="6" height="16" rx="2" className="fill-zinc-700" />
        </svg>
      )
    },
    {
      id: "pullup-bar",
      name: "Турник",
      description: "Основной снаряд с собственным весом для построения широчайших мышц спины под разными углами.",
      workouts: "Подтягивания широким хватом, Подтягивания обратным хватом, Подтягивания узким хватом.",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-lesnar-red fill-none" strokeWidth="2" strokeLinecap="round">
          <line x1="4" y1="16" x2="60" y2="16" strokeWidth="3" />
          <line x1="12" y1="16" x2="12" y2="52" />
          <line x1="52" y1="16" x2="52" y2="52" />
          <path d="M4 16 L4 24" />
          <path d="M60 16 L60 24" />
          <line x1="8" y1="52" x2="16" y2="52" strokeWidth="3" />
          <line x1="48" y1="52" x2="56" y2="52" strokeWidth="3" />
        </svg>
      )
    },
    {
      id: "dips-bar",
      name: "Брусья",
      description: "Отличный снаряд для акцента на низ грудных мышц, плечевой пояс и трицепсы за счет веса тела.",
      workouts: "Отжимания на брусьях.",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-lesnar-red fill-none" strokeWidth="2" strokeLinecap="round">
          <line x1="16" y1="36" x2="48" y2="36" strokeWidth="3" />
          <line x1="24" y1="36" x2="24" y2="56" />
          <line x1="40" y1="36" x2="40" y2="56" />
          <path d="M16 36 Q12 36 12 30" />
          <path d="M48 36 Q52 36 52 30" />
        </svg>
      )
    },
    {
      id: "bench",
      name: "Спортивная скамья",
      description: "Устойчивая опора для жимов штанги, французского жима, тяги гантелей в наклоне и сидячих жимов.",
      workouts: "Жим штанги лёжа, Французский жим, Жим гантели вверх (сидя), Разведение в наклоне.",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-lesnar-red fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="40" x2="56" y2="40" strokeWidth="4" />
          <line x1="16" y1="40" x2="16" y2="52" strokeWidth="3" />
          <line x1="48" y1="40" x2="48" y2="52" strokeWidth="3" />
          <line x1="12" y1="52" x2="20" y2="52" strokeWidth="2" />
          <line x1="44" y1="52" x2="52" y2="52" strokeWidth="2" />
          <line x1="20" y1="40" x2="30" y2="28" />
        </svg>
      )
    },
    {
      id: "bike",
      name: "Велотренажёр",
      description: "Инструмент для тренировки аэробной и анаэробной выносливости с помощью интервальных HIIT сессий.",
      workouts: "Велотренажёр (интервальное кардио).",
      svgIcon: (
        <svg viewBox="0 0 64 64" className="w-12 h-12 stroke-lesnar-red fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="20" cy="48" r="10" />
          <circle cx="44" cy="48" r="10" />
          <line x1="20" y1="48" x2="32" y2="34" />
          <line x1="44" y1="48" x2="32" y2="34" />
          <line x1="32" y1="34" x2="28" y2="24" strokeWidth="3" />
          <line x1="24" y1="24" x2="32" y2="24" strokeWidth="3" />
          <path d="M44 48 L44 32 L40 28" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col gap-5.5 w-full pb-10 relative z-10">
      
      {/* Шапка раздела */}
      <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
        <h2 className="font-display font-black text-xl uppercase text-white leading-tight tracking-tight">
          Мой Зал
        </h2>
        <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-lesnar-green/10 text-lesnar-green border border-lesnar-green/20 flex items-center gap-1">
          <ShieldCheck size={9} strokeWidth={2.5} />
          Реальный инвентарь
        </span>
      </div>

      <div className="text-xs text-zinc-400 font-semibold leading-relaxed px-1">
        Здесь представлено ваше оборудование. Нажмите на любое оборудование, чтобы открыть возможные дополнительные упражнения с ним.
      </div>

      {/* Список оборудования */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-5"
      >
        {equipmentList.map((item) => {
          const extraExercises = EXTRA_EXERCISES.filter(ex => ex.equipmentId === item.id);
          const isExpanded = expandedEquipmentId === item.id;

          return (
            <motion.div
              variants={cardVariants}
              key={item.id}
              className={`glass-panel rounded-2xl p-5 flex flex-col gap-3.5 border transition-all duration-300 shadow-xl ${
                isExpanded ? 'border-lesnar-red/40 bg-zinc-900/35' : 'border-zinc-800/50'
              }`}
            >
              {/* Кликабельная шапка оборудования */}
              <div 
                onClick={() => toggleEquipment(item.id)}
                className="flex gap-4 items-start cursor-pointer group select-none"
              >
                <div className="w-16 h-16 rounded-xl bg-zinc-950/80 flex items-center justify-center border border-zinc-900/80 flex-shrink-0 shadow-inner group-hover:border-lesnar-red/30 transition-colors">
                  {item.svgIcon}
                </div>

                <div className="flex flex-col gap-1.5 flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-black text-base uppercase text-white tracking-wide group-hover:text-lesnar-red transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-zinc-500 group-hover:text-lesnar-red transition-colors p-1">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Упражнения текущей программы (4 дня) */}
              <div className="bg-zinc-950/50 rounded-xl p-3 border border-zinc-900/60">
                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
                  <Layers size={10} className="text-zinc-500" />
                  В твоих 4 днях программы:
                </span>
                <p className="text-[10px] text-zinc-300 font-bold leading-relaxed uppercase">
                  {item.workouts}
                </p>
              </div>

              {/* Кнопка-триггер для показа возможных упражнений */}
              {extraExercises.length > 0 && (
                <button
                  type="button"
                  onClick={() => toggleEquipment(item.id)}
                  className="flex items-center justify-between w-full pt-3 border-t border-zinc-900/70 text-left cursor-pointer group/btn"
                >
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={11} className={isExpanded ? "text-lesnar-red animate-pulse" : "text-zinc-500"} />
                    <span className="text-[9px] font-black uppercase tracking-wider text-zinc-300 group-hover/btn:text-lesnar-red transition-colors">
                      Возможные упражнения ({extraExercises.length})
                    </span>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-lesnar-red group-hover/btn:underline flex items-center gap-1">
                    {isExpanded ? 'Скрыть ▲' : 'Показать ▼'}
                  </span>
                </button>
              )}

              {/* Анимированный раскрывающийся блок возможных упражнений */}
              <AnimatePresence>
                {isExpanded && extraExercises.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden flex flex-col gap-2 pt-1"
                  >
                    <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-0.5">
                      Нет в твоих 4 днях:
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {extraExercises.map((ex) => (
                        <div
                          key={ex.id}
                          onClick={() => setSelectedExercise(ex)}
                          className="group flex items-center gap-3 bg-zinc-900/40 hover:bg-zinc-850/60 border border-zinc-800/40 hover:border-lesnar-red/40 rounded-xl p-2.5 cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                          {/* Превью фото упражнения */}
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-0.5 shadow-sm">
                            <img
                              src={getImageUrl(ex.id)}
                              alt={ex.nameRu}
                              className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>

                          {/* Название и целевая мышца */}
                          <div className="flex flex-col flex-grow min-w-0">
                            <span className="font-display font-black text-xs text-white uppercase tracking-tight group-hover:text-lesnar-red transition-colors truncate">
                              {ex.nameRu}
                            </span>
                            <span className="text-[9px] text-zinc-500 font-bold uppercase truncate">
                              {ex.nameEn}
                            </span>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="w-1 h-1 rounded-full bg-lesnar-red"></span>
                              <span className="text-[9px] font-bold text-zinc-400 truncate">
                                {ex.targetMuscle}
                              </span>
                            </div>
                          </div>

                          <div className="text-zinc-500 group-hover:text-lesnar-red transition-colors pr-1 flex-shrink-0">
                            <ChevronRight size={14} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* МОДАЛЬНОЕ ОКНО С АНИМАЦИЕЙ И ТЕХНИКОЙ ВЫПОЛНЕНИЯ (ПОРТАЛ В BODY ПОВЕРХ ВСЕГО) */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedExercise && (
            <div 
              onClick={() => setSelectedExercise(null)}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md"
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-full max-w-[460px] max-h-[85vh] sm:max-h-[82vh] bg-zinc-950 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl relative"
              >
                {/* ФИКСИРОВАННАЯ ШАПКА КАРТОЧКИ С КРЕСТИКОМ X */}
                <div className="shrink-0 p-4 sm:p-5 border-b border-zinc-900 bg-zinc-950 flex justify-between items-start gap-3">
                  <div>
                    <span className="px-2.5 py-0.5 text-[8px] font-black uppercase rounded bg-lesnar-red/10 text-lesnar-red border border-lesnar-red/25 inline-block mb-1.5 tracking-wider">
                      {selectedExercise.equipmentName}
                    </span>
                    <h3 className="font-display font-black text-lg text-white uppercase leading-tight tracking-tight">
                      {selectedExercise.nameRu}
                    </h3>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mt-0.5">
                      {selectedExercise.nameEn}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedExercise(null)}
                    className="w-9 h-9 rounded-full bg-zinc-850 hover:bg-lesnar-red text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md flex-shrink-0"
                    aria-label="Закрыть"
                    title="Закрыть"
                  >
                    <X size={20} strokeWidth={2.5} />
                  </button>
                </div>

                {/* СКРОЛЛИРУЕМАЯ СЕРЕДИНА КАРТОЧКИ */}
                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
                  {/* Анимация упражнения (GIF) с надежной высотой и белым фоном */}
                  <div className="w-full min-h-[220px] h-60 bg-white rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex items-center justify-center p-3 shadow-inner relative flex-shrink-0">
                    <img
                      src={getGifUrl(selectedExercise.id)}
                      alt={selectedExercise.nameRu}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Мышечные группы */}
                  <div className="flex flex-col gap-2 bg-zinc-900/40 p-3.5 rounded-xl border border-zinc-850/50">
                    <div className="flex items-center gap-1.5">
                      <Flame size={12} className="text-lesnar-red animate-pulse" />
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        Работающие мышцы
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <span className="px-2.5 py-1 text-[9px] font-black uppercase rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                        {selectedExercise.targetMuscle}
                      </span>
                      {selectedExercise.secondaryMuscles.map(m => (
                        <span key={m} className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-lg bg-zinc-900 text-zinc-400 border border-zinc-800">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Описание */}
                  <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
                    {selectedExercise.desc}
                  </p>

                  {/* Пошаговая техника */}
                  <div className="flex flex-col gap-2 border-t border-zinc-900 pt-3">
                    <span className="text-[10px] font-black text-lesnar-red uppercase tracking-widest block mb-1">
                      Техника выполнения:
                    </span>
                    <div className="flex flex-col gap-2">
                      {selectedExercise.instructions.map((step, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-xs text-zinc-300 leading-relaxed">
                          <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-black text-lesnar-red flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ФИКСИРОВАННЫЙ НИЗ: ВСЕГДА ВИДИМАЯ КНОПКА ЗАКРЫТЬ */}
                <div className="shrink-0 p-4 border-t border-zinc-900 bg-zinc-950">
                  <button
                    type="button"
                    onClick={() => setSelectedExercise(null)}
                    className="btn-premium w-full py-3.5 px-4 rounded-xl text-white font-display font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
                  >
                    <X size={16} strokeWidth={2.5} />
                    Закрыть
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </div>
  );
};

export default MyGym;
