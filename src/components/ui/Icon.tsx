import React from 'react';

/**
 * Icon component props
 */
export interface IconProps {
  /** Icon name or emoji */
  name: string;
  /** Size in pixels (optional) */
  size?: number;
  /** Additional CSS class name (optional) */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * Icon - Simple icon component for displaying emoji or text-based icons
 *
 * @param name - Icon character or emoji
 * @param size - Optional size in pixels
 * @param className - Optional CSS class
 * @param ariaLabel - Accessibility label
 *
 * @example
 * <Icon name="📅" size={24} ariaLabel="Calendar icon" />
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size,
  className = '',
  ariaLabel
}) => {
  const style: React.CSSProperties = size
    ? { fontSize: `${size}px`, width: `${size}px`, height: `${size}px` }
    : {};

  return (
    <span
      className={className}
      style={style}
      role="img"
      aria-label={ariaLabel || name}
    >
      {name}
    </span>
  );
};
