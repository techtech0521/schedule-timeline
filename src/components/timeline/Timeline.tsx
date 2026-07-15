import React from 'react';
import type { TimelineProps, NodeColor, ContentPosition } from '@/types/schedule.types';
import { TimelineHeader } from './TimelineHeader';
import { TimelineFooter } from './TimelineFooter';
import { TimelineItem } from './TimelineItem';
import styles from './Timeline.module.css';

/**
 * Timeline - Main container for the vertical timeline display
 *
 * Features:
 * - Alternating blue/red nodes (even/odd index)
 * - Blue nodes have content on the right
 * - Red nodes have content on the left
 * - Central vertical black line
 *
 * @param events - Array of schedule events to display
 * @param title - Optional title for the timeline
 * @param subtitle - Optional subtitle
 * @param showFooter - Whether to show footer (default: false)
 */
export const Timeline: React.FC<TimelineProps> = ({
  events,
  title,
  subtitle,
  showFooter = false
}) => {
  // Determine node color based on index (even = blue, odd = red)
  const getNodeColor = (index: number): NodeColor => {
    return index % 2 === 0 ? 'blue' : 'red';
  };

  // Determine content position based on node color (blue = right, red = left)
  const getContentPosition = (color: NodeColor): ContentPosition => {
    return color === 'blue' ? 'right' : 'left';
  };

  // Empty state
  if (!events || events.length === 0) {
    return (
      <section className={styles.timeline} aria-label="Schedule Timeline">
        <div className={styles.empty}>No events scheduled for today</div>
      </section>
    );
  }

  return (
    <section className={styles.timeline} aria-label="Schedule Timeline">
      {/* Header */}
      {title && <TimelineHeader title={title} subtitle={subtitle} />}

      {/* Timeline Items */}
      {events.map((event, index) => {
        const nodeColor = getNodeColor(index);
        const position = getContentPosition(nodeColor);

        return (
          <TimelineItem
            key={event.id}
            event={event}
            nodeColor={nodeColor}
            position={position}
          />
        );
      })}

      {/* Footer */}
      {showFooter && <TimelineFooter />}
    </section>
  );
};
