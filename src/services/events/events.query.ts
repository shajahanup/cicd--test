import { Languages } from '@/enums/languages.enum';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import { getWhereClause } from './events.util';

export function getEventsByDateQuery(language: string) {
  const whereClause = `WHERE E."municipality_id" = :municipalityId AND E.is_deleted = false`;
  const query = `select
	jsonb_object_agg(EVNT.date_val, EVNT.row_val) as "eventData"
    from
        (
            select
                E.date_time::DATE as date_val,
                jsonb_agg(
                    json_build_object(
                        'id', E.id,
                        'municipalityId', E.municipality_id,
                        'startDate', E.start_date,
                        'endDate', E.end_date,
                        'title', ${language == Languages.EN ? 'E.title_en' : 'E.title_de'},
                        'note', ${language == Languages.EN ? 'E.note_en' : 'E.note_de'},
                        'address', E.address,
                        'location', jsonb_build_object('latitude', CAST( E.location[0] as varchar), 'longitude', CAST( E.location[1] as varchar))
                    )
                ) as row_val
            from
                events E
              ${whereClause}
            group by
                E.date_time::DATE
        ) EVNT`;
  return query;
}

export const eventSearchQuery = (params: QueryOptionsInterface, language: string): string => {
  const whereClause = getWhereClause(params);
  const query = `
    SELECT
    E.id,
    E.municipality_id AS "municipalityId",
    E.start_date AS "startDate",
    E.end_date AS "endDate",
    ${language == Languages.EN ? 'E.title_en' : 'E.title_de'} as "title",
    ${language == Languages.EN ? 'E.note_en' : 'E.note_de'} as "note",
    jsonb_build_object('latitude', CAST( E.location[0] as varchar), 'longitude', CAST( E.location[1] as varchar)) as "location",
    E.address
    FROM
    events AS E
    ${whereClause}
    LIMIT ${params.numResults} offset ${params.offset}`;

  return query;
};

export const eventCountQuery = (params: QueryOptionsInterface): string => {
  const whereClause = getWhereClause(params);
  const countQuery = `
    SELECT  count(E.*) AS "count"
    FROM    events E
    ${whereClause}`;
  return countQuery;
};
