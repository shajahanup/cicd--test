import {
  isArray,
  isDateString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function ValidateMultiDates(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MultiDateValidator,
    });
  };
}

@ValidatorConstraint({ name: 'ValidateMultiDates' })
export class MultiDateValidator implements ValidatorConstraintInterface {
  private message = '';

  validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    const [isEmergencyProperty] = validationArguments.constraints;
    const isEmergency = (validationArguments.object as any)[isEmergencyProperty];
    if (isEmergency) {
      if (!isArray(value)) {
        this.message = 'multiDates must be an array';
        return false;
      }
      if (value.length == 0) {
        this.message = 'multiDates should not be an empty array';
        return false;
      }
      for (let i = 0; i < value.length; i++) {
        if (!isDateString(value[i])) {
          this.message = 'multiDates must be an array of dates';
          return false;
        }
      }
      return true;
    } else if (value) {
      this.message = 'multiDates should not exist. isEmergency is set to false';
      return false;
    } else {
      return true;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return this.message;
  }
}
