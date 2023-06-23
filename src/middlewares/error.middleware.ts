import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';
import { ValidationException } from '@exceptions/ValidationException';
import { ResponseInterface } from '@interfaces/response.interface';

const errorMiddleware = (error: ValidationException & HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = req.t(error.message) || req.t('something_went_wrong');
    const data: any = error.data || [];
    const response: ResponseInterface = {
      status: 0,
      message,
      data,
    };
    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
