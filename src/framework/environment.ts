import 'dotenv/config';
import * as env from 'env-var';

export const getBoolean = (key: string, required = true) => env.get(key).required(required).asBool();

export const getString = (key: string, required = true) => env.get(key).required(required).asString();

export const getInt = (key: string, required = true) => env.get(key).required(required).asInt();

export const getStringOptional = (key: string) => env.get(key).asString();

export const getBoolOptional = (key: string) => env.get(key).asBool();

export const serviceName = getString('SERVICE_NAME');
export const nodeEnv = getString('NODE_ENV');
export const httpPort = getString('HTTP_PORT');
