import { IsNotEmpty, IsNumberString } from 'class-validator';

export class MunicipalityParamDto {
  @IsNotEmpty()
  @IsNumberString()
  municipalityId: number;
}
