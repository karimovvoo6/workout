import React from 'react';

interface CompletedWorkout {
  date: string;
  title: string;
}

interface CalendarProps {
  history: CompletedWorkout[];
}

export const Calendar: React.FC<CalendarProps> = ({ history }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Получаем название месяца на русском
  const monthNames = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
  ];

  // Первый день месяца (0 = Воскресенье, 1 = Понедельник и т.д.)
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Превращаем воскресенье из 0 в 7, чтобы понедельник был 1
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  // Количество дней в текущем месяце
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Дни предыдущего месяца для заполнения пустых мест
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  // Массив дней календаря
  const daysArray: { dayNum: number; isCurrentMonth: boolean; dateString: string }[] = [];

  // Заполнение предыдущего месяца
  for (let i = adjustedFirstDay - 1; i >= 0; i--) {
    const d = prevMonthTotalDays - i;
    const dateStr = new Date(year, month - 1, d).toDateString();
    daysArray.push({ dayNum: d, isCurrentMonth: false, dateString: dateStr });
  }

  // Заполнение текущего месяца
  for (let i = 1; i <= totalDays; i++) {
    const dateStr = new Date(year, month, i).toDateString();
    daysArray.push({ dayNum: i, isCurrentMonth: true, dateString: dateStr });
  }

  // Заполнение следующего месяца до ровной сетки (кратной 7)
  const remainingCells = 42 - daysArray.length;
  for (let i = 1; i <= remainingCells; i++) {
    const dateStr = new Date(year, month + 1, i).toDateString();
    daysArray.push({ dayNum: i, isCurrentMonth: false, dateString: dateStr });
  }

  // Функция проверки, была ли тренировка в конкретный день
  const isWorkoutCompletedOnDate = (dateString: string) => {
    return history.some(item => {
      const workDate = new Date(item.date).toDateString();
      return workDate === dateString;
    });
  };

  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  return (
    <div className="bg-lesnar-slate border border-zinc-800 rounded-2xl p-4 w-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-display font-black text-sm uppercase text-white">
          Календарь активности
        </h3>
        <span className="text-xs font-bold text-lesnar-red uppercase tracking-wider">
          {monthNames[month]} {year}
        </span>
      </div>

      {/* Дни недели */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekdays.map(day => (
          <span key={day} className="text-[10px] font-black text-zinc-500 uppercase">
            {day}
          </span>
        ))}
      </div>

      {/* Сетка дней */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysArray.map((cell, idx) => {
          const hasWorkout = isWorkoutCompletedOnDate(cell.dateString);
          const isTodayDate = new Date(cell.dateString).toDateString() === today.toDateString();

          let cellClass = "aspect-square flex items-center justify-center text-xs font-bold rounded-lg transition-all ";

          if (!cell.isCurrentMonth) {
            cellClass += "text-zinc-700 ";
          } else if (hasWorkout) {
            cellClass += "bg-lesnar-red text-white shadow-[0_0_10px_rgba(229,27,35,0.4)] ";
          } else if (isTodayDate) {
            cellClass += "border-2 border-lesnar-red text-white ";
          } else {
            cellClass += "bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 ";
          }

          return (
            <div
              key={idx}
              className={cellClass}
              title={hasWorkout ? "Тренировка выполнена" : isTodayDate ? "Сегодня" : ""}
            >
              <span className="relative">
                {cell.dayNum}
                {hasWorkout && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white rounded-full"></span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 mt-3 justify-center text-[10px] font-bold uppercase text-zinc-500 border-t border-zinc-900 pt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded bg-lesnar-red block"></span>
          <span>Тренировка выполнена</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded border border-lesnar-red block"></span>
          <span>Сегодня</span>
        </div>
      </div>
    </div>
  );
};
