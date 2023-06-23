import { WorkTime } from './work-time.interface';

export default interface Mayor {
  id: number;
  municipalityId: number;
  introductionEn: string;
  introductionDe: string;
  designationEn: string;
  designationDe: string;
  phone: string;
  fax: string;
  email: string;
  timing: [WorkTime];
  imgName: string;
  name: string;
  address: string;
}
