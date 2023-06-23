import DB from '@/databases';
import { HttpException } from '@/exceptions/HttpException';
import CountQueryInterfae from '@/interfaces/countQuery.interface';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import addressCategoryMessages from '@/messages/address-category.messages';
import { AddressBookCategoryTranslationKeys } from '@/utils/constants/translation-keys';
import { getTableExclusion } from '@/utils/get-table-exclusion';
import { getTableInclusion } from '@/utils/get-table-inclusion';
import { Identifier } from 'sequelize';
import { addressBookCategoryCountQuery, addressBookCategorySearchQuery } from './address-book-category.query';
import { checkIfAddressCategoryExist } from './address-book-category.util';

class AddressCategoryService {
  private addressCategory = DB.AddressBookCategory;

  public async findAllAddressBookCategory(params: QueryOptionsInterface, municipalityId: Number, language: string): Promise<Object[]> {
    const replacements = {
      municipalityId,
      search: params.search ?? null,
    };
    const query = addressBookCategorySearchQuery(params, language);
    const addressBookCategory = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
    return addressBookCategory;
  }

  public async findAddressBookCategoryCount(params: QueryOptionsInterface, municipalityId: number): Promise<number> {
    const replacements = {
      municipalityId,
      search: params.search ?? null,
    };
    const query = addressBookCategoryCountQuery(params);
    const count: CountQueryInterfae[] = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
    return count[0].count;
  }

  public async findOneAdressBookCategory(id: Identifier, language: string): Promise<Object> {
    const AddressBookCategoryExist = await checkIfAddressCategoryExist(id);
    if (!AddressBookCategoryExist) {
      throw new HttpException(addressCategoryMessages.ADDRESS_CATEGORY_NOT_FOUND);
    }
    const exclude = getTableExclusion(AddressBookCategoryTranslationKeys);
    const include: any = getTableInclusion(language, AddressBookCategoryTranslationKeys);
    const addressCategory = await this.addressCategory.findOne({
      where: { id },
      attributes: {
        include,
        exclude,
      },
    });
    return addressCategory;
  }

  public async createAddressBookCategory(createBody: any, user) {
    const createdBy = user.id;
    await this.addressCategory.create({ ...createBody, createdBy });
  }

  public async updateAddressBookCategory(updateBody: any, id: number) {
    const AddressBookCategoryExist = await checkIfAddressCategoryExist(id);
    if (!AddressBookCategoryExist) {
      throw new HttpException(addressCategoryMessages.ADDRESS_CATEGORY_NOT_FOUND);
    }
    await this.addressCategory.update(updateBody, { where: { id } });
  }

  public async deleteAddressBookCategory(id: number) {
    const addressBookCategoryExist = await checkIfAddressCategoryExist(id);
    if (!addressBookCategoryExist) {
      throw new HttpException(addressCategoryMessages.ADDRESS_CATEGORY_NOT_FOUND);
    }
    await this.addressCategory.update({ isDeleted: true }, { where: { id } });
  }
}

export default AddressCategoryService;
