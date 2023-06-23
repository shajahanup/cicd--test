import { isDate } from 'class-validator';

export const checkArrayOfDate = (array: []): boolean => {
  array.forEach(item => {
    if (!isDate(item)) {
      return false;
    }
  });
  return true;
};
