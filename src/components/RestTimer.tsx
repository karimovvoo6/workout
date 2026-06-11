import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, FastForward, Plus } from 'lucide-react';

interface RestTimerProps {
  defaultDuration?: number;
  onTimerComplete?: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  defaultDuration = 90,
  onTimerComplete
}) => {
  const [duration, setDuration] = useState(defaultDuration);
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [isRunning, setIsRunning] = useState(true); // Автоматический запуск по умолчанию
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<number | null>(null);

  const radius = 33; // Радиус идеально вписывается в 80x80px контейнер
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  useEffect(() => {
    setTimeLeft(defaultDuration);
    setDuration(defaultDuration);
    setIsRunning(true); // Запускаем при изменении длительности
    setIsCompleted(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
  }, [defaultDuration]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            playGongSound();
            if (timerRef.current) window.clearInterval(timerRef.current);
            if (onTimerComplete) onTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isRunning, onTimerComplete]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const add30Seconds = () => {
    setIsCompleted(false);
    setTimeLeft((prev) => {
      const newVal = prev + 30;
      if (newVal > duration) {
        setDuration(newVal); // Расширяем шкалу
      }
      return newVal;
    });
    setIsRunning(true);
  };

  const skipTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setIsCompleted(true);
    if (onTimerComplete) {
      onTimerComplete();
    }
  };

  // Программный гонг с помощью Web Audio API
  const playGongSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const playBeep = (time: number, freq: number, dur: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.35, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + dur - 0.05);
        osc.start(time);
        osc.stop(time + dur);
      };

      const now = audioCtx.currentTime;
      playBeep(now, 880, 0.25);
      playBeep(now + 0.3, 880, 0.25);
      playBeep(now + 0.6, 1200, 0.55);
    } catch (e) {
      console.warn("Audio Context blocked or not supported:", e);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 p-4.5 bg-gradient-to-br from-zinc-950 to-zinc-900 border border-lesnar-red/35 rounded-2xl w-full shadow-2xl backdrop-blur-md relative overflow-hidden">
      
      {/* Декоративный легкий бэк градиент */}
      <div className="absolute inset-0 bg-radial from-lesnar-red/5 to-transparent pointer-events-none"></div>

      {/* Круговой таймер */}
      <div className="relative w-20 h-20 flex items-center justify-center flex-shrink-0 z-10">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-zinc-900"
            strokeWidth="4.5"
            fill="transparent"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-lesnar-red transition-all duration-1000 ease-linear filter drop-shadow-[0_0_5px_#e51b23]"
            strokeWidth="4.5"
            strokeDasharray={circumference}
            strokeDashoffset={isNaN(strokeDashoffset) ? 0 : strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-xl font-black font-display text-white tracking-tighter leading-none">{timeLeft}</span>
          <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest mt-0.5">сек</span>
        </div>
      </div>

      {/* Элементы управления */}
      <div className="flex flex-col gap-2.5 flex-grow z-10">
        <div className="text-[9px] font-black text-lesnar-red uppercase tracking-[0.25em]">
          {isCompleted ? 'ОТДЫХ ЗАВЕРШЕН' : 'ВРЕМЯ ОТДЫХА'}
        </div>
        
        <div className="flex gap-2">
          {!isCompleted ? (
            <button
              onClick={toggleTimer}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-lesnar-red hover:bg-lesnar-red-hover text-white text-[10px] font-black font-display uppercase tracking-wider transition-colors cursor-pointer shadow-[0_2px_8px_rgba(229,27,35,0.2)]"
            >
              {isRunning ? <Pause size={10} strokeWidth={2.5} /> : <Play size={10} className="fill-current" />}
              {isRunning ? 'ПАУЗА' : 'СТАРТ'}
            </button>
          ) : (
            <span className="text-[10px] font-black text-lesnar-green uppercase tracking-wider flex items-center">
              Отдых завершён!
            </span>
          )}

          <button
            onClick={add30Seconds}
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-[10px] font-black tracking-wider transition-colors border border-zinc-800/50 cursor-pointer"
          >
            <Plus size={10} strokeWidth={2.5} />
            30с
          </button>

          {!isCompleted && (
            <button
              onClick={skipTimer}
              className="flex items-center justify-center gap-1 px-2.5 py-2 rounded-lg bg-transparent hover:bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 text-[10px] font-black tracking-wider transition-colors ml-auto cursor-pointer"
            >
              <FastForward size={10} />
              ПРОПУСТИТЬ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestTimer;
