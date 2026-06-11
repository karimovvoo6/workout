import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

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
      staggerChildren: 0.05
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
      workouts: "Молотки с гантелью, Жим гантели вверх, Махи в стороны, Разведение в наклоне.",
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
      workouts: "Велотренажёр.",
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
        Здесь представлено только ваше реальное оборудование. Все тренировочные дни программы используют исключительно этот инвентарь.
      </div>

      {/* Сетка оборудования */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-4.5"
      >
        {equipmentList.map((item) => (
          <motion.div
            variants={cardVariants}
            key={item.id}
            className="glass-panel glass-panel-hover rounded-2xl p-5 flex gap-4 transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden"
          >
            {/* Иконка */}
            <div className="w-16 h-16 rounded-xl bg-zinc-950/70 flex items-center justify-center border border-zinc-900/60 flex-shrink-0 shadow-inner">
              {item.svgIcon}
            </div>

            {/* Текстовая инфо */}
            <div className="flex flex-col gap-2 flex-grow">
              <h3 className="font-display font-black text-sm uppercase text-white leading-none tracking-wide">
                {item.name}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
                {item.description}
              </p>
              
              <div className="border-t border-zinc-900/60 pt-2.5 mt-1">
                <span className="text-[9px] font-black text-lesnar-red uppercase tracking-widest block mb-1">
                  Участвует в упражнениях:
                </span>
                <p className="text-[10px] text-zinc-500 font-black leading-relaxed uppercase">
                  {item.workouts}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};

export default MyGym;
