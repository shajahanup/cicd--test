export interface Municipality {
  id: number;
  name: string;
  totalArea: string;
  zipCode: string;
  district: string;
  addressBookLastUpdated: Date;
  eventsLastUpdated: Date;
  newsLastUpdated: Date;
  offerslastUpdated: Date;
  adminLastUpdated: Date;
  mayorLastUpdated: Date;
  isDeleted: boolean;
  createdBy: number;
}
