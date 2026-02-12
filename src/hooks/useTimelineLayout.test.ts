import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTimelineLayout } from './useTimelineLayout';
import type { ScheduleEvent } from '@/types/schedule.types';

describe('useTimelineLayout Hook', () => {
  const mockEvents: ScheduleEvent[] = [
    { id: '1', time: '09:00-10:00', title: 'Event 1' },
    { id: '2', time: '10:00-11:00', title: 'Event 2' },
    { id: '3', time: '11:00-12:00', title: 'Event 3' },
    { id: '4', time: '12:00-13:00', title: 'Event 4' }
  ];

  it('returns correct layouts for all events', () => {
    const { result } = renderHook(() => useTimelineLayout(mockEvents));

    expect(result.current.layouts).toHaveLength(4);

    // First event: even index -> blue -> right
    expect(result.current.layouts[0]).toEqual({
      event: mockEvents[0],
      nodeColor: 'blue',
      position: 'right'
    });

    // Second event: odd index -> red -> left
    expect(result.current.layouts[1]).toEqual({
      event: mockEvents[1],
      nodeColor: 'red',
      position: 'left'
    });
  });

  it('getNodeColor returns correct colors', () => {
    const { result } = renderHook(() => useTimelineLayout(mockEvents));

    expect(result.current.getNodeColor(0)).toBe('blue'); // even
    expect(result.current.getNodeColor(1)).toBe('red');  // odd
    expect(result.current.getNodeColor(2)).toBe('blue'); // even
    expect(result.current.getNodeColor(3)).toBe('red');  // odd
  });

  it('getContentPosition returns correct positions', () => {
    const { result } = renderHook(() => useTimelineLayout(mockEvents));

    expect(result.current.getContentPosition('blue')).toBe('right');
    expect(result.current.getContentPosition('red')).toBe('left');
  });

  it('getLayout returns correct layout for index', () => {
    const { result } = renderHook(() => useTimelineLayout(mockEvents));

    expect(result.current.getLayout(0)).toEqual({
      event: mockEvents[0],
      nodeColor: 'blue',
      position: 'right'
    });

    expect(result.current.getLayout(1)).toEqual({
      event: mockEvents[1],
      nodeColor: 'red',
      position: 'left'
    });
  });

  it('handles empty events array', () => {
    const { result } = renderHook(() => useTimelineLayout([]));

    expect(result.current.layouts).toHaveLength(0);
    expect(result.current.getNodeColor(0)).toBe('blue');
    expect(result.current.getLayout(0)).toEqual({
      event: undefined,
      nodeColor: 'blue',
      position: 'right'
    });
  });
});
