import UploadController from '@/controllers/upload.controller';
import { Routes } from '@/interfaces/routes.interface';
import uploadMessages from '@/messages/upload.messages';
import { requestJson, requestFile } from '@/middlewares/request';
import { Router } from 'express';
import multerUpload from '../middlewares/upload.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { GetImageParamDto, GetImageQueryDto, UploadDto } from '@dtos/upload/upload.dto';
import { ValidationItems } from '@/enums/validationItems.enum';

export default class UploadRoute implements Routes {
  public path = '/municipality/:municipalityId';
  public securePath = `/secure${this.path}`;
  public imagePath = '/image';
  public uploadPath = '/upload';
  public router = Router();
  public uploadController = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `${this.securePath}${this.imagePath}${this.uploadPath}`,
      validationMiddleware(UploadDto, ValidationItems.Query),
      multerUpload.single('file'),
      requestJson(this.uploadController.upload, uploadMessages.IMAGE_UPLOAD_SUCCESS),
    );
    this.router.get(
      `${this.path}${this.imagePath}/:fileName`,
      validationMiddleware(GetImageParamDto, 'params'),
      validationMiddleware(GetImageQueryDto, 'query'),
      requestFile(this.uploadController.get, uploadMessages.IMAGE_GET_SUCCESS),
    );
  }
}
