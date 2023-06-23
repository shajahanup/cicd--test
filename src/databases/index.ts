import config from 'config';
import Sequelize from 'sequelize';
import { dbConfig } from '@/interfaces/config/db.interface';
import { logger } from '@utils/logger';
import MunicipalityModel from '@/models/municipality.model';
import MayorModel from '@/models/mayor.model';
import AddressBookModel from '@/models/address-book.model';
import AdminModel from '@/models/admin.model';
import EventsModel from '@/models/events.model';
import NewsModel from '@/models/news.model';
import OffersModel from '@/models/offers.model';
import AddressBookCategoryModel from '@models/address-book-category.model';
import pg from 'pg';

// bigint
pg.types.setTypeParser(20, function (value) {
  return parseInt(value);
});

const { host, user, password, database, pool, dialect }: dbConfig = config.get('dbConfig');
const sequelize = new Sequelize.Sequelize(database, user, password, {
  host: host,
  dialect: dialect,
  // timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: process.env.NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => {
    logger.info(`=================================`);
    logger.info(`Database connected to ${database}`);
    logger.info(`=================================`);
  })
  .catch(err => {
    logger.error(`Database failed to connect ${database}`);
    logger.error(`Reason: ${err}`);
  });

const DB = {
  Municipalities: MunicipalityModel(sequelize),
  Mayor: MayorModel(sequelize),
  AddressBookCategory: AddressBookCategoryModel(sequelize),
  AddressBook: AddressBookModel(sequelize),
  Admin: AdminModel(sequelize),
  Events: EventsModel(sequelize),
  News: NewsModel(sequelize),
  Offers: OffersModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
