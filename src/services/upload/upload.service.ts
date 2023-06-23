import config from 'config';
import fs from 'fs/promises';
import { IUploadConfig } from '@interfaces/config/upload.interface';
import messages from '../../messages/upload.messages';
import { HttpException } from '@exceptions/HttpException';

const uploadConfig: IUploadConfig = config.get('uploadConfig');

export default class UploadService {
  public upload(file) {
    const fileDetails = { fileName: file.filename };
    return fileDetails;
  }

  public async get(fileName, type) {
    const path = `${uploadConfig.path}/${type}/${fileName}`;

    try {
      await fs.stat(path);
    } catch (error) {
      throw new HttpException(messages.IMAGE_NOT_FOUND);
    }

    const fileDetails = { path };
    return fileDetails;
  }
}
