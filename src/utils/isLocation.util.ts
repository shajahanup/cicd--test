import { registerDecorator, ValidationOptions, ValidationArguments, isString, isLatitude, isLongitude, isNumberString } from 'class-validator';

export function IsLocation(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsLocation',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (isTypeOfLocation(value)) {
            if (value.latitude !== undefined && value.longitude !== undefined) {
              if (isNumberString(value.latitude) && isNumberString(value.longitude)) {
                if (isLatitude(value.latitude) && isLongitude(value.longitude)) {
                  return true;
                }
              }
            }
          }
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return 'Invalid location format';
        },
      },
    });
  };
}

function isTypeOfLocation(object: any): boolean {
  const keys = Object.keys(object);
  if (keys.length !== 2) {
    return false;
  }
  return true;
}
