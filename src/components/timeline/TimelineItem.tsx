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
  position,
  onEdit,
  onDelete,
  isActive = false,
}) => {
  const itemClass = [styles.item, styles[position], isActive ? styles.activeItem : '']
    .join(' ')
    .trim();
  const contentWrapperClass = [
    styles.contentWrapper,
    styles[position],
    isActive ? styles.activeContent : '',
  ]
    .join(' ')
    .trim();

  return (
    <article className={itemClass} aria-current={isActive ? 'true' : undefined}>
      <div className={contentWrapperClass}>
        {isActive && <span className={styles.editingBadge}>この予定を編集中</span>}
        <TimelineContent
          time={event.time}
          title={event.title}
          description={event.description}
          position={position}
        />
        {(onEdit || onDelete) && (
          <div className={styles.itemActions} aria-label={`${event.title}の操作`}>
            {onEdit && (
              <button type="button" className={styles.actionButton} onClick={() => onEdit(event)}>
                編集
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className={[styles.actionButton, styles.deleteButton].join(' ')}
                onClick={() => onDelete(event.id)}
              >
                削除
              </button>
            )}
          </div>
        )}
      </div>
      <TimelineNode color={nodeColor} />
    </article>
  );
};
