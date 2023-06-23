import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import DB from '@databases';
import { LoginDto } from '@dtos/auth/login.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Admin, AuthAdminResponse } from '@interfaces/admin.interface';
import RedisClient from '@/databases/redis';
import messages from '../../messages/auth.messages';

class AuthService {
  public Admin = DB.Admin;

  public async adminLogin(loginData: LoginDto): Promise<{ cookie: string; admin: AuthAdminResponse }> {
    const findAdmin: Admin = await this.Admin.findOne({ where: { email: loginData.email } });
    if (!findAdmin) throw new HttpException(messages.ADMIN_NOT_FOUND);

    const isPasswordMatch: boolean = await bcrypt.compare(loginData.password, findAdmin.password);
    if (!isPasswordMatch) throw new HttpException(messages.WRONG_PASSWORD);

    const tokenData = this.createToken(findAdmin);
    const cookie = this.createCookie(tokenData);

    const redisClient = new RedisClient();
    redisClient.addKey(findAdmin.id, JSON.stringify(findAdmin));

    const admin: AuthAdminResponse = { id: findAdmin.id, name: findAdmin.name, email: findAdmin.email, token: tokenData.token };

    return { cookie, admin };
  }

  public async logout(userId: number): Promise<boolean> {
    const redisClient = new RedisClient();
    redisClient.deleteKey(userId);
    return true;
  }

  public createToken(user: Admin): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 24 * 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; Max-Age=${tokenData.expiresIn}; SameSite=None;`;
  }
}

export default AuthService;
