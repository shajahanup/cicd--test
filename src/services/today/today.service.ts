import DB from '@/databases';
import { EventTranslationKeys } from '@/utils/constants/translation-keys';
import { getTableExclusion } from '@/utils/get-table-exclusion';
import { getTableInclusion } from '@/utils/get-table-inclusion';
import { getEventsByDate } from '../events/events.util';
import { todayEmergencyServiceQuery } from './today.query';
import * as dateFns from 'date-fns';

export default class TodayService {
  private events = DB.Events;

  public async getEmergencyServiceOfToday(municipalityId: number, language: string) {
    const replacements = {
      municipalityId,
    };
    const query = todayEmergencyServiceQuery(language);
    const emergencyServiceOfToday = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
    return emergencyServiceOfToday;
  }

  public async getEventsOfToday(municipalityId: number, language: string) {
    const exclude = getTableExclusion(EventTranslationKeys);
    const include: any = getTableInclusion(language, EventTranslationKeys);
    const events = await this.events.findAll({
      where: { municipalityId, isDeleted: false },
      order: [['startDate', 'ASC']],
      attributes: {
        exclude,
        include,
      },
    });
    const eventsByDate = getEventsByDate(events);
    const today = dateFns.format(new Date(), 'yyyy-MM-dd');
    const todayEvents = [];

    for (const date in eventsByDate) {
      if (date == today) {
        todayEvents.push(eventsByDate[date]);
      }
    }
    return todayEvents;
  }
}
