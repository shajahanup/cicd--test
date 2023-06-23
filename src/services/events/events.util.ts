import DB from '@/databases';
import Events from '@/interfaces/events.interface';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import { Identifier } from 'sequelize';
import * as dateFns from 'date-fns';
import { getDateArray } from '@/utils/get-date-array';

export const checkIfEventExists = async (id: Identifier): Promise<Boolean> => {
  const event = DB.Events;
  const eventFound = await event.findOne({ where: { id, isDeleted: false } });
  return !!eventFound;
};

export const getWhereClause = (params: QueryOptionsInterface): string => {
  let whereClause = `WHERE E."municipality_id" = :municipalityId AND E.is_deleted = false`;
  if (params.search) {
    const search = params.search.toString().toLowerCase();
    whereClause += search ? ` AND(lower(E.title) LIKE '%${search}%')` : '';
  }
  return whereClause;
};

export const getEventsByDate = (events: object): object => {
  const eventsByDate = {};
  for (const key in events) {
    const event: Events = events[key];
    const startDate = dateFns.format(Date.parse(event.startDate), 'yyyy-MM-dd');
    const endDate = dateFns.format(Date.parse(event.endDate), 'yyyy-MM-dd');
    if (startDate == endDate) {
      const eventsByDateArray = eventsByDate[startDate];
      if (eventsByDateArray) {
        eventsByDate[startDate] = [...eventsByDateArray, event];
      } else {
        eventsByDate[startDate] = [event];
      }
    } else {
      const datesArray = getDateArray(startDate, endDate);
      datesArray.forEach(date => {
        const eventsByDateArray = eventsByDate[date];
        if (eventsByDateArray) {
          eventsByDate[date] = [...eventsByDateArray, event];
        } else {
          eventsByDate[date] = [event];
        }
      });
    }
  }
  return eventsByDate;
};
