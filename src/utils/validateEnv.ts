import { cleanEnv, port, str } from 'envalid';
import config from 'config';
import { serverConfig } from '@interfaces/config/server.interface';

function validateEnv() {
  const serverConfig: serverConfig = config.get('serverConfig');

  cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'staging', 'production'] }),
    PORT: port({ default: serverConfig.port }),
  });
}

export default validateEnv;
