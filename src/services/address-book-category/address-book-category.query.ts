import { Languages } from '@/enums/languages.enum';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import { getWhereClause } from '../address-book-category/address-book-category.util';

export const addressBookCategorySearchQuery = (params: QueryOptionsInterface, language: string): string => {
  const whereClause = getWhereClause(params);
  const query = `
      SELECT
      AC.id,
      AC.municipality_id AS "municipalityId",
      ${language == Languages.EN ? 'AC.name_en' : 'AC.name_de'} as "name"
      FROM
      address_book_category AS AC
      ${whereClause}
      LIMIT ${params.numResults} offset ${params.offset}`;
  return query;
};

export const addressBookCategoryCountQuery = (params: QueryOptionsInterface): string => {
  const whereClause = getWhereClause(params);
  const countQuery = `
    SELECT  count(AC.*) AS "count"
    FROM    address_book_category AS AC
    ${whereClause}`;
  return countQuery;
};
