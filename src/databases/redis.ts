import Redis from 'ioredis';
import config from 'config';
import { redisConfig as redisConfigInterface } from '@interfaces/config/redis.interface';
import { logger } from '@utils/logger';
import RedisInterface from 'ioredis/built/Redis';

class RedisClient {
  public redisClient: RedisInterface;
  public host: string;
  private port: number;
  private family: number;
  private db: number;
  private expiry: number;

  constructor() {
    const redisConfig: redisConfigInterface = config.get('redisConfig');

    this.host = redisConfig.host;
    this.port = redisConfig.port;
    this.family = redisConfig.family;
    this.db = redisConfig.db;
    this.expiry = redisConfig.expiry;

    this.connectRedis();
    this.onError();
  }

  public connectRedis() {
    this.redisClient = new Redis({
      port: this.port,
      host: this.host,
      family: this.family,
      db: this.db,
      // password,
      retryStrategy: (times: number) => this.retryStrategy(times),
    });

    return this.redisClient;
  }

  private retryStrategy(times: number): number {
    const delay: number = Math.min(times * 5000, 30000);
    return delay;
  }

  public disconnectRedis() {
    this.redisClient.quit();
  }

  private onError() {
    if (!this.redisClient) return;

    this.redisClient.on('error', function (error) {
      logger.error(error);
    });
  }

  public addKey = (key, data) => {
    return this.redisClient.set(key, data);
  };

  public addKeyWithExpiry = async (key, data) => {
    return await this.redisClient.set(key, data, 'EX', this.expiry);
  };

  public setExpiry = async key => {
    return await this.redisClient.expire(key, this.expiry);
  };

  public getData = async key => {
    return await this.redisClient.get(key);
  };

  public getTTL = async key => {
    return await this.redisClient.ttl(key);
  };

  public deleteKey = async key => {
    return await this.redisClient.del(key);
  };

  public keys = async pattern => {
    return await this.redisClient.keys(pattern);
  };
}

export default RedisClient;
