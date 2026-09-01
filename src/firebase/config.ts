import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  getDocs, 
  getDoc,
  Firestore 
} from 'firebase/firestore';
import { DailyReport } from '../types';
import firebaseConfigJson from '../../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
};

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with configured databaseId if available
const databaseId = firebaseConfigJson.firestoreDatabaseId;
export const db: Firestore = databaseId 
  ? getFirestore(app, databaseId) 
  : getFirestore(app);

export const DAILY_REPORTS_COLLECTION = 'daily_reports';

/**
 * Subscribes to real-time updates for a single daily report by date (document ID = date "YYYY-MM-DD")
 */
export function subscribeToDailyReport(
  dateStr: string,
  onData: (report: DailyReport | null) => void,
  onError?: (error: Error) => void
): () => void {
  const docRef = doc(db, DAILY_REPORTS_COLLECTION, dateStr);
  
  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as DailyReport;
        onData({
          ...data,
          id: docSnap.id,
          date: data.date || docSnap.id,
        });
      } else {
        onData(null);
      }
    },
    (err) => {
      console.warn(`Firestore snapshot error for ${dateStr}:`, err);
      if (onError) onError(err);
    }
  );
}

/**
 * Subscribes to all reports in the collection
 */
export function subscribeToAllReports(
  onData: (reports: Record<string, DailyReport>) => void,
  onError?: (error: Error) => void
): () => void {
  const colRef = collection(db, DAILY_REPORTS_COLLECTION);
  return onSnapshot(
    colRef,
    (querySnap) => {
      const reports: Record<string, DailyReport> = {};
      querySnap.forEach((docSnap) => {
        const data = docSnap.data() as DailyReport;
        reports[docSnap.id] = {
          ...data,
          id: docSnap.id,
          date: data.date || docSnap.id,
        };
      });
      onData(reports);
    },
    (err) => {
      console.warn('Firestore snapshot error for all reports:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Upsert or save a daily report into Firestore
 */
export async function saveDailyReport(report: DailyReport): Promise<void> {
  const docRef = doc(db, DAILY_REPORTS_COLLECTION, report.date);
  const payload: DailyReport = {
    date: report.date,
    stats: {
      deceased: report.stats.deceased ?? null,
      missing: report.stats.missing ?? null,
      rescued: report.stats.rescued ?? null,
    },
    top_government_actions: (report.top_government_actions || []).map((action, idx) => ({
      rank: action.rank || idx + 1,
      category: action.category || '일반 구조 활동',
      summary: action.summary || '',
    })),
    source_summary: report.source_summary || '네팔 국가재난관리청(NDRRMA) 및 내무부 공식 집계 보고서',
    updatedAt: new Date().toISOString(),
  };
  await setDoc(docRef, payload, { merge: true });
}

/**
 * Check if the collection has any documents and seed default realistic situational reports
 */
export async function ensureInitialSeedReports(defaultReports: DailyReport[]): Promise<void> {
  try {
    const colRef = collection(db, DAILY_REPORTS_COLLECTION);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      console.log('Seeding initial disaster reports to Firestore...');
      for (const rep of defaultReports) {
        await saveDailyReport(rep);
      }
    }
  } catch (e) {
    console.warn('Could not auto-seed Firestore (offline or security rule):', e);
  }
}
