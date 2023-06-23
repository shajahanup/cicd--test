export const getDateTimeToTime = (dateTime: Date): string => {
  console.log(dateTime);
  const time = new Date(dateTime).toLocaleTimeString([], { timeStyle: 'short', hour12: false });
  return time;
};
