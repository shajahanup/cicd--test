import DB from '@/databases';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import { Identifier } from 'sequelize';

export const checkIfOfferExists = async (id: Identifier) => {
  const offer = DB.Offers;
  const offerFound = await offer.findOne({ where: { id, isDeleted: false } });
  return !!offerFound;
};

export const getWhereClause = (params: QueryOptionsInterface): string => {
  let whereClause = `WHERE O."municipality_id" = :municipalityId AND O.is_deleted = false`;
  if (params.search) {
    const search = params.search.toString().toLowerCase();
    whereClause += search ? ` AND(lower(O.establishment) LIKE '%${search}%' OR lower(O.description) LIKE '%${search}%')` : '';
  }
  return whereClause;
};
