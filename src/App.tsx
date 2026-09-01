/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { DateSelector } from './components/DateSelector';
import { StatsGrid } from './components/StatsGrid';
import { TopActionsSection } from './components/TopActionsSection';
import { EditReportModal } from './components/EditReportModal';
import { AiAnalysisModal } from './components/AiAnalysisModal';
import { DailyReport } from './types';
import { getSelectableDateRange } from './utils/dateUtils';
import { 
  subscribeToDailyReport, 
  subscribeToAllReports, 
  ensureInitialSeedReports,
  saveDailyReport
} from './firebase/config';
import { generateDefaultSeedReports } from './data/seedReports';
import { Language, translations } from './locales/translations';
import { Activity } from 'lucide-react';

export default function App() {
  // Default language is English as requested, switchable to Korean via the top-right toggle
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  // Generate date list from last Wednesday to today
  const dateList = useMemo(() => getSelectableDateRange(), []);
  
  // Default selected date is today (the last date in the list)
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return dateList.length > 0 ? dateList[dateList.length - 1].dateStr : '2026-09-01';
  });

  // State for all reports mapped by dateStr and the currently active report
  const [allReports, setAllReports] = useState<Record<string, DailyReport>>({});
  const [activeReport, setActiveReport] = useState<DailyReport | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [isAiAgentOpen, setIsAiAgentOpen] = useState<boolean>(false);

  // Seed default reports into Firestore on mount if empty
  useEffect(() => {
    const defaultReports = generateDefaultSeedReports();
    ensureInitialSeedReports(defaultReports).catch((e) => {
      console.warn('Initial seed error:', e);
    });
  }, []);

  // Subscribe to all reports for quick status dot lookup
  useEffect(() => {
    const unsubscribe = subscribeToAllReports(
      (reports) => {
        setAllReports(reports);
        setIsLiveConnected(true);
        setLastSyncTime(new Date().toLocaleTimeString(language === 'ko' ? 'ko-KR' : 'en-US'));
      },
      (err) => {
        console.warn('Firestore stream error:', err);
        setIsLiveConnected(false);
      }
    );

    return () => unsubscribe();
  }, [language]);

  // Real-time listener for the currently selected date's document in Firestore
  useEffect(() => {
    setActiveReport(null);
    const unsubscribe = subscribeToDailyReport(
      selectedDate,
      (report) => {
        if (report) {
          setActiveReport(report);
        } else {
          // If no doc in Firestore yet, provide fallback from allReports or generated defaults
          const existing = allReports[selectedDate];
          if (existing) {
            setActiveReport(existing);
          } else {
            // Find default fallback
            const defaults = generateDefaultSeedReports();
            const fallback = defaults.find((d) => d.date === selectedDate) || {
              date: selectedDate,
              stats: { deceased: null, missing: null, rescued: null },
              top_government_actions: [
                { 
                  rank: 1, 
                  category: "Aerial Search & Helicopter Airlift Operations", 
                  summary: "Armed Police Force and Army helicopters airlifting marooned victims.",
                  category_ko: "현장 긴급 수색 및 대피 지원",
                  summary_ko: "정부 긴급 대응 본부 수색 및 주민 대피 작전 진행 중입니다." 
                },
                { 
                  rank: 2, 
                  category: "Highway Clearance & Heavy Debris Removal", 
                  summary: "Heavy excavators deployed along key highway transit corridors.",
                  category_ko: "주요 간선망 복구 작업",
                  summary_ko: "침수 및 산사태 구간 긴급 복구 작업이 투입되었습니다." 
                },
                { 
                  rank: 3, 
                  category: "Relief Package & Emergency Water Supply Distribution", 
                  summary: "Distributing dry rations, water purification kits, and tarpaulins to shelters.",
                  category_ko: "긴급 구호 물품 배급",
                  summary_ko: "피해 지역 대피소에 식수, 식량 및 의약품을 보급 중입니다." 
                }
              ],
              source_summary: "NDRRMA Situation Report No. 5 & Ministry of Home Affairs Briefing",
              source_summary_ko: "네팔 국가재난위험경감관리청(NDRRMA) 및 내무부 재난대응 공식 브리핑",
            };
            setActiveReport(fallback);
          }
        }
        setIsLiveConnected(true);
        setLastSyncTime(new Date().toLocaleTimeString(language === 'ko' ? 'ko-KR' : 'en-US'));
      },
      (err) => {
        console.warn(`Error subscribing to date ${selectedDate}:`, err);
        setIsLiveConnected(false);
      }
    );

    return () => unsubscribe();
  }, [selectedDate, allReports, language]);

  // Compute previous day's stats for comparison
  const previousStats = useMemo(() => {
    const currentIndex = dateList.findIndex((d) => d.dateStr === selectedDate);
    if (currentIndex > 0) {
      const prevDateStr = dateList[currentIndex - 1].dateStr;
      return allReports[prevDateStr]?.stats || null;
    }
    return null;
  }, [dateList, selectedDate, allReports]);

  // Reset / Reseed Firestore with realistic default dataset
  const handleResetSeed = async () => {
    setIsSeeding(true);
    try {
      const defaultReports = generateDefaultSeedReports();
      for (const rep of defaultReports) {
        await saveDailyReport(rep);
      }
      setIsSeeding(false);
    } catch (e) {
      console.error('Error reseeding:', e);
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2f6] text-slate-900 font-sans flex flex-col antialiased">
      {/* Top Navigation Bar with Language Switcher */}
      <Header
        isLive={isLiveConnected}
        language={language}
        onLanguageChange={setLanguage}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenAiAgent={() => setIsAiAgentOpen(true)}
        onResetSeed={handleResetSeed}
        isSeeding={isSeeding}
      />

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Requirement 1: Date Selector (from last Wednesday to today) */}
        <DateSelector
          dateList={dateList}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          hasDataForDate={(dateStr) => !!allReports[dateStr]}
          language={language}
        />

        {/* Live sync & status bar */}
        <div className="flex items-center justify-between px-1 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>
              {t.currentReportFor} <strong className="text-slate-900 font-bold font-mono">{selectedDate}</strong> {t.firestoreSynced}
            </span>
          </div>
          {lastSyncTime && (
            <span className="text-[11px] text-slate-500 font-mono font-medium">
              {t.lastUpdated} {lastSyncTime}
            </span>
          )}
        </div>

        {/* Requirement 2: Three Cards (Deceased / Missing / Rescued) */}
        <StatsGrid
          stats={activeReport?.stats}
          previousStats={previousStats}
          language={language}
        />

        {/* Requirement 3: Top 3 Government Operations Tiles */}
        <TopActionsSection
          actions={activeReport?.top_government_actions}
          sourceSummary={activeReport?.source_summary}
          sourceSummaryKo={activeReport?.source_summary_ko}
          language={language}
        />
      </main>

      {/* Executive Command Dark Footer */}
      <footer className="w-full border-t border-slate-800 bg-slate-900 py-6 mt-12 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-200">{t.footerTitle}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>{t.footerStack}</span>
            <span>•</span>
            <span>{t.footerDesign}</span>
          </div>
        </div>
      </footer>

      {/* Edit Report Modal */}
      <EditReportModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        report={activeReport}
        currentDate={selectedDate}
        language={language}
        onSaved={() => {
          // Handled via onSnapshot
        }}
      />

      {/* AI SITREP Analysis Modal */}
      <AiAnalysisModal
        isOpen={isAiAgentOpen}
        onClose={() => setIsAiAgentOpen(false)}
        currentDate={selectedDate}
        language={language}
        onApplyReport={(report) => {
          setSelectedDate(report.date);
        }}
      />
    </div>
  );
}
