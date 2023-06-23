import DB from '@/databases';
import { Identifier } from 'sequelize';
import { EnglishWeekDays, GermanWeekDays } from '@utils/constants/weekDays';
import LOCALE from '@utils/constants/locale';
import QueryOptionsInterface from '@interfaces/queryOptions.interface';

export const checkIfAdressExist = async (id: Identifier): Promise<boolean> => {
  const addressBook = DB.AddressBook;
  const address = await addressBook.findOne({ where: { id, isDeleted: false } });
  return !!address;
};

export const setWorkTimeStrList = (addressBooks, locale = LOCALE.de) => {
  if (!addressBooks?.length) {
    return [];
  }
  const WEEK_DAYS = locale == LOCALE.de ? GermanWeekDays : EnglishWeekDays;
  addressBooks.map(addressBook => {
    if (!addressBook && !addressBook?.workTime?.length) {
      return;
    }

    addressBook.workTimeStrList = addressBook.workTime.map(wt => {
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
  });
};

export const getWhereClause = (params: QueryOptionsInterface): string => {
  let whereClause = `WHERE ab."municipality_id" = :municipalityId AND ab.is_deleted = false`;
  if (params?.categoryId !== null) {
    whereClause += ` AND ab.category_id = :categoryId`;
  }
  if (params?.search) {
    const search = params.search.toString().toLowerCase();
    whereClause += search ? ` AND(lower(ab."name") LIKE '%${search}%' OR lower(ab.phone) LIKE '%${search}%')` : '';
  }
  return whereClause;
};

export const getAddressSearchWhereClause = (search: string) => {
  if (search) {
    return `
    where lower(array_to_string(tags, ',')) like \'%${search.toLowerCase()}%\'
    or lower(name) like \'%${search.toLowerCase()}%\'`;
  }
  return '';
};
