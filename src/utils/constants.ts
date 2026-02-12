/**
 * Application-wide constants
 */

/**
 * Node colors matching the design specification
 */
export const NODE_COLORS = {
  blue: '#00a8cc',
  red: '#e60000'
} as const;

/**
 * Timeline styling constants
 */
export const TIMELINE_CONSTANTS = {
  LINE_WIDTH: 2, // px
  NODE_SIZE: 20, // px
  NODE_BORDER_WIDTH: 2, // px
  EVENT_SPACING: 60, // px
  CONTENT_PADDING: 40, // px
  TRANSITION_DURATION: 0.2 // seconds
} as const;

/**
 * Time format patterns
 */
export const TIME_PATTERNS = {
  TIME_RANGE: /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/, // "08:00-09:00"
  SINGLE_TIME: /^\d{1,2}:\d{2}$/, // "08:00"
  TIME: /^\d{1,2}:\d{2}$/ // "HH:MM"
} as const;

/**
 * Event category display names
 */
export const CATEGORY_LABELS = {
  work: 'Work',
  personal: 'Personal',
  meeting: 'Meeting',
  break: 'Break',
  exercise: 'Exercise',
  other: 'Other'
} as const;

/**
 * Default footer text
 */
export const DEFAULT_FOOTER_TEXT = 'End of Schedule';

/**
 * Default footer icon
 */
export const DEFAULT_FOOTER_ICON = '📅';
