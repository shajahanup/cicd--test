import { NextFunction, Response } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
// import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import RedisClient from '@/databases/redis';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization')?.split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = jwt.verify(Authorization, secretKey) as DataStoredInToken;
      const userId = verificationResponse.id;
      // const findUser = await DB.Users.findByPk(userId);

      const redisClient = new RedisClient();
      const findUser = await redisClient.getData(userId);

      if (findUser) {
        req.user = JSON.parse(findUser);
        next();
      } else {
        next(new HttpException('Wrong authentication token', 401));
      }
    } else {
      next(new HttpException('Authentication token missing', 404));
    }
  } catch (error) {
    next(new HttpException('Wrong authentication token', 401));
  }
};

export default authMiddleware;
