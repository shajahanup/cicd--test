export default interface News {
  id: number;
  municipalityId: number;
  titleEn: string;
  titleDe: string;
  contentEn: string;
  contentDe: string;
  date: string;
  imgName: string[];
  type: number;
  createdBy: number;
  isDeleted: boolean;
}
