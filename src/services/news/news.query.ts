import { Languages } from '@/enums/languages.enum';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import { getWhereClause } from './news.util';

export const newsSearchQuery = (params: QueryOptionsInterface, language: string): string => {
  const whereClause = getWhereClause(params);
  const query = `
    SELECT
    N.id,
    N.municipality_id AS "municipalityId",
    ${language == Languages.EN ? 'N.title_en' : 'N.title_de'} as "title",
    ${language == Languages.EN ? 'N.content_en' : 'N.content_de'} as "content",
    N.date,
    N.img_name AS "imgName",
    N.type
    FROM
    news AS N
    ${whereClause}
    ORDER BY N.updated_at DESC
    LIMIT ${params.numResults} offset ${params.offset}
  `;

  return query;
};

export const newsCountQuery = (params: QueryOptionsInterface): string => {
  const whereClause = getWhereClause(params);
  const countQuery = `
    SELECT  count(N.*) AS "count"
    FROM    news N
    ${whereClause}`;
  return countQuery;
};
