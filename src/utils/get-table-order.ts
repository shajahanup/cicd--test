import { Languages } from '@/enums/languages.enum';

export const getTableOrder = (language: string, key: string): Array<string> => {
  if (language == Languages.EN) {
    const orderArray = [`${key}En`];
    return orderArray;
  } else if (language == Languages.DE) {
    const orderArray = [`${key}De`];
    return orderArray;
  }
  return [];
};
