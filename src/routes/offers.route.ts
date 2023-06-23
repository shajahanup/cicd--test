import OfferController from '@/controllers/offer.controller';
import {
  OfferCreateBodyDto,
  OfferCreateParamDto,
  OfferDeleteParamDto,
  OfferGetOneParamDto,
  OfferGetParamDto,
  OfferGetQueryDto,
  OfferMobileParamDto,
  OfferUpdateBodyDto,
  OfferUpdateParamDto,
} from '@/dtos/offers/offers.dto';
import { ValidationItems } from '@/enums/validationItems.enum';
import { Routes } from '@/interfaces/routes.interface';
import offerMessages from '@/messages/offer.messages';
import { requestJson } from '@/middlewares/request';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class OfferRoute implements Routes {
  public path = '/municipality/:municipalityId/offer';
  public securePath = `/secure${this.path}`;
  public mobilePath = '/municipality/:municipalityId/mobile/offer';
  public router = Router();
  public offerController = new OfferController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      this.path,
      validationMiddleware(OfferGetParamDto, ValidationItems.Params),
      validationMiddleware(OfferGetQueryDto, ValidationItems.Query),
      requestJson(this.offerController.getOffers, offerMessages.OFFERS_GET_SUCCESS),
    );
    this.router.get(
      this.mobilePath,
      validationMiddleware(OfferMobileParamDto, ValidationItems.Params),
      requestJson(this.offerController.getOffersMobile, offerMessages.OFFERS_GET_SUCCESS),
    );
    this.router.get(
      `${this.path}/:offerId`,
      validationMiddleware(OfferGetOneParamDto, ValidationItems.Params),
      requestJson(this.offerController.getOneOffer, offerMessages.OFFERS_GET_ONE_SUCCESS),
    );
    this.router.post(
      this.securePath,
      validationMiddleware(OfferCreateParamDto, ValidationItems.Params),
      validationMiddleware(OfferCreateBodyDto, ValidationItems.Body),
      requestJson(this.offerController.createOffer, offerMessages.OFFERS_POST_SUCCESS),
    );
    this.router.put(
      `${this.securePath}/:offerId`,
      validationMiddleware(OfferUpdateParamDto, ValidationItems.Params),
      validationMiddleware(OfferUpdateBodyDto, ValidationItems.Body),
      requestJson(this.offerController.updateOffer, offerMessages.OFFERS_PUT_SUCCESS),
    );
    this.router.delete(
      `${this.securePath}/:offerId`,
      validationMiddleware(OfferDeleteParamDto, ValidationItems.Params),
      requestJson(this.offerController.deleteOffer, offerMessages.OFFER_DELETE_SUCCESS),
    );
  }
}
