import { Routes } from '@/interfaces/routes.interface';
import { requestJson } from '@/middlewares/request';
import { Router } from 'express';
import MayorController from '@controllers/mayor.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { MayorGetMobileParamDto, MayorGetParamDto, MayorUpdateBodyDto, MayorUpdateParamDto } from '@/dtos/mayor/mayor.dto';
import { ValidationItems } from '@/enums/validationItems.enum';
import MayorMessages from '@/messages/mayor.messages';
import mayorMessages from '@/messages/mayor.messages';

export default class MayorRoute implements Routes {
  public path = '/municipality/:municipalityId/mayor';
  public securePath = `/secure${this.path}`;
  public mobilePath = '/municipality/:municipalityId/mobile/mayor';
  public router = Router();
  public mayorController = new MayorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      validationMiddleware(MayorGetParamDto, ValidationItems.Params),
      requestJson(this.mayorController.getMayorDetails, MayorMessages.MAYOR_GET_SUCCESS),
    );
    this.router.get(
      this.mobilePath,
      validationMiddleware(MayorGetMobileParamDto, ValidationItems.Params),
      requestJson(this.mayorController.getMayorDetailsMobile, mayorMessages.MAYOR_GET_SUCCESS),
    );
    this.router.put(
      `${this.securePath}/:mayorId`,
      validationMiddleware(MayorUpdateParamDto, ValidationItems.Params),
      validationMiddleware(MayorUpdateBodyDto, ValidationItems.Body),
      requestJson(this.mayorController.updateMayor),
    );
  }
}
