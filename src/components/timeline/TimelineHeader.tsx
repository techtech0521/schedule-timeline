import React from 'react';
import type { TimelineHeaderProps } from '@/types/schedule.types';
import styles from './Timeline.module.css';

/**
 * TimelineHeader - Header section with title and optional subtitle
 *
 * @param title - Main title text
 * @param subtitle - Optional subtitle text
 */
export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  title,
  subtitle
}) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>{title}</h1>
      {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
    </header>
  );
};
