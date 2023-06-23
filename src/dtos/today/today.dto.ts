import { IsNotEmpty, IsNumberString } from 'class-validator';

export class TodayMobileParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}
