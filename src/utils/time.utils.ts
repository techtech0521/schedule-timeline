import type { TimeSlot } from '@/types/schedule.types';
import { TIME_PATTERNS } from './constants';

/**
 * Parsed time information from a time slot
 */
export interface ParsedTimeSlot {
  /** Start time in HH:MM format */
  startTime: string;
  /** End time in HH:MM format, or undefined if single time */
  endTime: string | undefined;
  /** Start hour (0-23) */
  startHour: number;
  /** Start minute (0-59) */
  startMinute: number;
  /** End hour (0-23), or undefined if single time */
  endHour?: number;
  /** End minute (0-59), or undefined if single time */
  endMinute?: number;
}

/**
 * Format a time slot for display
 * Converts "08:00-09:00" to "8:00 AM - 9:00 AM"
 * Converts "14:30" to "2:30 PM"
 *
 * @param timeSlot - Time slot in format "HH:MM-HH:MM" or "HH:MM"
 * @returns Formatted time string
 *
 * @example
 * formatTime("08:00-09:00") // "8:00 AM - 9:00 AM"
 * formatTime("14:30") // "2:30 PM"
 */
export const formatTime = (timeSlot: TimeSlot): string => {
  const parsed = parseTimeSlot(timeSlot);

  const formatSingleTime = (hour: number, minute: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${period}`;
  };

  const startFormatted = formatSingleTime(parsed.startHour, parsed.startMinute);

  if (parsed.endTime) {
    const endFormatted = formatSingleTime(parsed.endHour!, parsed.endMinute!);
    return `${startFormatted} - ${endFormatted}`;
  }

  return startFormatted;
};

/**
 * Parse a time slot into its components
 *
 * @param timeSlot - Time slot in format "HH:MM-HH:MM" or "HH:MM"
 * @returns Parsed time information
 *
 * @example
 * parseTimeSlot("08:00-09:00")
 * // { startTime: "08:00", endTime: "09:00", startHour: 8, startMinute: 0, endHour: 9, endMinute: 0 }
 */
export const parseTimeSlot = (timeSlot: TimeSlot): ParsedTimeSlot => {
  // Check if it's a time range (e.g., "08:00-09:00")
  if (TIME_PATTERNS.TIME_RANGE.test(timeSlot)) {
    const [startTime, endTime] = timeSlot.split('-');
    const startHour = parseInt(startTime.split(':')[0], 10);
    const startMinute = parseInt(startTime.split(':')[1], 10);
    const endHour = parseInt(endTime.split(':')[0], 10);
    const endMinute = parseInt(endTime.split(':')[1], 10);

    return {
      startTime,
      endTime,
      startHour,
      startMinute,
      endHour,
      endMinute
    };
  }

  // Single time (e.g., "08:00")
  if (TIME_PATTERNS.SINGLE_TIME.test(timeSlot)) {
    const hour = parseInt(timeSlot.split(':')[0], 10);
    const minute = parseInt(timeSlot.split(':')[1], 10);

    return {
      startTime: timeSlot,
      endTime: undefined,
      startHour: hour,
      startMinute: minute
    };
  }

  // Fallback for invalid format
  return {
    startTime: timeSlot,
    endTime: undefined,
    startHour: 0,
    startMinute: 0
  };
};

/**
 * Calculate duration in minutes from a time slot
 *
 * @param timeSlot - Time slot in format "HH:MM-HH:MM" or "HH:MM"
 * @returns Duration in minutes, or 0 if single time
 *
 * @example
 * getDurationMinutes("08:00-09:30") // 90
 * getDurationMinutes("08:00") // 0
 */
export const getDurationMinutes = (timeSlot: TimeSlot): number => {
  const parsed = parseTimeSlot(timeSlot);

  if (parsed.endTime === undefined) {
    return 0;
  }

  const startMinutes = parsed.startHour * 60 + parsed.startMinute;
  const endMinutes = parsed.endHour! * 60 + parsed.endMinute!;

  return endMinutes - startMinutes;
};

/**
 * Validate if a time slot has correct format
 *
 * @param timeSlot - Time slot to validate
 * @returns true if valid, false otherwise
 */
export const isValidTimeSlot = (timeSlot: TimeSlot): boolean => {
  return TIME_PATTERNS.TIME_RANGE.test(timeSlot) ||
         TIME_PATTERNS.SINGLE_TIME.test(timeSlot);
};
