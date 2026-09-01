export type Language = 'en' | 'ko';

export interface TranslationDictionary {
  appTitle: string;
  appBadge: string;
  appSubtitle: string;
  firestoreLive: string;
  firestoreWaiting: string;
  aiAnalysisBtn: string;
  aiAnalysisDesc: string;
  editReportBtn: string;
  syncSeedBtn: string;
  syncing: string;
  currentReportFor: string;
  firestoreSynced: string;
  lastUpdated: string;
  dateSelectorTitle: string;
  dateSelectorRange: string;
  todayBadge: string;
  pastWedBadge: string;
  prevDateAria: string;
  nextDateAria: string;
  keyMetricsSectionTitle: string;
  unitPersons: string;
  unitCumulative: string;
  officialCumulativeBadge: string;
  calculating: string;
  personsUnit: string;
  noChange: string;
  statDeceasedTitle: string;
  statDeceasedSub: string;
  statDeceasedDesc: string;
  statMissingTitle: string;
  statMissingSub: string;
  statMissingDesc: string;
  statRescuedTitle: string;
  statRescuedSub: string;
  statRescuedDesc: string;
  topActionsSectionTitle: string;
  topActionsSectionSubtitle: string;
  topPriorityBadge: string;
  inProgressStatus: string;
  priorityRank: string;
  sourceCitationLabel: string;
  footerTitle: string;
  footerStack: string;
  footerDesign: string;

  // Edit Modal
  editModalBadge: string;
  editModalTitle: string;
  casualtiesSubtitle: string;
  deceasedLabel: string;
  missingLabel: string;
  rescuedLabel: string;
  actionsSubtitle: string;
  actionCategoryLabel: string;
  actionSummaryLabel: string;
  sourceSummaryLabel: string;
  sourceSummaryPlaceholder: string;
  saveBtn: string;
  savingBtn: string;
  savedSuccessBtn: string;
  cancelBtn: string;

  // AI Modal
  aiModalBadge: string;
  aiModalTitle: string;
  aiModalSubtitle: string;
  aiDateLabel: string;
  aiPasteLabel: string;
  aiPastePlaceholder: string;
  samplePreset1: string;
  samplePreset2: string;
  samplePreset3: string;
  sampleSitrepTitle: string;
  runAnalysisBtn: string;
  analyzingBtn: string;
  previewTitle: string;
  applyToFirestoreBtn: string;
  applyingBtn: string;
  appliedSuccessBtn: string;
  aiDisclaimer: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appTitle: "Nepal Flood SITREP",
    appBadge: "Live Intelligence",
    appSubtitle: "Automated Disaster Intelligence & Government Relief Operations Tracker",
    firestoreLive: "Firestore Live",
    firestoreWaiting: "Connecting...",
    aiAnalysisBtn: "AI SITREP Parser",
    aiAnalysisDesc: "Analyze news & official reports with Gemini AI",
    editReportBtn: "Edit / Add Data",
    syncSeedBtn: "Reset Sample Data",
    syncing: "Syncing...",
    currentReportFor: "Active Report Date:",
    firestoreSynced: "(Firestore Synced)",
    lastUpdated: "Last Sync:",
    dateSelectorTitle: "REPORT TIMELINE SELECTOR",
    dateSelectorRange: "(Past Wednesday ~ Today)",
    todayBadge: "TODAY",
    pastWedBadge: "PAST WED",
    prevDateAria: "Previous date",
    nextDateAria: "Next date",
    keyMetricsSectionTitle: "Casualties & Rescue Operations (Key Metrics)",
    unitPersons: "Unit: Persons (Cumulative)",
    unitCumulative: "OFFICIAL RECORD",
    officialCumulativeBadge: "Cumulative Record",
    calculating: "Pending Verification",
    personsUnit: "people",
    noChange: "No change",
    statDeceasedTitle: "Deceased",
    statDeceasedSub: "CONFIRMED CASUALTIES",
    statDeceasedDesc: "Confirmed deaths directly caused by flash floods & landslides",
    statMissingTitle: "Missing",
    statMissingSub: "UNACCOUNTED PERSONS",
    statMissingDesc: "Active search and identity verification operations underway",
    statRescuedTitle: "Rescued",
    statRescuedSub: "SUCCESSFULLY EVACUATED",
    statRescuedDesc: "Total civilians evacuated safely via aerial, boat, and ground teams",
    topActionsSectionTitle: "Top 3 Government Relief Actions",
    topActionsSectionSubtitle: "Key operational priority areas extracted from government SITREPs & official briefings",
    topPriorityBadge: "Priority Response Areas",
    inProgressStatus: "Active Deployment",
    priorityRank: "PRIORITY",
    sourceCitationLabel: "Official Data Source:",
    footerTitle: "Nepal Flood Situational Intelligence System",
    footerStack: "Powered by Firebase Firestore & Gemini 2.5 Flash",
    footerDesign: "Refined High-Contrast Light Theme",

    editModalBadge: "FIRESTORE DATA EDITOR",
    editModalTitle: "Modify Casualty Stats & Government Actions",
    casualtiesSubtitle: "1. Core Casualty & Evacuation Statistics (Cumulative)",
    deceasedLabel: "Deceased (Total)",
    missingLabel: "Missing (Total)",
    rescuedLabel: "Rescued (Total)",
    actionsSubtitle: "2. Top 3 Government Response Operations",
    actionCategoryLabel: "Category Name",
    actionSummaryLabel: "Operation Summary",
    sourceSummaryLabel: "3. Source Document / Briefing Reference",
    sourceSummaryPlaceholder: "e.g., NDRRMA Official Situation Report No. 4 & MoHA Press Release",
    saveBtn: "Save to Firestore",
    savingBtn: "Saving...",
    savedSuccessBtn: "Saved to Firestore!",
    cancelBtn: "Cancel",

    aiModalBadge: "GEMINI DISASTER AI AGENT",
    aiModalTitle: "Automated SITREP & News Analysis",
    aiModalSubtitle: "Paste raw government press releases or news reports to extract casualties and Top 3 operations in strict JSON schema.",
    aiDateLabel: "Target Report Date",
    aiPasteLabel: "Raw Situation Report / News Article Text",
    aiPastePlaceholder: "Paste NDRRMA bulletins, Army SITREPs, Kathmandu Post or Nepal News articles here...",
    samplePreset1: "Kathmandu Valley Flash Flood",
    samplePreset2: "Koshi River & Koshi Barrage Relief",
    samplePreset3: "Prithvi Highway Emergency Restoration",
    sampleSitrepTitle: "Load Sample SITREP:",
    runAnalysisBtn: "Analyze with Gemini AI",
    analyzingBtn: "Extracting Intelligence...",
    previewTitle: "Structured Analysis Result",
    applyToFirestoreBtn: "Apply & Save to Firestore",
    applyingBtn: "Updating Firestore...",
    appliedSuccessBtn: "Saved & Applied Successfully!",
    aiDisclaimer: "Parsed data follows strict schema: 3 numerical stats + Top 3 operational categories with summaries."
  },
  ko: {
    appTitle: "재난 현황 대시보드",
    appBadge: "Nepal Flood SITREP",
    appSubtitle: "네팔 홍수 재난 인명 피해 및 정부 구호 작전 현황 자동 분석 시스템",
    firestoreLive: "Firestore 실시간 연결",
    firestoreWaiting: "연결 대기중",
    aiAnalysisBtn: "AI 상황보고서 분석",
    aiAnalysisDesc: "Gemini AI로 정부 브리핑 및 기사 분석",
    editReportBtn: "수치 수정/등록",
    syncSeedBtn: "기본 데이터 동기화",
    syncing: "동기화 중...",
    currentReportFor: "선택된 보고서 일자:",
    firestoreSynced: "(Firestore 실시간 연동)",
    lastUpdated: "최근 갱신:",
    dateSelectorTitle: "보고서 날짜 선택",
    dateSelectorRange: "(지난 수요일 ~ 오늘)",
    todayBadge: "오늘",
    pastWedBadge: "지난 수요일",
    prevDateAria: "이전 날짜",
    nextDateAria: "다음 날짜",
    keyMetricsSectionTitle: "인명 피해 및 구조 현황 (3대 핵심 지표)",
    unitPersons: "단위: 명 (누계)",
    unitCumulative: "누적 공식 집계",
    officialCumulativeBadge: "누적 집계",
    calculating: "집계 확인 중",
    personsUnit: "명",
    noChange: "변동 없음",
    statDeceasedTitle: "사망자",
    statDeceasedSub: "CONFIRMED CASUALTIES",
    statDeceasedDesc: "홍수 및 대규모 산사태 직접 사망 확인",
    statMissingTitle: "실종자",
    statMissingSub: "MISSING PERSONS",
    statMissingDesc: "수색 및 신원 확인 작업 진행 중",
    statRescuedTitle: "구조자",
    statRescuedSub: "SUCCESSFULLY RESCUED",
    statRescuedDesc: "공중·수상·육상 합동 대피 완료 인원",
    topActionsSectionTitle: "정부 주요 활동 Top 3",
    topActionsSectionSubtitle: "정부 상황보고서 및 공식 브리핑 기반 주요 대응 활동 우선순위 타일",
    topPriorityBadge: "우선 대응 3대 분야",
    inProgressStatus: "현장 집행 중",
    priorityRank: "우선순위",
    sourceCitationLabel: "출처 및 근거 자료:",
    footerTitle: "네팔 홍수 재난 인텔리전스 시스템",
    footerStack: "Firebase Firestore & Gemini 2.5 Flash 기반",
    footerDesign: "정돈된 고대비 라이트 테마",

    editModalBadge: "FIRESTORE DATA EDITOR",
    editModalTitle: "재난 보고서 수치 및 활동 수정",
    casualtiesSubtitle: "1. 3대 핵심 인명 및 구조 통계 (누적 집계)",
    deceasedLabel: "사망자 수 (명)",
    missingLabel: "실종자 수 (명)",
    rescuedLabel: "구조자 수 (명)",
    actionsSubtitle: "2. 정부 주요 구호 및 대응 활동 Top 3",
    actionCategoryLabel: "활동 범주",
    actionSummaryLabel: "작전 세부 요약",
    sourceSummaryLabel: "3. 출처 및 근거 문서",
    sourceSummaryPlaceholder: "예: 네팔 국가재난위험경감관리청(NDRRMA) 제4차 상황보고서",
    saveBtn: "Firestore에 저장하기",
    savingBtn: "저장 중...",
    savedSuccessBtn: "Firestore 저장 완료!",
    cancelBtn: "취소",

    aiModalBadge: "GEMINI DISASTER AI AGENT",
    aiModalTitle: "정부 상황보고서 및 뉴스 자동 분석",
    aiModalSubtitle: "네팔 정부 공식 SITREP, 보도자료, 뉴스 기사를 입력하면 인명 피해 수치와 정부 3대 활동을 구조화된 JSON으로 추출합니다.",
    aiDateLabel: "적용할 보고서 일자",
    aiPasteLabel: "상황보고서 원문 또는 뉴스 기사 텍스트",
    aiPastePlaceholder: "네팔 국가재난관리청(NDRRMA) 발표문, 군경 합동수색 SITREP, 현지 언론 기사를 붙여넣으세요...",
    samplePreset1: "카트만두 계곡 긴급 수해 보고서",
    samplePreset2: "코시 강 유역 및 제방 구호 작전",
    samplePreset3: "프리트비 고속도로 토사 긴급 복구",
    sampleSitrepTitle: "예시 SITREP 불러오기:",
    runAnalysisBtn: "Gemini AI로 분석 및 추출",
    analyzingBtn: "인텔리전스 추출 중...",
    previewTitle: "추출된 구조화 분석 결과",
    applyToFirestoreBtn: "확인 및 Firestore 즉시 저장",
    applyingBtn: "저장 중...",
    appliedSuccessBtn: "성공적으로 저장 및 반영되었습니다!",
    aiDisclaimer: "추출된 데이터는 사망·실종·구조자 3대 통계 및 상위 3대 정부 작전 요약 스키마를 엄격히 준수합니다."
  }
};
