export default interface Offers {
  id: number;
  municipalityId: number;
  establishment: string;
  descriptionEn: string;
  descriptionDe: string;
  phone: number;
  website: string;
  imgName: string;
  address: string;
  location: string;
  beginsOn: string;
  expiryOn: string;
  createdBy: number;
  isDeleted: boolean;
}
