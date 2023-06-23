process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';
import AddressBookRoute from '@routes/address-book.route';
import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import MunicipalityRoute from '@routes/municipality.route';
import MayorRoute from './routes/mayor.route';
import EventRoute from './routes/event.route';
import validateEnv from '@utils/validateEnv';
import OfferRoute from './routes/offers.route';
import NewsRoute from './routes/news.route';
import AddressCategoryRoute from './routes/address-category.route';
import UploadRoute from './routes/upload.route';
import TodayRoute from './routes/today.route';

validateEnv();

new App([
  new IndexRoute(),
  new AuthRoute(),
  new UploadRoute(),
  new MunicipalityRoute(),
  new AddressBookRoute(),
  new AddressCategoryRoute(),
  new MayorRoute(),
  new EventRoute(),
  new OfferRoute(),
  new NewsRoute(),
  new TodayRoute(),
]);
