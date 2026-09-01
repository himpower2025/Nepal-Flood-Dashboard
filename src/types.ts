export interface GovernmentAction {
  rank: number;
  category: string;
  summary: string;
  category_ko?: string;
  summary_ko?: string;
}

export interface Stats {
  deceased: number | null;
  missing: number | null;
  rescued: number | null;
}

export interface DailyReport {
  id?: string;
  date: string; // YYYY-MM-DD
  stats: Stats;
  top_government_actions: GovernmentAction[];
  source_summary?: string;
  source_summary_ko?: string;
  updatedAt?: string | null;
}

export interface DateItem {
  dateStr: string; // YYYY-MM-DD
  displayDate: string; // 8월 26일 (수)
  dayName: string; // 수요일, 목요일...
  isToday: boolean;
  isPastWednesday: boolean;
}
