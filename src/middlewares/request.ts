import { success, failure } from './response-builder';
import { RequestHandler } from 'express';
import { logger } from '../utils/logger';

/**
 * Middleware that handles all the incoming requests
 * @param {*} controllerMethod
 * @param {*} successMessage
 */
export const requestJson = (controller, successMessage = ''): RequestHandler => {
  return async (req, res, next) => {
    try {
      const data = await controller(req, res, next);
      const { statusCode, response } = success(req.method.toUpperCase(), successMessage, data);
      applyMultiLanguage(req, response);
      return res.status(statusCode).json(response);
      // Do the audit log
    } catch (e) {
      console.error(e);
      const { statusCode, response } = failure(e);
      applyMultiLanguage(req, response);
      return res.status(statusCode).json(response);
    }
  };
};

/**
 * Middleware that handles all the incoming file requests
 * @param {*} controllerMethod
 * @param {*} successMessage
 */
export const requestFile = (controller, successMessage = ''): RequestHandler => {
  return async (req, res, next) => {
    try {
      const data = await controller(req, res, next);
      const { statusCode, response } = success(req.method.toUpperCase(), successMessage, data);
      applyMultiLanguage(req, response);
      return res.status(statusCode).sendFile(data.path);
      // Do the audit log
    } catch (e) {
      logger.error(e);
      const { statusCode, response } = failure(e);
      applyMultiLanguage(req, response);
      return res.status(statusCode).json(response);
    }
  };
};

const applyMultiLanguage = (req, jsonResponse) => {
  jsonResponse.message = req.t(jsonResponse.message);
};
