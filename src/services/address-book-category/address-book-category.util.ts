import { Identifier } from 'sequelize';
import DB from '@databases';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';

export const checkIfAddressCategoryExist = async (id: Identifier): Promise<boolean> => {
  const addressCategory = DB.AddressBookCategory;
  const category = await addressCategory.findOne({ where: { id, isDeleted: false } });
  return !!category;
};

export const getWhereClause = (params: QueryOptionsInterface): string => {
  let whereClause = `WHERE AC."municipality_id" = :municipalityId AND AC.is_deleted = false`;
  if (params?.search) {
    const search = params.search.toString().toLowerCase();
    whereClause += search ? ` AND(lower(AC.name_en) LIKE '%${search}%' OR lower(AC.name_de) LIKE '%${search}%')` : '';
  }
  return whereClause;
};
