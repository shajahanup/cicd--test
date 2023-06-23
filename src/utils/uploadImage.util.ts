process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import { staticServe } from '@/interfaces/config/staticServe.interface';
import config from 'config';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs';
import path from 'path';
import { Response } from 'express-serve-static-core';
import { failure } from '@/middlewares/response-builder';
import uploadMessages from '@/messages/upload.messages';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const uploadImage = async (req: Request, res: Response, fieldName: string, type: string) => {
  let imageName = '';

  const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: DestinationCallback) {
      const staticPath: staticServe = config.get('staticServeConfig');
      fs.mkdirSync(staticPath.mayorUrl, { recursive: true });
      cb(null, staticPath.mayorUrl);
    },
    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      imageName = file.fieldname + '-' + uniqueSuffix + extension;
      cb(null, imageName);
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
      if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  }).single(fieldName);

  upload(req, res, async error => {
    if (error) {
      console.log('upload error');
    }
    if (error instanceof multer.MulterError) {
      console.log('failure');
      const { response } = failure(uploadMessages.IMAGE_UPLOAD_SUCCESS);
      return res.status(400).json(response);
    } else if (error) {
      const { response } = failure(uploadMessages.IMAGE_UPLOAD_FAILURE);
      return res.status(400).json(response);
    }
    return res.status(200).send(imageName);
  });
};
