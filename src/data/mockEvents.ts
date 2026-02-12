import type { ScheduleEvent } from '@/types/schedule.types';

/**
 * Mock daily schedule events for demonstration
 * Represents a typical workday with exercise, meetings, work sessions, and breaks
 */
export const mockDailySchedule: ScheduleEvent[] = [
  {
    id: '1',
    time: '08:00-09:00',
    title: '朝の運動',
    description: 'ジムで有酸素運動と筋力トレーニング',
    category: 'exercise'
  },
  {
    id: '2',
    time: '09:30-10:30',
    title: 'チーム立会い',
    description: '開発チームとの毎日の同期',
    category: 'meeting'
  },
  {
    id: '3',
    time: '11:00-12:30',
    title: 'ディープワーク: 機能開発',
    description: '新しいタイムラインコンポーネントに集中する時間',
    category: 'work'
  },
  {
    id: '4',
    time: '12:30-13:30',
    title: '昼休み',
    description: '食事と休憩の時間',
    category: 'break'
  },
  {
    id: '5',
    time: '14:00-15:30',
    title: 'コードレビューと計画',
    description: 'PRレビューと次のスプリント計画',
    category: 'work'
  },
  {
    id: '6',
    time: '16:00-17:00',
    title: 'クライアント電話会議',
    description: 'ステークホルダーとの四半期レビュー',
    category: 'meeting'
  },
  {
    id: '7',
    time: '18:00-19:00',
    title: '夕方のランニング',
    description: '公園周辺5km',
    category: 'exercise'
  }
];

/**
 * English version of mock schedule events
 */
export const mockDailyScheduleEn: ScheduleEvent[] = [
  {
    id: '1',
    time: '08:00-09:00',
    title: 'Morning Exercise',
    description: 'Cardio and strength training at the gym',
    category: 'exercise'
  },
  {
    id: '2',
    time: '09:30-10:30',
    title: 'Team Standup',
    description: 'Daily sync with the development team',
    category: 'meeting'
  },
  {
    id: '3',
    time: '11:00-12:30',
    title: 'Deep Work: Feature Development',
    description: 'Focused time for new timeline component',
    category: 'work'
  },
  {
    id: '4',
    time: '12:30-13:30',
    title: 'Lunch Break',
    description: 'Time for meal and relaxation',
    category: 'break'
  },
  {
    id: '5',
    time: '14:00-15:30',
    title: 'Code Review & Planning',
    description: 'PR reviews and next sprint planning',
    category: 'work'
  },
  {
    id: '6',
    time: '16:00-17:00',
    title: 'Client Conference Call',
    description: 'Quarterly review with stakeholders',
    category: 'meeting'
  },
  {
    id: '7',
    time: '18:00-19:00',
    title: 'Evening Run',
    description: '5km around the park',
    category: 'exercise'
  }
];

/**
 * Minimal mock data for testing
 */
export const mockMinimalSchedule: ScheduleEvent[] = [
  {
    id: '1',
    time: '09:00-10:00',
    title: 'Start Work',
    description: 'Begin daily tasks',
    category: 'work'
  },
  {
    id: '2',
    time: '12:00-13:00',
    title: 'Lunch',
    category: 'break'
  },
  {
    id: '3',
    time: '17:00-18:00',
    title: 'End Work',
    description: 'Wrap up and go home',
    category: 'work'
  }
];

/**
 * Empty schedule for testing empty state
 */
export const mockEmptySchedule: ScheduleEvent[] = [];

/**
 * Get a specific mock schedule by name
 */
export const getMockSchedule = (type: 'full' | 'minimal' | 'empty' | 'en' = 'full'): ScheduleEvent[] => {
  switch (type) {
    case 'full':
      return mockDailySchedule;
    case 'en':
      return mockDailyScheduleEn;
    case 'minimal':
      return mockMinimalSchedule;
    case 'empty':
      return mockEmptySchedule;
    default:
      return mockDailySchedule;
  }
};
