import { ValidationErrorInterface } from '@/interfaces/validationError.interface';
import { Exception } from '@/enums/exception.enum';
import { HttpException } from '@exceptions/HttpException';

export class ValidationException extends HttpException {
  public data: ValidationErrorInterface[];

  constructor(message: string, data: ValidationErrorInterface[], status = 400) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = Exception.Validation;
  }
}
