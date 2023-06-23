import OfferService from '@/services/offers/offer.service';
import { Request } from 'express';
import { RequestWithUser } from '@interfaces/auth.interface';
import TranslationService from '@/services/translation/translation.service';
import { getLanguageHeader } from '@/utils/get-lang-header';
import { OfferTranslationKeys } from '@/utils/constants/translation-keys';
import { isUpdateAll } from '@/utils/is-update-all';
import { getUpdateWithoutTranslation } from '@/utils/get-update-without-translation';

export default class OfferController {
  private offerService = new OfferService();
  private translationService = new TranslationService();
  // public getOffers = async (req: Request): Promise<SearchResponseInterface> => {
  //   const params: QueryOptionsInterface = {
  //     offset: Number(req.query.offset),
  //     numResults: Number(req.query.numResults),
  //     search: req.query.search ? String(req.query.search) : null,
  //   };
  //   const municipalityId = Number(req.params.municipalityId);
  //   const offersPromise = await this.offerService.getOffers(params, municipalityId);
  //   const offersCountPromise = await this.offerService.getOffersCount(params, municipalityId);
  //   const result = await Promise.all([offersPromise, offersCountPromise]);
  //   const response: SearchResponseInterface = {
  //     data: result[0],
  //     count: result[1],
  //   };
  //   return response;
  // };

  // using this service method for admin until frontend implements pagination
  public getOffers = async (req: Request): Promise<Object[]> => {
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const offers = await this.offerService.getOffersMobile(municipalityId, language);
    return offers;
  };

  public getOffersMobile = async (req: Request): Promise<Object[]> => {
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const offers = await this.offerService.getOffersMobile(municipalityId, language);
    return offers;
  };

  public getOneOffer = async (req: Request): Promise<Object> => {
    const language = getLanguageHeader(req);
    const offerId = Number(req.params.offerId);
    const offer = await this.offerService.getOffer(offerId, language);
    return offer;
  };

  public createOffer = async (req: RequestWithUser) => {
    const language = getLanguageHeader(req);
    const municipalityId = req.params.municipalityId;
    const offer = await this.translationService.translate(req.body, OfferTranslationKeys, language);
    await this.offerService.createOffer({ ...offer, municipalityId }, req.user);
  };

  public updateOffer = async (req: Request) => {
    const language = getLanguageHeader(req);
    const updateAll = isUpdateAll(req);
    const id = Number(req.params.offerId);
    let updateBody = req.body;
    if (updateAll) {
      updateBody = await this.translationService.translate(req.body, OfferTranslationKeys, language);
    } else {
      updateBody = getUpdateWithoutTranslation(req, OfferTranslationKeys);
    }
    await this.offerService.updateOffer(updateBody, id);
  };

  public deleteOffer = async (req: Request) => {
    const offerId = Number(req.params.offerId);
    await this.offerService.deleteOffer(offerId);
  };
}
