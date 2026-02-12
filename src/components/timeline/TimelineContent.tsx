import React from 'react';
import type { TimelineContentProps } from '@/types/schedule.types';
import styles from './Timeline.module.css';

/**
 * TimelineContent - Displays event details (time, title, description)
 *
 * @param time - Time string to display
 * @param title - Event title
 * @param description - Optional description
 * @param position - 'left' or 'right' for alignment
 */
export const TimelineContent: React.FC<TimelineContentProps> = ({
  time,
  title,
  description,
  position
}) => {
  // Determine color based on position (right = blue, left = red)
  const colorClass = position === 'right' ? styles.blue : styles.red;
  const contentClass = [styles.content, styles[position]].join(' ');

  return (
    <div className={contentClass}>
      <time className={[styles.time, colorClass].join(' ')} dateTime={time}>
        {time}
      </time>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};
