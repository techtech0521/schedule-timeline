import { useMemo } from 'react';
import type { ScheduleEvent, NodeColor, ContentPosition } from '@/types/schedule.types';

/**
 * Layout information for a single timeline event
 */
export interface EventLayout {
  event: ScheduleEvent;
  nodeColor: NodeColor;
  position: ContentPosition;
}

/**
 * Result type for useTimelineLayout hook
 */
export interface TimelineLayoutResult {
  /** Array of events with their computed layout information */
  layouts: EventLayout[];
  /** Get node color for a specific index */
  getNodeColor: (index: number) => NodeColor;
  /** Get content position for a specific node color */
  getContentPosition: (color: NodeColor) => ContentPosition;
  /** Get full layout info for a specific index */
  getLayout: (index: number) => EventLayout;
}

/**
 * useTimelineLayout - Custom hook for timeline layout calculations
 *
 * Provides utilities to determine node colors and content positions
 * based on the alternating pattern:
 * - Even indices → blue node → content on right
 * - Odd indices → red node → content on left
 *
 * @param events - Array of schedule events
 * @returns Layout utilities and pre-computed layouts
 *
 * @example
 * ```tsx
 * const { layouts, getNodeColor } = useTimelineLayout(events);
 * const color = getNodeColor(0); // 'blue'
 * ```
 */
export const useTimelineLayout = (events: ScheduleEvent[]): TimelineLayoutResult => {
  // Memoize layout calculations to avoid unnecessary recomputation
  const layouts = useMemo<EventLayout[]>(() => {
    return events.map((event, index) => ({
      event,
      nodeColor: index % 2 === 0 ? 'blue' : 'red',
      position: index % 2 === 0 ? 'right' : 'left'
    }));
  }, [events]);

  /**
   * Get node color for a specific index
   * @param index - The event index
   * @returns 'blue' for even indices, 'red' for odd
   */
  const getNodeColor = (index: number): NodeColor => {
    return index % 2 === 0 ? 'blue' : 'red';
  };

  /**
   * Get content position for a specific node color
   * @param color - The node color
   * @returns 'right' for blue nodes, 'left' for red nodes
   */
  const getContentPosition = (color: NodeColor): ContentPosition => {
    return color === 'blue' ? 'right' : 'left';
  };

  /**
   * Get full layout info for a specific index
   * @param index - The event index
   * @returns EventLayout with event, nodeColor, and position
   */
  const getLayout = (index: number): EventLayout => {
    return layouts[index] || {
      event: events[index],
      nodeColor: getNodeColor(index),
      position: getContentPosition(getNodeColor(index))
    };
  };

  return {
    layouts,
    getNodeColor,
    getContentPosition,
    getLayout
  };
};
