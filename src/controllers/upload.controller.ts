import UploadService from '@/services/upload/upload.service';
import { Request } from 'express';

export default class UploadController {
  private uploadService = new UploadService();

  public upload = (req: Request) => {
    const fileDetails = this.uploadService.upload(req.file);
    return fileDetails;
  };

  public get = async (req: Request) => {
    const fileDetails = await this.uploadService.get(req.params.fileName, req.query.type);
    return fileDetails;
  };
}
