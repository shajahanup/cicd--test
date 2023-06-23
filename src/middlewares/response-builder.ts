// import ApplicationException from '../exceptions/HttpException';
import errCodes from '@exceptions/error_codes';
import { Exception } from '@/enums/exception.enum';

export const success = (httpMethod, message, data, status = 1) => {
  let statusCode = 200;
  switch (httpMethod.toUpperCase()) {
    case 'GET':
    case 'PUT':
      break;
    case 'POST':
      statusCode = 201;
      break;
    case 'DELETE':
      statusCode = 204;
      break;
  }
  return {
    statusCode,
    response: {
      status,
      message,
      data,
    },
  };
};

export const failure = e => {
  if (e.name === Exception.Application) {
    return {
      statusCode: e.status,
      response: {
        statusCode: e.status,
        code: e.code,
        status: -1,
        message: e.message,
      },
    };
  }
  if (e.name === Exception.Validation) {
    return {
      statusCode: e.status,
      response: {
        statusCode: e.status,
        message: 'Validation Failure',
        data: e.data,
      },
    };
  }
  return {
    statusCode: 500,
    response: {
      status: -1,
      message: errCodes.ERR_UNKNOWN,
    },
  };
};

export const validation = (data, status = 2) => {
  return {
    status,
    data,
    message: 'Validation Failure',
  };
};
