import { describe, it, expect } from 'vitest';
import { formatTime, parseTimeSlot, getDurationMinutes, isValidTimeSlot } from './time.utils';

describe('Time Utilities', () => {
  describe('formatTime', () => {
    it('formats time range in AM/PM format', () => {
      expect(formatTime('08:00-09:00')).toBe('8:00 AM - 9:00 AM');
      expect(formatTime('09:30-10:30')).toBe('9:30 AM - 10:30 AM');
    });

    it('formats time range with PM times', () => {
      expect(formatTime('14:00-15:00')).toBe('2:00 PM - 3:00 PM');
      expect(formatTime('18:30-19:30')).toBe('6:30 PM - 7:30 PM');
    });

    it('formats time range crossing noon', () => {
      expect(formatTime('11:00-13:00')).toBe('11:00 AM - 1:00 PM');
    });

    it('formats single time', () => {
      expect(formatTime('08:00')).toBe('8:00 AM');
      expect(formatTime('14:30')).toBe('2:30 PM');
    });

    it('handles midnight', () => {
      expect(formatTime('00:00')).toBe('12:00 AM');
      expect(formatTime('00:30')).toBe('12:30 AM');
    });

    it('handles noon', () => {
      expect(formatTime('12:00')).toBe('12:00 PM');
    });
  });

  describe('parseTimeSlot', () => {
    it('parses time range correctly', () => {
      const result = parseTimeSlot('08:00-09:00');

      expect(result.startTime).toBe('08:00');
      expect(result.endTime).toBe('09:00');
      expect(result.startHour).toBe(8);
      expect(result.startMinute).toBe(0);
      expect(result.endHour).toBe(9);
      expect(result.endMinute).toBe(0);
    });

    it('parses time range with minutes', () => {
      const result = parseTimeSlot('09:30-10:45');

      expect(result.startTime).toBe('09:30');
      expect(result.endTime).toBe('10:45');
      expect(result.startHour).toBe(9);
      expect(result.startMinute).toBe(30);
      expect(result.endHour).toBe(10);
      expect(result.endMinute).toBe(45);
    });

    it('parses single time', () => {
      const result = parseTimeSlot('08:00');

      expect(result.startTime).toBe('08:00');
      expect(result.endTime).toBeUndefined();
      expect(result.startHour).toBe(8);
      expect(result.startMinute).toBe(0);
    });

    it('handles invalid format', () => {
      const result = parseTimeSlot('invalid');

      expect(result.startTime).toBe('invalid');
      expect(result.endTime).toBeUndefined();
      expect(result.startHour).toBe(0);
      expect(result.startMinute).toBe(0);
    });
  });

  describe('getDurationMinutes', () => {
    it('calculates duration for time range', () => {
      expect(getDurationMinutes('08:00-09:00')).toBe(60);
      expect(getDurationMinutes('09:00-10:30')).toBe(90);
      expect(getDurationMinutes('08:00-17:00')).toBe(540);
    });

    it('returns 0 for single time', () => {
      expect(getDurationMinutes('08:00')).toBe(0);
    });

    it('calculates duration across hours', () => {
      expect(getDurationMinutes('08:30-10:15')).toBe(105);
    });
  });

  describe('isValidTimeSlot', () => {
    it('validates correct time range format', () => {
      expect(isValidTimeSlot('08:00-09:00')).toBe(true);
      expect(isValidTimeSlot('9:00-10:00')).toBe(true);
      expect(isValidTimeSlot('23:59-00:01')).toBe(true);
    });

    it('validates correct single time format', () => {
      expect(isValidTimeSlot('08:00')).toBe(true);
      expect(isValidTimeSlot('9:30')).toBe(true);
      expect(isValidTimeSlot('23:59')).toBe(true);
    });

    it('rejects invalid formats', () => {
      expect(isValidTimeSlot('invalid')).toBe(false);
      expect(isValidTimeSlot('8:00-')).toBe(false);
      expect(isValidTimeSlot('-09:00')).toBe(false);
      expect(isValidTimeSlot('')).toBe(false);
    });
  });
});
