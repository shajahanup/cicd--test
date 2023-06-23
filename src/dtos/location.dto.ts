import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsLatitude()
  latitude: string;

  @IsNotEmpty()
  @IsLongitude()
  longitude: string;
}
