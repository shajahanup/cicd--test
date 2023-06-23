import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class NewsGetParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class NewsGetQueryDto {
  // commented until fronted implements pagination
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

  @IsNumberString()
  @IsNotEmpty()
  @IsIn(['0', '1'])
  @IsOptional()
  public type: number;
}

export class NewsMobileParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class NewsGetOneParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public newsId: number;
}

export class NewsCreateBodyDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsDateString()
  @IsNotEmpty()
  public date: string;

  @IsNotEmpty()
  @IsNumber()
  @IsIn([0, 1])
  public type: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @MaxLength(64, { each: true })
  @IsOptional()
  public imgName: string;
}

export class NewsCreateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;
}

export class NewsUpdateBodyDto extends NewsCreateBodyDto {
  @IsString()
  @IsIn(['en', 'de'])
  @IsNotEmpty()
  public lang: string;
}

export class NewsUpdateParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public newsId: number;
}

export class NewsDeleteParamDto {
  @IsNumberString()
  @IsNotEmpty()
  public municipalityId: number;

  @IsNumberString()
  @IsNotEmpty()
  public newsId: number;
}
