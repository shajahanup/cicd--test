import DB from '@/databases';
import LOCALE from '@utils/constants/locale';
import { EnglishWeekDays, GermanWeekDays } from '@utils/constants/weekDays';
import { Identifier } from 'sequelize';

export const setWorkTimeStrList = (mayor, locale = LOCALE.de) => {
  if (!mayor && !mayor?.timing?.length) {
    return;
  }
  const WEEK_DAYS = locale == LOCALE.de ? GermanWeekDays : EnglishWeekDays;
  mayor.workTimeStrList = mayor.timing.map(wt => {
    let str = '';

    if (!wt.weeks || !wt.weeks.length || !wt.weeks[0]) {
      return str;
    }
    if (wt.weeks?.length && wt.weeks.length === 1) {
      str = WEEK_DAYS[wt.weeks[0]];
    } else {
      const start = WEEK_DAYS[wt.weeks[0]?.toUpperCase()];
      const end = WEEK_DAYS[wt.weeks[wt.weeks.length - 1]?.toUpperCase()];
      str = `${start} ${locale === LOCALE.de ? 'bis' : 'to'} ${end}`;
    }

    const start = new Date(wt.startTime).getHours();
    const end = new Date(wt.endTime).getHours();

    str += `(${start > 9 ? start : `0${start}`} - ${end > 9 ? end : `0${end}`})`;

    return str;
  });
  return mayor.workTimeStrList;
};

export const checkIfMayorExists = async (id: Identifier): Promise<boolean> => {
  const mayor = DB.Mayor;
  const mayorFound = await mayor.findOne({ where: { id, isDeleted: false } });
  return !!mayorFound;
};
