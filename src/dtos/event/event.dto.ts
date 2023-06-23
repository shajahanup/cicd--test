import { IsLocation } from '@/utils/isLocation.util';
import { IsDate, IsDateString, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { LocationDto } from '../location.dto';

export class EventGetQueryDto {
  @IsNumberString()
  @IsNotEmpty()
  public numResults: number;

  @IsNumberString()
  @IsNotEmpty()
  public offset: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public search: string;
}

export class EventGetParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class EventGetMobileParamDto extends EventGetParamDto {}

export class EventGetOneParamDto {
  @IsNotEmpty()
  @IsNumberString()
  public eventId: number;

  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class EventCreateBodyDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  note: string;

  @IsLocation('location')
  @IsNotEmpty()
  location: LocationDto;

  @IsString()
  @MaxLength(512)
  address: string;
}

export class EventCreateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class EventUpdateBodyDto extends EventCreateBodyDto {
  @IsString()
  @IsIn(['en', 'de'])
  @IsNotEmpty()
  public lang: string;
}

export class EventUpdateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public eventId: number;
}

export class EventDeleteParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public eventId: number;
}
