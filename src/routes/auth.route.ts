import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { LoginDto } from '@dtos/auth/login.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { requestJson } from '@middlewares/request';
import config from 'config';
import { serverConfig as IserverConfig } from '@interfaces/config/server.interface';
import authMessages from '@/messages/auth.messages';

class AuthRoute implements Routes {
  public serverConfig: IserverConfig = config.get('serverConfig');
  public path = '/';
  public securePath = '/secure';
  public adminPath = '/admin';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.adminPath}/login`,
      validationMiddleware(LoginDto, 'body'),
      requestJson(this.authController.adminLogIn, authMessages.LOGIN_SUCCESS),
    );
    this.router.post(`${this.securePath}/logout`, requestJson(this.authController.logOut, authMessages.LOGOUT_SUCCESS));
  }
}

export default AuthRoute;
