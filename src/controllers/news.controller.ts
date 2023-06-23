import { RequestWithUser } from '@/interfaces/auth.interface';
import NewsService from '@/services/news/news.service';
import TranslationService from '@/services/translation/translation.service';
import { NewsTranslationKeys } from '@/utils/constants/translation-keys';
import { getLanguageHeader } from '@/utils/get-lang-header';
import { getUpdateWithoutTranslation } from '@/utils/get-update-without-translation';
import { isUpdateAll } from '@/utils/is-update-all';
import { Request } from 'express';

export default class NewsController {
  private newsService = new NewsService();
  private translationService = new TranslationService();
  // public getNews = async (req: Request): Promise<SearchResponseInterface> => {
  //   const params: QueryOptionsInterface = {
  //     offset: Number(req.query?.offset),
  //     numResults: Number(req.query?.numResults),
  //     search: req.query.search ? String(req.query.search) : null,
  //     type: req.query.type ? Number(req.query.type) : null,
  //   };
  //   const municipalityId = Number(req.params.municipalityId);
  //   const newsPromise = await this.newsService.getNews(params, municipalityId);
  //   const newsCountPromise = await this.newsService.getNewsCount(params, municipalityId);
  //   const result = await Promise.all([newsPromise, newsCountPromise]);
  //   const response: SearchResponseInterface = {
  //     data: result[0],
  //     count: result[1],
  //   };
  //   return response;
  // };

  // using this service method for admin until frontend implements pagination
  public getNews = async (req: Request): Promise<Object[]> => {
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const news = await this.newsService.getNewsMobile(municipalityId, language);
    return news;
  };

  public getNewsMobile = async (req: Request): Promise<Object[]> => {
    const language = getLanguageHeader(req);
    const municipalityId = Number(req.params.municipalityId);
    const news = await this.newsService.getNewsMobile(municipalityId, language);
    return news;
  };

  public getOneNews = async (req: Request): Promise<Object> => {
    const language = getLanguageHeader(req);
    const newsId = Number(req.params.newsId);
    const news = await this.newsService.getOneNews(newsId, language);
    return news;
  };

  public createNews = async (req: RequestWithUser) => {
    const language = getLanguageHeader(req);
    const municipalityId = req.params.municipalityId;
    const news = await this.translationService.translate(req.body, NewsTranslationKeys, language);
    await this.newsService.createNews({ ...news, municipalityId }, req.user);
  };

  public updateNews = async (req: Request) => {
    const language = getLanguageHeader(req);
    const updateAll = isUpdateAll(req);
    const id = Number(req.params.newsId);
    let updateBody = req.body;
    if (updateAll) {
      updateBody = await this.translationService.translate(req.body, NewsTranslationKeys, language);
    } else {
      updateBody = getUpdateWithoutTranslation(req, NewsTranslationKeys);
    }
    await this.newsService.updateNews(updateBody, id);
  };

  public deleteNews = async (req: Request) => {
    const newsId = Number(req.params.newsId);
    await this.newsService.deleteNews(newsId);
  };
}
