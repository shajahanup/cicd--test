import NewsController from '@/controllers/news.controller';
import {
  NewsCreateBodyDto,
  NewsCreateParamDto,
  NewsDeleteParamDto,
  NewsGetOneParamDto,
  NewsGetParamDto,
  NewsGetQueryDto,
  NewsMobileParamDto,
  NewsUpdateBodyDto,
  NewsUpdateParamDto,
} from '@/dtos/news/news.dto';
import { ValidationItems } from '@/enums/validationItems.enum';
import { Routes } from '@/interfaces/routes.interface';
import newsMessages from '@/messages/news.messages';
import { requestJson } from '@/middlewares/request';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Router } from 'express';

export default class NewsRoute implements Routes {
  public path = '/municipality/:municipalityId/news';
  public securePath = `/secure${this.path}`;
  public mobilePath = '/municipality/:municipalityId/mobile/news';
  public router = Router();
  public newsController = new NewsController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(
      `${this.path}`,
      validationMiddleware(NewsGetParamDto, ValidationItems.Params),
      validationMiddleware(NewsGetQueryDto, ValidationItems.Query),
      requestJson(this.newsController.getNews, newsMessages.NEWS_GET_SUCCESS),
    );
    this.router.get(
      `${this.mobilePath}`,
      validationMiddleware(NewsMobileParamDto, ValidationItems.Params),
      requestJson(this.newsController.getNewsMobile, newsMessages.NEWS_GET_SUCCESS),
    );
    this.router.get(
      `${this.path}/:newsId`,
      validationMiddleware(NewsGetOneParamDto, ValidationItems.Params),
      requestJson(this.newsController.getOneNews, newsMessages.NEWS_GET_ONE_SUCCESS),
    );
    this.router.post(
      this.securePath,
      validationMiddleware(NewsCreateParamDto, ValidationItems.Params),
      validationMiddleware(NewsCreateBodyDto, ValidationItems.Body),
      requestJson(this.newsController.createNews, newsMessages.NEWS_CREATE_SUCCESS),
    );
    this.router.put(
      `${this.securePath}/:newsId`,
      validationMiddleware(NewsUpdateParamDto, ValidationItems.Params),
      validationMiddleware(NewsUpdateBodyDto, ValidationItems.Body),
      requestJson(this.newsController.updateNews, newsMessages.NEWS_PUT_SUCCESS),
    );
    this.router.delete(
      `${this.securePath}/:newsId`,
      validationMiddleware(NewsDeleteParamDto, ValidationItems.Params),
      requestJson(this.newsController.deleteNews, newsMessages.NEWS_DELETE_SUCCESS),
    );
  }
}
