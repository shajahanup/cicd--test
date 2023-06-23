import { WorkTime } from '@/interfaces/work-time.interface';
import { IsString, MaxLength, MinLength, IsPhoneNumber, IsEmail, IsNumberString, IsNotEmpty, IsArray, Matches, IsIn } from 'class-validator';

export class MayorUpdateBodyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @Matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, {
    message: 'Invalid name',
  })
  public name: string;

  @IsString()
  @MinLength(3)
  public introduction: string;

  @IsString()
  @MinLength(3)
  public designation: string;

  @IsNotEmpty()
  @IsString()
  public phone: string;

  @IsNotEmpty()
  @IsString()
  public fax: string;

  @IsNotEmpty()
  @IsArray()
  timing: WorkTime[];

  @IsEmail()
  public email: string;

  @IsString()
  @MaxLength(512)
  @MinLength(3)
  public address: string;

  @IsString()
  @IsNotEmpty()
  public imgName: string;

  @IsString()
  @IsIn(['en', 'de'])
  @IsNotEmpty()
  public lang: string;
}

export class MayorUpdateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public mayorId: number;
}

export class MayorGetParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class MayorGetMobileParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}
