import React from 'react';
import { Database, ShieldAlert, Sparkles, PlusCircle, Globe } from 'lucide-react';
import { Language, translations } from '../locales/translations';

interface HeaderProps {
  isLive: boolean;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenEditor: () => void;
  onOpenAiAgent: () => void;
  onResetSeed: () => void;
  isSeeding: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isLive,
  language,
  onLanguageChange,
  onOpenEditor,
  onOpenAiAgent,
  onResetSeed,
  isSeeding,
}) => {
  const t = translations[language];

  return (
    <header id="disaster-dashboard-header" className="w-full border-b border-slate-800/90 bg-slate-900 text-white sticky top-0 z-40 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-xs shrink-0">
            <ShieldAlert className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                {t.appTitle}
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 tracking-wide uppercase">
                  {t.appBadge}
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls, Firebase Status & Language Toggle */}
        <div className="flex items-center flex-wrap gap-2.5 w-full md:w-auto justify-between md:justify-end">
          {/* Firestore Live Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 font-medium shadow-2xs">
            <span className="relative flex h-2 w-2">
              {isLive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            </span>
            <span className="font-semibold flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-slate-400" />
              {isLive ? t.firestoreLive : t.firestoreWaiting}
            </span>
          </div>

          {/* Language Switcher Dropdown / Segmented Button */}
          <div className="flex items-center bg-slate-800/90 p-0.5 rounded-lg border border-slate-700" id="language-selector-wrapper">
            <div className="pl-2 pr-1 text-slate-400">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <button
              id="btn-lang-en"
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              id="btn-lang-ko"
              type="button"
              onClick={() => onLanguageChange('ko')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                language === 'ko'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              KOR
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              id="btn-open-ai-agent"
              onClick={onOpenAiAgent}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition-all flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
              title={t.aiAnalysisDesc}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-100" />
              {t.aiAnalysisBtn}
            </button>

            <button
              id="btn-edit-report"
              onClick={onOpenEditor}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
              {t.editReportBtn}
            </button>

            <button
              id="btn-seed-data"
              onClick={onResetSeed}
              disabled={isSeeding}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 transition-colors disabled:opacity-50 cursor-pointer"
              title={t.syncSeedBtn}
            >
              {isSeeding ? t.syncing : t.syncSeedBtn}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

