import { Exception } from '@/enums/exception.enum';

export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
    this.message = message;
    this.name = Exception.Application;
  }
}
