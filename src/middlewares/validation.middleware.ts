import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { ValidationErrorInterface } from '@/interfaces/validationError.interface';
import { ValidationException } from '@exceptions/ValidationException';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const errorMessages: ValidationErrorInterface[] = [];
        for (let i = 0; i < errors.length; i++) {
          const error = errors[i];
          const errorConstraints = Object.values(errors[i].constraints);
          errorMessages.push({
            location: value,
            param: error.property,
            message: errorConstraints[0],
          });

          for (let j = 0; j < errorConstraints.length; j++) {
            if (j == 0) continue;
            errorMessages.push({
              location: value,
              param: error.property,
              message: errorConstraints[j],
            });
          }
        }
        // validation error
        next(new ValidationException('Validierungsfehler', errorMessages));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
