import React from 'react';
import { Award, Compass, ShieldCheck, Truck, Plane, Wrench, HeartHandshake, CheckCircle2, FileText } from 'lucide-react';
import { GovernmentAction } from '../types';
import { Language, translations } from '../locales/translations';
import { getLocalizedAction, getLocalizedSourceSummary } from '../utils/textTranslator';

interface TopActionsSectionProps {
  actions: GovernmentAction[] | undefined | null;
  sourceSummary?: string;
  sourceSummaryKo?: string;
  language: Language;
}

export const TopActionsSection: React.FC<TopActionsSectionProps> = ({
  actions = [],
  sourceSummary,
  sourceSummaryKo,
  language,
}) => {
  const t = translations[language];

  // Ensure top 3 items
  const displayActions = (actions && actions.length > 0)
    ? actions.slice(0, 3)
    : [
        { 
          rank: 1, 
          category: "Aerial Search & Helicopter Airlift Operations", 
          summary: "Nepal Army deployed MI-17 helicopters airlifting marooned victims and dropping emergency medical supplies.",
          category_ko: "항공 수색 및 헬리콥터 긴급 공수",
          summary_ko: "네팔 육군 MI-17 헬리콥터를 투입하여 고립 주민을 공중 구조하고 비상 의약품을 긴급 투하했습니다."
        },
        { 
          rank: 2, 
          category: "Highway Clearance & Heavy Debris Removal", 
          summary: "Heavy excavators clearing massive landslide blockages along key highway corridors.",
          category_ko: "주요 간선 고속도로 토사 준설 및 긴급 복구",
          summary_ko: "중장비 굴착기를 대거 투입하여 주요 고속도로 산사태 토사를 준설하고 임시 통행을 재개했습니다."
        },
        { 
          rank: 3, 
          category: "Relief Package & Emergency Water Supply Distribution", 
          summary: "Distributing dry food, hygiene kits, and installing mobile water purification units in shelters.",
          category_ko: "긴급 구호 패키지 및 임시 식수 정화 시설 설치",
          summary_ko: "수해 대피소에 긴급 식량, 방수포 및 식수 정화 알약을 대대적으로 보급했습니다."
        }
      ];

  const getActionIcon = (category: string) => {
    const catLower = category.toLowerCase();
    if (catLower.includes('헬리콥터') || catLower.includes('항공') || catLower.includes('공수') || catLower.includes('airlift') || catLower.includes('helicopter') || catLower.includes('aerial')) {
      return <Plane className="w-5 h-5 text-sky-600" />;
    }
    if (catLower.includes('도로') || catLower.includes('고속도로') || catLower.includes('교량') || catLower.includes('highway') || catLower.includes('준설') || catLower.includes('road') || catLower.includes('infrastructure') || catLower.includes('debris') || catLower.includes('bridge')) {
      return <Wrench className="w-5 h-5 text-amber-600" />;
    }
    if (catLower.includes('구호') || catLower.includes('식수') || catLower.includes('배급') || catLower.includes('relief') || catLower.includes('식량') || catLower.includes('water') || catLower.includes('package') || catLower.includes('cargo') || catLower.includes('customs')) {
      return <HeartHandshake className="w-5 h-5 text-emerald-600" />;
    }
    if (catLower.includes('의료') || catLower.includes('방역') || catLower.includes('병원') || catLower.includes('medical') || catLower.includes('health') || catLower.includes('disease')) {
      return <ShieldCheck className="w-5 h-5 text-rose-600" />;
    }
    if (catLower.includes('대피') || catLower.includes('제방') || catLower.includes('경찰') || catLower.includes('police') || catLower.includes('evacuation') || catLower.includes('embankment') || catLower.includes('aquatic') || catLower.includes('satellite') || catLower.includes('telecom')) {
      return <Compass className="w-5 h-5 text-indigo-600" />;
    }
    return <Truck className="w-5 h-5 text-sky-600" />;
  };

  const getRankBadgeStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          pill: 'bg-sky-600 text-white font-bold shadow-2xs',
          border: 'border-sky-300/90 hover:border-sky-500 bg-white hover:bg-sky-50/15',
          topLine: 'bg-sky-600',
        };
      case 2:
        return {
          pill: 'bg-amber-600 text-white font-bold shadow-2xs',
          border: 'border-amber-300/80 hover:border-amber-500 bg-white hover:bg-amber-50/15',
          topLine: 'bg-amber-600',
        };
      case 3:
      default:
        return {
          pill: 'bg-slate-700 text-white font-bold shadow-2xs',
          border: 'border-slate-300/80 hover:border-slate-400 bg-white hover:bg-slate-50/40',
          topLine: 'bg-slate-600',
        };
    }
  };

  const localizedSourceSummary = getLocalizedSourceSummary(sourceSummary, sourceSummaryKo, language);

  return (
    <section id="top-government-actions-section" className="w-full bg-white border border-slate-300/80 rounded-2xl p-5 sm:p-7 shadow-[0_2px_10px_rgba(15,23,42,0.04)] relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {t.topActionsSectionTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            {t.topActionsSectionSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-semibold shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.topPriorityBadge}</span>
        </div>
      </div>

      {/* Top 3 Tiles Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        {displayActions.map((action, index) => {
          const rank = action.rank || index + 1;
          const styles = getRankBadgeStyle(rank);
          const localized = getLocalizedAction(action, language);

          return (
            <div
              key={rank}
              id={`action-tile-top-${rank}`}
              className={`relative rounded-2xl border ${styles.border} p-5 sm:p-6 transition-all duration-200 shadow-[0_2px_10px_rgba(15,23,42,0.04)] hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)] flex flex-col justify-between group overflow-hidden`}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${styles.topLine}`} />

              <div>
                {/* Tile Header: Rank Pill & Category Icon */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase ${styles.pill}`}>
                    TOP 0{rank}
                  </span>

                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs group-hover:bg-white transition-colors">
                    {getActionIcon(localized.category)}
                  </div>
                </div>

                {/* Category Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors mb-2 line-clamp-2">
                  {localized.category}
                </h3>

                {/* Summary Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {localized.summary}
                </p>
              </div>

              {/* Status footer tag */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {t.inProgressStatus}
                </span>
                <span className="font-mono text-[11px] text-slate-500 font-bold uppercase">
                  {t.priorityRank} #{rank}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Source Citation */}
      {localizedSourceSummary && (
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
          <FileText className="w-4 h-4 text-sky-600 shrink-0" />
          <span>
            {t.sourceCitationLabel} <strong className="text-slate-800 font-semibold">{localizedSourceSummary}</strong>
          </span>
        </div>
      )}
    </section>
  );
};

