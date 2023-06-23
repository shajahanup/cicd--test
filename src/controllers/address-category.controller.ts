import { RequestWithUser } from '@/interfaces/auth.interface';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import SearchResponseInterface from '@/interfaces/searchResponse.interface';
import AddressCategoryService from '@/services/address-book-category/address-book-category.service';
import TranslationService from '@/services/translation/translation.service';
import { AddressBookCategoryTranslationKeys } from '@/utils/constants/translation-keys';
import { getLanguageHeader } from '@/utils/get-lang-header';
import { getUpdateWithoutTranslation } from '@/utils/get-update-without-translation';
import { isUpdateAll } from '@/utils/is-update-all';
import { Request } from 'express';

class AddressCategoryController {
  private addressCategoryService = new AddressCategoryService();
  private translationService = new TranslationService();

  public getAddressCategory = async (req: Request): Promise<SearchResponseInterface> => {
    const params: QueryOptionsInterface = {
      offset: Number(req.query.offset),
      numResults: Number(req.query.numResults),
      search: req.query.search ? String(req.query.search) : null,
    };
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const addressBookCategoryPromise = await this.addressCategoryService.findAllAddressBookCategory(params, municipalityId, language);
    const addressBookCategoryCountPromise = await this.addressCategoryService.findAddressBookCategoryCount(params, municipalityId);
    const result = await Promise.all([addressBookCategoryPromise, addressBookCategoryCountPromise]);
    const response: SearchResponseInterface = {
      data: result[0],
      count: result[1],
    };
    return response;
  };

  public getOneAddressCategory = async (req: Request) => {
    const language = getLanguageHeader(req);
    const categoryId = Number(req.params.categoryId);
    const addressCategory = await this.addressCategoryService.findOneAdressBookCategory(categoryId, language);
    return addressCategory;
  };

  public createAddressBookCategory = async (req: RequestWithUser) => {
    const language = getLanguageHeader(req);
    const municipalityId = req.params.municipalityId;
    const addressBookCategory = await this.translationService.translate(req.body, AddressBookCategoryTranslationKeys, language);
    await this.addressCategoryService.createAddressBookCategory({ ...addressBookCategory, municipalityId }, req.user);
  };

  public updateAddressBookCategory = async (req: Request) => {
    const language = getLanguageHeader(req);
    const updateAll = isUpdateAll(req);
    const id = Number(req.params.categoryId);
    let updateBody = req.body;
    if (updateAll) {
      updateBody = await this.translationService.translate(req.body, AddressBookCategoryTranslationKeys, language);
    } else {
      updateBody = getUpdateWithoutTranslation(req, AddressBookCategoryTranslationKeys);
    }
    await this.addressCategoryService.updateAddressBookCategory(updateBody, id);
  };

  public deleteAddressBookCategory = async (req: Request) => {
    const id = Number(req.params.categoryId);
    await this.addressCategoryService.deleteAddressBookCategory(id);
  };
}
export default AddressCategoryController;
