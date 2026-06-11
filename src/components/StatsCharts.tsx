import React from 'react';

interface HistoryItem {
  date: string;
  title: string;
  volume: number;
  totalExercises: number;
}

interface StatsChartsProps {
  history: HistoryItem[];
}

export const StatsCharts: React.FC<StatsChartsProps> = ({ history }) => {
  // Выбираем последние 7 тренировок для отображения графика объема
  const lastWorkouts = [...history].slice(0, 7).reverse();

  // Расчет статистики по группам мышц на основе истории
  const getMuscleStats = () => {
    const counts: Record<string, number> = {
      "Грудь": 0,
      "Спина": 0,
      "Плечи": 0,
      "Ноги": 0,
      "Бицепс": 0,
      "Трицепс": 0
    };

    history.forEach(item => {
      if (item.title.includes("Грудь")) {
        counts["Грудь"] += 3;
        counts["Трицепс"] += 2;
      }
      if (item.title.includes("Спина")) {
        counts["Спина"] += 3;
        counts["Бицепс"] += 3;
      }
      if (item.title.includes("Плечи")) {
        counts["Плечи"] += 4;
      }
      if (item.title.includes("Ноги")) {
        counts["Ноги"] += 4;
      }
    });

    const maxCount = Math.max(...Object.values(counts), 1);
    return Object.entries(counts).map(([name, count]) => ({
      name,
      percentage: Math.round((count / maxCount) * 100),
      count
    }));
  };

  const muscleStats = getMuscleStats();

  // Генерация SVG пути для графика
  const renderVolumeChart = () => {
    if (lastWorkouts.length === 0) {
      return (
        <div className="flex items-center justify-center h-32 border border-dashed border-zinc-800 rounded-xl text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
          Нет данных для построения графика объема
        </div>
      );
    }

    const width = 320;
    const height = 120;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxVolume = Math.max(...lastWorkouts.map(w => w.volume), 1000);
    const minVolume = Math.min(...lastWorkouts.map(w => w.volume), 0);
    const volumeRange = maxVolume - minVolume;

    // Вычисляем координаты точек
    const points = lastWorkouts.map((w, index) => {
      const x = padding + (index / Math.max(lastWorkouts.length - 1, 1)) * chartWidth;
      const y = padding + chartHeight - ((w.volume - minVolume) / volumeRange) * chartHeight;
      return { x, y, val: w.volume };
    });

    const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');
    
    // Создаем область заливки под линией графика
    const areaPoints = points.length > 0 
      ? `${points[0].x},${padding + chartHeight} ${polylinePoints} ${points[points.length - 1].x},${padding + chartHeight}`
      : "";

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e51b23" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e51b23" stopOpacity="0.0" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Сетка горизонтальная */}
        <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1={padding} y1={padding + chartHeight / 2} x2={width - padding} y2={padding + chartHeight / 2} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1={padding} y1={padding + chartHeight} x2={width - padding} y2={padding + chartHeight} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

        {/* Заливка области */}
        {areaPoints && <polygon points={areaPoints} fill="url(#chartGrad)" />}

        {/* Линия тренда */}
        <polyline
          fill="none"
          stroke="#e51b23"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polylinePoints}
          filter="url(#glow)"
        />

        {/* Маркеры (круги) на графике */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.2" className="transition-transform duration-300 transform hover:scale-125" />
            {/* Текст над маркером, показывающий тоннаж (в тоннах или кг) */}
            <text x={p.x} y={p.y - 7} fontSize="6.5" fill="#a1a1aa" fontWeight="black" textAnchor="middle">
              {(p.val / 1000).toFixed(1)} т
            </text>
          </g>
        ))}

        {/* Временная шкала */}
        {lastWorkouts.map((w, index) => {
          const x = padding + (index / Math.max(lastWorkouts.length - 1, 1)) * chartWidth;
          const date = new Date(w.date);
          const dateLabel = `${date.getDate()}.${date.getMonth() + 1}`;
          return (
            <text key={index} x={x} y={height - 2} fontSize="6.5" fill="#555566" fontWeight="bold" textAnchor="middle">
              {dateLabel}
            </text>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="flex flex-col gap-5.5 w-full">
      {/* График объема */}
      <div className="glass-panel border-zinc-800/40 rounded-2xl p-5">
        <h3 className="font-display font-black text-xs uppercase text-white tracking-wider mb-2">
          Динамика тоннажа (Последние 7 тренировок)
        </h3>
        <div className="h-32 mt-4.5 flex items-center justify-center">
          {renderVolumeChart()}
        </div>
      </div>

      {/* Прогресс по группам мышц */}
      <div className="glass-panel border-zinc-800/40 rounded-2xl p-5">
        <h3 className="font-display font-black text-xs uppercase text-white tracking-wider mb-3.5">
          Приоритет мышечных групп
        </h3>
        <div className="flex flex-col gap-4">
          {muscleStats.map(stat => (
            <div key={stat.name} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-zinc-300">{stat.name}</span>
                <span className="font-mono text-zinc-500 font-black text-[10px] uppercase tracking-wider">{stat.count} раунд.</span>
              </div>
              <div className="w-full h-2 bg-zinc-950/70 rounded-full overflow-hidden border border-zinc-900/60 p-[0.5px]">
                <div
                  className="h-full bg-gradient-to-r from-lesnar-red to-orange-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(229,27,35,0.4)]"
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
