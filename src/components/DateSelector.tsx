import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { DateItem } from '../types';
import { formatLocalizedFullDate } from '../utils/dateUtils';
import { Language, translations } from '../locales/translations';

interface DateSelectorProps {
  dateList: DateItem[];
  selectedDate: string;
  language: Language;
  onSelectDate: (dateStr: string) => void;
  hasDataForDate?: (dateStr: string) => boolean;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  dateList,
  selectedDate,
  language,
  onSelectDate,
  hasDataForDate,
}) => {
  const t = translations[language];
  const currentIndex = dateList.findIndex((d) => d.dateStr === selectedDate);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < dateList.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      onSelectDate(dateList[currentIndex - 1].dateStr);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onSelectDate(dateList[currentIndex + 1].dateStr);
    }
  };

  return (
    <section id="date-selector-section" className="w-full bg-white border border-slate-300/80 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] relative overflow-hidden">
      {/* Top Header for Date Picker */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shadow-2xs">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-bold tracking-wider text-sky-700">
                {t.dateSelectorTitle}
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {t.dateSelectorRange}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {formatLocalizedFullDate(selectedDate, language)}
              {selectedDate === dateList[dateList.length - 1]?.dateStr && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold tracking-wide uppercase">
                  {t.todayBadge}
                </span>
              )}
              {selectedDate === dateList[0]?.dateStr && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                  {t.pastWedBadge}
                </span>
              )}
            </h2>
          </div>
        </div>

        {/* Date Navigator Step Buttons */}
        <div className="flex items-center gap-1.5 self-end md:self-auto">
          <button
            id="btn-prev-date"
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label={t.prevDateAria}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-slate-100 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-xs text-slate-600 font-mono px-2 font-semibold">
            {currentIndex + 1} / {dateList.length}
          </span>

          <button
            id="btn-next-date"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label={t.nextDateAria}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-slate-100 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Date Timeline Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {dateList.map((item) => {
          const isSelected = item.dateStr === selectedDate;
          const hasDoc = hasDataForDate ? hasDataForDate(item.dateStr) : true;

          return (
            <button
              key={item.dateStr}
              id={`date-pill-${item.dateStr}`}
              onClick={() => onSelectDate(item.dateStr)}
              className={`relative text-left p-3 rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between group border ${
                isSelected
                  ? 'bg-sky-50/90 border-sky-500 text-slate-900 shadow-xs ring-2 ring-sky-500/20'
                  : 'bg-slate-50/80 hover:bg-slate-100/90 border-slate-200/90 text-slate-700 hover:text-slate-900'
              }`}
            >
              {/* Badge for Day Name & Tags */}
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[11px] font-bold tracking-tight uppercase ${
                  isSelected ? 'text-sky-700' : 'text-slate-500 group-hover:text-slate-800'
                }`}>
                  {item.dayName}
                </span>

                {item.isToday && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {t.todayBadge}
                  </span>
                )}
              </div>

              {/* Date String */}
              <div className="flex items-baseline justify-between mt-1">
                <span className={`text-base font-bold tracking-tight font-mono ${
                  isSelected ? 'text-slate-900' : 'text-slate-800'
                }`}>
                  {item.dateStr.slice(5)}
                </span>
                
                {/* Real-time Firestore Status Dot */}
                <span 
                  className={`w-2 h-2 rounded-full ${
                    hasDoc ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                  title={hasDoc ? 'Firestore Synced' : 'Unregistered Report'}
                />
              </div>

              {/* Selection Bottom Accent Bar */}
              {isSelected && (
                <div className="absolute bottom-0 left-3 right-3 h-1 bg-sky-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

