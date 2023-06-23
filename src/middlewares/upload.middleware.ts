import { Request } from 'express';
import multer from 'multer';
import fs from 'fs';
import path, { resolve } from 'path';
import uploadTypes from '../utils/constants/uploadTypes';
import config from 'config';
import { logger } from '@/utils/logger';
import { IUploadConfig } from '@interfaces/config/upload.interface';

const uploadConfig: IUploadConfig = config.get('uploadConfig');

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    const path = getPath(req.query.type as string);
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const fileName = getFileName(req, file, path);
    cb(null, fileName);
  },
});

const upload = multer({ storage, limits: { fileSize: 600000 } });

const getPath = (imageOf: string): string => {
  const folderName = getFolderName(imageOf.toUpperCase());
  const uploadPath = `${uploadConfig.path}/${folderName}`;
  return uploadPath;
};

const getFolderName = (imageOf: string): string => {
  let folderName = '';

  switch (imageOf) {
    case uploadTypes.MAYOR:
      folderName = uploadTypes.MAYOR;
      break;
    case uploadTypes.NEWS:
      folderName = uploadTypes.NEWS;
      break;
    case uploadTypes.OFFER:
      folderName = uploadTypes.OFFER;
      break;
    default:
      folderName = '';
      break;
  }

  return folderName;
};

const getFileName = (req, file, path): string => {
  if (req.query.type.toUpperCase() === uploadTypes.MAYOR) {
    const extension = path.extname(file.originalname);
    const fileName = `${uploadTypes.MAYOR}${extension}`;
    return fileName;
  }

  const prefix = getFolderName((req.query.type as string).toUpperCase());
  const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
  const extension = path.extname(file.originalname);
  const fileName = `${prefix}_${uniqueSuffix}${extension}`;
  logger.info('Stored ' + file.fieldname + '_' + uniqueSuffix + extension);

  return fileName;
};

export default upload;
