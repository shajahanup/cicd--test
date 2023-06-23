import { Languages } from '@/enums/languages.enum';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import { getWhereClause } from './offer.util';

export const offerSearchQuery = (params: QueryOptionsInterface, language: string): string => {
  const whereClause = getWhereClause(params);
  const query = `
      SELECT
      O.id,
      O.municipality_id AS "municipalityId",
      O.establishment,
      ${language == Languages.EN ? 'O.description_en' : 'O.description_de'} as "description",
      O.phone,
      O.website,
      O.img_name AS "imgName",
      jsonb_build_object('latitude', CAST(O.location[0] as varchar), 'longitude', CAST(O.location[1] as varchar) ) as "location"
      FROM
      offers AS O
      ${whereClause}
      ORDER BY O.created_at DESC
      LIMIT ${params.numResults} offset ${params.offset}
    `;

  return query;
};

export const offerCountQuery = (params: QueryOptionsInterface): string => {
  const whereClause = getWhereClause(params);
  const countQuery = `
        SELECT count(O.*) AS "count"
        FROM offers O
        ${whereClause}`;
  return countQuery;
};
