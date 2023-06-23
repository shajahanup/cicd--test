import Location from './location.interface';
import { WorkTime } from '@interfaces/work-time.interface';

export default interface AddressBook {
  id: number;
  createdBy: number;
  isDeleted: boolean;
  municipalityId: number;
  categoryId: number;
  name: string;
  workTime: [WorkTime];
  location: Location;
  phone: number;
  address: string;
  isEmergency: boolean;
  multiDates: string[];
  notesEn: string;
  notesDe: string;
  tags: string[];
}

export interface AddressBookResponse {
  id: number;
  municipalityId: number;
  categoryId: number;
  name: string;
  workTime: [WorkTime];
  location: Location;
  phone: number;
  address: string;
}
