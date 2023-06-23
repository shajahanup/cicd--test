import TodayService from '@/services/today/today.service';
import { getLanguageHeader } from '@/utils/get-lang-header';
import { Request } from 'express';

class TodayController {
  private todayService = new TodayService();

  public getTodayDataMobile = async (req: Request): Promise<Object> => {
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const emergencyServiceDataPromise = this.todayService.getEmergencyServiceOfToday(municipalityId, language);
    const todayEventsDataPromise = this.todayService.getEventsOfToday(municipalityId, language);
    const result = await Promise.all([emergencyServiceDataPromise, todayEventsDataPromise]);
    const response = {
      emergencyServices: result[0],
      events: result[1][0] ?? [],
    };
    return response;
  };
}
export default TodayController;
