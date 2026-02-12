import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Timeline } from './Timeline';
import { mockDailySchedule, mockEmptySchedule } from '@/data/mockEvents';

describe('Timeline Component', () => {
  it('renders timeline with events', () => {
    render(<Timeline events={mockDailySchedule} title="Test Schedule" />);

    expect(screen.getByText('Test Schedule')).toBeInTheDocument();
    expect(screen.getByText('朝の運動')).toBeInTheDocument();
    expect(screen.getByText('チーム立会い')).toBeInTheDocument();
  });

  it('renders empty state when no events', () => {
    render(<Timeline events={mockEmptySchedule} />);

    expect(screen.getByText('No events scheduled for today')).toBeInTheDocument();
  });

  it('renders header with title and subtitle', () => {
    render(
      <Timeline
        events={mockDailySchedule}
        title="My Schedule"
        subtitle="Today's activities"
      />
    );

    expect(screen.getByText('My Schedule')).toBeInTheDocument();
    expect(screen.getByText("Today's activities")).toBeInTheDocument();
  });

  it('renders footer when showFooter is true', () => {
    render(<Timeline events={mockDailySchedule} showFooter={true} />);

    expect(screen.getByText('End of Schedule')).toBeInTheDocument();
  });

  it('does not render footer when showFooter is false', () => {
    render(<Timeline events={mockDailySchedule} showFooter={false} />);

    expect(screen.queryByText('End of Schedule')).not.toBeInTheDocument();
  });

  it('renders all events from mock data', () => {
    render(<Timeline events={mockDailySchedule} />);

    expect(screen.getByText('朝の運動')).toBeInTheDocument();
    expect(screen.getByText('チーム立会い')).toBeInTheDocument();
    expect(screen.getByText('ディープワーク: 機能開発')).toBeInTheDocument();
    expect(screen.getByText('昼休み')).toBeInTheDocument();
    expect(screen.getByText('コードレビューと計画')).toBeInTheDocument();
    expect(screen.getByText('クライアント電話会議')).toBeInTheDocument();
    expect(screen.getByText('夕方のランニング')).toBeInTheDocument();
  });
});
