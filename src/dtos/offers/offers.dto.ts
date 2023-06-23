import { IsLocation } from '@/utils/isLocation.util';
import { IsDateString, IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { LocationDto } from '../location.dto';

export class OfferGetParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class OfferGetQueryDto {
  // commented until frontend implements pagination
  // @IsNumberString()
  // @IsNotEmpty()
  // public numResults: number;

  // @IsNumberString()
  // @IsNotEmpty()
  // public offset: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public search: string;
}

export class OfferMobileParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class OfferGetOneParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public offerId: number;
}

export class OfferCreateBodyDto {
  @IsNotEmpty()
  @IsString()
  public establishment: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  public description: string;

  @IsNotEmpty()
  @IsString()
  public phone: string;

  @IsNotEmpty()
  @IsString()
  public website: string;

  @IsNotEmpty()
  @IsString()
  public imgName: string;

  @IsLocation('location')
  public location: LocationDto;

  @IsString()
  @MaxLength(512)
  address: string;

  @IsNotEmpty()
  @IsDateString()
  public beginsOn: string;

  @IsNotEmpty()
  @IsDateString()
  public expiryOn: string;
}

export class OfferCreateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class OfferUpdateBodyDto extends OfferCreateBodyDto {
  @IsString()
  @IsIn(['en', 'de'])
  @IsNotEmpty()
  public lang: string;
}

export class OfferUpdateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public offerId: number;
}

export class OfferDeleteParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public offerId: number;
}
