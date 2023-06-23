import { IsString, ValidateIf, IsNotEmptyObject, IsNotEmpty } from 'class-validator';
import uploadTypes from '@utils/constants/uploadTypes';
import { IsFile } from '@/utils/is-image-file.util';

export class UploadDto {
  @ValidateIf(value => !uploadTypes.VALUES.includes(value.type))
  @IsNotEmptyObject()
  public type: string;
}

export class UploadBodyDto {
  @IsNotEmpty()
  @IsFile({ mime: ['image/jpg', 'image/png'] })
  file: any;
}

export class GetImageParamDto {
  @IsString()
  municipalityId: string;
  @IsString()
  public fileName: string;
}

export class GetImageQueryDto {
  @ValidateIf(value => !uploadTypes.VALUES.includes(value.type))
  @IsNotEmptyObject()
  public type: string;
}
