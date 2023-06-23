import DB from '@/databases';
import { checkIfOfferExists } from './offer.util';
import { pick } from 'lodash';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import { offerCountQuery, offerSearchQuery } from './offer.query';
import CountQueryInterfae from '@/interfaces/countQuery.interface';
import { HttpException } from '@/exceptions/HttpException';
import offerMessages from '@/messages/offer.messages';
import { getTableExclusion } from '@/utils/get-table-exclusion';
import { getTableInclusion } from '@/utils/get-table-inclusion';
import { OfferTranslationKeys } from '@/utils/constants/translation-keys';

export default class OfferService {
  public offer = DB.Offers;

  public async getOffers(params: QueryOptionsInterface, municipalityId: number, language: string): Promise<Object[]> {
    const replacements = {
      municipalityId,
      search: params.search ?? null,
    };
    const query = offerSearchQuery(params, language);
    const offers = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
    return offers;
  }

  public async getOffersMobile(municipalityId: number, language: string): Promise<Object[]> {
    const exclude = getTableExclusion(OfferTranslationKeys);
    const include: any = getTableInclusion(language, OfferTranslationKeys);
    const offers = await this.offer.findAll({
      where: { municipalityId, isDeleted: false },
      order: [['createdAt', 'DESC']],
      attributes: {
        include,
        exclude,
      },
    });
    return offers;
  }

  public async getOffersCount(params: QueryOptionsInterface, municipalityId: number): Promise<number> {
    const replacements = {
      municipalityId,
      search: params.search ?? null,
    };
    const query = offerCountQuery(params);
    const count: CountQueryInterfae[] = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
    return count?.[0]?.count;
  }

  public async getOffer(offerId: number, language: string): Promise<Object> {
    const offerFound = await checkIfOfferExists(offerId);
    if (!offerFound) {
      throw new HttpException(offerMessages.OFFER_NOT_FOUND);
    }
    const exclude = getTableExclusion(OfferTranslationKeys);
    const include: any = getTableInclusion(language, OfferTranslationKeys);
    const offer = await this.offer.findOne({
      where: { id: offerId },
      attributes: {
        include,
        exclude,
      },
    });
    return offer;
  }

  public async createOffer(body: any, user) {
    const createBody = pick(body, [
      'municipalityId',
      'establishment',
      'descriptionEn',
      'descriptionDe',
      'phone',
      'website',
      'imgName',
      'address',
      'location',
      'beginsOn',
      'expiryOn',
      'createdBy',
    ]);
    createBody.createdBy = user.id;
    createBody.location = `(${body.location.latitude}, ${body.location.longitude})`;
    await this.offer.create(createBody);
  }

  public async updateOffer(updateBody: any, id: number) {
    const offerFound = await checkIfOfferExists(id);
    if (!offerFound) {
      throw new HttpException(offerMessages.OFFER_NOT_FOUND);
    }
    await this.offer.update(
      { ...updateBody, location: `(${updateBody.location.latitude}, ${updateBody.location.longitude})` },
      { where: { id }, returning: true },
    );
  }

  public async deleteOffer(id: number) {
    const offerFound = await checkIfOfferExists(id);
    if (!offerFound) {
      throw new HttpException(offerMessages.OFFER_NOT_FOUND);
    }
    await this.offer.update({ isDeleted: true }, { where: { id }, returning: true });
  }
}
