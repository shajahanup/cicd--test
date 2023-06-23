import { Languages } from '@/enums/languages.enum';
import * as dateFns from 'date-fns';

export const todayEmergencyServiceQuery = (language: string): string => {
  const today = dateFns.format(new Date(), 'yyyy-MM-dd');
  const query = `
    select
		ab.id,
		ab."name",
    jsonb_build_object(
      'latitude',
      cast(ab.location [0] as varchar),
      'longitude',
      cast(ab.location [1] as varchar)
    ) as "location",
    ab.address,
		ab.phone,
    ${language == Languages.EN ? 'ab.notes_en' : 'ab.notes_de'} as "notes"
    from
		address_book ab
    where 
		'${today}'::date = any(ab.multi_dates::date[])
    AND 
		ab."municipality_id" = :municipalityId 
    AND
    ab.is_emergency = true 
    AND
    ab.is_deleted = false
    `;
  return query;
};

export const todayEventsQuery = (language: string): string => {
  const today = dateFns.format(new Date(), 'yyyy-MM-dd');
  const query = `
    select
      e.id,
      e.municipality_id as "municipalityId",
      e.start_date as "startDate",
      e.end_date as "endDate",
      ${language == Languages.EN ? 'e.title_en' : 'e.title_de'} as "title",
      ${language == Languages.EN ? 'e.note_en' : 'e.note_de'} as "note",
	    e.address,
      jsonb_build_object(
        'latitude',
        cast(e.location [0] as varchar),
        'longitude',
        cast(e.location [1] as varchar)
      ) as "location"
    from
	    events e
    where
	    '${today}'::date = e.start_date::date
    AND 
        e."municipality_id" = :municipalityId AND e.is_deleted = false
    `;
  return query;
};
