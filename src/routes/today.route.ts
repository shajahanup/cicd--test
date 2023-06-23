import TodayController from '@/controllers/today.controller';
import { TodayMobileParamDto } from '@/dtos/today/today.dto';
import { ValidationItems } from '@/enums/validationItems.enum';
import { Routes } from '@/interfaces/routes.interface';
import todayMessages from '@/messages/today.messages';
import { requestJson } from '@/middlewares/request';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class TodayRoute implements Routes {
  public path = '/municipality/:municipalityId/mobile/today';
  public router = Router();
  public todayController = new TodayController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      this.path,
      validationMiddleware(TodayMobileParamDto, ValidationItems.Params),
      requestJson(this.todayController.getTodayDataMobile, todayMessages.TODAY_GET_SUCCESS),
    );
  }
}
