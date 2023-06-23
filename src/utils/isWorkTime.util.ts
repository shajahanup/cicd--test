import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isString,
  isLatitude,
  isLongitude,
  isArray,
  IsDate,
  IsArray,
} from 'class-validator';
import { checkArrayOfString } from '@/utils/isArrayOfString.utl';
import { checkArrayOfDate } from '@/utils/isArrayOfDate.util';

export function IsWorkTime(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsWorkTime',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log('value : ' + value.weeks);
          value.forEach(item => {
            validateWorkTimeArray(item);
          });
          return false;
        },
        defaultMessage(validationArguments?: ValidationArguments): string {
          return 'Invalid Work Time format';
        },
      },
    });
  };
}

function isTypeOfWorkTime(object: any): boolean {
  const keys = Object.keys(object);
  if (keys.length !== 3) return false;
  return true;
}

function validateWorkTimeArray(value: any): boolean {
  if (isTypeOfWorkTime(value)) {
    if (value.weeks !== undefined && value.startTime !== undefined && value.endTime !== undefined) {
      if (isArray(value.weeks) && IsArray(value.startTime) && IsArray(value.endTime)) {
        if (checkArrayOfString(value.weeks) && checkArrayOfDate(value.startTime) && checkArrayOfDate(value.endTime)) {
          return true;
        }
      }
    }
  }
  return false;
}
