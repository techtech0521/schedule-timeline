import React from 'react';
import type { TimelineFooterProps } from '@/types/schedule.types';
import styles from './Timeline.module.css';

/**
 * TimelineFooter - Footer section with optional icon and text
 *
 * @param iconClassName - Optional CSS class for custom icon
 * @param text - Optional footer text
 */
export const TimelineFooter: React.FC<TimelineFooterProps> = ({
  iconClassName = '📅',
  text = 'End of Schedule'
}) => {
  return (
    <footer className={styles.footer}>
      {iconClassName && <span className={styles.footerIcon}>{iconClassName}</span>}
      {text && <p className={styles.footerText}>{text}</p>}
    </footer>
  );
};
