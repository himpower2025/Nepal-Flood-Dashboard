import React from 'react';
import { Skull, Search, LifeBuoy, AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Stats } from '../types';
import { Language, translations } from '../locales/translations';

interface StatCardProps {
  id: string;
  title: string;
  subTitle: string;
  value: number | null | undefined;
  iconType: 'deceased' | 'missing' | 'rescued';
  description: string;
  diff?: number | null;
  language: Language;
}

export const StatCard: React.FC<StatCardProps> = ({
  id,
  title,
  subTitle,
  value,
  iconType,
  description,
  diff,
  language,
}) => {
  const t = translations[language];

  const getIcon = () => {
    switch (iconType) {
      case 'deceased':
        return <Skull className="w-6 h-6 text-rose-600" />;
      case 'missing':
        return <Search className="w-6 h-6 text-amber-600" />;
      case 'rescued':
        return <LifeBuoy className="w-6 h-6 text-emerald-600" />;
    }
  };

  const getStyleTheme = () => {
    switch (iconType) {
      case 'deceased':
        return {
          cardBg: 'bg-white hover:bg-rose-50/15 border-slate-300/80 hover:border-rose-400/80',
          iconBg: 'bg-rose-50 border-rose-200/80 text-rose-600',
          badge: 'bg-rose-50 text-rose-800 border-rose-200 font-semibold',
          valColor: 'text-slate-900',
          topBar: 'bg-rose-500',
        };
      case 'missing':
        return {
          cardBg: 'bg-white hover:bg-amber-50/15 border-slate-300/80 hover:border-amber-400/80',
          iconBg: 'bg-amber-50 border-amber-200/80 text-amber-600',
          badge: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
          valColor: 'text-slate-900',
          topBar: 'bg-amber-500',
        };
      case 'rescued':
        return {
          cardBg: 'bg-white hover:bg-emerald-50/15 border-slate-300/80 hover:border-emerald-400/80',
          iconBg: 'bg-emerald-50 border-emerald-200/80 text-emerald-600',
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
          valColor: 'text-emerald-700',
          topBar: 'bg-emerald-500',
        };
    }
  };

  const theme = getStyleTheme();

  return (
    <div
      id={id}
      className={`group relative rounded-2xl border ${theme.cardBg} p-5 sm:p-6 transition-all duration-200 shadow-[0_2px_10px_rgba(15,23,42,0.04)] hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)] flex flex-col justify-between overflow-hidden`}
    >
      {/* Top Color Accent Line */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${theme.topBar}`} />

      <div>
        {/* Card Header: Icon & Category Label */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-2xs ${theme.iconBg}`}>
              {getIcon()}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                {title}
              </h3>
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                {subTitle}
              </span>
            </div>
          </div>

          {/* Status Tag */}
          <span className={`text-[11px] px-2.5 py-1 rounded-full border ${theme.badge}`}>
            {t.officialCumulativeBadge}
          </span>
        </div>

        {/* Main Stat Value */}
        <div className="my-3">
          {value === null || value === undefined ? (
            <div className="flex items-center gap-2 text-slate-400 py-1">
              <AlertCircle className="w-5 h-5" />
              <span className="text-xl font-bold tracking-tight">{t.calculating}</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${theme.valColor}`}>
                {value.toLocaleString()}
              </span>
              <span className="text-sm text-slate-500 font-medium">{t.personsUnit}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description & Comparison Footnote */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <p className="line-clamp-1 pr-2 text-slate-600 font-normal">{description}</p>
        
        {diff !== undefined && diff !== null && (
          <span className={`flex items-center gap-1 font-bold shrink-0 ${
            diff > 0 
              ? (iconType === 'rescued' ? 'text-emerald-700' : 'text-slate-800') 
              : 'text-slate-400'
          }`}>
            {diff > 0 ? <TrendingUp className="w-3.5 h-3.5 text-slate-700" /> : <Minus className="w-3.5 h-3.5" />}
            {diff > 0 ? `+${diff.toLocaleString()}` : t.noChange}
          </span>
        )}
      </div>
    </div>
  );
};

interface StatsGridProps {
  stats: Stats | null | undefined;
  previousStats?: Stats | null;
  language: Language;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  previousStats,
  language,
}) => {
  const t = translations[language];
  const deceased = stats?.deceased;
  const missing = stats?.missing;
  const rescued = stats?.rescued;

  const deceasedDiff = (deceased !== null && deceased !== undefined && previousStats?.deceased !== null && previousStats?.deceased !== undefined)
    ? deceased - previousStats.deceased
    : null;

  const missingDiff = (missing !== null && missing !== undefined && previousStats?.missing !== null && previousStats?.missing !== undefined)
    ? missing - previousStats.missing
    : null;

  const rescuedDiff = (rescued !== null && rescued !== undefined && previousStats?.rescued !== null && previousStats?.rescued !== undefined)
    ? rescued - previousStats.rescued
    : null;

  return (
    <section id="casualty-stats-section" className="w-full">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700">
            {t.keyMetricsSectionTitle}
          </h2>
        </div>
        <span className="text-xs text-slate-500 font-mono font-medium">
          {t.unitPersons}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {/* Card 1: 사망자 */}
        <StatCard
          id="stat-card-deceased"
          title={t.statDeceasedTitle}
          subTitle={t.statDeceasedSub}
          value={deceased}
          iconType="deceased"
          description={t.statDeceasedDesc}
          diff={deceasedDiff}
          language={language}
        />

        {/* Card 2: 실종자 */}
        <StatCard
          id="stat-card-missing"
          title={t.statMissingTitle}
          subTitle={t.statMissingSub}
          value={missing}
          iconType="missing"
          description={t.statMissingDesc}
          diff={missingDiff}
          language={language}
        />

        {/* Card 3: 구조자 */}
        <StatCard
          id="stat-card-rescued"
          title={t.statRescuedTitle}
          subTitle={t.statRescuedSub}
          value={rescued}
          iconType="rescued"
          description={t.statRescuedDesc}
          diff={rescuedDiff}
          language={language}
        />
      </div>
    </section>
  );
};

