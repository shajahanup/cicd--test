export const getTableExclusion = (keys: Array<string>): Array<string> => {
  const exclusionArray = keys.flatMap(key => [`${key}De`, `${key}En`]);
  return exclusionArray;
};
