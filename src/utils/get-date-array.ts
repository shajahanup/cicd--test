import * as dateFns from 'date-fns';

export const getDateArray = (startDateStr: string, endDateStr: string): Array<string> => {
  const dateArray = [];
  let currentDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  while (currentDate <= endDate) {
    dateArray.push(dateFns.format(currentDate, 'yyyy-MM-dd'));
    currentDate = dateFns.add(currentDate, { days: 1 });
  }
  return dateArray;
};
