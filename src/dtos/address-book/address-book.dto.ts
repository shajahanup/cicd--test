import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  IsNumber,
  IsArray,
  IsOptional,
  Matches,
  IsBoolean,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';
import { LocationDto } from '@dtos/location.dto';
import { IsLocation } from '@utils/isLocation.util';
import { WorkTime } from '@/interfaces/work-time.interface';
import { ValidateNote } from '@/utils/validators/address-book/validate-note.util';
import { ValidateMultiDates } from '@/utils/validators/address-book/validate-multi-dates';

export class AddressBookGetQueryDto {
  @IsNumberString()
  @IsNotEmpty()
  public numResults: number;

  @IsNumberString()
  @IsNotEmpty()
  public offset: number;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  public categoryId: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public search: string;
}

export class AddressBookGetParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class AddressBookCreateBodyDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @Matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, {
    message: 'Invalid name format',
  })
  name: string;

  @IsNotEmpty()
  @IsArray()
  workTime: WorkTime[];

  @IsLocation('location')
  @IsNotEmpty()
  location: LocationDto;

  @IsString()
  @MaxLength(512)
  address: string;

  @IsNotEmpty()
  @IsString()
  public phone: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public tags: string[];

  @IsNotEmpty()
  @IsBoolean()
  public isEmergency: boolean;

  @ValidateNote('isEmergency')
  public notes: string;

  @ValidateMultiDates('isEmergency')
  public multiDates: string[];
}

export class AddressBookCreateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class AddressBookGetOneParamDto {
  @IsNotEmpty()
  @IsNumberString()
  public addressId: number;

  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class AddressBookMobileParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class AddressBookMobileGetQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public search: string;
}

export class AddressBookDeleteParamDto {
  @IsNotEmpty()
  @IsNumberString()
  public addressId: number;

  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class AddressBookUpddateBodyDto extends AddressBookCreateBodyDto {
  @IsString()
  @IsIn(['en', 'de'])
  @IsNotEmpty()
  public lang: string;
}

export class AddressBookUpdateParamDto {
  @IsNotEmpty()
  @IsNumberString()
  public addressId: number;

  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}
