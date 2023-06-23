import DB from '@/databases';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import { Identifier } from 'sequelize';

export const checkIfNewsExists = async (id: Identifier): Promise<boolean> => {
  const news = DB.News;
  const newsFound = await news.findOne({ where: { id, isDeleted: false } });
  return !!newsFound;
};

export const getWhereClause = (params: QueryOptionsInterface): string => {
  let whereClause = `WHERE N."municipality_id" = :municipalityId AND N.is_deleted = false`;
  if (params.type == 0 || params.type == 1) {
    whereClause += ` AND N.type = :type`;
  }
  if (params.search) {
    const search = params.search.toString().toLowerCase();
    whereClause += search ? ` AND(lower(N.title) LIKE '%${search}%' OR lower(N.content) LIKE '%${search}%')` : '';
  }
  return whereClause;
};
