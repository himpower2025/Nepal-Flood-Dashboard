import { DateItem } from '../types';
import { Language } from '../locales/translations';

export function formatDateToISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseISODate(isoStr: string): Date {
  const [year, month, day] = isoStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const KOREAN_DAY_NAMES = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
const KOREAN_DAY_SHORT = ['일', '월', '화', '수', '목', '금', '토'];

const ENGLISH_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ENGLISH_DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ENGLISH_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ENGLISH_MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * Generates selectable dates from the most recent past Wednesday to today.
 */
export function getSelectableDateRange(referenceDate = new Date(), lang: Language = 'en'): DateItem[] {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);
  
  const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat). 3 is Wed
  // Calculate days back to last Wednesday
  let daysBack = (dayOfWeek - 3 + 7) % 7;
  if (daysBack === 0) {
    // If today is Wednesday, go back 7 days to previous Wednesday
    daysBack = 7;
  }

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - daysBack);

  const dates: DateItem[] = [];
  const curr = new Date(startDate);

  while (curr <= today) {
    const dateStr = formatDateToISO(curr);
    const m = curr.getMonth();
    const d = curr.getDate();
    const dayIdx = curr.getDay();
    const isToday = curr.getTime() === today.getTime();
    const isPastWednesday = curr.getTime() === startDate.getTime();

    const displayDate = lang === 'ko'
      ? `${m + 1}월 ${d}일 (${KOREAN_DAY_SHORT[dayIdx]})`
      : `${ENGLISH_MONTHS[m]} ${d} (${ENGLISH_DAY_SHORT[dayIdx]})`;

    const dayName = lang === 'ko'
      ? KOREAN_DAY_NAMES[dayIdx]
      : ENGLISH_DAY_NAMES[dayIdx];

    dates.push({
      dateStr,
      displayDate,
      dayName,
      isToday,
      isPastWednesday,
    });

    curr.setDate(curr.getDate() + 1);
  }

  return dates;
}

export function formatLocalizedFullDate(dateStr: string, lang: Language = 'en'): string {
  try {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (lang === 'ko') {
      const dayName = KOREAN_DAY_NAMES[date.getDay()];
      return `${y}년 ${m}월 ${d}일 ${dayName}`;
    } else {
      const monthName = ENGLISH_MONTHS_FULL[m - 1];
      const dayName = ENGLISH_DAY_NAMES[date.getDay()];
      return `${dayName}, ${monthName} ${d}, ${y}`;
    }
  } catch {
    return dateStr;
  }
}

export function formatKoreanFullDate(dateStr: string): string {
  return formatLocalizedFullDate(dateStr, 'ko');
}

