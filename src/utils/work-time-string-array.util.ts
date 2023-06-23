import { WorkTime } from '@/interfaces/work-time.interface';
import { isEmpty } from 'class-validator';
import { getDateTimeToTime } from './get-datetime-to-time';
import { getWeekByLang } from './get-weekby-lang';

export const workTimeStringArray = (workTime: WorkTime[], language: string): string[] => {
  if (!workTime.length) {
    return [];
  }
  const workTimeArray: string[] = [];
  workTime.forEach(item => {
    let workTimeStr = '';

    item.weeks.forEach((week, index) => {
      if (index !== 0) workTimeStr += ', ';
      workTimeStr += `${getWeekByLang(language, week)}`;
    });

    let startTimeArr = item.startTime;
    let endTimeArr = item.endTime;

    if (startTimeArr == null) startTimeArr = [];
    if (typeof startTimeArr == 'string') startTimeArr = [startTimeArr];
    if (endTimeArr == null) endTimeArr = [];
    if (typeof endTimeArr == 'string') endTimeArr = [endTimeArr];

    const startTime1 = item.startTime[0] ?? null;
    const endTime1 = item.startTime[1] ?? null;
    const startTime2 = item.endTime[0] ?? null;
    const endTime2 = item.endTime[1] ?? null;

    if (!isEmpty(startTime1) && !isEmpty(endTime1)) workTimeStr += ` (${getDateTimeToTime(startTime1)} - ${getDateTimeToTime(endTime1)})`;
    if (!isEmpty(startTime2) && !isEmpty(endTime2)) workTimeStr += ` (${getDateTimeToTime(startTime2)} - ${getDateTimeToTime(endTime2)})`;

    workTimeArray.push(workTimeStr);
  });

  return workTimeArray;
};
