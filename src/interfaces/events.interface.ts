import Location from './location.interface';

export default interface Events {
  id: number;
  municipalityId: number;
  startDate: string;
  endDate: string;
  titleEn: string;
  titleDe: string;
  noteEn: String;
  noteDe: String;
  location: Location;
  createdBy: number;
  isDeleted: boolean;
}

export interface EventsResponse {
  id: number;
  municipalityId: number;
  dateTime: string;
  title: string;
  note: String;
  location: Location;
}
