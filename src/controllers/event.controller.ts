import EventService from '@/services/events/events.service';
import { Request } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import SearchResponseInterface from '@/interfaces/searchResponse.interface';
import { getLanguageHeader } from '@/utils/get-lang-header';
import TranslationService from '@/services/translation/translation.service';
import { EventTranslationKeys } from '@/utils/constants/translation-keys';
import { isUpdateAll } from '@/utils/is-update-all';
import { getUpdateWithoutTranslation } from '@/utils/get-update-without-translation';

export default class EventController {
  public eventService = new EventService();
  public translationService = new TranslationService();

  public getEvents = async (req: Request): Promise<SearchResponseInterface> => {
    const params: QueryOptionsInterface = {
      offset: Number(req.query.offset),
      numResults: Number(req.query.numResults),
      search: req.query.search ? String(req.query.search) : null,
    };
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const eventsPromise = this.eventService.getEvents(params, municipalityId, language);
    const eventsCountPromise = this.eventService.getEventsCount(params, municipalityId);
    const result = await Promise.all([eventsPromise, eventsCountPromise]);
    const response: SearchResponseInterface = {
      data: result[0],
      count: result[1],
    };
    return response;
  };

  public getEventsMobile = async (req: Request): Promise<Object> => {
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const events = await this.eventService.getEventsMobile(municipalityId, language);
    return events;
  };

  public getOneEvent = async (req: Request): Promise<Object> => {
    const language = getLanguageHeader(req);
    const eventId = Number(req.params.eventId);
    const event = await this.eventService.getOneEvent(eventId, language);
    return event;
  };

  public createEvent = async (req: RequestWithUser) => {
    const language = getLanguageHeader(req);
    const municipalityId = req.params.municipalityId;
    const event = await this.translationService.translate(req.body, EventTranslationKeys, language);
    await this.eventService.createEvent({ ...event, municipalityId }, req.user);
  };

  public updateEvent = async (req: Request) => {
    const language = getLanguageHeader(req);
    const updateAll = isUpdateAll(req);
    const id = Number(req.params.eventId);
    let eventUpdate = req.body;
    if (updateAll) {
      eventUpdate = await this.translationService.translate(req.body, EventTranslationKeys, language);
    } else {
      eventUpdate = getUpdateWithoutTranslation(req, EventTranslationKeys);
    }
    await this.eventService.updateEvent(eventUpdate, id);
  };

  public deleteEvent = async (req: Request) => {
    const id = Number(req.params.eventId);
    await this.eventService.deleteEvent(id);
  };
}
