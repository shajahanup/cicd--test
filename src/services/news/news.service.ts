import DB from '@/databases';
import CountQueryInterfae from '@/interfaces/countQuery.interface';
import QueryOptionsInterface from '@/interfaces/queryOptions.interface';
import { newsCountQuery } from './news.query';
import { checkIfNewsExists } from './news.util';
import { HttpException } from '@/exceptions/HttpException';
import newsMessages from '@/messages/news.messages';
import { getTableExclusion } from '@/utils/get-table-exclusion';
import { NewsTranslationKeys } from '@/utils/constants/translation-keys';
import { getTableInclusion } from '@/utils/get-table-inclusion';

export default class NewsService {
  private news = DB.News;

  // public async getNews(params: QueryOptionsInterface, municipalityId: number): Promise<Object[]> {
  //   const replacements = {
  //     municipalityId,
  //     type: params.type ?? null,
  //     search: params.search ?? null,
  //   };
  //   const query = newsSearchQuery(params);
  //   const news = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
  //   return news;
  // }

  public async getNews(municipalityId: number, language: string): Promise<Object[]> {
    const exclude = getTableExclusion(NewsTranslationKeys);
    const include: any = getTableInclusion(language, NewsTranslationKeys);
    const news = await this.news.findAll({
      where: { municipalityId, isDeleted: false },
      order: [['updatedAt', 'DESC']],
      attributes: {
        exclude,
        include,
      },
    });
    return news;
  }

  public async getNewsMobile(municipalityId: number, language: string): Promise<Object[]> {
    const exclude = getTableExclusion(NewsTranslationKeys);
    const include: any = getTableInclusion(language, NewsTranslationKeys);
    const news = await this.news.findAll({
      where: { municipalityId, isDeleted: false },
      order: [['updatedAt', 'DESC']],
      attributes: {
        exclude,
        include,
      },
    });
    return news;
  }

  public async getNewsCount(params: QueryOptionsInterface, municipalityId: number): Promise<number> {
    const replacements = {
      municipalityId,
      type: params.type ?? null,
      search: params.search ?? null,
    };
    const query = newsCountQuery(params);
    const newsCount: CountQueryInterfae[] = await DB.sequelize.query(query, { replacements, type: DB.Sequelize.QueryTypes.SELECT });
    return newsCount?.[0]?.count;
  }

  public async getOneNews(id: number, language: string): Promise<Object> {
    const newsFound = await checkIfNewsExists(id);
    if (!newsFound) {
      throw new HttpException(newsMessages.NEWS_NOT_FOUND);
    }
    const exclude = getTableExclusion(NewsTranslationKeys);
    const include: any = getTableInclusion(language, NewsTranslationKeys);
    const news = await this.news.findOne({
      where: { id },
      attributes: {
        include,
        exclude,
      },
    });
    return news;
  }

  public async createNews(createBody: any, user) {
    const createdBy = user.id;
    if (!createBody.imgName) {
      createBody.imgName = '';
    }
    await this.news.create({ ...createBody, createdBy });
  }

  public async updateNews(updateBody: any, id: number) {
    const newsFound = await checkIfNewsExists(id);
    if (!newsFound) {
      throw new HttpException(newsMessages.NEWS_NOT_FOUND);
    }
    await this.news.update(updateBody, { where: { id }, returning: true });
  }

  public async deleteNews(id: number) {
    const newsFound = await checkIfNewsExists(id);
    if (!newsFound) {
      throw new HttpException(newsMessages.NEWS_NOT_FOUND);
    }
    await this.news.update({ isDeleted: true }, { where: { id }, returning: true });
  }
}
