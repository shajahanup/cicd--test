import { Request, Response } from 'express';
import { LoginDto } from '@dtos/auth/login.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import AuthService from '@services/auth/auth.service';

class AuthController {
  public authService = new AuthService();

  public adminLogIn = async (req: Request, res: Response) => {
    const loginData: LoginDto = req.body;
    const { cookie, admin } = await this.authService.adminLogin(loginData);
    res.setHeader('Set-Cookie', [cookie]);
    return admin;
  };

  public logOut = async (req: RequestWithUser, res: Response) => {
    const logoutResponse: boolean = await this.authService.logout(req.user.id);
    res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
    return logoutResponse;
  };
}

export default AuthController;
