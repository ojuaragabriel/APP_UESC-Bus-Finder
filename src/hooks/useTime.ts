"use client";

import { useState, useEffect } from 'react';

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    const getCurrentBahiaTime = (): Date => {
      const now = new Date();
      // This is a robust way to create a date object that represents the time in a specific timezone
      // without being affected by the host system's timezone.
      const bahiaTimeString = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Bahia',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      }).format(now);

      const [datePart, timePart] = bahiaTimeString.split(', ');
      const [month, day, year] = datePart.split('/');
      return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}`);
    };

    // Initial client-side sync
    setCurrentTime(getCurrentBahiaTime());

    const timerId = setInterval(() => {
      setCurrentTime(getCurrentBahiaTime());
    }, 60000); // Update every minute

    return () => clearInterval(timerId);
  }, []);

  return currentTime;
};
