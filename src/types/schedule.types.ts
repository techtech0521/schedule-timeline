/**
 * Type definitions for the daily schedule timeline application
 */

/**
 * Represents a single event in the daily schedule
 */
export interface ScheduleEvent {
  /** Unique identifier for the event */
  id: string;
  /** Time slot in format "HH:MM-HH:MM" or "HH:MM" */
  time: TimeSlot;
  /** Event title */
  title: string;
  /** Optional description of the event */
  description?: string;
  /** Optional category for grouping/filtering */
  category?: EventCategory;
}

/**
 * Time slot format: "HH:MM-HH:MM" or "HH:MM"
 * @example "08:00-09:00"
 * @example "14:30"
 */
export type TimeSlot = string;

/**
 * Event categories for organizing and filtering
 */
export type EventCategory =
  | 'work'      // Work-related tasks
  | 'personal'  // Personal activities
  | 'meeting'   // Meetings and calls
  | 'break'     // Breaks and rest time
  | 'exercise'  // Physical activities
  | 'other';    // Other events

/**
 * Node color types for timeline markers
 * - blue: teal color (#00a8cc), content on right
 * - red: crimson color (#e60000), content on left
 */
export type NodeColor = 'blue' | 'red';

/**
 * Content position relative to the timeline
 * - left: content appears on the left side
 * - right: content appears on the right side
 */
export type ContentPosition = 'left' | 'right';

/**
 * Configuration options for the Timeline component
 */
export interface TimelineConfig {
  /** Main title displayed at the top */
  title?: string;
  /** Subtitle displayed below the title */
  subtitle?: string;
  /** Whether to show the footer section */
  showFooter?: boolean;
}

/**
 * Props for the main Timeline component
 */
export interface TimelineProps {
  /** Array of schedule events to display */
  events: ScheduleEvent[];
  /** Optional title for the timeline */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Whether to show footer with icon */
  showFooter?: boolean;
}

/**
 * Props for individual timeline items
 */
export interface TimelineItemProps {
  /** The event data to display */
  event: ScheduleEvent;
  /** Color of the timeline node */
  nodeColor: NodeColor;
  /** Position of the content relative to center */
  position: ContentPosition;
}

/**
 * Props for the timeline node component
 */
export interface TimelineNodeProps {
  /** Color variant for the node */
  color: NodeColor;
  /** Size of the node in pixels (default: 20) */
  size?: number;
}

/**
 * Props for the timeline content component
 */
export interface TimelineContentProps {
  /** Time string to display */
  time: string;
  /** Event title */
  title: string;
  /** Optional description text */
  description?: string;
  /** Position of content (affects text alignment) */
  position: ContentPosition;
}

/**
 * Props for the timeline header component
 */
export interface TimelineHeaderProps {
  /** Main title text */
  title: string;
  /** Optional subtitle text */
  subtitle?: string;
}

/**
 * Props for the timeline footer component
 */
export interface TimelineFooterProps {
  /** Optional custom icon class name */
  iconClassName?: string;
  /** Optional footer text */
  text?: string;
}
