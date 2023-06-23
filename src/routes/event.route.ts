import EventController from '@/controllers/event.controller';
import {
  EventCreateBodyDto,
  EventCreateParamDto,
  EventDeleteParamDto,
  EventGetMobileParamDto,
  EventGetOneParamDto,
  EventGetParamDto,
  EventGetQueryDto,
  EventUpdateBodyDto,
  EventUpdateParamDto,
} from '@/dtos/event/event.dto';
import { ValidationItems } from '@/enums/validationItems.enum';
import { Routes } from '@/interfaces/routes.interface';
import eventMessages from '@/messages/event.messages';
import { requestJson } from '@/middlewares/request';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class EventRoute implements Routes {
  public path = '/municipality/:municipalityId/events';
  public securePath = `/secure${this.path}`;
  public mobilePath = '/municipality/:municipalityId/mobile/events';
  public router = Router();
  public eventController = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      validationMiddleware(EventGetParamDto, ValidationItems.Params),
      validationMiddleware(EventGetQueryDto, ValidationItems.Query),
      requestJson(this.eventController.getEvents, eventMessages.EVENTS_GET_SUCCESS),
    );
    this.router.get(
      `${this.mobilePath}`,
      validationMiddleware(EventGetMobileParamDto, ValidationItems.Params),
      requestJson(this.eventController.getEventsMobile, eventMessages.EVENTS_GET_SUCCESS),
    );
    this.router.get(
      `${this.path}/:eventId`,
      validationMiddleware(EventGetOneParamDto, ValidationItems.Params),
      requestJson(this.eventController.getOneEvent, eventMessages.EVENTS_GET_ONE_SUCCESS),
    );
    this.router.post(
      `${this.securePath}`,
      validationMiddleware(EventCreateParamDto, ValidationItems.Params),
      validationMiddleware(EventCreateBodyDto, ValidationItems.Body),
      requestJson(this.eventController.createEvent, eventMessages.EVENTS_CREATE_SUCCESS),
    );
    this.router.put(
      `${this.securePath}/:eventId`,
      validationMiddleware(EventUpdateParamDto, ValidationItems.Params),
      validationMiddleware(EventUpdateBodyDto, ValidationItems.Body),
      requestJson(this.eventController.updateEvent, eventMessages.EVENTS_PUT_SUCCESS),
    );
    this.router.delete(
      `${this.securePath}/:eventId`,
      validationMiddleware(EventDeleteParamDto, ValidationItems.Params),
      requestJson(this.eventController.deleteEvent, eventMessages.EVENTS_DELETE_SUCCESS),
    );
  }
}
