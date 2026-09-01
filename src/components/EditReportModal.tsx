import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DailyReport, GovernmentAction } from '../types';
import { saveDailyReport } from '../firebase/config';
import { formatLocalizedFullDate } from '../utils/dateUtils';
import { Language, translations } from '../locales/translations';
import { getLocalizedAction, getLocalizedSourceSummary } from '../utils/textTranslator';

interface EditReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: DailyReport | null;
  currentDate: string;
  language: Language;
  onSaved?: () => void;
}

export const EditReportModal: React.FC<EditReportModalProps> = ({
  isOpen,
  onClose,
  report,
  currentDate,
  language,
  onSaved,
}) => {
  const t = translations[language];
  const [deceased, setDeceased] = useState<string>('');
  const [missing, setMissing] = useState<string>('');
  const [rescued, setRescued] = useState<string>('');
  const [sourceSummary, setSourceSummary] = useState<string>('');
  const [actions, setActions] = useState<GovernmentAction[]>([
    { rank: 1, category: '', summary: '' },
    { rank: 2, category: '', summary: '' },
    { rank: 3, category: '', summary: '' },
  ]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (report) {
        setDeceased(report.stats.deceased !== null && report.stats.deceased !== undefined ? String(report.stats.deceased) : '');
        setMissing(report.stats.missing !== null && report.stats.missing !== undefined ? String(report.stats.missing) : '');
        setRescued(report.stats.rescued !== null && report.stats.rescued !== undefined ? String(report.stats.rescued) : '');
        setSourceSummary(getLocalizedSourceSummary(report.source_summary, report.source_summary_ko, language));
        
        const topActions = (report.top_government_actions && report.top_government_actions.length > 0)
          ? report.top_government_actions.slice(0, 3).map((act, i) => {
              const loc = getLocalizedAction(act, language);
              return {
                rank: i + 1,
                category: loc.category,
                summary: loc.summary,
              };
            })
          : [
              { rank: 1, category: language === 'en' ? 'Aerial Search & Helicopter Airlift Operations' : '항공 수색 및 헬리콥터 긴급 공수', summary: '' },
              { rank: 2, category: language === 'en' ? 'Highway Clearance & Heavy Debris Removal' : '주요 간선 고속도로 토사 준설 및 긴급 복구', summary: '' },
              { rank: 3, category: language === 'en' ? 'Relief Package & Emergency Water Supply Distribution' : '긴급 구호 패키지 및 임시 식수 정화 시설 설치', summary: '' },
            ];

        while (topActions.length < 3) {
          topActions.push({ rank: topActions.length + 1, category: '', summary: '' });
        }
        setActions(topActions.map((a, i) => ({ ...a, rank: i + 1 })));
      } else {
        setDeceased('');
        setMissing('');
        setRescued('');
        setSourceSummary(language === 'en' ? 'NDRRMA Situation Report No. 5 & Ministry of Home Affairs Briefing' : '네팔 국가재난위험경감관리청(NDRRMA) 및 내무부 공식 브리핑');
        setActions([
          { 
            rank: 1, 
            category: language === 'en' ? 'Aerial Search & Helicopter Airlift Operations' : '항공 수색 및 헬리콥터 긴급 공수', 
            summary: language === 'en' ? 'Army MI-17 helicopters evacuated stranded civilians and airdropped medicine.' : '네팔 육군 MI-17 헬리콥터를 투입하여 고립 주민을 공중 구조하고 비상 의약품을 긴급 투하했습니다.' 
          },
          { 
            rank: 2, 
            category: language === 'en' ? 'Highway Clearance & Heavy Debris Removal' : '주요 간선 고속도로 토사 준설 및 긴급 복구', 
            summary: language === 'en' ? 'Excavators and engineers cleared landslide debris on key transit highways.' : '중장비 굴착기를 대거 투입하여 주요 고속도로 산사태 토사를 준설하고 임시 통행을 재개했습니다.' 
          },
          { 
            rank: 3, 
            category: language === 'en' ? 'Relief Package & Emergency Water Supply Distribution' : '긴급 구호 패키지 및 임시 식수 정화 시설 설치', 
            summary: language === 'en' ? 'Provided food packages, family tents, and water purification tablets to shelters.' : '수해 대피소에 긴급 식량, 방수포 및 식수 정화 알약을 대대적으로 보급했습니다.' 
          },
        ]);
      }
      setSaveSuccess(false);
      setErrorMsg(null);
    }
  }, [isOpen, report, currentDate, language]);

  if (!isOpen) return null;

  const handleActionChange = (index: number, field: 'category' | 'summary', val: string) => {
    const updated = [...actions];
    updated[index] = { ...updated[index], [field]: val };
    setActions(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);

    try {
      const payload: DailyReport = {
        date: currentDate,
        stats: {
          deceased: deceased.trim() === '' ? null : Number(deceased),
          missing: missing.trim() === '' ? null : Number(missing),
          rescued: rescued.trim() === '' ? null : Number(rescued),
        },
        top_government_actions: actions.map((a, idx) => ({
          rank: idx + 1,
          category: a.category.trim() || (language === 'en' ? `Operation Area ${idx + 1}` : `주요 활동 ${idx + 1}`),
          summary: a.summary.trim() || (language === 'en' ? 'Active response operation underway' : '세부 대응 활동 진행 중'),
        })),
        source_summary: sourceSummary.trim() || (language === 'en' ? 'Government Situation Report' : '정부 공식 상황보고서'),
        updatedAt: new Date().toISOString(),
      };

      await saveDailyReport(payload);
      setSaveSuccess(true);
      if (onSaved) onSaved();

      setTimeout(() => {
        setIsSaving(false);
        onClose();
      }, 700);
    } catch (err: any) {
      console.error('Error saving report to Firestore:', err);
      setErrorMsg('Error saving report to Firestore: ' + (err.message || String(err)));
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div 
        id="edit-report-modal"
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <span className="text-[11px] uppercase font-extrabold text-sky-700 tracking-wider">
              {t.editModalBadge}
            </span>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {t.editModalTitle} ({formatLocalizedFullDate(currentDate, language)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label={t.cancelBtn}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Casualty Stats */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span>1.</span> {t.casualtiesSubtitle}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.deceasedLabel}
                </label>
                <input
                  type="number"
                  min="0"
                  value={deceased}
                  onChange={(e) => setDeceased(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.missingLabel}
                </label>
                <input
                  type="number"
                  min="0"
                  value={missing}
                  onChange={(e) => setMissing(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.rescuedLabel}
                </label>
                <input
                  type="number"
                  min="0"
                  value={rescued}
                  onChange={(e) => setRescued(e.target.value)}
                  placeholder="0"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Top 3 Government Operations */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span>2.</span> {t.actionsSubtitle}
            </h3>

            <div className="space-y-3">
              {actions.map((act, index) => (
                <div 
                  key={index}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-sky-700 tracking-wide uppercase">
                      TOP 0{index + 1}
                    </span>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={act.category}
                      onChange={(e) => handleActionChange(index, 'category', e.target.value)}
                      placeholder={`${t.actionCategoryLabel} (e.g., Helicopter Rescue & Airlift)`}
                      className="w-full px-3 py-1.5 text-sm font-semibold bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      value={act.summary}
                      onChange={(e) => handleActionChange(index, 'summary', e.target.value)}
                      placeholder={`${t.actionSummaryLabel}...`}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Source Document Summary */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
              {t.sourceSummaryLabel}
            </label>
            <input
              type="text"
              value={sourceSummary}
              onChange={(e) => setSourceSummary(e.target.value)}
              placeholder={t.sourceSummaryPlaceholder}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-sky-500 font-medium"
            />
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              {t.cancelBtn}
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className={`px-5 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                saveSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  {t.savedSuccessBtn}
                </>
              ) : isSaving ? (
                t.savingBtn
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {t.saveBtn}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
