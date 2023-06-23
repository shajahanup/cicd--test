export interface redisConfig {
  prefix: string;
  host: string;
  port: number;
  password: string;
  expiry: number;
  scannerExpiry: number;
  db: number;
  family: number;
}
