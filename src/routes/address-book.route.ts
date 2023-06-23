import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import { requestJson } from '@middlewares/request';
import AddressBookController from '@controllers/address-book.controller';
import addressBookMessages from '@/messages/address-book.messages';
import ValidationMiddleware from '@middlewares/validation.middleware';
import {
  AddressBookCreateBodyDto,
  AddressBookCreateParamDto,
  AddressBookDeleteParamDto,
  AddressBookGetOneParamDto,
  AddressBookGetParamDto,
  AddressBookGetQueryDto,
  AddressBookMobileGetQueryDto,
  AddressBookMobileParamDto,
  AddressBookUpdateParamDto,
  AddressBookUpddateBodyDto,
} from '@/dtos/address-book/address-book.dto';
import { ValidationItems } from '@/enums/validationItems.enum';

class AddressBookRoute implements Routes {
  public path = '/municipality/:municipalityId/address-book';
  public securePath = `/secure${this.path}`;
  public mobilePath = '/municipality/:municipalityId/mobile/address-book';
  public router = Router();
  public addressBookController = new AddressBookController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(
      this.path,
      ValidationMiddleware(AddressBookGetParamDto, ValidationItems.Params),
      ValidationMiddleware(AddressBookGetQueryDto, ValidationItems.Query),
      requestJson(this.addressBookController.getAddressList, addressBookMessages.ADDRESS_BOOK_GET_SUCCESS),
    );
    this.router.get(
      `${this.path}/:addressId`,
      ValidationMiddleware(AddressBookGetOneParamDto, ValidationItems.Params),
      requestJson(this.addressBookController.getOneAddess, addressBookMessages.ADDRESS_BOOK_GET_ONE_SUCCESS),
    );
    this.router.get(
      this.mobilePath,
      ValidationMiddleware(AddressBookMobileParamDto, ValidationItems.Params),
      ValidationMiddleware(AddressBookMobileGetQueryDto, ValidationItems.Query),
      requestJson(this.addressBookController.getAddressListMobile, addressBookMessages.ADDRESS_BOOK_GET_SUCCESS),
    );
    this.router.post(
      this.securePath,
      ValidationMiddleware(AddressBookCreateParamDto, ValidationItems.Params),
      ValidationMiddleware(AddressBookCreateBodyDto, ValidationItems.Body),
      requestJson(this.addressBookController.createAddress, addressBookMessages.ADDRESS_BOOK_POST_SUCCESS),
    );
    this.router.delete(
      `${this.securePath}/:addressId`,
      ValidationMiddleware(AddressBookDeleteParamDto, ValidationItems.Params),
      requestJson(this.addressBookController.deleteAddress, addressBookMessages.ADDRESS_BOOK_DELETE_SUCCESS),
    );
    this.router.put(
      `${this.securePath}/:addressId`,
      ValidationMiddleware(AddressBookUpdateParamDto, ValidationItems.Params),
      ValidationMiddleware(AddressBookUpddateBodyDto, ValidationItems.Body),
      requestJson(this.addressBookController.updateAddress, addressBookMessages.ADDRESS_BOOK_PUT_SUCCESS),
    );
  }
}

export default AddressBookRoute;
