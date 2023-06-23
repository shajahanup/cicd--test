import { Languages } from '@/enums/languages.enum';

export const getTableInclusion = (language: string, keys: Array<string>): string[][] => {
  if (language == Languages.EN) {
    const inclusionArray = keys.map(key => [`${key}_en`, `${key}`]);
    return inclusionArray;
  } else if (language == Languages.DE) {
    const inclusionArray = keys.map(key => [`${key}_de`, `${key}`]);
    return inclusionArray;
  }
  return [];
};
