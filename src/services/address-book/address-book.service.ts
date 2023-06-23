import DB from '@databases';
import { checkIfAdressExist } from './address-book.util';
import { pick } from 'lodash';
import { countQuery, getOneQuery, searchQuery, searchWithTagsQuery } from '@services/address-book/address-book.query';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import CountQueryInterfae from '@/interfaces/countQuery.interface';
import { checkIfAddressCategoryExist } from '@services/address-book-category/address-book-category.util';
import { HttpException } from '@exceptions/HttpException';
import addressCategoryMessages from '@/messages/address-category.messages';
import { AddressBookResponse } from '@interfaces/address-book.interface';
import addressBookMessages from '@/messages/address-book.messages';
import { workTimeStringArray } from '@/utils/work-time-string-array.util';

class AddressBookService {
  public addressBook = DB.AddressBook;
  public addressBookCategory = DB.AddressBookCategory;

  public async getAddressList(params: QueryOptionsInterface, municipalityId: number, language: string): Promise<Object[]> {
    const replacements = {
      municipalityId,
      categoryId: params.categoryId ?? null,
      search: params.search ?? null,
    };
    const query = searchQuery(params, language);
    const addressBooks = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
    return addressBooks;
  }
  public async findAddressBookMobile(municipalityId: number, language: string, search: string | null): Promise<any> {
    const addressQuery = searchWithTagsQuery(search, language);
    const addressBook: any = await DB.sequelize.query(addressQuery, { replacements: { municipalityId }, type: DB.Sequelize.QueryTypes.SELECT });

    const result = [];

    addressBook.forEach(val => {
      const interm = new Object();
      const value = val.value.map(el => {
        const workTimeStrList = workTimeStringArray(el.workTime, language);
        el['workTimeStrList'] = workTimeStrList;
        return el;
      });
      interm[val.key] = value;
      result.push(interm);
    });
    return result;
  }

  public async getAddressBookCount(params: QueryOptionsInterface, municipalityId: number): Promise<number> {
    const replacements = {
      municipalityId,
      categoryId: params.categoryId ?? null,
      search: params.search ?? null,
    };
    const query = countQuery(params);
    const addressBookCount: CountQueryInterfae[] = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
    return addressBookCount?.[0]?.count;
  }

  public async getOne(id: number, language: string): Promise<Object> {
    const address = await checkIfAdressExist(id);
    if (!address) {
      throw new HttpException(addressBookMessages.ADDRESS_BOOK_NOT_FOUND);
    }
    const replacements = { id };
    const query = getOneQuery(language);
    const addressBook = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
    return addressBook[0];
  }

  public async createAddress(createBody: any, user) {
    const category = await checkIfAddressCategoryExist(createBody.categoryId);
    if (!category) {
      throw new HttpException(addressCategoryMessages.ADDRESS_CATEGORY_NOT_FOUND);
    }
    const createdBy = user.id;
    await this.addressBook.create({
      ...createBody,
      createdBy,
      location: `(${createBody.location.latitude}, ${createBody.location.longitude})`,
    });
  }

  public async deleteAddress(id: number): Promise<AddressBookResponse> {
    const address = await checkIfAdressExist(id);
    if (!address) {
      throw new HttpException(addressBookMessages.ADDRESS_BOOK_NOT_FOUND);
    }
    const deleteAddress = await this.addressBook.update({ isDeleted: true }, { where: { id }, returning: true });
    const deletedAddressResponse = pick(deleteAddress[1][0], [
      'id',
      'municipalityId',
      'categoryId',
      'name',
      'workTime',
      'phone',
      'address',
      'location',
    ]);
    return deletedAddressResponse;
  }

  public async updateAddress(updateBody: any, id: number) {
    const address = await checkIfAdressExist(id);
    if (!address) {
      throw new HttpException(addressBookMessages.ADDRESS_BOOK_NOT_FOUND);
    }
    await this.addressBook.update(
      {
        ...updateBody,
        location: `(${updateBody.location.latitude.toString()}, ${updateBody.location.longitude.toString()})`,
      },
      { where: { id } },
    );
  }
}

export default AddressBookService;
