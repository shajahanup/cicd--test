export default interface AddressBookCategory {
  id: number;
  municipalityId: number;
  nameEn: string;
  nameDe: string;
  createdBy: number;
  isDeleted: boolean;
}

export interface AddressBookCategoryResult {
  categoryId: number;
  municipalityId: number;
  name: string;
}
