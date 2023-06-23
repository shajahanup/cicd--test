process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import DB from '@databases';
import RedisClient from './databases/redis';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import authMiddleware from './middlewares/auth.middleware';
import { Server } from 'http';
import { serverConfig } from 'interfaces/config/server.interface';
import 'reflect-metadata';
import 'es6-shim';
import i18next from 'i18next';
import I18NexFsBackend from 'i18next-fs-backend';
import * as middleware from 'i18next-http-middleware';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public server: Server;
  public redisDB: RedisClient;
  public serverConfig: serverConfig = config.get('serverConfig');

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = this.serverConfig.port || 3000;
    this.env = this.serverConfig.env || 'development';
    this.server;

    this.connectToDatabase();
    this.connectToRedis();
    this.initializeI18Next();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.handleServerDown();

    this.startServer();
  }

  public startServer() {
    this.server = this.listen();
  }

  public listen() {
    return this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    DB.sequelize.sync({ force: false });
  }

  private connectToRedis() {
    this.redisDB = new RedisClient();
    this.redisDB.connectRedis();
  }

  private initializeI18Next() {
    i18next
      .use(I18NexFsBackend)
      .use(middleware.LanguageDetector)
      .init({
        debug: true,
        fallbackLng: 'en',
        backend: {
          loadPath: path.join(__dirname, '/locales/{{lng}}/translation.json'),
        },
      });
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    // this.app.use(helmet());
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(middleware.handle(i18next));
  }

  private initializeRoutes(routes: Routes[]) {
    this.app.use('/api/v1/secure', authMiddleware);
    routes.forEach(route => {
      this.app.use('/api/v1/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
        basePath: '/api/v1',
      },
      apis: ['src/controllers/*.ts'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public handleServerDown() {
    process.on('uncaughtException', args => this.cleanUp(args));
    process.on('unhandledRejection', args => this.cleanUp(args));
    process.on('SIGTERM', args => this.cleanUp(args));
    process.on('SIGINT', args => this.cleanUp(args));
  }

  private async cleanUp(args) {
    logger.error(`SIGNAL : ${args}`);
    logger.warn('Closing http server...');

    this.server.close(async error => {
      if (error) {
        logger.error('Error occuerd while safely closing the server');
        logger.error(error);
        logger.warn('Force closing the server');
      }

      await this.disconnectDB();
      await this.disconnectRedis();
      process.exit();
    });
  }

  private async disconnectDB() {
    logger.warn('Closing db connection...');
    await DB.sequelize.close();
  }

  private async disconnectRedis() {
    this.redisDB.disconnectRedis();
  }
}

export default App;
