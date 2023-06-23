export const checkArrayOfString = (array: []): boolean => {
  array.forEach(item => {
    if (typeof item !== 'string') {
      return false;
    }
  });
  return true;
};
