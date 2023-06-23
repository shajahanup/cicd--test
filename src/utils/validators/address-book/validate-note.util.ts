import {
  isString,
  MaxLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function ValidateNote(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchNoteValidator,
    });
  };
}

@ValidatorConstraint({ name: 'ValidateNote' })
export class MatchNoteValidator implements ValidatorConstraintInterface {
  private message = '';

  validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    const [isEmergencyProperty] = validationArguments.constraints;
    const isEmergency = (validationArguments.object as any)[isEmergencyProperty];
    if (isEmergency) {
      console.log('Value: ' + value);
      if (value === '' || value === null) {
        this.message = 'notes should not be empty.';
        return false;
      }
      if (value === undefined) {
        return true;
      }
      if (!isString(value)) {
        this.message = 'notes must be a string';
        return false;
      }
      if (value.length < 3) {
        this.message = 'notes length must be greater than 3';
        return false;
      }
      return true;
    } else if (value) {
      this.message = 'notes should not exist. isEmergency is set to false';
      return false;
    } else {
      return true;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return this.message;
  }
}
