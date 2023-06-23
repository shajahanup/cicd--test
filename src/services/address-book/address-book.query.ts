import { Languages } from '@/enums/languages.enum';
import QueryOptionsInterface from '@interfaces/queryOptions.interface';
import { getAddressSearchWhereClause, getWhereClause } from '@services/address-book/address-book.util';

export const searchQuery = (params: QueryOptionsInterface, language: string): string => {
  const whereClause = getWhereClause(params);
  const query = `
    SELECT
    ab.id,
    ab.municipality_id AS "municipalityId",
    ab.category_id AS "categoryId",
    ab."name",
    ab.work_time AS "workTime",
    jsonb_build_object('latitude', CAST(ab.location[0] as varchar), 'longitude', CAST(ab.location[1] as varchar)) as "location",
    ab.phone,
    ab.address,
    ab.is_emergency as "isEmergency",
    ab.multi_dates as "multiDates",
    ab.tags,
    ${language == Languages.EN ? 'ab.notes_en' : 'ab.notes_de'} as "notes",
    ${language == Languages.EN ? 'abc.name_en' : 'abc.name_de'} as "category"
    FROM
    address_book AS ab
    JOIN address_book_category abc on abc.id = ab.category_id
    ${whereClause}
    ORDER BY ab.updated_at DESC
    LIMIT ${params.numResults} offset ${params.offset}
    
    `;
  return query;
};

export const countQuery = (params: QueryOptionsInterface): string => {
  const whereClause = getWhereClause(params);
  const countQuery = `
  SELECT  count(ab.*) AS "count"
  FROM    address_book ab
  JOIN    address_book_category abc on abc.id = ab.category_id
  ${whereClause}`;
  return countQuery;
};

export const getOneQuery = (language: string): string => {
  const whereClause = `WHERE ab.id = :id AND ab.is_deleted = false`;
  const query = `
    SELECT
      ab.id,
      ab.municipality_id AS "municipalityId",
      ab.category_id AS "categoryId",
      ab."name",
      ab.work_time AS "workTime",
      jsonb_build_object('latitude', CAST(ab.location[0] as varchar), 'longitude', CAST(ab.location[1] as varchar)) as "location",
      ab.phone,
      ab.address,
      ab.is_emergency as "isEmergency",
      ab.multi_dates as "multiDates",
      ab.tags,
      ${language == Languages.EN ? 'ab.notes_en' : 'ab.notes_de'} as "notes"
    FROM
      address_book AS ab
    JOIN address_book_category abc on abc.id = ab.category_id
    ${whereClause}
    ORDER BY ab.id`;
  return query;
};

export const searchWithTagsQuery = (search: string, language: string): string => {
  const whereClause = getAddressSearchWhereClause(search);
  const query = `select
    ${language == Languages.EN ? 'abc.name_en' : 'abc.name_de'} as key,
    jsonb_agg(
      jsonb_build_object(
        'location', jsonb_build_object('latitude', CAST(ab.location[0] as varchar), 'longitude', CAST(ab.location[1] as varchar)),
          'municipalityId', ab.municipality_id,
          'categoryId', ab.category_id,
          'id', ab.id,
          'name', ab.name, 
          'phone', ab.phone,
          'workTime', ab.work_time,
          'address', ab.address
      ) 
    ) 
    as value
    from
    (
      select
        id,
        location,
        municipality_id,
        category_id,
        name,
        phone,
        address,
        work_time,
        tags,
        is_deleted
      from address_book
      ${whereClause}
    ) as ab
    left join address_book_category abc on ab.category_id = abc.id
    where ab.is_deleted = false
    group by key 
    ;`;

  return query;
};
