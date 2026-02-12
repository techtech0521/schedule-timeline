import React from 'react';
import type { TimelineNodeProps } from '@/types/schedule.types';
import styles from './Timeline.module.css';

/**
 * TimelineNode - Renders a colored circular marker on the timeline
 *
 * @param color - The color variant ('blue' or 'red')
 * @param size - Optional size in pixels (default: 20px)
 */
export const TimelineNode: React.FC<TimelineNodeProps> = ({
  color,
  size
}) => {
  const nodeClasses = [styles.node, styles[color]].filter(Boolean).join(' ');

  const nodeStyle: React.CSSProperties = size
    ? { width: `${size}px`, height: `${size}px` }
    : {};

  return <div className={nodeClasses} style={nodeStyle} aria-hidden="true" />;
};
