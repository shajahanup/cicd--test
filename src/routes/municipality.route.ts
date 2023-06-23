import MunicipalityController from '@/controllers/municipality.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import { requestJson } from '@middlewares/request';
import municipalityMessages from '@/messages/municipality.messages';
import validationMiddleware from '@/middlewares/validation.middleware';
import { MunicipalityParamDto } from '@/dtos/municipality/municipality.dto';
import { ValidationItems } from '@/enums/validationItems.enum';

class MunicipalityRoute implements Routes {
  public path = '/municipality';
  public router = Router();
  public municipalityController = new MunicipalityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:municipalityId`,
      validationMiddleware(MunicipalityParamDto, ValidationItems.Params),
      requestJson(this.municipalityController.getArea, municipalityMessages.MUNICIPALITY_GET_SUCCESS),
    );
  }
}

export default MunicipalityRoute;
