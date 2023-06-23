import AddressCategoryController from '@/controllers/address-category.controller';
import {
  AddressBookCategoryCreateBodyDto,
  AddressBookCategoryCreateParamDto,
  AddressBookCategoryDeleteParamDto,
  AddressBookCategoryGetOneParamDto,
  AddressBookCategoryGetParamDto,
  AddressBookCategoryGetQueryDto,
  AddressBookCategoryUpdateBodyDto,
  AddressBookCategoryUpdateParamDto,
} from '@/dtos/address-book-category/address-book-category.dto';
import { ValidationItems } from '@/enums/validationItems.enum';
import { Routes } from '@/interfaces/routes.interface';
import addressCategoryMessages from '@/messages/address-category.messages';
import { requestJson } from '@/middlewares/request';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

class AddressCategoryRoute implements Routes {
  public path = '/municipality/:municipalityId/address-book-category';
  public securePath = `/secure${this.path}`;
  public router = Router();
  public addressCategoryController = new AddressCategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      validationMiddleware(AddressBookCategoryGetParamDto, ValidationItems.Params),
      validationMiddleware(AddressBookCategoryGetQueryDto, ValidationItems.Query),
      requestJson(this.addressCategoryController.getAddressCategory, addressCategoryMessages.ADDRESS_CATEGORY_GET_SUCCESS),
    );
    this.router.get(
      `${this.path}/:categoryId`,
      validationMiddleware(AddressBookCategoryGetOneParamDto, ValidationItems.Params),
      requestJson(this.addressCategoryController.getOneAddressCategory, addressCategoryMessages.ADDRESS_CATEGORY_GET_SUCCESS),
    );
    this.router.post(
      `${this.securePath}`,
      validationMiddleware(AddressBookCategoryCreateParamDto, ValidationItems.Params),
      validationMiddleware(AddressBookCategoryCreateBodyDto, ValidationItems.Body),
      requestJson(this.addressCategoryController.createAddressBookCategory, addressCategoryMessages.ADDRESS_CATEGORY_CREATE_SUCCESS),
    );
    this.router.put(
      `${this.securePath}/:categoryId`,
      validationMiddleware(AddressBookCategoryUpdateParamDto, ValidationItems.Params),
      validationMiddleware(AddressBookCategoryUpdateBodyDto, ValidationItems.Body),
      requestJson(this.addressCategoryController.updateAddressBookCategory, addressCategoryMessages.ADDRESS_CATEGORY_PUT_SUCCESS),
    );
    this.router.delete(
      `${this.securePath}/:categoryId`,
      validationMiddleware(AddressBookCategoryDeleteParamDto, ValidationItems.Params),
      requestJson(this.addressCategoryController.deleteAddressBookCategory, addressCategoryMessages.ADDRESS_CATEGORY_DELETE_SUCCESS),
    );
  }
}
export default AddressCategoryRoute;
