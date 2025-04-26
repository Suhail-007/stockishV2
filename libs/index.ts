import { Filters } from '../utils/global.type';

const greetings = ['Hello', 'Hi', 'Hey', 'Welcome back'];
const greetingQuestions = [
  'how are you today?',
  'how is your day going?',
  'how have you been?',
  'hope you are having a great day!',
  'nice to see you again!'
];

/**
 * Returns a greeting based on the time of day.
 *
 * The greeting is determined as follows:
 * - 5 AM to 12 PM: Good morning
 * - 12 PM to 1 PM: Good afternoon
 * - 6 PM to 12 AM: Good evening
 * - 12 AM to 6 AM: Good night
 * - Otherwise: A random greeting from the list ['Hello', 'Hi', 'Hey', 'Welcome back']
 *
 * @returns string
 */
export const getGreeting = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    // Morning: 5 AM to 12 PM
    return 'Good morning';
  } else if (currentHour >= 12 && currentHour < 14) {
    // Afternoon: 12 PM to 1 PM
    return 'Good afternoon';
  } else if (currentHour >= 18 && currentHour < 19) {
    // Evening: 6 PM to 12 AM
    return 'Good evening';
  } else if (currentHour >= 22 && currentHour < 24) {
    // Night: 12 AM to 6 AM
    return 'Good night';
  }

  return greetings[Math.floor(Math.random() * greetings.length)];
};

export const getGreetingQuestion = (): string => {
  return greetingQuestions[Math.floor(Math.random() * greetingQuestions.length)];
};

export const createFiltersQuery = <T extends Filters>(filters: Partial<T>) => {
  let query = '';

  if (filters) {
    const filterKeys = Object.keys(filters) as (keyof typeof filters)[];

    filterKeys.forEach((key) => {
      const value = filters[key];
      if (value) {
        query += `&${String(key)}=${value}`;
      }
    });
  }

  return query;
};
