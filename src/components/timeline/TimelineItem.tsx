import React from 'react';
import type { TimelineItemProps } from '@/types/schedule.types';
import { TimelineNode } from './TimelineNode';
import { TimelineContent } from './TimelineContent';
import styles from './Timeline.module.css';

/**
 * TimelineItem - A single item in the timeline with node and content
 *
 * Combines the colored node and event content in the proper layout.
 * The position prop determines whether content appears on the left or right.
 *
 * @param event - The schedule event data
 * @param nodeColor - Color of the timeline node ('blue' or 'red')
 * @param position - Content position ('left' or 'right')
 */
export const TimelineItem: React.FC<TimelineItemProps> = ({
  event,
  nodeColor,
  position
}) => {
  const itemClass = [styles.item, styles[position]].join(' ');

  return (
    <article className={itemClass}>
      <TimelineContent
        time={event.time}
        title={event.title}
        description={event.description}
        position={position}
      />
      <TimelineNode color={nodeColor} />
    </article>
  );
};
