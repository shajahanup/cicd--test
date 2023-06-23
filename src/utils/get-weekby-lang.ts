import { Languages } from '@/enums/languages.enum';
import { EnglishWeekDays, GermanWeekDays } from './constants/weekDays';

export const getWeekByLang = (language: string, week: string) => {
  const weekDays = language == Languages.EN ? EnglishWeekDays : GermanWeekDays;
  return weekDays[week.toUpperCase()];
};
