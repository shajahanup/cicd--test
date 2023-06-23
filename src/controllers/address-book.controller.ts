import { Request } from 'express';
import AddressBookService from '@/services/address-book/address-book.service';
import { RequestWithUser } from '@interfaces/auth.interface';
import QueryOptionsInterface from '@interfaces/queryOptions.interface';
import SearchResponseInterface from '@/interfaces/searchResponse.interface';
import { getLanguageHeader } from '@/utils/get-lang-header';
import TranslationService from '@/services/translation/translation.service';
import { AddressBookTranslationKeys } from '@/utils/constants/translation-keys';
import { isUpdateAll } from '@/utils/is-update-all';
import { getUpdateWithoutTranslation } from '@/utils/get-update-without-translation';
import { checkIfAddressCategoryExist } from '@/services/address-book-category/address-book-category.util';
import { HttpException } from '@/exceptions/HttpException';
import addressCategoryMessages from '@/messages/address-category.messages';

class AddressBookController {
  private addressBookService = new AddressBookService();
  private translationService = new TranslationService();

  public getAddressList = async (req: Request): Promise<SearchResponseInterface> => {
    const params: QueryOptionsInterface = {
      offset: Number(req.query.offset),
      numResults: Number(req.query.numResults),
      search: req.query.search ? String(req.query.search) : null,
      categoryId: req.query.categoryId ? Number(req.query.categoryId) : null,
    };
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const addressBookPrmoise = this.addressBookService.getAddressList(params, municipalityId, language);
    const addressBookCountPrmoise = this.addressBookService.getAddressBookCount(params, municipalityId);
    const result = await Promise.all([addressBookPrmoise, addressBookCountPrmoise]);
    const response: SearchResponseInterface = {
      data: result[0],
      count: result[1],
    };
    return response;
  };

  public getOneAddess = async (req: Request): Promise<Object> => {
    const language = getLanguageHeader(req);
    const addressId = Number(req.params.addressId);
    const address = await this.addressBookService.getOne(addressId, language);
    return address;
  };

  public createAddress = async (req: RequestWithUser) => {
    const language = getLanguageHeader(req);
    const municipalityId = req.params.municipalityId;
    let address = req.body;
    if (address.isEmergency && address.notes) {
      address = await this.translationService.translate(req.body, AddressBookTranslationKeys, language);
    }
    await this.addressBookService.createAddress({ ...address, municipalityId }, req.user);
  };

  public deleteAddress = async (req: Request) => {
    const id = Number(req.params.addressId);
    const address = await this.addressBookService.deleteAddress(id);
    return address;
  };

  public updateAddress = async (req: Request) => {
    const language = getLanguageHeader(req);
    const category = await checkIfAddressCategoryExist(req.body.categoryId);
    if (!category) {
      throw new HttpException(addressCategoryMessages.ADDRESS_CATEGORY_NOT_FOUND, 404);
    }
    const updateAll = isUpdateAll(req);
    let address = req.body;
    const id = Number(req.params.addressId);
    if (address.isEmergency && address.notes && updateAll) {
      address = await this.translationService.translate(req.body, AddressBookTranslationKeys, language);
    } else {
      if (!address.notes) {
        address.notes = '';
      }
      address = getUpdateWithoutTranslation(req, AddressBookTranslationKeys);
    }
    await this.addressBookService.updateAddress(address, id);
  };

  public getAddressListMobile = async (req: Request) => {
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const search: string = req.query.search ? String(req.query.search).toLowerCase() : null;
    const getAddressListMobile = await this.addressBookService.findAddressBookMobile(municipalityId, language, search);
    return getAddressListMobile;
  };
}

export default AddressBookController;
