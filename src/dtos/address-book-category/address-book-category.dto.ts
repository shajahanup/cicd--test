import { IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class AddressBookCategoryGetQueryDto {
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

export class AddressBookCategoryGetParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class AddressBookCategoryGetOneParamDto {
  @IsNotEmpty()
  @IsNumberString()
  public categoryId: number;

  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class AddressBookCategoryCreateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class AddressBookCategoryCreateBodyDto {
  @IsString()
  @MinLength(3)
  name: string;
}

export class AddressBookCategoryUpdateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public categoryId: number;
}

export class AddressBookCategoryUpdateBodyDto extends AddressBookCategoryCreateBodyDto {
  @IsString()
  @IsIn(['en', 'de'])
  @IsNotEmpty()
  public lang: string;
}

export class AddressBookCategoryDeleteParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public categoryId: number;
}
